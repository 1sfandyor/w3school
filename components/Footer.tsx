import Link from 'next/link'
import React from 'react'
import logo from "@/public/logo.svg";
import Image from 'next/image';
import { extraLinks, footerItems, footerLinks } from '@/data/footer';
import { socials } from '@/data/socials';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { sourceSansPro } from '@/config/fonts';

const Footer = () => {
  return (
    <footer className={clsx("w-full bg-black-3 flex flex-col mlp:!bg-[600px_auto,auto_auto] slp:!bg-[position:right_bottom,right_top] items-center slp:items-start justify-center pt-10 px-12 pb-[450px] slp:pb-[250px]", sourceSansPro.className)}
    style={{
      backgroundImage: "url('/lynx_landing.webp'), url('/bg_sky_darker.gif')",
      backgroundRepeat: "no-repeat, repeat",
      backgroundPosition: "center bottom, right top",
      backgroundSize: "500px auto, auto auto",
    }}
  
>
      
      <div className='flex flex-col justify-center mx-auto max-w-[1240px]'>
        <div className='flex flex-col items-center justify-center slp:flex-row slt:w-full slt:justify-start slp:ml-10'>
          <div className='flex flex-col py-2.5 px-5 w-full slp:w-fit items-center justify-center'>
            <Image alt='w3schools logo' className='text-white-1' height={46} src={logo.src} width={49} />
          </div>

          {/* FOOTER ITEMS YELLLOW */}
          <ul className='flex flex-col items-center justify-start slp:flex-row w-full'>
            {
              footerItems.map((item, index) => (
                <li key={index} className='flex flex-col items-center justify-center w-full py-2.5 px-5 slp:w-fit slp:px-2.5' >
                  <Link className='text-yellow-1 text-xl hover:underline leading-[1.5] slp:font-normal font-semibold text-center' href={item.href}>
                    {item.name}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>

        
        {/* TOP TUTORIALS */}
        <div className='flex flex-col items-center slp:items-start justify-center slp:flex-row slt:w-full slt:justify-start'>
          {
            footerLinks.map((item, index) => (
              <div key={index}  className="flex text-white-1 flex-col items-center slp:items-start justifiy-center slp:justify-start slp:pl-10 slp:pr-[3%]">
                <h2 className=' text-[26px] slp:text-lg mt-10  slp:font-bold mb-5 leading-[1.5] font-semibold text-center slp:text-start'>{item.name}</h2>
                  <ul className='flex flex-col items-center slp:items-start justify-center slp:justify-start text-center slp:text-start'>
                    {
                      item.items?.map((item, index) => (
                        <li key={index} className='slp:leading-none'>
                          <Link className='text-base leading-[1.5] slp:leading-none slp:text-xs hover:text-yellow-1 font-semibold slp:font-normal text-center slp:text-start' href={item.href}>
                            {item.name}
                          </Link>
                        </li>
                    ))
                    }
                </ul>
              </div>
            ))
          }
        </div>

        <div className="slp:flex slp:pt-[60px] slp:self-start slp:items-center  slp:justify-center slp:ml-10">
          {/* SOCIALS */}
          <ul className='flex w-full flex-wrap px-20 pt-[60px] slp:p-0 pb-2.5 items-center justify-center gap-5 slp:mr-5'>
            {
              socials.map((item, index) => (
                <li key={index} className='w-[18px] h-[18px]'>
                  <Link href={item.href}>
                    <FontAwesomeIcon className='text-white-1 hover:text-yellow-1 text-full' icon={item.icon} />  
                  </Link>
                </li>
              ))
            }
          </ul>

          {/* EXTRA LINKS */}
          <ul className='flex flex-wrap slp:flex-row slp:flex-nowrap slp:text-nowrap items-center justify-center mt-5 slp:m-0 slp:w-full'>
            {
              extraLinks.map((item, index) => (
                <li key={index} className='uppercase mr-2.5'>
                  <Link className='flex hover:text-yellow-1 hover:underline text-[15px] text-gray-2 leading-[1.5] font-semibold text-center' href={item.href}>
                    {item.name}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>

        <div className='flex flex-col items-center justify-center slp:items-start slp:text-start slp:ml-10 slp:max-w-[600px] slp:justify-start'>
          <p className='text-gray-2 text-xs leading-[1.5] text-center slp:text-start mt-5'>
            W3Schools o&apos;qitish va o&apos;rganish uchun optimallashtirilgan ta&apos;lim platformasidir. O&apos;qish va o&apos;rganishni yaxshilash uchun keltirilgan misollar soddalashtirilgan. Qo&apos;llanmalar, havolalar va misollar xatolarga yo&apos;l qo&apos;ymaslik uchun doimiy tarzda ko&apos;rib chiqiladi, ammo biz ammo biz barcha kontentning to&apos;liq to&apos;g&apos;riligiga kafolat bera olmaymiz. W3Schools-dan foydalanganizda bizning
            <span> </span> 
            <Link className='hover:text-yellow-1 underline' href='/about/about_copyright'>foydalanish shartlarimiz</Link>
            <span>, </span>
            <Link className='hover:text-yellow-1 underline' href='/about/about_privacy'>cookie-fayllar va maxfiylik siyosatimiz</Link>ni o&apos;qib chiqishga va qabul qilishga rozilik bildirgan bo&apos;lasiz.  
          </p>
          <p className='text-gray-2 text-xs slp:text-start leading-[1.5] text-center mt-5'>
            Mualliflik huquqi 1999-2024 Refsnes Data tomonidan. Barcha huquqlar himoyalangan. W3Schools W3.CSS tomonidan quvvatlanadi.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer