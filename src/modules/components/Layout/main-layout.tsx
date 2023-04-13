import React, { PropsWithChildren } from "react";
import { AiOutlineBranches } from "react-icons/ai";

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="main-layout z-10 flex flex-col items-start justify-start font-mono text-sm">
        {children}
        <div className="status-bar">
          <span className="vim-mode">NORMAL</span>
          <span className="git-status">
            <AiOutlineBranches size={18} />{" "}
            <p className="h-fit flex justify-center items-center p-12">main</p>
          </span>
        </div>
      </div>
    </main>
  );
};

export default MainLayout;
