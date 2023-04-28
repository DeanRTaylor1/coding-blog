import { useKeyMappings } from "@/core/services/useKeyMappings";
import { PropsWithChildren, useRef } from "react";


const BlogPost: React.FC<PropsWithChildren> = ({ children }) => {
    const blogContainerRef = useRef<HTMLDivElement>(null);

    useKeyMappings(blogContainerRef);

    return (
        <div ref={blogContainerRef} className="blog-container">
            <div className="content-container">
                {children}
            </div>
        </div>
    )
}

export default BlogPost