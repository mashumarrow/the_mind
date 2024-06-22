import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

const Button: React.FC<Props> = ({ children, onClick }) => {
  return (
    <div>
      <button
        className="bg-black text-white py-2 px-4 rounded"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
