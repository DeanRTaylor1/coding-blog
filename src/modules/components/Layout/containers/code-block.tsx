import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, gruvboxDark, kimbieDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock: React.FC<any> = ({ language, codeString }) => {
    return (
        <SyntaxHighlighter language={language} style={atomOneDark} customStyle={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxWidth: '100%', overflow: 'auto' }}
        >
            {codeString}
        </SyntaxHighlighter>
    );
};

export default CodeBlock