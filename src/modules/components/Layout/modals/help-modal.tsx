
import { blogPostReducer } from "@/core/hooks/BlogPostReducer";
import { useModalContext } from "@/core/services/ModalProvider";
import { blogFuzzyFinder } from "@/core/services/fuzzyFinder";
import { ModalNames } from "@/modules/types/modals";
import { ModalProps } from "@/modules/types/types";
import { PostItem } from "@/pages/api/get-posts";
import { useRouter } from "next/router";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import AsciiLogo from "../../Logo/ascii-logo";



const init = (initialPosts: PostItem[]): PostItem[] => {
    if (initialPosts.length > 0) {
        initialPosts[0].isSelected = true;
    }
    return initialPosts;
};



const HelpModal: React.FC<ModalProps> = ({ isVisible, onClose }) => {
    const { hideAllModals } = useModalContext();

    if (!isVisible) {
        return null;
    }
    return (
        <div className="fuzzy-modal">
            <div className="fuzzy-files">
                <div className={` flex justify-start items-center w-full hover:cursor-pointer `}>
                    <AsciiLogo />
                </div>
            </div>
        </div>
    );
};

export default HelpModal;
