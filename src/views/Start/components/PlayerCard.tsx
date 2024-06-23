import { Card, CardContent, CardMedia, Typography } from "@mui/material";

type PlayerCardComponentProps = {
  imagePath: string;
};

export const PlayerCardComponent: React.FC<PlayerCardComponentProps> = ({
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
