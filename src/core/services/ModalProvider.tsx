import { ModalNames } from "@/types/modals";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
// import ModalContext from './ModalContext';

interface ModalContextInterface {
  showModal: (modalName: ModalNames) => void;
  hideModal: (modalName: ModalNames) => void;
  isModalVisible: (modalName: ModalNames) => boolean;
}

const ModalContext = createContext<ModalContextInterface | null>(null);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};

const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [modals, setModals] = useState<any>({});

  const showModal = (modalName: string) => {
    setModals((prevModals: any) => ({ ...prevModals, [modalName]: true }));
  };

  const hideModal = (modalName: string) => {
    setModals((prevModals: any) => ({ ...prevModals, [modalName]: false }));
  };

  const isModalVisible = (modalName: string) => {
    return modals[modalName] || false;
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal, isModalVisible }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

export { useModalContext };
