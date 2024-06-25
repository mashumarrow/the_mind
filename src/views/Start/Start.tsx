import { useContext, useEffect, useState } from "react";
import { UserIdContext } from "../../Context";
import {
  ChangeNowCard,
  CompareCards,
  GetUserCard,
  GetUserNameonRoom,
  GetUserNumberofCards,
  UpdateSuccess,
} from "./hooks";
import { supabase } from "../..//utils/supabase";
import { useNavigate, useParams } from "react-router-dom";
//import happy from "../../assets/happy.png";
//import cry from "../../assets/cry.png";
//import niyari from "../../assets/niyari.png";
import Layout from "../../Layout";
import { PlayerCardComponent } from "./components/PlayerCard";
import { NowCardComponent } from "./components/NowCard";
import { MyCardComponent } from "./components/MyCard";

type MyCard = {
  hand1: number | null;
  hand2: number | null;
};

type User = {
  UserID: number;
  name: string;
  hand1: number | null;
  hand2: number | null;
};

type Member = {
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
  const [myName, setMyName] = useState<string>(""); //自分の名前
  const [possiblityOfSuccess, setpossiblityOfSuccess] = useState<boolean | null>(null); //成功できるかどうか
  const navigate = useNavigate();

  const images = [
    { id: 1, src: "../../src/assets/happy.png" },
    { id: 2, src: "../../src/assets/cry.png" },
    { id: 3, src: "../../src/assets/niyari.png" },
  ];
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);

  //console.log(id);

  //手札取得してくる
  useEffect(() => {
    const GetMyCards = async () => {
      const res: any = await GetUserCard(UserID);
      //console.log(res[0]);
      setMyCards({ hand1: res[0].hand1, hand2: res[0].hand2 });
    };

    const GetUserName = async () => {
      const res: any = await GetUserNameonRoom(id);

      const myname = res.find((item: User) => item.UserID === UserID);
      setMyName(myname.name); //自分の名前を取得
    };

    const GetUserCards = async () => {
      const res: any = await GetUserNumberofCards(id);
      const members = res
        .filter((item: User) => item.UserID !== UserID)
        .map((item: User) => {
          const numberOfCards = [item.hand1, item.hand2].filter((card) => card !== null).length;
          return { name: item.name, numberofcards: numberOfCards };
        });

      setMembers(members); // メンバーの名前と手札の枚数を格納

      // console.log("res", res);
    };

    GetUserCards();
    GetMyCards();
    GetUserName();
    // console.log("Members:", Members);
  }, []);

  //残りのカードが0なったら成功画面に遷移
  useEffect(() => {
    if (remainingCards === 0) {
      navigate(`/room/${id}/success`);
    }
  }, [remainingCards]);

  //カードを出して3秒後に成功する可能性がまだあるかないかを判定する　＊3秒後ではないと、データベースの検知を他のユーザができないため　＊この間にスピナー回すなどして、要工夫
  useEffect(() => {
    const UpdateRoom = async () => {
      await UpdateSuccess(id, possiblityOfSuccess);
    };
    const timer = setTimeout(() => {
      UpdateRoom();
    }, 3000);
    return () => clearTimeout(timer);
  }, [possiblityOfSuccess]);

  //リアルタイムでゲーム状況を取得するやつです、本当はhooks.tsに書くやつです、ごめんなさい。
  //他の人がカードを出す、失敗をリアルタイムで検知しています。
  supabase
    .channel("rooms")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "rooms" },
      async (payload) => {
        console.log(payload.new);
        if (payload.new.success === false) {
          console.log("ゲームに失敗しました。");
          navigate(`/room/${id}/failure`);
        } else if (payload.new.now_card !== nowcard) {
          console.log("メンバーがカードを出しました。", payload.new.now_card);
          const res = await CompareCards(payload.new.now_card, MyCards);
          console.log(res);
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
    MyCards.hand1 = null;
  };

  //手札出す
  const hand2 = async () => {
    await ChangeNowCard(id, MyCards.hand2);
    MyCards.hand2 = null;
  };

  //スタンプ選ぶ

  // 画像がクリックされたとき
  const handleImageClick = async (imageId: number) => {
    try {
      // Supabaseに画像IDを保存
      const { data, error } = await supabase.from("users").insert([{ stamp: imageId }]);

      if (error) {
        console.error("エラー", error);
      } else {
        console.log("Data inserted:", data);
        // 画像IDを状態に設定して、選択された画像を表示
        setSelectedImageId(imageId);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="flex flex-raw">
        {MyCards.hand1 !== null && (
          <button className="text-red-500" onClick={hand1}>
            {MyCards.hand1}
          </button>
        )}
        {MyCards.hand2 !== null && (
          <button className="text-blue-500" onClick={hand2}>
            {MyCards.hand2}
          </button>
        )}
      </div>

      <Layout>
        <div className="flex flex-col items-center  h-screen w-screen bg-amber-50 gap-10">
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
            <MyCardComponent MyCard={MyCards.hand1} />
            <MyCardComponent MyCard={MyCards.hand2} />
          </div>
          <div className="relative flex space-x-4 -mt-4">
            {images.map(
              (image) =>
                (selectedImageId === null || selectedImageId === image.id) && (
                  <img
                    key={image.id}
                    src={image.src}
                    className=" w-32 h-auto cursor-pointer object-contain max-w-ful"
                    onClick={() => handleImageClick(image.id)}
                  />
                )
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Start;
