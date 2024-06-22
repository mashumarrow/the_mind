import React, { createContext } from "react";
import Context from "./Context";

type Props = {
  children: React.ReactNode;
};
export const UserContext = createContext<any>("");

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Context>
      <div className="flex flex-col justify-center items-center h-screen">
        {children}
      </div>
    </Context>
  );
};

export default Layout;
