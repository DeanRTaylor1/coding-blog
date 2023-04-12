import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useEffect, useReducer } from "react";

const inter = Inter({ subsets: ["latin"] });

interface NavItem {
  name: string;
  link: string;
  language: string;
  icon: string;
  tags: string[];
  isSelected: boolean;
}

const navItems = [
  {
    name: "blog post 1",
    link: "/blog/post-1",
    language: "javascript",
    icon: "js",
    tags: ["blog", "post", "1"],
    isSelected: true,
  },
  {
    name: "blog post 2",
    link: "/blog/post-2",
    language: "typescript",
    icon: "ts",
    tags: ["blog", "post", "2"],
    isSelected: false,
  },
];

for (let i = 3; i <= 10; i++) {
  navItems.push({
    name: `blog post ${i}`,
    link: `/blog/post-${i}`,
    language: i % 2 === 0 ? "javascript" : "typescript",
    icon: i % 2 === 0 ? "js" : "ts",
    tags: ["blog", "post", `${i}`],
    isSelected: false,
  });
}

const navItemsReducer = (state: any[], action: { type: any; name?: any }) => {
  let selectedIndex: number;
  switch (action.type) {
    case "SELECT_NAV_ITEM":
      return state.map((item) =>
        item.name === action.name
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false }
      );
      break;
    case "DOWN_KEY":
      selectedIndex = state.findIndex((item) => item.isSelected);
      if (selectedIndex !== -1) {
        const nextIndex = (selectedIndex + 1) % state.length;
        return state.map((item, index) =>
          index === nextIndex
            ? { ...item, isSelected: true }
            : { ...item, isSelected: false }
        );
      }
      return state;
    case "UP_KEY":
      selectedIndex = state.findIndex((item) => item.isSelected);
      if (selectedIndex !== -1) {
        const nextIndex = (selectedIndex - 1 + state.length) % state.length;
        return state.map((item, index) =>
          index === nextIndex
            ? { ...item, isSelected: true }
            : { ...item, isSelected: false }
        );
      }
      return state;
    default:
      return state;
  }
};

export default function Home() {
  const [navItemsState, dispatch] = useReducer(navItemsReducer, navItems);

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const navItemSelectHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    bp: NavItem
  ) => {
    console.log("name", bp.name);
    console.log(bp.isSelected);
    dispatch({ type: "SELECT_NAV_ITEM", name: bp.name });
  };

  const keyDownHandler = (e: KeyboardEvent) => {
    console.log("down key pressed", e.key);
    if (e.key === "j" || e.key === "ArrowDown") {
      dispatch({ type: "DOWN_KEY" });
    }
    if (e.key === "k" || e.key === "ArrowUp") {
      dispatch({ type: "UP_KEY" });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-start justify-between p-4">
      <div className="main-layout z-10 flex flex-col items-start justify-start font-mono text-sm lg:flex">
        <div>
          <pre className="w-fit flex justify-start items-start text-vim-comment">
            {`
==========================================================
Welcome to my blog! 
sorted by: date 
sort sequence: newest to oldest
Help:<Up> to go up, <Down> to go down, <Enter> to select
==========================================================`}
          </pre>
        </div>
        <div className="w-full">
          {navItemsState.map((bp, i) => {
            return (
              <div
                key={i}
                className={`flex justify-start items-center w-full hover:cursor-pointer ${
                  bp.isSelected ? "bg-vim-light-blue" : ""
                }`}
                onMouseEnter={(e) => navItemSelectHandler(e, bp)}
              >
                {bp.name}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
