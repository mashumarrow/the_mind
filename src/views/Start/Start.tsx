import { useContext, useEffect, useState } from "react";
import { UserIdContext } from "../../Context";
import {
  ChangeNowCard,
  CompareCards,
  GetUserCard,
  UpdateSuccess,
} from "./hooks";
import { supabase } from "../..//utils/supabase";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../Layout";
import { PlayerCardComponent } from "./components/PlayerCard";
import { NowCardComponent } from "./components/NowCard";
import { MyCardComponent } from "./components/MyCard";

{
  /*const { data } = supabase.storage
  .from("avatars/image")
  .getPublicUrl("player.jpg");*/
}

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

{
  /*type User = {
  UserID: number;
  name: string;
  }*/
}

type Member = {
  UserID: number;
  name: string;
  numberofcards: number;
};

const Start = () => {
  const [UserID] = useContext(UserIdContext);
  const { id }: any = useParams();
  const [nowcard, setNowCard] = useState<number | null>(null); //場のカード
  const [MyCards, setMyCards] = useState<MyCard>({ hand1: null, hand2: null }); //手札
  const [Members, setMembers] = useState<Member[]>([]); //メンバーの名前とカードの枚数
  const [remainingCards, setRemainingCards] = useState<number>(8); //チームの残りのカード
  //const [membersName, setMembersName] = useState<string[]>([]); //メンバーの名前
  const [possiblityOfSuccess, setpossiblityOfSuccess] = useState<
    boolean | null
  >(null); //成功できるかどうか
  const [stamp, setStamp] = useState<number | null>(null); //選択された画像のID
  const [memberStamps, setMemberStamps] = useState<
    { UserID: number; stamp: number }[]
  >([]); //他のメンバーのスタンプ
  const [stampSelected, setStampSelected] = useState<boolean>(false); // スタンプが選択されたかどうか

  const navigate = useNavigate();

  const images = [
    { id: 1, src: player1.publicUrl },
    { id: 2, src: player2.publicUrl },
    { id: 3, src: player3.publicUrl },
  ];

  console.log(memberStamps);

  //手札取得してくる
  useEffect(() => {
    const GetMyCards = async () => {
      const res: any = await GetUserCard(UserID);
      setMyCards({ hand1: res[0].hand1, hand2: res[0].hand2 });
    };

    const GetUserName = async () => {
      //const res: any = await GetUserNameonRoom(id);
      //console.log("res", res);
      {
        /*const myname = res.find((item: User) => item.UserID === UserID);
      setMyName(myname.name); //自分の名前を取得
    };

    const GetUserCards = async () => {
      const res: any = await GetUserNumberofCards(id);
      const members = res
        .filter((item: User) => item.UserID !== UserID)
      {/*  .map((item: { name: string }) => item.name);
      setMembersName(membersName); //メンバーの名前を取得
      */
      }
    };

    GetMyCards();
    GetUserName();
  }, [UserID, id]);

  //残りのカードが0なったら成功画面に遷移
  useEffect(() => {
    console.log(remainingCards);
    if (remainingCards === 0) {
      console.log("成功");
      navigate(`/room/${id}/success`);
    }
  }, [remainingCards]);

  //カードを出して3秒後に成功する可能性がまだあるかないかを判定する
  useEffect(() => {
    const UpdateRoom = async () => {
      await UpdateSuccess(id, possiblityOfSuccess);
    };
    const timer = setTimeout(() => {
      UpdateRoom();
    }, 3000);
    return () => clearTimeout(timer);
  }, [possiblityOfSuccess, id]);

  //リアルタイムでゲーム状況を取得するやつです
  supabase
    .channel("rooms")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "rooms" },
      async (payload) => {
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
    setMyCards((prev) => ({ ...prev, hand1: null }));
    updateMemberCards(UserID);
  };

  const hand2 = async () => {
    await ChangeNowCard(id, MyCards.hand2);
    setNowCard(MyCards.hand2);
    setMyCards((prev) => ({ ...prev, hand2: null }));
    updateMemberCards(UserID);
  };

  const updateMemberCards = (userID: number) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.UserID === userID
          ? { ...member, numberofcards: member.numberofcards - 1 }
          : member
      )
    );
  };

  // 画像がクリックされたとき
  const handleImageClick = async (imageId: number) => {
    if (stampSelected) return; // スタンプがすでに選択されている場合は処理を中断
    try {
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
        setStampSelected(true); // スタンプが選択されたと設定
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    const subscription = supabase
      .channel("users")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "users" },
        (payload) => {
          if (payload.new.RoomID === id) {
            setMemberStamps((prev) => [
              ...prev.filter((item) => item.UserID !== payload.new.UserID),
              { UserID: payload.new.UserID, stamp: payload.new.stamp },
            ]);
            if (payload.new.UserID === UserID) {
              setStamp(payload.new.stamp);
              setStampSelected(true); // リロード時に選択済みの状態を反映
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [id, UserID]);

  useEffect(() => {
    const fetchMemberStamps = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("UserID, stamp")
        .eq("RoomID", id)
        .neq("UserID", UserID);

      if (error) {
        console.error("Error ", error);
      } else {
        setMemberStamps(data);
      }
    };

    fetchMemberStamps();
  }, [id, UserID]);

  return (
    <>
      <Layout>
        <div className="flex flex-col items-center  h-screen w-screen bg-amber-50 gap-6">
          <div className="flex justify-center w-full mt-10 space-x-4">
            <PlayerCardComponent
              imagePath="../../src/assets/player1.svg"
              name={Members[0]?.name}
              numberofcards={Members[0]?.numberofcards}
            />
            <PlayerCardComponent
              imagePath="../../src/assets/player2.svg"
              name={Members[1]?.name}
              numberofcards={Members[1]?.numberofcards}
            />
            <PlayerCardComponent
              imagePath="../../src/assets/player3.svg"
              name={Members[2]?.name}
              numberofcards={Members[2]?.numberofcards}
            />
          </div>
          <div>
            <NowCardComponent NowCard={nowcard} />
          </div>
          <div className="flex justify-center w-full mt-10 space-x-10">
            <MyCardComponent MyCard={MyCards.hand1} onClick={hand1} />
            <MyCardComponent MyCard={MyCards.hand2} onClick={hand2} />
          </div>
          {stamp === null && (
            <div className="border-2 border-dashed border-white bg-pink-50 shadow-[0_0_0_2px_#f8edeb] p-2 m-3">
              リアクションスタンプを押してね
            </div>
          )}
          <div className="relative flex space-x-4 -mt-4">
            {images.map((image) => (
              <img
                key={image.id}
                src={image.src}
                className={`w-24 h-auto cursor-pointer object-contain max-w-full ${
                  stamp === null || stamp === image.id ? "block" : "hidden"
                }`}
                onClick={() => handleImageClick(image.id)}
              />
            ))}
          </div>
          {/*<div className="absolute top-10 flex flex-row ">
              {memberStamps
                .filter((member) => member.UserID !== UserID)
                .slice(0, 3)
                .map((member) => (
                  <img
                    key={member.UserID}
                    src={member.stamp}
                    className=" w-28 h-auto cursor-pointer object-contain max-w-ful"
                    onClick={() => handleImageClick(member.UserID)}
                    src={images.find((img) => img.id === member.stamp)?.src}
                    //alt={` ${member.UserID}`}
                    className="w-20 h-auto object-contain max-w-full m-3.5"
                  />
                ))}
            </div>*/}
        </div>
      </Layout>
    </>
  );
};

export default Start;
