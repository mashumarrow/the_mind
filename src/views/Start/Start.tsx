import { useContext, useEffect, useState } from "react";
import { UserIdContext } from "../../Context";
import {
  ChangeNowCard,
  CompareCards,
  GetUserCard,
  GetNameandStamponRoom,
  UpdateSuccess,
} from "./hooks";
import { supabase } from "../..//utils/supabase";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../Layout";
import { PlayerCardComponent } from "./components/PlayerCard";
import { NowCardComponent } from "./components/NowCard";
import { MyCardComponent } from "./components/MyCard";

const { data: player1 } = supabase.storage
  .from("avatars/image")
  .getPublicUrl("happy.png");

const { data: player2 } = supabase.storage
  .from("avatars/image")
  .getPublicUrl("cry.png");

const { data: player3 } = supabase.storage
  .from("avatars/image")
  .getPublicUrl("niyari.png");

type MyCard = {
  hand1: number | null;
  hand2: number | null;
};

type Member = {
  UserID: number;
  name: string;
  stamp: number;
};

const Start = () => {
  const [UserID] = useContext(UserIdContext);
  const { id }: any = useParams();
  const [nowcard, setNowCard] = useState<number | null>(null); //場のカード
  const [MyCards, setMyCards] = useState<MyCard>({ hand1: null, hand2: null }); //手札
  const [Members, setMembers] = useState<Member[]>([]); //メンバーの名前とカードの枚数
  const [remainingCards, setRemainingCards] = useState<number>(8); //チームの残りのカードの枚数
  const [stampCount, setStampCount] = useState<number>(5); //スタンプの残り回数
  const [possiblityOfSuccess, setpossiblityOfSuccess] = useState<
    boolean | null
  >(null); //成功できるかどうか
  const [stamp, setStamp] = useState<number | null>(null); //選択された画像のID

  const navigate = useNavigate();

  const images = [
    { id: 1, src: player1.publicUrl },
    { id: 2, src: player2.publicUrl },
    { id: 3, src: player3.publicUrl },
  ];

  //手札取得してくる
  useEffect(() => {
    const GetMyCards = async () => {
      const res: any = await GetUserCard(UserID);
      setMyCards({ hand1: res[0].hand1, hand2: res[0].hand2 });
    };

    const GetUserName = async () => {
      const res: any = await GetNameandStamponRoom(id);
      console.log("メンバーのIDと名前とスタンプ", res);
      const MemberData = res.filter((item: any) => item.UserID !== UserID);
      setMembers(MemberData);
      console.log("メンバーの名前", MemberData);
    };

    GetMyCards();
    GetUserName();
  }, [UserID, id]);

  //残りのカードが0なったら成功画面に遷移
  useEffect(() => {
    console.log(remainingCards);
    if (remainingCards === 0) {
      //console.log("成功");
      navigate(`/room/${id}/success`);
    }
  }, [remainingCards]);

  //カードを出して1.5秒後に成功する可能性がまだあるかないかを判定する
  useEffect(() => {
    const UpdateRoom = async () => {
      await UpdateSuccess(id, possiblityOfSuccess);
    };
    const timer = setTimeout(() => {
      UpdateRoom();
    }, 1500);
    return () => clearTimeout(timer);
  }, [possiblityOfSuccess, id]);

  //リアルタイムでゲーム状況を取得するやつです
  supabase
    .channel("rooms")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "rooms" },
      async (payload) => {
        if (payload.new.RoomID !== id) return;
        if (payload.new.success === false) {
          navigate(`/room/${id}/failure`);
        } else if (payload.new.now_card !== nowcard) {
          const res = await CompareCards(payload.new.now_card, MyCards);
          setpossiblityOfSuccess(res);
          setRemainingCards(remainingCards - 1);
          setNowCard(payload.new.now_card);
        }
      }
    )
    .subscribe();

  //手札出す

  const hand1 = async () => {
    await ChangeNowCard(id, MyCards.hand1);
    setNowCard(MyCards.hand1);
    setRemainingCards(remainingCards - 1);
    setMyCards((prev) => ({ ...prev, hand1: null }));
  };

  const hand2 = async () => {
    await ChangeNowCard(id, MyCards.hand2);
    setNowCard(MyCards.hand2);
    setRemainingCards(remainingCards - 1);
    setMyCards((prev) => ({ ...prev, hand2: null }));
  };

  // 画像がクリックされたとき
  const handleImageClick = async (imageId: number) => {
    const { data, error } = await supabase
      .from("users")
      .update({ stamp: imageId })
      .eq("UserID", UserID)
      .eq("RoomID", id);

    if (error) {
      console.error(`ユーザのアップデートエラー`, error);
    } else {
      console.log(`ユーザーのデータが更新されました`, data);
      setStamp(imageId);
    }
    setStampCount(stampCount - 1);
  };

  supabase
    .channel("users")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "users" },
      (payload) => {
        if (payload.new.RoomID === id) {
          console.log("画像テスト", payload.new);
          setMembers((prevData) =>
            prevData.map((item) =>
              item.UserID === payload.new.UserID
                ? { ...item, stamp: payload.new.stamp }
                : item
            )
          );
          setStampCount(stampCount - 1);
        }
      }
    )
    .subscribe();

  return (
    <>
      <Layout>
        <div className="flex flex-col items-center  h-screen w-screen bg-amber-50 gap-6">
          <div
            style={{
              fontSize: "1em",

              padding: "10px",
              borderRadius: "10px",
              display: "inline-block",
              backgroundColor: "#fff1f2",
              textAlign: "center",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <span className="font-semibold text-lg ">残りスタンプ回数</span>
            <br />
            <span className="text-red-500 text-2xl font-semibold">
              {stampCount}
            </span>
          </div>
          <div className="flex justify-center w-full mt-2 space-x-4">
            {Members.map((member) => (
              <PlayerCardComponent
                key={member.UserID}
                stampPath={member.stamp}
                name={member.name}
              />
            ))}
          </div>
          <div>
            <NowCardComponent
              NowCard={nowcard}
              reminingCards={remainingCards}
            />
          </div>

          <div className="flex justify-center w-full mt-1 space-x-10">
            {MyCards.hand1 && (
              <MyCardComponent MyCard={MyCards.hand1} onClick={hand1} />
            )}
            {MyCards.hand2 && (
              <MyCardComponent MyCard={MyCards.hand2} onClick={hand2} />
            )}
          </div>

          {stamp !== null && (
            <img
              src={images.find((image) => image.id === stamp)?.src}
              className="w-16 h-auto object-contain max-w-full block"
            />
          )}

          {stampCount !== 0 && (
            <>
              <div className="border-2  border-white bg-pink-50 shadow-[0_0_0_2px_#f8edeb] p-1  ">
                {stamp ? (
                  <>変えるときはもう一度押してね</>
                ) : (
                  <>リアクションスタンプを押してね</>
                )}
              </div>
              <div className="relative flex space-x-4 -mt-4">
                {images.map((image) => (
                  <img
                    key={image.id}
                    src={image.src}
                    className={`w-24 h-auto cursor-pointer object-contain max-w-full ${
                      stamp !== image.id ? "block" : "hidden"
                    }`}
                    onClick={() => handleImageClick(image.id)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Start;
