import { Card, CardContent, CardMedia, Typography } from "@mui/material";

type NowCardComponentProps = {
  NowCard: number | null;
};

export const NowCardComponent: React.FC<NowCardComponentProps> = ({
  NowCard,
}) => {
  if (NowCard === null) {
    return <p>まだ誰も出していません。</p>;
  } else {
    return (
      <Card sx={{ width: 160, height: 250, position: "relative" }}>
        <CardMedia
          component="img"
          image="../../src/assets/now_card.svg"
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
  }
};
