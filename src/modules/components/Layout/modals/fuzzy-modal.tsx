import { blogPostReducer } from "@/core/hooks/BlogPostReducer";
import { blogFuzzyFinder } from "@/core/services/fuzzyFinder";
import { ModalNames } from "@/modules/types/modals";
import { ModalProps } from "@/modules/types/types";
import { PostItem } from "@/pages/api/get-posts";
import { useRouter } from "next/router";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";



const init = (initialPosts: PostItem[]): PostItem[] => {
  if (initialPosts.length > 0) {
    initialPosts[0].isSelected = true;
  }
  return initialPosts;
};


interface FuzzyModalProps extends ModalProps {
  posts: PostItem[];
}

const FuzzyModal: React.FC<FuzzyModalProps> = ({ isVisible, onClose, posts }) => {
  const [foundPosts, setFoundPosts] = useState<PostItem[]>(posts)
  const [query, setQuery] = useState<string>("");
  const [navItemsState, dispatch] = useReducer(blogPostReducer, posts, init);
  const queryInput = useRef<HTMLInputElement>(null);

  const router = useRouter()
  useEffect(() => {
    const newPosts = blogFuzzyFinder(query, posts)
    setFoundPosts(newPosts)
    dispatch({ type: "UPDATE_POSTS", posts: newPosts });
  }, [query, posts])

  const queryInputHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);


  const keyDownHandler = useCallback((e: KeyboardEvent) => {
    console.log("down key pressed", e.key);
    if (e.key === "j" || e.key === "ArrowDown") {
      dispatch({ type: "DOWN_KEY" });
    }
    if (e.key === "k" || e.key === "ArrowUp") {
      dispatch({ type: "UP_KEY" });
    }
    if (e.key === "Enter") {
      const selected = navItemsState.find((item: PostItem) => item.isSelected);
      if (selected) {
        router.push(selected.link);
      }
    }
  }, [navItemsState, router]);



  useEffect(() => {
    if (isVisible) {
      window.addEventListener("keydown", keyDownHandler);

      return () => {
        window.removeEventListener("keydown", keyDownHandler);
      };
    }
  }, [isVisible, keyDownHandler]);

  useEffect(() => {
    if (isVisible) {
      queryInput.current?.focus()
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) {
      dispatch({ type: "RESET_STATE", initialPosts: posts });
    }
  }, [isVisible, dispatch, posts]);

  useEffect(() => {
    if (!isVisible && query !== "") {
      setQuery("");
    }
  }, [isVisible, query]);


  if (!isVisible) {
    return null;
  }
  return (
    <div className="fuzzy-modal">
      <div className="fuzzy-files">{
        navItemsState.map((post: PostItem, index: number) => {
          return (
            <div className={` flex justify-start items-center w-full hover:cursor-pointer ${post.isSelected ? "bg-vim-light-blue-highlight" : ""
              }`}
              key={index}>{post.name}</div>
          )
        })
      }</div>
      <input className="fuzzy-search" ref={queryInput} value={query} onChange={(e) => queryInputHandler(e)} />
    </div>
  );
};

export default FuzzyModal;
