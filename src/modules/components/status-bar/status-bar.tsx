import { useModalContext } from "@/core/services/ModalProvider";
import { ModalNames } from "@/modules/types/modals";
import React from "react";
import { AiOutlineBranches } from "react-icons/ai";


const StatusBar: React.FC = () => {
    const { isModalVisible } = useModalContext();
    return (
        <BarComponent color="blue" text="NORMAL" />
    )
}

export default StatusBar;

interface BarComponentProps {
    color: string;
    text: string;
}

const BarComponent: React.FC<BarComponentProps> = ({ color, text }) => {
    return (
        <div className="status-bar">
            <span className="vim-mode">{text}</span>
            <span className="git-status">
                <AiOutlineBranches size={18} />{" "}
                <p className="h-fit flex justify-center items-center p-12">main</p>
            </span>
        </div>
    )
}