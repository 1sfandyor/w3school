import React from 'react'
import Link from 'next/link'
import { stacks } from '@/data/nav'
import clsx from 'clsx'
import { sourceSansPro } from '@/config/fonts'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBars } from '@fortawesome/free-solid-svg-icons'

const HeaderStacks = () => {
  return (
    <div className='flex bg-gray-3 items-center justify-center'>

      <ul className='flex text-nowrap uppercase overflow-x-scroll scrollbar-hide'>
        {
          stacks.map((stack) => (
            <li key={stack.id} className=''>
              <Link className={clsx("px-[15px] py-[5px] text-[15px] flex items-center justify-center hover:bg-black-1 hover:text-white-2", sourceSansPro.className)} href={stack.path} >{stack.name}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default HeaderStacks