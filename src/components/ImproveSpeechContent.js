import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ImproveSpeechContent = ({ markdownContent, setShowResult}) => {
  const containerStyle = {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '40px auto',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
    position: 'relative',
  };

  const codeBlockStyle = {
    margin: '10px 0',
    borderRadius: '8px',
    overflowX: 'auto',
  };

  const buttonStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: 'transparent', // No background
    border: 'none',
    cursor: 'pointer',
    fontSize: '32px', // Bigger size for the arrow
    color: '#007bff', // Blue color for the arrow
    fontWeight: 'bold',
    padding: '0',
    lineHeight: '1',
  };

  return (
    <div style={containerStyle}>
      {/* Back Arrow Button */}
      <button style={buttonStyle} onClick={() => setShowResult(false)}>
        ←
      </button>

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
                customStyle={codeBlockStyle}
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
