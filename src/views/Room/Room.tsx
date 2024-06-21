import { useParams } from "react-router-dom";

const Room = () => {
  const { id } = useParams();
  return <div>{id && id.toString()}</div>;
};

export default Room;
