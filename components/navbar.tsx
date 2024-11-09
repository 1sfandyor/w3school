"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaCircleHalfStroke } from "react-icons/fa6";
import { faCaretDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./ui/button";
import SearchComponent from "./Search";
import { links, nav } from "@/data/nav";
import GiantMenu from "./GiantMenu";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import {useMediaQuery} from 'usehooks-ts';
import HeaderStacks from "./HeaderStacks";
import { sourceSansPro } from "@/config/fonts";
import clsx from "clsx";

const MainNavbar = () => {
  const isMobile = useMediaQuery("(min-width: 689px)");
  const [activeMenu, setActiveMenu] = useState<'Darsliklar' | 'Mashqlar' | 'Sertifikatlar' | 'Xizmatlar' | null>(null)
  const [activeMenuMobile, setActiveMenuMobile] = useState<'Darsliklar' | 'Mashqlar' | 'Sertifikatlar' | 'Xizmatlar' | null>(null)
  const [openMenu, setOpenMenu] = useState(false);

  
  useEffect(() => {
    isMobile && setOpenMenu(false);
  }, [isMobile]);

  const handleMenuClick = (menuType: 'Darsliklar' | 'Mashqlar' | 'Sertifikatlar' | 'Xizmatlar') => {
    setActiveMenu(activeMenu === menuType ? null : menuType)
  }

  return (
      <>
      <header className={clsx("flex flex-col fixed w-full top-0 z-50 text-white-2", sourceSansPro.className)}>
        <nav className="w-full flex items-center relative bg-darkGreen-1 justify-between z-50">
          <div className="flex">
            <Link className="flex items-center justify-center py-2 px-4 shrink-0"
              href={"/"}>
              <Image
                alt="Logo"
                className="flex w-[38px] h-[36px] shrink-0"
                height={32}
                src={"/logo.svg"}
                width={36}
              />
            </Link>

            <div className="flex ">
              {/* MENU BAR */}
              <Button className="flex smd:hidden items-center justify-normal h-full gap-0.5 rounded-none bg-transparent text-gray-1 hover:bg-green-1 py-4 px-2 xs:px-4" onClick={() => setOpenMenu((prev) => !prev)}>
                Menu
                <FontAwesomeIcon
                  className="justify-self-start"
                  height={15}
                  icon={faCaretDown}
                  width={8}
                />
              </Button>

              {/* LINKS */}
              <ul className="hidden items-center smd:flex cursor-pointer">
                {nav.map((item) => (
                  <li key={item.id}
                    className={`${item.title === "Sertifikatlar" ? "hidden xslp:flex" : ""} `}>
                    <div 
                      className={`flex hover:bg-green-1 p-4 lmd:px-3 items-center ${activeMenu === item.title ? "bg-gray-3" : ""}`} 
                      role="button" // Add role for accessibility
                      tabIndex={0} // Make it focusable
                      onClick={() => handleMenuClick(item.title as 'Darsliklar' | 'Mashqlar' | 'Sertifikatlar' | 'Xizmatlar')}
                      onKeyPress={(e) => { if (e.key === 'Enter') handleMenuClick(item.title as 'Darsliklar' | 'Mashqlar' | 'Sertifikatlar' | 'Xizmatlar'); }}
                      >
                      <span className="mr-1.5">{item.title}</span>
                      <FontAwesomeIcon icon={faCaretDown} width={8} />
                    </div>
                  </li>
                ))}
              </ul>

              {/* SEARCH ICON */}
              <div className="px-1.5 py-2.5 xs:px-2 xlt:hidden smd:flex mmd:hidden">
                <Button className="flex rounded-full p-[9px] px-2.5 bg-transparent hover:bg-white/10">
                  <FontAwesomeIcon
                    className="h-[18px] w-[18px] text-gray-2"
                    icon={faMagnifyingGlass}
                  />
                </Button>
              </div>

              {/* SEARCH INPUT */}
              <div className="px-2 relative py-2.5 hidden xlt:flex smd:hidden mmd:flex">
                <SearchComponent />
              </div>

              {/* TOGGLE MODE */}
              <div className="px-1.5 py-2.5 xs:px-2 z-50 bg-darkGreen-1 md:bg-transparent">
                <Button className="rounded-full w-9 h-9 flex items-center justify-center bg-transparent hover:bg-white/10">
                  <FaCircleHalfStroke color="white" height={18} width={18} />
                </Button>
              </div>
            </div>
          </div>

          {/* AUTH BTNS */}
          <div className="flex  relative justify-end items-center mr-[10px]">
            {links.map((link) => (
              <li
                key={link.id}
                className={`shrink-0 text-nowrap hidden ${
                  link.title === "Sertifikat olish"
                    ? "lt:flex xlt:hidden lmd:flex  mmd:hidden llp:flex"
                    : link.title === "Spaces"
                      ? "mlp:flex"
                      : "mlg:flex"
                }`}
              >
                <Link
                  className="py-2 px-4 rounded-full flex items-center text-sm text-gray-1 hover:bg-white-2/10"
                  href={link.path}
                >
                  <FontAwesomeIcon
                    className="mr-2"
                    color="#9763F6"
                    icon={link.icons}
                  />
                  {link.title}
                </Link>
              </li>
            ))}

            <Link
              className="hidden sm:flex relative items-center justify-center left-9 z-10 rounded-full bg-green-1 shrink-0 py-2 px-4"
              href={
                "https://profile.w3schools.com/sign-up?redirect_url=https%3A%2F%2Fwww.w3schools.com%2Fspaces%2Findex.php"
              }
            >
              Yaratish
            </Link>

            <Link
              className="bg-green-2 inline-flex items-center text-nowrap justify-center px-4 py-2 sm:pl-10 sm:w-full text-black-1 hover:text-white-2 cursor-pointer
                hover:bg-green-1 relative rounded-full w-[93px]"
              href={
                "https://profile.w3schools.com/login?redirect_url=https%3A%2F%2Fwww.w3schools.com%2Fspaces%2Findex.php"
              }
            >
              Kirish
            </Link>
          </div>
        </nav>
        <HeaderStacks />

        {activeMenu && (
          <GiantMenu
            isOpen={true}
            menuType={activeMenu}
            onClose={() => setActiveMenu(null)}
          />
        )}


      </header>
        {openMenu && <Menu activeMenu={activeMenuMobile as 'Darsliklar' | 'Mashqlar' | 'Sertifikatlar' | 'Xizmatlar'} 
        setActiveMenu={setActiveMenuMobile}  setOpenMenu={setOpenMenu}/>}

      </>
  );
};

export default MainNavbar;
