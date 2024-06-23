import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import { useContext, useEffect, useState } from "react";
import { PaththeCard } from "./hooks";
import { UserIdContext } from "../../Context";
{
  /*import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardMedia, Typography } from "@mui/material";
*/
}

const Room = () => {
  const [isPathCard, setIsPathCard] = useState<boolean>(false);
  const { id }: any = useParams();
  const [UserID] = useContext(UserIdContext);
  const navigate = useNavigate();

  //5秒後にカードを配る＊間開けないと他のユーザが配られたことを認識できないから。
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
      <div className="flex flex-col items-center h-screen w-screen bg-amber-50 gap-10 ">
        <div className="  text-2xl  mt-[130px] mb-10">人数が揃いました</div>
        <div className="flex items-center justify-center mt-[-20px]">
          <svg
            className="animate-spin h-10 w-10 text-black-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        <img
          className="object-contain animate-wobble-ver-right"
          src="../src/assets/deal_the_cards.png"
          width={180}
          height={180}
        />
        <div className="text-lg mt-4">カード配布中</div>
      </div>
    </div>
  );
};

{
  /*type PlayerCardComponentProps = {
  imagePath: string;
};

const PlayerCardComponent: React.FC<PlayerCardComponentProps> = ({
  imagePath,
}) => (
  <Card sx={{ width: 91, height: 153, border: "1px solid black" }}>
    <CardMedia
      component="img"
      sx={{ width: 67, height: 79, objectFit: "contain", mx: "auto", my: 2 }}
      image={imagePath}
      title="Player Image"
    />
    <CardContent sx={{ marginTop: -4 }}>
      <Typography
        gutterBottom
        sx={{ fontSize: "16px", fontWeight: "bold" }}
        component="div"
      >
        Player
      </Typography>
      <Typography sx={{ fontSize: "11px", fontWeight: "bold" }}>
        残り：１枚
      </Typography>
    </CardContent>
  </Card>
);

type NowCardComponentProps = {
  NowCard: number;
};

const NowCardComponent: React.FC<NowCardComponentProps> = ({ NowCard }) => (
  <Card sx={{ width: 160, height: 250, position: "relative" }}>
    <CardMedia
      component="img"
      image="../src/assets/now_card.svg"
      sx={{ width: "100%", height: "100%", objectFit: "contain" }}
      title="Player Image"
    />
    <CardContent
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: 2.5,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{ fontSize: "55px", fontWeight: "bold", lineHeight: 1 }}
      >
        {NowCard}
      </Typography>
    </CardContent>
  </Card>
);

type MyCardComponentProps = {
  MyCard: number;
};

const MyCardComponent: React.FC<MyCardComponentProps> = ({ MyCard }) => (
  <Card sx={{ width: 110, height: 146, position: "relative" }}>
    <CardMedia
      component="img"
      image="../src/assets/hand1.svg"
      sx={{ width: "100%", height: "100%", objectFit: "contain" }}
      title="Player Image"
    />
    <CardContent
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: 2.5,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{ fontSize: "44px", fontWeight: "bold", lineHeight: 1 }}
      >
        {MyCard}
      </Typography>
    </CardContent>
  </Card>
);
*/
}
export default Room;
