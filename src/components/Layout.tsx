import React from "react";

interface ILayout {
  children: React.ReactNode;
}
const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <div className="mx-auto w-[860px]">
      <div className="w-full mt-12 text-center">{children}</div>
    </div>
  );
};

export default Layout;
