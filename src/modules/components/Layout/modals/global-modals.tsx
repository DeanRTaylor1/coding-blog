import { Fragment } from "react"
import FuzzyModal from "./fuzzy-modal"
import { ModalNames } from "@/modules/types/modals"
import CommandLineModal from "./command-line-modal"
import { useModalContext } from "@/core/services/ModalProvider"
import { getAllPostTitles } from "@/pages/api/get-posts"
import { GenericPageProps } from "@/modules/types/types"
import HelpModal from "./help-modal"



const GlobalModals: React.FC<GenericPageProps> = ({ posts }) => {

    const { showModal, hideModal, isModalVisible } = useModalContext();
    return (
        <Fragment>
            <FuzzyModal
                isVisible={isModalVisible(ModalNames.FUZZY_FINDER)}
                onClose={hideModal}
                posts={posts}
            />
            <CommandLineModal isVisible={isModalVisible(ModalNames.COMMAND_LINE)} onClose={hideModal} />
            <HelpModal isVisible={isModalVisible(ModalNames.HELP_MODAL)} onClose={hideModal} />
        </Fragment>
    )

}


export default GlobalModals
