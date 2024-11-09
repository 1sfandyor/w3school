import { menuItems } from '@/data/nav'
import React, { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import MenuInner from './MenuInner'
import ServicesMenu from './Services.card'
import Link from 'next/link'
import { sourceSansPro } from '@/config/fonts';
import clsx from 'clsx';

interface MenuProps{
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  activeMenu:  'Darsliklar' | 'Mashqlar' | 'Sertifikatlar' | 'Xizmatlar';
  setActiveMenu: React.Dispatch<React.SetStateAction<'Darsliklar' | 'Mashqlar' | 'Sertifikatlar' | 'Xizmatlar' | null>>;
}

const Menu = ({setOpenMenu, activeMenu, setActiveMenu}: MenuProps) => {
  const [state, setState] = useState<string | null>(null);

  const handleMenuClick = (menuType: 'Darsliklar' | 'Mashqlar' | 'Sertifikatlar' | 'Xizmatlar') => {
    setActiveMenu(activeMenu === menuType ? null : menuType)
  }
  
  return (
    <nav className={clsx("fixed w-full flex-col overflow-auto overflow-y-scroll tracking-[0] cursor-default bg-gray-3 text-white-2 border-t-[none] top-14 bottom-0 z-50", sourceSansPro.className)}>
      <div className='relative w-full h-full pt-[84px]'>

          <ul className='w-full'>
            {
              menuItems.map(item => {                
                const handleClick = (id: string, title: string) => {
                  handleMenuClick(title as 'Darsliklar' | 'Mashqlar' | 'Sertifikatlar' | 'Xizmatlar');
                  if(id == item.id) setState(id);
                  else setState(null);
                }

                return (
                  <li key={item.id} className={`${(item.title === "Maydon" || item.title === "Sertifikat Olish" || item.title === "Plus" || item.title === "Academy") ? `py-[20px] relative px-[30px] border-b border-gray-4 text-[21px] ${state == item.id ? `bg-white-2 text-black-1 no-underline` : ''}` : ''}`}>
                    {
                      item.title === 'Spaces' 
                        ? (
                            <Link className={`text-[21px] flex w-full justify-between `} href='/spaces' target='_blank'>
                              {item.title}
                              <FontAwesomeIcon icon={item.icon as IconProp}/>
                            </Link>
                          ) 
                        : 
                      item.title === "Sertifikat olish" 
                        ? (
                            <Link className={`text-[21px] flex w-full justify-between `} href='/certification' target='_blank'>
                              {item.title}
                              <FontAwesomeIcon icon={item.icon as IconProp}/>
                            </Link>
                          )
                        : 
                      item.title === 'Plus' 
                        ? (
                            <Link className={`text-[21px] flex w-full justify-between `} href='/plus' target='_blank'>
                              {item.title}
                              <FontAwesomeIcon icon={item.icon as IconProp}/>
                            </Link>
                          ) 
                        : 
                      item.title === 'Academy' 
                        ? (
                          <Link className={`text-[21px] flex w-full justify-between `} href='/academy' target='_blank'>
                            {item.title}
                            <FontAwesomeIcon icon={item.icon as IconProp}/>
                          </Link>
                        ) 
                        : (
                          <Accordion collapsible type="single">
                            <AccordionItem value={`item-1 `}>
                              <AccordionTrigger className={`py-[20px] relative px-[30px] border-b border-gray-4 text-[21px] ${state == item.id && `bg-white-2 text-black-1 no-underline`}`}
                              onClick={() => handleClick(item.id as string, item.title)}>
                                {item.title}
                                <FontAwesomeIcon icon={item.icon as IconProp}/> 
                              </AccordionTrigger>
                              <AccordionContent className='px-30'>
                                {
                                  item.title !== 'Xizmatlar' 
                                  ? (
                                      <MenuInner menuType={item.title as 'Darsliklar' | 'Mashqlar' | 'Sertifikatlar' | 'Xizmatlar'} />
                                    ) 
                                  : (
                                      <>
                                        <div className="px-[38px] pt-[35px]">
                                          <input className="w-full -order-1 mb-9 bg-brown-1 text-white-2 !px-5 !py-2.5placeholder:text-white-2 rounded-full border border-yellow-1/20" placeholder="Filter..." type="text"/>
                                          <p className='text-white-2 text-[17px]'>
                                            W3Schools offers a wide range of services and products for beginners and professionals,
                                            helping millions of people everyday to learn and master new skills.
                                          </p>
                                        </div>
                                        {/* SERVICES MENU */}
                                        <ServicesMenu />
                                      </>
                                    )
                                }
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        )
                    }
                </li>
              )})}
          </ul>

          {/* CLOSED ICONS */}
          <FontAwesomeIcon className='w-6 h-6 absolute top-4 right-8 hover:bg-white-2 hover:text-black-1 p-2 font-thin rounded-md' fontWeight={100} icon={faXmark} onClick={() => setOpenMenu(false)} />
      </div>
    </nav>
  )
}

export default Menu
