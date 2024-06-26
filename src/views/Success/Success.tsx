import Layout from "../../Layout";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { supabase } from "../../utils/supabase";

const Success = () => {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const { data } = supabase.storage
    .from("avatars/image")
    .getPublicUrl("fuwafuwa.jpg");

  return (
    <Layout>
      <Confetti
        width={width}
        height={height}
        recycle={true}
        wind={0}
        opacity={0.5}
        tweenDuration={100}
        friction={0.99}
        numberOfPieces={150}
      />
      <div
        className="flex flex-col items-center justify-center h-screen w-screen"
        style={{ backgroundImage: `url(${data.publicUrl})` }}
      >
        <p
          className="text-6xl
        font-extrabold
        text-black
        font-mono
        italic
        mb-10
        animate-tracking-in-expand"
        >
          Clear!
        </p>
        <Button onClick={handleClick}>ホームヘ</Button>
      </div>
    </Layout>
  );
};

export default Success;
