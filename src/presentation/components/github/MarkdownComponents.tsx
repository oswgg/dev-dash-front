import { Components } from 'react-markdown'

// Heading components
const Heading1 = ({ ...props }) => <h1 className="text-xl font-bold mt-4 mb-2" {...props} />
const Heading2 = ({ ...props }) => <h2 className="text-lg font-bold mt-3 mb-2" {...props} />

// List components
const UnorderedList = ({ ...props }) => <ul className="list-disc pl-5 my-2" {...props} />
const OrderedList = ({ ...props }) => <ol className="list-decimal pl-5 my-2" {...props} />

// Special list item handling for decimal notation
const ListItem = ({ children, ...props }) => {
    // Convert children to string to check for decimal notation
    const childrenStr = String(children);
    
    // Check if the content contains decimal notation (e.g., "1.1")
    if (childrenStr.match(/\d+\.\d+/)) {
        // Split by the first occurrence of decimal notation
        const parts = childrenStr.split(/(\d+\.\d+\s+)/);
        if (parts.length > 1) {
            return (
                <li {...props}>
                    {parts[0]}
                    <br />
                    {parts.slice(1).join('')}
                </li>
            );
        }
    }
    
    return <li className="my-1" {...props}>{children}</li>;
}

// Text formatting components
const Paragraph = ({ ...props }) => <p className="my-2" {...props} />
const Blockquote = ({ ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2" {...props} />
const Strong = ({ ...props }) => <strong className="font-bold" {...props} />
const Emphasis = ({ ...props }) => <em className="italic" {...props} />

// Code components
const CodeBlock = ({ inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    
    if (inline) {
        return <InlineCode {...props}>{children}</InlineCode>;
    }
    
    return <CodeContainer language={language} {...props}>{children}</CodeContainer>;
}

const InlineCode = ({ children, ...props }) => (
    <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded" {...props}>{children}</code>
)

const CodeContainer = ({ children, language, ...props }) => (
    <div className="highlight highlight-source-js notranslate position-relative overflow-auto">
        <pre className="notranslate bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto my-2">
            <code className={language ? `language-${language}` : ''} {...props}>
                {children}
            </code>
        </pre>
    </div>
)

// Export all components as a single object
export const MarkdownComponents: Components = {
    h1: Heading1,
    h2: Heading2,
    ul: UnorderedList,
    ol: OrderedList,
    li: ListItem as React.FC<any>,
    p: Paragraph,
    blockquote: Blockquote,
    code: CodeBlock as React.FC<any>,
    strong: Strong,
    em: Emphasis
}