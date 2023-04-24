import { ModalProps } from '@/modules/types/types';
import styles from './command-line-modal.module.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useCommandLineHandler from '@/core/hooks/useCommandLine';

const CommandLineModal: React.FC<ModalProps> = ({ isVisible, onClose, }) => {

    const commandLineInput = useRef<HTMLInputElement>(null);
    const [command, setCommand] = useState<string>(":");
    const { handleCommand } = useCommandLineHandler()

    const commandLineInputHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCommand(e.target.value);
    }, []);

    const commandLineEnterHandler = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleCommand(e.currentTarget.value)
        }
    }, [handleCommand])




    useEffect(() => {
        if (isVisible) {
            commandLineInput.current?.focus();
        } else {
            setCommand(":");
        }
    }, [isVisible]);

    if (!isVisible) {
        return null;
    }
    return (
        <input value={command} onChange={commandLineInputHandler} ref={commandLineInput} className={styles.commandLineBar} onKeyDown={(e) => commandLineEnterHandler(e)} />
    )
}

export default CommandLineModal;