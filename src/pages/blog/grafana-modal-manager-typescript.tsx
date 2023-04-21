import { useModalContext } from "@/core/services/ModalProvider";
import { useKeyMappings } from "@/core/services/useKeyMappings"
import FuzzyModal from "@/modules/components/Layout/modals/fuzzy-modal";
import { GenericPageProps } from "@/modules/types/types";
import { Fragment } from "react";
import { getAllPostTitles } from "../api/get-posts";
import { ModalNames } from "@/modules/types/modals";
interface GrafanaModalProps extends GenericPageProps {
}

const GrafanaModalManager: React.FC<GrafanaModalProps> = ({ posts }) => {
    const { showModal, hideModal, isModalVisible } = useModalContext();
    useKeyMappings();
    return (
        <Fragment>
            <div>Test2</div>
            <FuzzyModal
                isVisible={isModalVisible(ModalNames.FUZZY_FINDER)}
                onClose={hideModal}
                posts={posts}
            />
        </Fragment>
    )
}

export default GrafanaModalManager

export function getServerSideProps() {
    return {
        props: {
            posts: getAllPostTitles(),
        },
    };
}