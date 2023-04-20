import Image from "next/image";
import { Inter } from "next/font/google";
import React, { Fragment, useEffect, useReducer } from "react";
import FuzzyModal from "@/modules/components/Layout/modals/fuzzy-modal";
import { useModalContext } from "@/core/services/ModalProvider";
import { useKeyMappings } from "@/core/services/useKeyMappings";
import { ModalNames } from "@/types/modals";
import { PostItem, getAllPostTitles } from "./api/get-posts";
import Link from "next/link";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });



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
        // x % x = 0 so it will wrap around
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
        // x - 1 + length % length = x - 1
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

type HomeProps = {
  posts: PostItem[];
}

export default function Home({ posts }: HomeProps) {
  const [navItemsState, dispatch] = useReducer(navItemsReducer, posts);
  const { showModal, hideModal, isModalVisible } = useModalContext();
  const router = useRouter();
  useKeyMappings();

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const navItemSelectHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    bp: PostItem
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
    if (e.key === "Enter") {
      const selected = navItemsState.find(item => item.isSelected);
      if (selected) {
        router.push(selected.link);
      }
    }
  };


  return (
    <Fragment>
      <div className="flex flex-col w-full h-full p-2">
        {" "}
        {/* Add flex-col class here */}
        <pre className="w-fit flex justify-start items-start text-vim-comment">
          {`
==========================================================
Welcome to my blog! 
sorted by: date 
sort sequence: newest to oldest
Help:<Up> to go up, <Down> to go down, <Enter> to select
==========================================================`}
        </pre>
        <div className="w-full flex flex-col">
          {" "}
          {/* Add flex-col class here */}
          {navItemsState.map((bp, i) => {
            return (
              <Link href={bp.link} key={i}>
                <div
                  key={i}
                  className={`flex justify-start items-center w-full hover:cursor-pointer ${bp.isSelected ? "bg-vim-light-blue" : ""
                    }`}
                  onMouseEnter={(e) => navItemSelectHandler(e, bp)}
                >
                  {bp.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <FuzzyModal
        isVisible={isModalVisible(ModalNames.FUZZY_FINDER)}
        onClose={hideModal}
      />
    </Fragment>
  );
}


export function getServerSideProps() {
  return {
    props: {
      posts: getAllPostTitles(),
    },
  };
}