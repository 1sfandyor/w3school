'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Link from "next/link"
import { menuData } from '@/data/nav'
import ServicesMenu from './Services.card'
import { sourceSansPro } from '@/config/fonts'
import clsx from 'clsx'
import Masonry from 'react-masonry-css';

interface GiantMenuProps {
  menuType: 'Darsliklar' | 'Mashqlar' | 'Sertifikatlar' | 'Xizmatlar';
  isOpen?: boolean;
  onClose?: () => void;
}

const GiantMenu: React.FC<GiantMenuProps> = ({ menuType, isOpen, onClose }) => {
  const [filter, setFilter] = useState('');

  if (!isOpen) return null;

  const menuItem = menuData[menuType]

  const filteredItems = menuItem?.items?.map(category => ({
    ...category,
    links: category.links.filter(link => 
      link.text.toLowerCase().includes(filter.toLowerCase())
    )
  })).filter(category => category.links.length > 0)

  return (
      <section className={clsx("relative block w-full h-screen", sourceSansPro.className)}  >
        <div className="relative block w-full h-full">
          <nav className='block relative w-full top-0 h-full overflow-y-scroll bg-gray-3 px-5 pt-[35px] pb-12'>
            {/* X CLOSE */}
            <div className="hidden sl:flex justify-between items-center mb-6">
              <Button className="text-white-2" variant="ghost" onClick={onClose}>
                <X className="h-6 w-6" />
              </Button>
            </div>
              
            {/* CONTAIN CENTER */}
            <div className='lt:mx-auto lt:px-10 smd:px-[33px] nlp:max-w-[1200px] mb-[25px]'>
              <div className='mx-auto'>
                {/* TITLE & SEARCH INPUT */}
                <div className='flex flex-col smd:flex-row smd:mb-9 smd:items-center'>
                  <h2 className="hidden text-yellow-1 smd:flex -order-1 !min-w-[236px] slp:w-[34%] smd:self-center smd:mb-0 text-[32px] font-bold mb-1.5text-yellow-1">
                    {menuItem.title}
                  </h2>
                  <input
                    className="w-full lt:w-[314px] -order-1 mb-9 smd:mb-0 bg-brown-1 text-white-2  !px-5 !py-2.5
                    placeholder:text-white-2 rounded-full border border-yellow-1/20"
                    placeholder="Filter..."
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  />
                </div>
              </div>

              {/* Masonry Layout */}
              <Masonry
                breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {filteredItems?.map((category, index) => (
                  <div key={index} className="mb-10">
                    <h3 className="text-2xl font-semibold mb-2 text-yellow-1">{category.name}</h3>
                    <ul>
                      {category.links.map((link, linkIndex) => (
                        <li key={linkIndex} className="flex items-center text-nowrap">
                          <Link className="text-white-2 px-1.5 rounded-[3px] hover:text-gray-3 group hover:bg-gray-6 font-medium text-lg" href={link.url}>
                            {link.text}
                            {menuType === 'Darsliklar' && (
                              <span className="text-[15px] text-gray-2 group-hover:text-gray-3 font-normal"> ni o&apos;rganish</span>
                            )}
                          </Link>

                          {link.subLinks && link.subLinks.length > 0 && (
                            <ul className='flex items-center'>
                              {link.subLinks.map((subLink, subLinkIndex) => (
                                <li key={subLinkIndex}>
                                  <Link className="text-yellow-1 hover:text-white-2 hover:bg-green-1 rounded-medium py-1 px-2 font-medium underline text-xs" href={subLink?.url as string}>{subLink.text}</Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                    {menuType === 'Mashqlar' && category.name === 'Data Analytics' && (
                      <div className='inline-flex flex-col'>
                        <Link className="border border-gray-2 bg-gray-7 text-white-2 px-4 py-2 rounded-lg mt-[35px] mb-4" href={'/exercises'}>What is Exercises?</Link>
                        <Link className="border border-gray-2 bg-gray-7 text-white-2 px-4 py-2 rounded-lg" href={'/quiztest'}>What is Quiz?</Link>
                      </div>
                    )}
                  </div>
                ))}
              </Masonry>

              {menuType === 'Xizmatlar' && (
                <div className='flex flex-col gap-4'>
                  <p className='text-white-2 text-[17px]'>
                  W3Schools yangi boshlanuvchilar va professionallar uchun har kuni millionlab odamlarga yangi ko'nikmalarni o'rganish va o'zlashtirishda yordam beradigan keng turdagi xizmatlar va mahsulotlarni taklif etadi.
                  </p>
                  <ServicesMenu />
                </div>
              )}
            </div>
          </nav>  
        </div> 
      </section>
  );
};

export default GiantMenu;