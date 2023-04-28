
import { blogPostReducer } from "@/core/hooks/BlogPostReducer";
import { useModalContext } from "@/core/services/ModalProvider";
import { blogFuzzyFinder } from "@/core/services/fuzzyFinder";
import { ModalNames } from "@/modules/types/modals";
import { ModalProps } from "@/modules/types/types";
import { PostItem } from "@/pages/api/get-posts";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";
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
            <div className="fuzzy-files custom-scrollbar">
                <div className={` flex justify-start items-center w-full hover:cursor-pointer `}>
                    <AsciiLogo />

                </div>

                <KeyMappings />
            </div>
        </div>
    );
};

export default HelpModal;

const KeyMappings: React.FC = () => {
    return (
        <pre>
            {`
VIM BLOG HELP

NAVIGATION
j           Scroll down
k           Scroll up
g g         Scroll to the top
G           Scroll to the bottom
CTRL-F      Scroll down one page
CTRL-B      Scroll up one page
CTRL-D      Scroll down half a page
CTRL-U      Scroll up half a page

COMMANDS
:help       Show help
:quit       Close help or command-line mode

BLOG POST NAVIGATION
n           Next blog post
p           Previous blog post

SEARCH
/           Enter search mode
n           Go to the next search result (when in search mode)
N           Go to the previous search result (when in search mode)


FUZZY FINDER
    Space f f   Toggle fuzzy finder modal

COMMAND LINE
    :           Toggle command-line mode

NAVIGATE HOME
    Space p v   Navigate to the home page
`}
        </pre>
    )
}