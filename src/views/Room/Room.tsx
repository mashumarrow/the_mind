import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import { useContext, useEffect, useState } from "react";
import { PaththeCard } from "./hooks";
import { UserIdContext } from "../../Context";

const Room = () => {
  const [isPathCard, setIsPathCard] = useState<boolean>(false);
  const { id }: any = useParams();
  const [UserID] = useContext(UserIdContext);
  const navigate = useNavigate();

  //5秒後にカードを配る　＊間開けないと他のユーザが配られたことを認識できないから。
  useEffect(() => {
    const timer = setTimeout(() => {
      const pathCard = async () => {
        await PaththeCard(id, UserID);
      };
      pathCard();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  //リアルタイムで部屋の状況を取得するやつです、本当はhooks.tsにかくやつです、ごめんなさい。
  supabase
    .channel("rooms")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "rooms" },
      (payload) => {
        if (payload.new.pathcard === true && !isPathCard) {
          setIsPathCard(true);
          console.log("カードが配られました。");
          navigate(`/room/${id}/start`);
        }
      }
    )
    .subscribe();

  return (
    <div>
      {id && id.toString()}
      <p className="text-red-400">aaa</p>
    </div>
  );
};

export default Room;
