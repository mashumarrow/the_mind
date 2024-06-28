import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

type MyCardComponentProps = {
  MyCard: number | null;
  //onClick: () => void;
};

export const MyCardComponent: React.FC<MyCardComponentProps> = ({ MyCard }) => {
  const handleTouchStart = (e: React.TouchEvent) => {
    // Optional: handle touch start if necessary
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Optional: handle touch move if necessary
  };

  const handleTouchEnd = () => {
    // Optional: handle touch end if necessary
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: 110,
        height: 146,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      //onClick={onClick}
    >
      <Card
        sx={{
          width: "100%",
          height: "100%",
        }}
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
          <Typography
            variant="h3"
            sx={{ fontSize: "44px", fontWeight: "bold", lineHeight: 1 }}
          >
            {MyCard}
          </Typography>
        </CardContent>
      </Card>
      <Box
        sx={{
          position: "absolute",
          top: "-40%",
          width: "100%",
          color: "red",
          fontSize: "40px",
          animation: "up-down 1s infinite alternate",
          textAlign: "center",
        }}
      >
        ⇧
      </Box>
    </Box>
  );
};
