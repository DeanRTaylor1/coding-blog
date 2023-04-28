import { useKeyMappings } from "@/core/services/useKeyMappings";
import { Fragment, PropsWithChildren, useRef } from "react";
import GlobalModals from "../modals/global-modals";
import { GenericPageProps } from "@/modules/types/types";

type Blogpost = GenericPageProps & PropsWithChildren

const BlogPost: React.FC<Blogpost> = ({ children, posts }) => {
    const blogContainerRef = useRef<HTMLDivElement>(null);

    useKeyMappings(blogContainerRef);

    return (
        <Fragment>
            <div ref={blogContainerRef} className="blog-container">
                <div className="content-container">
                    {children}
                </div>
            </div>
            <GlobalModals posts={posts} />
        </Fragment>
    )
}

export default BlogPost