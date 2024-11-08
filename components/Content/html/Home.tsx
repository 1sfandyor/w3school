import SertifiedCareerSection2 from '@/components/sections/SertifiedCareerSection2'
import { CodeSnippet2 } from '@/components/ui/CodeSnippet2'
import { Separator } from '@/components/ui/separator'
import W3Button from '@/components/w3components/button'
import CardLink from '@/components/w3components/CardLink'
import Hint from '@/components/w3components/Hint'
import RadioExercise from '@/components/w3components/RadioExercise'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { v4 as uuidv4 } from 'uuid';
const Home = () => {
  const exercise = [
    "<a href='/home.htm'>Visit W3Schools.com!</a>",
    "<link href='/home.htm'>Visit W3Schools.com!</link>",
    "<alink href='/home.htm'>Visit W3Schools.com!</alink>",
  ];

  const reference = [
    {
      id: uuidv4(),
      name: 'HTML Elementlari',
      href: '/tags'
    },  
    {
      id: uuidv4(),
      name: "Brauzer Qo'llab-quvvatlash",
      href: '/tags/ref_html_browsersupport'
    },  
    {
      id: uuidv4(),
      name: 'Attributes',
      href: '/tags/ref_attributes'
    },
    { 
      id: uuidv4(),
      name: 'Global Attributes',
      href: '/tags/ref_standardattributes'
    },  
    {
      id: uuidv4(),
      name: 'Event Attributes',
      href: '/tags/ref_eventattributes'
    },
    {
      id: uuidv4(),
      name: 'Color Names',
      href: '/tags/ref_colornames'
    },
    {
      id: uuidv4(),
      name: 'Canvas',
      href: '/tags/ref_canvas'
    },
    {
      id: uuidv4(),
      name: 'Audio/Video DOM',
      href: '/tags/ref_av_dom'
    },
    {
      id: uuidv4(),
      name: "Belgi to'plamlari",
      href: '/tags/ref_charactersets'
    },
    {
      id: uuidv4(),
      name: 'URL Encoding',
      href: '/tags/ref_urlencode'
    },
    {
      id: uuidv4(),
      name: 'Language Codes',
      href: '/tags/ref_language_codes'
    },
    {
      id: uuidv4(),
      name: 'Davlat kodlari',
      href: '/tags/ref_country_codes'
    },
    {
      id: uuidv4(),
      name: 'HTTP xabarlari',
      href: '/tags/ref_httpmessages'
    },
    {
      id: uuidv4(),
      name: 'Px to Em',
      href: '/html/html_px_to_em'
    },
    {
      id: uuidv4(),
      name: 'Klaviatura qisqartmalari',
      href: '/tags/ref_keyboardshortcuts'
    },
  ]

  return (
    <div className="w-full text-gray-2">
      <Hint margin succes>
        <p>HTML Veb sahifalar uchun standart markaplash tili hisoblanadi.</p>
        <p>HTML bilan shaxsiy veb saytingizni yaratishingiz mumkin.</p>
        <p>HTML o&apos;rganishga oson - Siz bundan rohatlanasiz </p>
        <W3Button href="/html/html_intro" variant='primary'>
          HTML darsligimiz orqali o&apos;rganing »
        </W3Button>
      </Hint>

      <Separator/>
      <h2 className="">HTMLni &quot;Try it yourself&quot; bilan o&apos;rganish oson</h2>

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

      <p>
        <strong>
          Bu qanday ishlashini ko&apos;rish uchun &quot;Try it yourself&quot; ni bosing.
        </strong>
      </p>


      <Separator/>
      <h2>HTML Misollar</h2>
      <p>
        Bu HTML darsliklarida 200 dan ortiq misol topishingiz mumkin. Bizning onlayn &quot;Try it yourself&quot; editorimiz orqali har bir misollarni o&apos;zgartirishingiz va sinab ko&apos;rishingiz mumkin.
      </p>

      <W3Button href="/html/html_examples" variant='gray'>
        HTML Misollarga o&apos;tish!
      </W3Button>
      <Separator/>

      <Separator/>
      <RadioExercise 
        link="https://www.w3schools.com/html/exercise.asp?x=xrcise_links1"
        task="HTMLdagi qaysi taglar URL manzilini ko&apos;rsatadi?"
        test={exercise}
      />

      <p>
        <W3Button href="/html/html_exercises" size="lg" variant="primary">
          Barcha HTML Mashqlarini ko&apos;rish
        </W3Button>
      </p>
      
      <Separator/>
      <h2>HTML Viktorina Test</h2>
      <p>HTML bilimlaringizni bizning HTML viktorinamiz orqali tekshiring!</p>
      <W3Button href="/html/html_quiz" size="default" variant="blue">HTML Viktorinani Boshlash</W3Button>
      
      <Separator/>
      <h2>Mening o&apos;rganish jarayonim</h2>
      <p>W3Schoolsda “Mening o&apos;rganish jarayonim” dasturi yordamida o&apos;qish jarayoningizni kuzatib boring.</p>
      <p>Hisobingizga kiring va ballarni to&apos;plang!</p>
      <p>Bu ixtiyoriy xususiyat. W3schoolsda undan foydalanmasdan ham o&apos;ish mumkin.</p>
      <Link className="flex w-full h-[338px]" href="https://my-learning.w3schools.com/">
        <Image alt="HTML Learning Tracker" className='max-w-full w-full' height={1000} src="/mylearning.webp" width={1000}/>
      </Link>
      
      <Separator/>
      <h2>HTML Ma&apos;lumotnoma</h2>
      <p>
        W3Schools-da HTML elementlar, atributlar, hodisalar, rang nomlari, ob&apos;yektlar, belgilar to&apos;plami, URL kodlash, til kodlari, HTTP xabarlar, brauzerni qo&apos;llab-quvvatlash va boshqalar haqida to&apos;liq ma&apos;lumotnomalarni topasiz:
      </p>
      
      <div className="grid grid-cols-1 lt:grid-cols-3 -mx-2">
        {
          reference.map((item) => (
            <CardLink key={item.id} href={item.href} size='default' variant='gray'>{item.name}</CardLink>
          ))
        }
      </div>
      <br />
      <SertifiedCareerSection2/>
      <Separator/>
    </div>
  )
}

export default Home;