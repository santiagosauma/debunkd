import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const markdownContent = `
# Improve Speech Content

This is an example of **bold text** and *italic text*.

- First point
- Second point
- Third point

Here is a code block:

\`\`\`javascript
const greet = () => console.log('Hello, Hackathon!');
greet();
\`\`\`

[Check this link](https://example.com)
`;

const ImproveSpeechContent = () => {
  return (
    <div className="markdown-container">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={materialDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default ImproveSpeechContent;
