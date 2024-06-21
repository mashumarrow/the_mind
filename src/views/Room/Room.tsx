import React from "react";
import Layout from "../../Layout";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardMedia, Typography } from "@mui/material";

const Room = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center h-screen w-screen bg-amber-50">
        <div className="flex justify-center w-full mt-10 space-x-4">
          <PlayerCardComponent imagePath="../src/assets/player1.svg" />
          <PlayerCardComponent imagePath="../src/assets/player2.svg" />
          <PlayerCardComponent imagePath="../src/assets/player3.svg" />
        </div>
      </div>
    </Layout>
  );
};

type CardComponentProps = {
  imagePath: string;
};

const PlayerCardComponent: React.FC<CardComponentProps> = ({ imagePath }) => (
  <Card sx={{ Width: 91, Height: 153 }}>
    <CardMedia
      component="img"
      sx={{ width: 67, height: 79, objectFit: "contain", mx: "auto", my: 2 }}
      image={imagePath}
      title="Player Image"
    />
    <CardContent sx={{ marginTop: -2 }}>
      <Typography gutterBottom variant="body1" component="div">
        Player
      </Typography>
      <Typography variant="body2" color="text.secondary">
        test
      </Typography>
    </CardContent>
  </Card>
);

export default Room;
