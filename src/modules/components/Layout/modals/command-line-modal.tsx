import { ModalProps } from '@/modules/types/types';
import styles from './command-line-modal.module.css';
import { useCallback, useEffect, useRef, useState } from 'react';

const CommandLineModal: React.FC<ModalProps> = ({ isVisible, onClose, }) => {

    const commandLineInput = useRef<HTMLInputElement>(null);
    const [command, setCommand] = useState<string>(":");

    const commandLineInputHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCommand(e.target.value);
    }, []);




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
        <input value={command} onChange={commandLineInputHandler} ref={commandLineInput} className={styles.commandLineBar} />
    )
}

export default CommandLineModal;