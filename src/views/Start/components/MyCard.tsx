import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

type MyCardComponentProps = {
  MyCard: number | null;
};

export const MyCardComponent: React.FC<MyCardComponentProps> = ({ MyCard }) => {
  const [isTapped, setIsTapped] = useState(false);

  const handleTap = () => {
    setIsTapped(!isTapped);
  };

  return (
    <Card
      sx={{
        width: 110,
        height: 146,
        position: "relative",
        transform: isTapped ? "translateY(-10px)" : "none",
        boxShadow: isTapped ? "0 0 15px yellow" : "none",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
      }}
      onClick={handleTap}
    >
      <CardMedia
        component="img"
        image="../../src/assets/hand1.svg"
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
};
