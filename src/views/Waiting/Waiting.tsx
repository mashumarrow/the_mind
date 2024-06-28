import { useContext, useEffect, useState } from "react";
import { RoomIdContext, UserIdContext } from "../../Context";
import {
  GetRoomAvailabilityonRealTime,
  GetRoomAvailability,
  AssignRoomIDtoUser,
  GetRoomVacant,
} from "./hooks";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";

const Waiting = () => {
  const [RoomID] = useContext(RoomIdContext);
  const [UserID] = useContext(UserIdContext);
  const navigate = useNavigate();
  const [isFill, setIsFill] = useState<boolean>(false);
  const [vacant, setVacant] = useState<number>(3);

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
    const GetVacantRoom = async () => {
      const data: any = await GetRoomVacant(RoomID);
      setVacant(data[0].vacantplayer);
    };
    GetRoomData();
    AssignRoomID();
    GetVacantRoom();
  }, []);

  useEffect(() => {
    const onRoomUpdate = (fill: boolean) => {
      setIsFill(fill);
    };
    const onRoomVacant = (vacant: number) => {
      setVacant(vacant);
    };
    GetRoomAvailabilityonRealTime(RoomID, onRoomUpdate, onRoomVacant);
  }, []);

  useEffect(() => {
    if (isFill) {
      navigate(`/room/${RoomID}`);
    }
  }, [isFill]);

  const { data } = supabase.storage
    .from("avatars/image")
    .getPublicUrl("IMG_0214 1.png");

  return (
    <div>
      <div className="flex flex-col items-center h-screen w-screen bg-amber-50 gap-10 ">
        <div className="  text-2xl  mt-[130px] mb-10">人をまっています</div>
        <div className="flex items-center justify-center mt-[-20px]">
          <svg
            className="animate-spin h-10 w-10 text-black-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        <img
          className="object-contain"
          width={150}
          height={150}
          src={data.publicUrl}
        />
        <div className="text-lg mt-4">あと{vacant}人待ってね</div>
      </div>
    </div>
  );
};

export default Waiting;
