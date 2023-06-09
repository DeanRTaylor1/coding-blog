import styles from "./ascii-logo.module.css"
const AsciiLogo = () => {
    return (
        <pre className={styles.asciiArt}>
            {`
=================================================================
                ___    _ __ ___   ____    _      ___    ____ 
 \\  \\    /  /  |_ _|  | '_ ' _ \\ | __ )  | |    / _ \\  / ___|
  \\  \\  /  /    | |   | | | | | ||  _ \\  | |   | | | || |  _ 
   \\  \\/  /     | |   | | | | | || |_) | | |___| | | || |_| |
    \\____/     |___|  |_| |_| |_||____/  |_____|\\___/  \\____|
     
=================================================================
  `}
        </pre>

    );
};

export default AsciiLogo;
