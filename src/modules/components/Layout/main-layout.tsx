import React, { PropsWithChildren } from "react";

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="main-layout z-10 flex flex-col items-start justify-start font-mono text-sm">
        {children}
        <div className="status-bar">
          <span className="vim-mode">NORMAL</span>
        </div>
      </div>
    </main>
  );
};

export default MainLayout;
