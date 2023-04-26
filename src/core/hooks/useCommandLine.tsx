import { ModalNames } from "@/modules/types/modals";
import { useModalContext } from "../services/ModalProvider";


interface CommandHandler {
    handleCommand: (command: string) => void;
}

const useCommandLineHandler = (): CommandHandler => {
    const { isModalVisible, showModal, hideModal, hideAllModals } = useModalContext();
    const handleCommand = (inputCommand: string) => {
        switch (inputCommand) {
            case ":help":
                console.log("help")
                hideAllModals();
                showModal(ModalNames.HELP_MODAL)
                break;
            default:
                break;
        }
    }
    return { handleCommand }

}

export default useCommandLineHandler 