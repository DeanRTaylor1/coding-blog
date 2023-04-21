import React, { PropsWithChildren } from 'react';
import WindowControls from './window-controls';
import styles from "./code-container.module.css"

const CodeContainer: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles["embossed-container"]}>
            <WindowControls />
            <div className={styles["code-container"]}>{children}</div>
        </div>
    );
};

export default CodeContainer;