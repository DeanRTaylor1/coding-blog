import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, gruvboxDark, kimbieDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock: React.FC<any> = ({ language, codeString }) => {
    return (
        <SyntaxHighlighter language={language} style={atomOneDark}>
            {codeString}
        </SyntaxHighlighter>
    );
};

export default CodeBlock