import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Link from 'next/link';

export interface CodeSnippetProps {
  title?: string,
  children: string | React.ReactNode,
  className?: string,
  syntax?: string,
  buttonBg?: string,
  buttonText?: string,
  isPreview?: boolean,
  btnClassNmae?: string,
  href?: string
}

export const CodeSnippet = ({title, children, className, syntax, buttonBg, buttonText, isPreview, btnClassNmae, href}: CodeSnippetProps) => {
  return (
    <div className={`bg-black-2 p-4 ${className}`}>
      <h2 className='text-2xl my-2.5 font-normal text-white-1'>{title}</h2>
      {isPreview ? (
        <div className="preview-container">
          {children}
        </div>
      ) : (
        <SyntaxHighlighter customStyle={{ padding: 0, backgroundColor: '#15202B', marginBottom: '16px' }} language={syntax} style={atomOneDark}>
          {children as string}
        </SyntaxHighlighter>
      )}
      <Link className={`w-[200px] py-2 text-[18px] rounded-full text-white-2 h-10 px-4 ${btnClassNmae}`} 
      href={href as string} style={{ backgroundColor: buttonBg }}>{buttonText}</Link>
    </div>
  );
};