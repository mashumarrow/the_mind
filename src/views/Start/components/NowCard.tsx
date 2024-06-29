import { Box, Card, CardContent, Typography } from "@mui/material";

type NowCardComponentProps = {
  NowCard: number | null;
  reminingCards: number;
};

export const NowCardComponent: React.FC<NowCardComponentProps> = ({
  NowCard,
}) => {
  return (
    <>
      {NowCard && (
        <Box
          sx={{
            position: "relative",
            width: 50,
            height: 76,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "70%",
              height: "55%",
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
                width: "60%",
                height: "45%",
                padding: 2.5,
                textAlign: "center",
              }}
            >
              <Typography
                variant="h3"
                sx={{ fontSize: "44px", fontWeight: "bold", lineHeight: 1 }}
              >
                {NowCard}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
};
