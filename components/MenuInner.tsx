'use client'

import React, { useState } from 'react'
import Link from "next/link"
import { menuData } from '@/data/nav'


interface MenuInnerProps {
  menuType: 'Darsliklar' | 'Mashqlar' | 'Sertifikatlar' | 'Xizmatlar';
}

const MenuInner: React.FC<MenuInnerProps> = ({ menuType }) => {
  const [filter, setFilter] = useState('');
  const menuItem = menuData[menuType];
  
  const filteredItems = menuItem?.items?.map(category => {
    return ({
    ...category,
    links: category.links.filter(link => 
      link.text.toLowerCase().includes(filter.toLowerCase())
    )
  })}).filter(category => category.links.length > 0);
  
  return (
      <div className="bg-gray-3 z-50 flex flex-col w-full px-5 pt-[35px] items-center">
        <div className='w-full'>
          {/* CONTAIN CENTER */}
          <div className='mx-auto'>
            {/* TITLE & SEARCH INPUT */}
            <div className='flex flex-col'>
              <h2 className="hidden xl:block text-3xl font-bold mb-1.5 text-yellow-1">{menuItem.title}</h2>

              <input
                className="w-full -order-1 mb-9 bg-brown-1 text-white-2 !px-5 !py-2.5
                placeholder:text-white-2 rounded-full border border-yellow-1/20"
                placeholder="Filter..."
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />

              
            </div>
          </div>
            
            <div className="grid lt:grid-cols-2 gap-8">
              {filteredItems?.map((category, index) => {              
              return (
                <div key={index}>
                  <h3 className="text-2xl font-semibold mb-2 text-yellow-1">{category.name}</h3>
                  <ul>
                    {category.links.map((link, linkIndex) => (
                      <li key={linkIndex} className="mb-1 flex items-center">
                        
                        <Link className="text-white-2 py-1 px-2 font-medium text-lg" href={link.url}>
                          <span className="text-[15px] text-gray-2 font-normal">Learn </span>
                          {link.text}
                        </Link>

                        {link.subLinks && link.subLinks.length > 0 && (
                            <ul className='flex'>
                              {link.subLinks.map((subLink, subLinkIndex) => (
                                <li key={subLinkIndex} className="mb-1">
                                  <Link className="text-yellow-1 hover:text-white-2 hover:bg-green-1 py-1 px-2 font-medium border border-yellow-1/30 rounded-full text-xs" href={subLink?.url as string}>{subLink.text}</Link>
                                </li>
                              ))}
                            </ul>
                          )}
                      </li>
                    ))}
                  </ul>
                </div>
              )})}
            </div>
        </div>    
      </div>
  );
};

export default MenuInner