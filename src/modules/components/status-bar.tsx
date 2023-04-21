import { AiOutlineBranches } from "react-icons/ai";


const StatusBar: React.FC = () => {
    return (
        <div className="status-bar">
            <span className="vim-mode">NORMAL</span>
            <span className="git-status">
                <AiOutlineBranches size={18} />{" "}
                <p className="h-fit flex justify-center items-center p-12">main</p>
            </span>
        </div>
    )
}

export default StatusBar;