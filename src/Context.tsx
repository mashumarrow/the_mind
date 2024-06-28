import React, { createContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const UserIdContext = createContext<any>("");
export const RoomIdContext = createContext<any>("");
export const IsFillContext = createContext<any>("");
export const TimeLeftContext = createContext<any>("");

const Context: React.FC<Props> = ({ children }) => {
  const [id, setId] = useState<number>(0); // ユーザーID
  const [roomId, setRoomId] = useState<number>(0); // ルームID
  const [timeLeft, setTimeLeft] = useState<number>(0); // 残り時間

  return (
    <UserIdContext.Provider value={[id, setId]}>
      <RoomIdContext.Provider value={[roomId, setRoomId]}>
        <TimeLeftContext.Provider value={[timeLeft, setTimeLeft]}>
          {children}
        </TimeLeftContext.Provider>
      </RoomIdContext.Provider>
    </UserIdContext.Provider>
  );
};

export default Context;
