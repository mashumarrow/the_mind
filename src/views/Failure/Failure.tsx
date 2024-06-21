import React from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Failure = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("ボタンがクリックされました");
    navigate("/");
  };

  return <Button onClick={handleClick}>リトライ</Button>;
};

export default Failure;
