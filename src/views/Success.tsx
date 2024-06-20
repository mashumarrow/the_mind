import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("ボタンがクリックされました");
    navigate("/");
  };

  return (
    <div>
      <Button onClick={handleClick}>ホームヘ</Button>
    </div>
  );
};

export default Success;
