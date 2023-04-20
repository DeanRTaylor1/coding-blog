import { useModalContext } from "@/core/services/ModalProvider";
import { useKeyMappings } from "@/core/services/useKeyMappings"
import FuzzyModal from "@/modules/components/Layout/modals/fuzzy-modal";
import { ModalNames } from "@/types/modals";
import { Fragment } from "react";

const GrafanaModalManager: React.FC = () => {
    const { showModal, hideModal, isModalVisible } = useModalContext();
    useKeyMappings();
    return (
        <Fragment>
            <div>Test2</div>
            <FuzzyModal
                isVisible={isModalVisible(ModalNames.FUZZY_FINDER)}
                onClose={hideModal}
            />
        </Fragment>
    )
}

export default GrafanaModalManager