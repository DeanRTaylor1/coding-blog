import Image from "next/image";
import { Inter } from "next/font/google";
import React, { Fragment, useCallback, useEffect, useReducer } from "react";
import FuzzyModal from "@/modules/components/Layout/modals/fuzzy-modal";
import { useModalContext } from "@/core/services/ModalProvider";
import { useKeyMappings } from "@/core/services/useKeyMappings";
import { PostItem, getAllPostTitles } from "./api/get-posts";
import Link from "next/link";
import { useRouter } from "next/router";
import { blogPostReducer } from "@/core/hooks/BlogPostReducer";
import { ModalNames } from "@/modules/types/modals";
import CommandLineModal from "@/modules/components/Layout/modals/command-line-modal";

const inter = Inter({ subsets: ["latin"] });





type HomeProps = {
  posts: PostItem[];
}

export default function Home({ posts }: HomeProps) {
  const [blogPostState, dispatch] = useReducer(blogPostReducer, posts);
  const { showModal, hideModal, isModalVisible } = useModalContext();
  const router = useRouter();
  useKeyMappings();

  const keyDownHandler = useCallback((e: KeyboardEvent) => {
    console.log("down key pressed", e.key);
    if (e.key === "j" || e.key === "ArrowDown") {
      dispatch({ type: "DOWN_KEY" });
    }
    if (e.key === "k" || e.key === "ArrowUp") {
      dispatch({ type: "UP_KEY" });
    }
    if (e.key === "Enter") {
      const selected = blogPostState.find((item: PostItem) => item.isSelected);
      if (selected) {
        router.push(selected.link);
      }
    }
  }, [blogPostState, router]);

  useEffect(() => {
    if (isModalVisible(ModalNames.FUZZY_FINDER) || isModalVisible(ModalNames.COMMAND_LINE)) {
      window.removeEventListener("keydown", keyDownHandler);
      return
    }
    window.addEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [isModalVisible, keyDownHandler]);

  const navItemSelectHandler = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    bp: PostItem
  ) => {
    console.log("name", bp.name);
    console.log(bp.isSelected);
    dispatch({ type: "SELECT_NAV_ITEM", name: bp.name });
  };




  return (
    <Fragment>
      <div className="flex flex-col w-full h-full p-2">
        <pre className="w-fit flex justify-start items-start text-vim-comment">
          {`==========================================================
Welcome to my blog! 
sorted by: date 
sort sequence: newest to oldest
Help:<Up> to go up, <Down> to go down, <Enter> to select
==========================================================`}
        </pre>
        <div className="w-full flex flex-col">
          {" "}
          {/* Add flex-col class here */}
          {blogPostState.map((post: PostItem, index: number) => {
            return (
              <Link href={post.link} key={index}>
                <span
                  key={index}
                  className={`text-vim-light-blue flex justify-start items-center w-full hover:cursor-pointer ${post.isSelected ? "bg-vim-light-blue-highlight" : ""
                    }`}
                  onMouseEnter={(e) => navItemSelectHandler(e, post)}
                >
                  {post.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <FuzzyModal
        isVisible={isModalVisible(ModalNames.FUZZY_FINDER)}
        onClose={hideModal}
        posts={posts}
      />
      <CommandLineModal isVisible={isModalVisible(ModalNames.COMMAND_LINE)} onClose={hideModal} />
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