import Layout from "../../Layout";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Failure = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("ボタンがクリックされました");
    navigate("/");
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-[url(../src/assets/syobon.jpg)]">
        <p
          className="text-6xl
        font-extrabold
        text-white
        font-mono
        mb-10
        animate-bounce-top"
        >
          失敗
        </p>
        <div className="animate-pulsate-bck">
          <Button onClick={handleClick}>リトライ</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Failure;
