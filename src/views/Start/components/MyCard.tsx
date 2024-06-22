import { Card, CardContent, CardMedia, Typography } from "@mui/material";

type MyCardComponentProps = {
  MyCard: number;
};

export const MyCardComponent: React.FC<MyCardComponentProps> = ({ MyCard }) => (
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
