
import { useKeyMappings } from "@/core/services/useKeyMappings"
import { GenericPageProps } from "@/modules/types/types";
import { getAllPostTitles } from "../api/get-posts";
import BlogPost from "@/modules/components/Layout/containers/blog-post";
interface GrafanaModalProps extends GenericPageProps {
}

const GrafanaModalManager: React.FC<GrafanaModalProps> = ({ posts }) => {
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