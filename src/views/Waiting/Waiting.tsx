import { useContext, useEffect, useState } from "react";
import { RoomIdContext, UserIdContext } from "../../Context";
import {
  GetRoomAvailabilityonRealTime,
  GetRoomAvailability,
  AssignRoomIDtoUser,
} from "./hooks";
import { useNavigate } from "react-router-dom";

const Waiting = () => {
  const [RoomID] = useContext(RoomIdContext);
  const [UserID] = useContext(UserIdContext);
  const navigate = useNavigate();
  const [isFill, setIsFill] = useState<boolean>(false);

  useEffect(() => {
    const GetRoomData = async () => {
      const data = await GetRoomAvailability(RoomID);
      if (data && data.length > 0 && data[0].hasOwnProperty("fill")) {
        setIsFill(data[0].fill);
      }
    };
    const AssignRoomID = async () => {
      await AssignRoomIDtoUser(UserID, RoomID);
    };
    GetRoomData();
    AssignRoomID();
  }, []);

  useEffect(() => {
    const onRoomUpdate = (fill: boolean) => {
      setIsFill(fill);
    };
    GetRoomAvailabilityonRealTime(RoomID, onRoomUpdate);
  }, []);

  useEffect(() => {
    if (isFill) {
      navigate(`/room/${RoomID}`);
    }
  }, [isFill]);

  return (
    <div>
      <p>{RoomID}</p>
    </div>
  );
};

export default Waiting;
