import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

type MyCardComponentProps = {
  MyCard: number | null;
  onClick: () => void;
};

export const MyCardComponent: React.FC<MyCardComponentProps> = ({
  MyCard,
  onClick,
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: 50,
        height: 70,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      //onTouchStart={handleTouchStart}
      //onTouchMove={handleTouchMove}
      //onTouchEnd={handleTouchEnd}
      onClick={onClick}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          height: "45%",
          borderRadius: "50%",
          backgroundColor: "#F1CAFD", // 薄い紫色
          zIndex: 0, // カードの背後に配置するため
        }}
      />
      <Card
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
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
    </Box>
  );
};
