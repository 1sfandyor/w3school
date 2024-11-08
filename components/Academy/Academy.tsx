'use client'
import React, { Fragment, ReactNode } from 'react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import SendEmailInput from '../ui/SendEmailInput';
import JoinForm from '../JoinForm';

const AcademyHero = () => {

  const links = [
    {
      name: 'Akademiya',
      href: '/academy',
      slug: 'academy'
    },
    {
      name: 'O\'quvchilar',
      href: '/academy/students',
      slug: 'students'
    },
    {
      name: 'O\'qituvchilar',
      href: '/academy/teachers',
      slug: 'teachers'
    }
  ];


  const params = useParams();
  const path = usePathname();
  const titles = params.slug === 'students' 
    ? ['Learn. ', 'Code. ', 'Succeed!'] 
    : params.slug === 'teachers' 
    ? ["Teach. ", "Inspire. ", 'Transform. ']
    : ['Learn. ', 'Teach. ', 'Grow. '];

  const emojies = [
    '/heart.svg',
    '/hat.svg', 
    '/cert_1.svg',
    "/w3logo_white_academy.svg"
  ];
  // console.log(params.slug);
  
  const descriptions: ReactNode[] = [
    params.slug === 'students' 
      ? <>
          <p key={1} className={'text-lg my-5 text-white-1'}>
            W3Schools Academy bilan dasturlash salohiyatingizni oching. Turli kurslarni <br className='lt:hidden'/> o&apos;rganing, dasturlashga musobaqalariga qatnashing va o&apos;z veb-saytlaringizni yarating.
          </p>
          <p key={2} className={'text-lg my-5 text-white-1'}>
            O&apos;zingiz istagancha tez o&apos;rganing, o&apos;z yutuqlaringizni real vaqt rejimida kuzatib boring <br className='lt:hidden'/> va mahoratingizni oshirish uchun amaliyot sinovlaridan o&apos;ting yoki intervyulardan o&apos;ting.
          </p>
        </>
      : params.slug === "teachers"
      ? <p className='text-lg my-5 text-white-1'>
          W3Schools Academy barchasi birda platformasi orqali o‘qitishni <br className="hidden nlp:flex"/> soddalashtiring. Sinf xonalarini samarali boshqaring, o‘rganish <br className="hidden nlp:flex"/> jarayonining ketma ketligini shaxsiylashtiring, real vaqtda tahlillardan foydalaning va interaktiv dasturlash musobalari bilan talabalarni <br className="hidden nlp:flex"/> bir joyda rag‘batlantiring.
        </p>
      : <>
          <p key={0} className={'text-lg my-5'}>
            Mustaqil o&apos;rganuvchilar va o&apos;qituvchilarni hisobga olgan holda tuzilgan W3Schools Akademiyasi innovatsion vositalar va resurslarning keng qamrovli to&apos;plamini taqdim etadi.
            <span className='nlp:hidden'>
              O&apos;zingiz o&apos;rganahingiz yoki boshqalarga yo&apos;l-yo&apos;riq ko&apos;rsatishingizdan qatiy nazar, bizning platformamiz ta&apos;lim berishni qiziqarli va samarali qilish uchun zarur bo&apos;lgan barcha narsani taklif qiladi.
            </span>
          </p>

          <p key={1} className={'text-lg my-5 nlp:hidden'}>
            O&apos;rganish jarayoningizni boshqaring, interfaol darslarda va kod yozish musobalarida qatnashing hamda real vaqtda asosida sizning bilim darjangizga berilgan baholar asnosida bilimingizning o&apos;sish jarayonini kuzatib boring.
          </p>

          <p key={2} className={'text-lg my-5 hidden nlp:block'}>
            Interfaol darslarga sho&apos;ng&apos;ing, o&apos;sish jarayoningizni kuzatib boring va kodlash musobalarida qo&apos;llaringi bilan mashq qiling!
          </p>
        </>
  ];

  const academy = ({titles, emojies, descriptions}: {titles: string[], emojies: string[], descriptions: ReactNode[]}) => {
    return (
      <>
        <div className='flex flex-col items-start flex-start'>
          {/* LEARN / TEACH / GROW */}
          <div className={cn(
            `w-fit slxs:ml-8 nlp:w-full nlp:flex nlp:flex-wrap`,
            params.slug === 'students' && 'nlp:!ml-8 w-full flex !flex-wrap',
            params.slug === 'teachers' && 'nlp:!ml-8 w-full flex !flex-wrap !ml-0'
          )}>{/* H2 TITLE */}
            {
              titles.map((title, index) => {
                return <h2 key={index} className={cn(
                  "text-[32px] leading-10 lt:text-[45px] font-bold nlp:text-[64px] text-white-2 my-2.5 nlp:w-fit",
                  params.slug === 'students' && 'w-fit !text-[64px]'
                )}>
                  <pre>{title}</pre>
                </h2>
              })
            }
          </div>
          {/* EMOJI */}
          {
            params.slug !== 'students' && params.slug !== "teachers" && <div className='absolute text-white-2 mt-[237px] lt:mt-[167px] top-0 right-3 slxs:right-[8%] lt:right-[17%]'>   {/* slxs:bottom-10*/}
                {
                  emojies.map((emoji, index) => {
                    return (
                      <div key={index} className={cn(
                        index === 0 && 'mb-10 mt-[50px] slxs:mt-0 slxs:right-5',
                        index === 1 && 'right-7  mb-10 slxs:right-[3.25rem] lt:right-5 nlp:right-28 nlp:mt-28',
                        index === 2 && 'lt:left-3',
                        index === 3 && "hidden nlp:flex left-full -translate-y-48",
                        "relative"
                      )}>
                        <Image alt='emoji'
                        className={cn(
                          index === 0 && 'slxs:w-20 slxs:h-20 lt:w-[101px] lt:h-[101px]',
                          index === 1 && 'slxs:w-[60px] slxs:h-[60px] lt:w-[101px] lt:h-[101px]',
                          index === 2 && 'slxs:w-[50px] slxs:h-[50px] lt:w-[72px] lt:h-[72px]',
                          index === 3 && 'w-[64px] h-[64px]',
                        )}
                        height={50} src={emoji} width={50} />
                      </div>
                    )
                  })
                } 
              </div>
          }

          {/* DESCRIPTION */}
          <div className={cn(
            `text-white-2 slxs:ml-8 `,
            params.slug === 'teachers' && '!ml-0 nlp:!ml-8'
          )}>
            {
              descriptions.map((description, index) => {
              return <Fragment key={index}>{description}</Fragment>
            })
          }
        </div>
        
        {/* SEND EMAIL INPUT */}
        {
          params.slug === 'students'  
          ? (
            <SendEmailInput buttonText='Boshlang, bu bepul' formClassName='ml-8 nlp:!ml-8 hidden lt:flex' placeholder='Emailingizni kiriting' />
            ) 
          : params.slug == 'teachers' 
          ? <Link className='nlp:ml-8 bg-green-1 py-[5px] px-[15px] rounded-md'href={'/'}> Bepul webinarimizga qo&apos;shiling</Link>
          : <div className="flex flex-col lt:flex-row gap-4 mt-[48px]">
              <Link className='ml-8 bg-green-1 py-2.5 px-10 rounded-md' href={'/academy/students'}> O&apos;quvchilar</Link>
              <Link className='ml-8 lt:ml-0 bg-green-1 py-2.5 px-10 rounded-md' href={'/academy/teachers'}> O&apos;qituvchilar</Link>
            </div>
        }
        </div>
        
        
      </>
    )
  }

  return (
    <>
      <section className={cn(
        `flex flex-col relative w-full z-[1] !shadow-[0px_2px_8px_0px_rgba(0,0,0,0.4)]`,
        params.slug === 'students' 
          ? 'bg-gradient-brown' 
          : params.slug === 'teachers' ? "bg-gradient-purple"
          : 'bg-gradient-green'
        )}>

        {/* navbar */}
        <nav className='flex items-center flex-wrap py-3 max-w-[1480px]'>
          {links.map((link, index) => {
            return (
            <Link key={index} className={`${index === 0 && `w-full lt:w-fit !text-[30px]`} 
            ${`/${link.slug}` === path ? 'underline' : `/academy/${link.slug}` === path ? 'underline' : ''} 
            mt-2 text-white-2 self-end text-[22px] ml-8`} href={link.href} >
              {link.name}
            </Link>
          )})}
        </nav>
      </section>

      {/* HERO */}
      <div className={cn( 
        `py-[64px] px-[32px] text-[15px] bg-cover bg-no-repeat flex `,
        params.slug === 'students' 
        ? 'bg-[url("/students_hero_bg_darkmode.svg")]' 
        : params.slug === 'teachers' 
        ? "bg-[url('/hero_teachers_bg_darkmode.svg')] flex-col nlp:flex-row items-start justify-start"
        : 'bg-[url("/bg-green.svg")]'
        )}>
        
        <div className='w-full nlp:w-1/2 nlp:flex nlp:flex-col'>
          <p className={cn('uppercase text-xl my-6 slxs:ml-8 w-full text-white-2 lt:text-[32px] lt:my-[38.4px] llp:text-xl nlp:mb-2.5',
            params.slug === 'students' || params.slug === 'teachers' && '!text-xl !ml-0 nlp:!ml-8'
          )}>
            W3SCHOOLS AKADEMIYASI
          </p>
          {academy({titles, emojies, descriptions})}
        </div>

        {
          params.slug === 'students' && (
            <div className='hidden nlp:flex w-1/2'>
              <div className='w-fit m-auto mt-[115px] '>
                <Image alt='emoji' height={418} src='/students_1_darkmode.png' width={340} />
              </div>
            </div>
          )
        }
        
        {
          params.slug === 'teachers' && <JoinForm />
        }
      </div>
    </>

  )
}

export default AcademyHero

// bg-gradient-brown 
// bg-gradient-purple 
// bg-gradient-green 
