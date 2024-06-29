import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { supabase } from "../../../utils/supabase";

const { data: syoki } = supabase.storage
  .from("avatars/image")
  .getPublicUrl("cat.png");

const { data: player1 } = supabase.storage
  .from("avatars/image")
  .getPublicUrl("happy.png");

const { data: player2 } = supabase.storage
  .from("avatars/image")
  .getPublicUrl("cry.png");

const { data: player3 } = supabase.storage
  .from("avatars/image")
  .getPublicUrl("niyari.png");

type PlayerCardComponentProps = {
  stampPath: number;
  name: string;
};

export const PlayerCardComponent: React.FC<PlayerCardComponentProps> = ({
  stampPath,
  name,
}) => {
  const images = [
    { id: 1, src: player1.publicUrl },
    { id: 2, src: player2.publicUrl },
    { id: 3, src: player3.publicUrl },
  ];

  return (
    <Card sx={{ width: 75, height: 135, border: "1px solid black" }}>
      {stampPath ? (
        <CardMedia
          component="img"
          sx={{
            width: 65,
            height: 80,
            objectFit: "contain",
            mx: "auto",
            my: 2,
          }}
          image={images.find((img) => img.id === stampPath)?.src}
          title="Player Image"
        />
      ) : (
        <CardMedia
          component="img"
          sx={{
            width: 65,
            height: 80,
            objectFit: "contain",
            mx: "auto",
            my: 2,
          }}
          image={syoki.publicUrl}
          title="Player Image"
        />
      )}
      <CardContent sx={{ marginTop: -4 }}>
        <Typography
          gutterBottom
          sx={{ textAlign: "center", fontSize: "12px", fontWeight: "bold" }}
          component="div"
        >
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};
