

interface CommandHandler {
    handleCommand: (command: string) => void;
}

const useCommandLineHandler = (): CommandHandler => {
    const handleCommand = (inputCommand: string) => {
        switch (inputCommand) {
            case ":help":
                console.log("help")
                break;
            default:
                break;
        }
    }
    return { handleCommand }

}

export default useCommandLineHandler 