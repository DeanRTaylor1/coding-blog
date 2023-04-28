// useKeyMappings.ts
import React, { useCallback, useEffect, useState } from "react";
import { useModalContext } from "./ModalProvider";
import { useRouter } from "next/router";
import { ModalNames } from "@/modules/types/modals";

export const useKeyMappings = (
  scrollContainerRef: React.RefObject<HTMLDivElement> = { current: null }
) => {
  const { showModal, hideModal, isModalVisible, hideAllModals } =
    useModalContext();
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const router = useRouter();

  const handleBlogScroll = useCallback(
    (event: KeyboardEvent) => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      const viewportHeight = scrollContainer.clientHeight;

      switch (event.key) {
        case "g":
          console.log("g");
          scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
          break;

        case "G":
          console.log("G");
          scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: "smooth",
          });
          break;
        case "F":
          console.log("F");
          scrollContainer.scrollBy({
            top: viewportHeight,
            behavior: "smooth",
          });
          break;
        case "B":
          scrollContainer.scrollBy({
            top: -viewportHeight,
            behavior: "smooth",
          });
          break;
        case "D":
          scrollContainer.scrollBy({
            top: viewportHeight / 2,
            behavior: "smooth",
          });
          break;
        case "U":
          scrollContainer.scrollBy({
            top: -viewportHeight / 2,
            behavior: "smooth",
          });
          break;
        default:
          break;
      }
    },
    [scrollContainerRef]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeySequence((prevKeys) => {
        const newKeys = [...prevKeys.slice(-2), event.key];
        return newKeys;
      });
      if (scrollContainerRef.current) {
        handleBlogScroll(event);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [scrollContainerRef, handleBlogScroll]);
  const navigateHome = useCallback(() => {
    if (router.pathname !== "/") {
      router.push("/");
    }
  }, [router]);

  //TODO ADD KEYMAPPING TO OPEN COMMAND LINE BAR

  useEffect(() => {
    if (keySequence.join("") === " ff") {
      if (isModalVisible(ModalNames.FUZZY_FINDER)) {
        setKeySequence([]);
        hideModal(ModalNames.FUZZY_FINDER);
      } else {
        setKeySequence([]);
        showModal(ModalNames.FUZZY_FINDER);
      }
    }
    if (keySequence.join("") === " pv") {
      navigateHome();
    }
    if (keySequence[keySequence.length - 1] === ":") {
      console.log("colon detected");
      if (isModalVisible(ModalNames.COMMAND_LINE)) {
        setKeySequence([]);
        hideModal(ModalNames.COMMAND_LINE);
      } else {
        setKeySequence([]);
        showModal(ModalNames.COMMAND_LINE);
      }
    }

    if (keySequence[keySequence.length - 1] === "Escape") {
      setKeySequence([]);
      hideAllModals();
    }
  }, [
    keySequence,
    showModal,
    hideModal,
    isModalVisible,
    navigateHome,
    hideAllModals,
  ]);
};
