import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-200 p-4 rounded-lg shadow-md">{children}</div>
    </div>
  );
};

export default Layout;
