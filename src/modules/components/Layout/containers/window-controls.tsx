import styles from "./code-container.module.css"
const WindowControls: React.FC = () => {
    return (
        <div className={"window-controls"}>
            <span className="control-circle red" />
            <span className="control-circle yellow" />
            <span className="control-circle green" />
        </div>
    )
}

export default WindowControls