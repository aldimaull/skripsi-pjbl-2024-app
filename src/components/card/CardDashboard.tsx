import React, { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

const CardDashboard = ({ title, children }: Props) => {
  return (
    <div className="my-4">
      <h2 className="font-serif text-primary tracking-wide">{title}</h2>
      <div className="flex overflow-x-auto justify-between space-x-2">
        {children}
      </div>
    </div>
  );
};

export default CardDashboard;
