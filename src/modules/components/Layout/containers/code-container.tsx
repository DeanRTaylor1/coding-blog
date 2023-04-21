import React, { PropsWithChildren } from 'react';
import WindowControls from './window-controls';

const CodeContainer: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="embossed-container">
            <WindowControls />
            <div className="code-container">{children}</div>
        </div>
    );
};

export default CodeContainer;