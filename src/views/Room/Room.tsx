import React from "react";
import Layout from "../../Layout";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardMedia, Typography } from "@mui/material";

const Room = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center h-screen w-screen bg-amber-50 gap-10">
        <div className="flex justify-center w-full mt-10 space-x-4">
          <PlayerCardComponent imagePath="../src/assets/player1.svg" />
          <PlayerCardComponent imagePath="../src/assets/player2.svg" />
          <PlayerCardComponent imagePath="../src/assets/player3.svg" />
        </div>
        <div>
          <NowCardComponent NowCard={20} />
        </div>
        <div className="flex justify-center w-full mt-10 space-x-10">
          <MyCardComponent MyCard={10} />
          <MyCardComponent MyCard={20} />
        </div>
      </div>
    </Layout>
  );
};

type PlayerCardComponentProps = {
  imagePath: string;
};

const PlayerCardComponent: React.FC<PlayerCardComponentProps> = ({ imagePath }) => (
  <Card sx={{ width: 91, height: 153, border: "1px solid black" }}>
    <CardMedia
      component="img"
      sx={{ width: 67, height: 79, objectFit: "contain", mx: "auto", my: 2 }}
      image={imagePath}
      title="Player Image"
    />
    <CardContent sx={{ marginTop: -4 }}>
      <Typography gutterBottom sx={{ fontSize: "16px", fontWeight: "bold" }} component="div">
        Player
      </Typography>
      <Typography sx={{ fontSize: "11px", fontWeight: "bold" }}>残り：１枚</Typography>
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
      <Typography variant="h3" sx={{ fontSize: "55px", fontWeight: "bold", lineHeight: 1 }}>
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
      <Typography variant="h3" sx={{ fontSize: "44px", fontWeight: "bold", lineHeight: 1 }}>
        {MyCard}
      </Typography>
    </CardContent>
  </Card>
);

export default Room;
