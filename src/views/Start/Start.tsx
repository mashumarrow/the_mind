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

type MyCard = {
  hand1: number | null;
  hand2: number | null;
};

const Start = () => {
  const [UserID] = useContext(UserIdContext);
  const { id }: any = useParams();
  const [nowcard, setNowCard] = useState<number | null>(null); //場のカード
  const [MyCards, setMyCards] = useState<MyCard>({ hand1: null, hand2: null }); //手札
  const [remainingCards, setRemainingCards] = useState<number>(8); //チームの残りのカード
  const [possiblityOfSuccess, setpossiblityOfSuccess] = useState<
    boolean | null
  >(null); //成功できるかどうか
  const navigate = useNavigate();

  //console.log(id);

  //手札取得してくる
  useEffect(() => {
    const GetMyCards = async () => {
      const res: any = await GetUserCard(UserID);
      console.log(res[0]);
      setMyCards({ hand1: res[0].hand1, hand2: res[0].hand2 });
    };
    console.log(UserID);
    GetMyCards();
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

  return (
    <div className="flex flex-col">
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
      <p className="text-green-500">{remainingCards}</p>
      {nowcard ? (
        <p className="text-gray-500 text-3xl">{nowcard}</p>
      ) : (
        <p>まだ誰もだしていません</p>
      )}
    </div>
  );
};

export default Start;
