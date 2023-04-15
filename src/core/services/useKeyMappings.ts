// useKeyMappings.ts
import { useEffect, useState } from "react";
import { useModalContext } from "./ModalProvider";
import { ModalNames } from "@/types/modals";

export const useKeyMappings = () => {
  const { showModal, hideModal, isModalVisible } = useModalContext();
  const [keySequence, setKeySequence] = useState<string[]>([]);

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
  }, [keySequence, showModal, hideModal, isModalVisible]);
};
