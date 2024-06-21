import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>{children}</div>
    </div>
  );
};

export default Layout;
