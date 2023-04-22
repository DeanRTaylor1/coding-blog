// useKeyMappings.ts
import { useCallback, useEffect, useState } from "react";
import { useModalContext } from "./ModalProvider";
import { useRouter } from "next/router";
import { ModalNames } from "@/modules/types/modals";

export const useKeyMappings = () => {
  const { showModal, hideModal, isModalVisible } = useModalContext();
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const router = useRouter();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeySequence((prevKeys) => {
        const newKeys = [...prevKeys.slice(-2), event.key];
        return newKeys;
      });
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
  }, [keySequence, showModal, hideModal, isModalVisible, navigateHome]);
};
