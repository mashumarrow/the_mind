import React, { createContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const UserIdContext = createContext<any>("");
export const RoomIdContext = createContext<any>("");
export const IsFillContext = createContext<any>("");

const Context: React.FC<Props> = ({ children }) => {
  const [id, setId] = useState<number>(0); // ユーザーID
  const [roomId, setRoomId] = useState<number>(0); // ルームID
  const [isFill, setIsFill] = useState<boolean>(false); //リロードしてないか

  return (
    <UserIdContext.Provider value={[id, setId]}>
      <RoomIdContext.Provider value={[roomId, setRoomId]}>
        <IsFillContext.Provider value={[isFill, setIsFill]}>
          {children}
        </IsFillContext.Provider>
      </RoomIdContext.Provider>
    </UserIdContext.Provider>
  );
};

export default Context;
