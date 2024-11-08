import { CodeSnippet2 } from '@/components/ui/CodeSnippet2'
import { Separator } from '@/components/ui/separator'
import Hint from '@/components/w3components/Hint'
import RadioExercise from '@/components/w3components/RadioExercise'
import W3Table from '@/components/w3components/Table'
import Tag from '@/components/w3components/Tag'
import UnOrderedList from '@/components/w3components/UnOrderedList'
import { HtmlElement, HtmlVersion } from '@/types/table.interface'
import Image from 'next/image'
import React, { Fragment } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Introduction = () => {

  // LISTS
  const whatIsHTML = [
    <Fragment key={uuidv4()}>HTML Hyper Text Markup Language so&apos;zining qisqa ko&apos;rinishi.</Fragment>,
    <Fragment key={uuidv4()}>HTML web sahifalar yaratish uchun standart markuplash til.</Fragment>,
    <Fragment key={uuidv4()}>HTML web sahifalarning strukturasini tasvirlaydi.</Fragment>,
    <Fragment key={uuidv4()}>HTML  bir necha elementlardan tashkil topgan bo&apos;ladi.</Fragment>,
    <Fragment key={uuidv4()}>HTML elementlari brauzerlarga kontentni (veb sahifadagi ma&apos;lumotlarni) qanday ko&apos;rsatishni tushuntiradi.</Fragment>,
    <Fragment key={uuidv4()}>HTML elementlari web sahifadagi kontentlarni &quot;head (bosh qism)&quot; &quot;body (tana qism)&quot;, &quot;link (boshqa web sahifaga havola)&quot; kabi guruhlarga ajratadi.</Fragment>
  ];

  // CODE SNIPPETS
  const htmlCode = [
    <Fragment key={uuidv4()}><Tag>{`<!DOCTYPE html>`}</Tag>  hujjat HTML5 da yozilganini bildiradi.</Fragment>,
    <Fragment key={uuidv4()}><Tag>{`<html>`}</Tag>  -  HTML sahifaning eng asosiy (root) elementi hisoblanadi.</Fragment>,
    <Fragment key={uuidv4()}><Tag>{`<head>`}</Tag> -  ​web sahifa haqidagi meta-ma&apos;lumotlarni saqlovchi element. Meta ma&apos;lumotlar haqida keyingi darslarda gaplashamiz.</Fragment>,
    <Fragment key={uuidv4()}><Tag>{`<title>`}</Tag>  -  web sahifaning nomini saqlovchi element ( sahifa nomi  brauzerda ochilgan har bir oynaning sarlavhalar qatorida ko&apos;rsatiladi).</Fragment>,
    <Fragment key={uuidv4()}><Tag>{`<body>`}</Tag>  -  web sahifaning tana (body) qismidagi foydalanuvchilarga ko&apos;rinadigan sarlavha, paragraflar, rasmlar, havolalar(hyperlink), jadvallar, ro&apos;yxatlar kabi kontentni saqlovchi element.</Fragment>,
    <Fragment key={uuidv4()}><Tag>{`<h1>`}</Tag>  -  eng katta o&apos;lchamdagi sarlavha elementi.</Fragment>,
    <Fragment key={uuidv4()}><Tag>{`<p>`}</Tag>  -  paragraf elementi.</Fragment>,
  ];

  // KEYMAPS
  const htmlKeyMap = {
    "Boshlang'ich teg": "starter_tag",
    "Element kontenti": "content",
    "Yopiluvchi teg": "end_tag"
  };

  const htmlHistoryKeyMap = {
    "Yil": "year",
    "Versiya": "version"
  };

  // TABLE LIST
  const htmlList: HtmlElement[] = [
    {
      starter_tag: "<h1>",
      content: "Mening Birinchi Sarlavham",
      end_tag: "</h1>",
    },
    {
      starter_tag: "<p>",
      content: "Mening Birinchi Paragrafim",
      end_tag: "</p>",
    },
    {
      starter_tag: "<br>",
      content: "Bo'lmaydi",
      end_tag: "Mavjud emas",
    }
  ];

  const htmlHistory: HtmlVersion[] = [
    {
      id: uuidv4(),
      year: "1989",
      version: "Tim Berners-Lee www-ni ixtiro qildi"
    },
    {
      id: uuidv4(),
      year: "1991",
      version: "Tim Berners-Lee HTML-ni ixtiro qildi"
    },
    {
      id: uuidv4(),
      year: "1993",
      version: "Dave Raggett HTML+ ni chiqardi"
    },
    {
      id: uuidv4(),
      year: "1995",
      version: "HTML Working Group HTML 2.0L "
    },
    {
      id: uuidv4(),
      year: "1997",
      version: "W3C tavsiyasi: HTML 3.2"
    },
    {
      id: uuidv4(),
      year: "1999",
      version: "W3C tavsiyasi: HTML 4.01"
    },
    {
      id: uuidv4(),
      year: "2000",
      version: "W3C tavsiyasi: XHTML 1.0"
    },
    {
      id: uuidv4(),
      year: "2008",
      version: "WHATWG HTML5"
    },
    {
      id: uuidv4(),
      year: "2012",
      version: "WHATWG HTML5 standartlari"
    },
    {
      id: uuidv4(),
      year: "2014",
      version: "W3C tavsiyasi: HTML5"
    },
    {
      id: uuidv4(),
      year: "2016",
      version: "W3C kandidat tavsiyasi: HTML5.1"
    },
    {
      id: uuidv4(),
      year: "2017",
      version: "W3C tavsiyasi: HTML5.1 2-nashr"
    },
    {
      id: uuidv4(),
      year: "2017",
      version: "W3C tavsiyasi: HTML5.2"
    }
  ];

  // EXERCISE
  const exercise = [
    "Hot Typing Markup Language",
    "Home Typing Modern Language",
    "Hyper Text Markup Language",
    "Home Testing Mixed Language",
  ]

  return (
    <div className="w-full text-gray-2">
      <Separator/>
      <p>HTML web sahifalar yaratish uchun standart markuplash tili.</p>

      {/* HTML NIMA */}
      <Separator/>
      <h2>HTML nima ?</h2>
      <UnOrderedList list={whatIsHTML}/>

      {/* ODDIY HTML HUJJATI */}
      <Separator/>
      <h2>Oddiy HTML hujjati</h2>
      <CodeSnippet2 
        href="https://www.w3schools.com/html/tryit.asp?filename=tryhtml_default"
        syntax={'html'}
        title={'Misol'}
        >
        {`
  <!DOCTYPE html>
  <html>
  <head>
  <title>HTML Tutorial</title>
  </head>
  <body>
    <h1>This is a heading</h1>
    <p>This is a paragraph.</p>
  </body>
  </html>
        `}
      </CodeSnippet2>

      {/* MISOLNI TUSHUNTIRISH */}
      <h3>Misolni Tushuntirish</h3>
      <UnOrderedList list={htmlCode}/>

      {/* HTML elementi nima */}
      <Separator/>
      <h2>HTML element nima ?</h2>
      <p>HTML elementlari, biror ma&apos;lumotni o&apos;z ichiga olgan ochiluvchi va yopiluvchi tegni bildiradi.</p>
      <Tag e1={`tegnomi`} e2={`/tegnomi`} size="lg">Bu yerga kontent bo&apos;ladi...</Tag>
      <p>Ochilgan tegnomidan boshlab yopiluvchi tegnomgacha bo&apos;lgan barcha narsa HTML <b>elementi</b> hisoblanadi.</p>
      <Tag e1={`h1`} e2={`/h1`} size="lg">Mening birinchi sarlavham</Tag>
      <Tag e1={`p`} e2={`/p`} size="lg">Mening birinchi paragrafim</Tag>


      {/* HTML elementlar jadvali */}
      <Separator/>
      <h2>HTML elementlar jadvali</h2>
      <W3Table<HtmlElement> headers={["Boshlang'ich teg", 'Element kontenti', 'Yopiluvchi teg']} keyMap={htmlKeyMap} tableList={htmlList}/>
      {/* HINT */}
      <Hint margin warning >
        <p><strong>Eslatma:</strong> Ba&apos;zi HTML elementlarida kontent bo&apos;lmaydi ({`<br>`} elementi kabi) Bu elementlar bo&apos;sh elementlar deyiladi. Bo&apos;sh elementlarda yopiluvchi teg ham bo&apos;lmaydi.</p>
      </Hint>

      {/* VEB BRAUZERLAR */}
      <Separator/>
      <h2>Veb Brauzerlar</h2>
      <p>Web-brauzerlar (Chrome, Safari, Firefox, Edge, Opera) ning maqasadi HTML hujjatlarni o&apos;qib, ulardagi ma&apos;lumotni foydalanuvchiga to&apos;grilab ko&apos;rsatishdir.</p>
      <p>Brauzer HTML teglarini ko&apos;rsatmaydi, lekin hujjatni qanday ko&apos;rsatish kerakligini aniqlash uchun ulardan foydalanadi:</p>
      <Image alt="Chrome browser" className="h-auto max-w-full" height={361} src="/img_chrome.png" width={635}/>

      {/* HTML STUCTURE */}
      <Separator/>
      <h2>HTML Sahifa Tuzilishi</h2>
      <p>Quyida HTML sahifasini vizual ko&apos;rinishi keltirilgan:</p>
      <div className='block border w-full border-[#808080] bg-[#38444D] text-[15px] !p-[3px] rounded-none text-start'>
        {'<html>'}
        <div className='block text-start border border-[#808080] p-[3px] m-1.5 sm:m-2.5 lt:m-5 '>
          {'<head>'}
            <div className='block text-start border border-[#808080] p-[3px] m-1.5 sm:m-2.5 lt:m-5 '>{'<title>Page title</title>'}</div>
          {'</head>'}
        </div>
        <div className='block text-start border border-[#808080] p-[3px] m-1.5 sm:m-2.5 lt:m-5 '>
          {'<body>'}
            <div className='block text-start border border-[#808080] p-[3px] m-1.5 sm:m-2.5 lt:m-5 bg-darkGreen-1'>
              <div className='block text-start border border-[#808080] p-[3px] m-1.5 sm:m-2.5 lt:m-5'>{'<h1>This is a heading</h1>'}</div>
              <div className='block text-start border border-[#808080] p-[3px] m-1.5 sm:m-2.5 lt:m-5'>{'<p>This is a paragraph.</p>'}</div>
              <div className='block text-start border border-[#808080] p-[3px] m-1.5 sm:m-2.5 lt:m-5'>{'<p>This is a paragraph.</p>'}</div>
            </div>
          {'</body>'}
        </div>
      </div>

      <Hint margin warning>
        <p><strong>Eslatma:</strong> ​Brauzerda faqatgina {'<body>'} tegi ichidagi kontent (yuqorida turgan rasmdagi oq rangli qism) ko&apos;rinadi. {'<title>'} elementi ichidagi kontent esa brauzerning tab qismida ko&apos;rinadi.</p>
      </Hint>

      <Separator/>
      <h2>HTML Tarixi</h2>
      <p>World Wide Web ning dastlabki kunlaridan boshlab HTMLning ko&apos;plab versiyalari mavjud:</p>
      <W3Table<HtmlVersion> headers={["Yil", "Versiya"]} keyMap={htmlHistoryKeyMap} tableList={htmlHistory}/>
      <Hint margin warning>
        <p>Bu darsliklarda so&apos;ngi HTML5 standartidan foydalaniladi.</p>
      </Hint>

      <RadioExercise link={'https://www.w3schools.com/html/exercise.asp?x=xrcise_intro1'} task={`HTMLning to'liq nomi nima ?`} test={exercise}/>
    </div>
  )
}

export default Introduction
