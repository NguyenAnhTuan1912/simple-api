import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

// Import types
import type { Components } from 'react-markdown';

type TextHeaderType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type ListType = "ul" | "ol";

const getHeaderComponent = (function() {
  const $$$: {[key in TextHeaderType]: string} = {
    "h1": "font-bold text-4xl mb-5",
    "h2": "font-bold text-3xl mb-4",
    "h3": "font-bold text-2xl mb-3",
    "h4": "font-bold text-xl mb-2",
    "h5": "font-bold text-lg mb-1",
    "h6": "font-bold text-sm"
  }

  return function(textHeaderType: TextHeaderType): any {
    return function Header({ children }: { children: React.ReactNode | string }) {
      return React.createElement(textHeaderType, { children, className: $$$[textHeaderType] });
    }
  }
})();

const getListComponent = (function() {
  const $$$: {[key in ListType]: string} = {
    "ul": "list-[initial] list-inside ps-3",
    "ol": "list-[initial] list-inside ps-3"
  }

  return function(textHeaderType: ListType): any {
    return function Header({ children }: { children: React.ReactNode | string }) {
      return React.createElement(textHeaderType, { children, className: $$$[textHeaderType] });
    }
  }
})();

function Break() {
  return <br />
}

function Paragraph({ children }: { children: React.ReactNode | string }) {
  return <p className="mb-2">{children}</p>
}

function Pre({ children }: { children: React.ReactNode | string }) {
  return <>{children}</>
}

function Code({ children, className }: { children: string | Array<string>, className: string }) {
  // return React.createElement("code", { children, className: className + " block rounded bg-outline/10 px-4 py-3" });
  const match = /language-(\w+)/.exec(className || "");
  const lang = match![1];
  return (
    <SyntaxHighlighter
      showLineNumbers
      language={lang}
      customStyle={{
        borderRadius: "8px",
        background: "rgba(var(--color-outline), .2)",
        marginTop: "1rem",
        marginBottom: "1rem"
      }}
    >
      {children}
    </SyntaxHighlighter>
  )
}

export const MDXComponents: Components = {
  h1: getHeaderComponent("h1"),
  h2: getHeaderComponent("h2"),
  h3: getHeaderComponent("h3"),
  h4: getHeaderComponent("h4"),
  h5: getHeaderComponent("h5"),
  h6: getHeaderComponent("h6"),
  ul: getListComponent("ul"),
  ol: getListComponent("ol"),
  p: Paragraph as any,
  pre: Pre as any,
  code: Code as any,
  br: Break
}