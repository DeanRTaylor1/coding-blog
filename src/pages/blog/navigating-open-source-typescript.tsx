import { useModalContext } from "@/core/services/ModalProvider";
import { useKeyMappings } from "@/core/services/useKeyMappings";
import FuzzyModal from "@/modules/components/Layout/modals/fuzzy-modal"
import { ModalNames } from "@/types/modals"
import { Fragment } from "react"
import { PostItem, getAllPostTitles } from "../api/get-posts";
import { GenericPageProps } from "@/modules/types/types";

interface NavigatingOpenSourceProps extends GenericPageProps {
}

const NavigatingOpenSource: React.FC<NavigatingOpenSourceProps> = ({ posts }) => {

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

export default NavigatingOpenSource

export function getServerSideProps() {
    return {
        props: {
            posts: getAllPostTitles(),
        },
    };
}