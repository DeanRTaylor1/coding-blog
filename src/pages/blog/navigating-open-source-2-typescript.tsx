import { useModalContext } from "@/core/services/ModalProvider";
import { useKeyMappings } from "@/core/services/useKeyMappings"
import FuzzyModal from "@/modules/components/Layout/modals/fuzzy-modal";
import { GenericPageProps } from "@/modules/types/types";
import { Fragment } from "react";
import { getAllPostTitles } from "../api/get-posts";
import { ModalNames } from "@/modules/types/modals";
import BlogPost from "@/modules/components/Layout/containers/blog-post";
interface GrafanaModalProps extends GenericPageProps {
}

const GrafanaModalManager: React.FC<GrafanaModalProps> = ({ posts }) => {
    const { showModal, hideModal, isModalVisible } = useModalContext();
    useKeyMappings();
    return (
        <BlogPost posts={posts}>
            <div>test</div>
        </BlogPost>
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