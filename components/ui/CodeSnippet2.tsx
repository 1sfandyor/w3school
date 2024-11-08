import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Link from 'next/link';
import { CodeSnippetProps } from './codeSnippet';
import clsx from 'clsx';
import { sourceSansPro } from '@/config/fonts';


export const CodeSnippet2 = ({title, children, syntax, href}: CodeSnippetProps) => {
  return (
    <div className={`block bg-black-2 ${title ? 'py-2' : 'py-5'} px-4 my-6 -mx-4 slt:-mx-8 lt:px-5 lt:-mx-5`}>
      {title && <h2 className='text-2xl my-2.5 font-normal text-white-1'>{title}</h2>}
      
      <SyntaxHighlighter
      customStyle={{ padding: 0, backgroundColor: '#15202B', marginBottom: '16px', fontFamily: "Consolas, Menlo, 'courier-new'"}} language={syntax} style={atomOneDark}>{children as string}</SyntaxHighlighter>

      {
        href && (
          <Link className={clsx(
            `flex w-fit py-1.5 px-[18px] mb-4 text-[17px] rounded-[5px] text-white-2 bg-green-1`,
            sourceSansPro.className
          )} 
          href={href as string}>
            O&apos;zingiz sinab ko&apos;ring »
          </Link>
        )
      }
    </div>
  );
};