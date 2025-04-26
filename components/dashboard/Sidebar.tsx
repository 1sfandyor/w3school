"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';
import { 
  HiHome, 
  HiDocument, 
  HiBookOpen, 
  HiFolder, 
  HiPhotograph, 
  HiUser, 
  HiCog, 
  HiLogout 
} from 'react-icons/hi';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import styles from './Sidebar.module.css';
import { useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface MenuItem {
  label: string;
  path: string;
  icon: IconType;
}

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  
  const menuItems: MenuItem[] = [
    { label: 'Bosh sahifa', path: '/admin/dashboard', icon: HiHome },
    { label: 'Sahifalar', path: '/admin/pages', icon: HiDocument },
    { label: 'Darsliklar', path: '/admin/tutorials', icon: HiBookOpen },
    { label: 'Kategoriyalar', path: '/admin/categories', icon: HiFolder },
    { label: 'Media', path: '/admin/media', icon: HiPhotograph },
    { label: 'Foydalanuvchilar', path: '/admin/users', icon: HiUser },
    { label: 'Sozlamalar', path: '/admin/settings', icon: HiCog },
  ];

  const handleLogout = async () => {
    try {
      // Supabase client yaratish
      const supabase = createClientComponentClient();
      
      // Foydalanuvchini tizimdan chiqarish
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Chiqishda xatolik yuz berdi:", error.message);
        alert("Tizimdan chiqishda xatolik yuz berdi: " + error.message);
        return;
      }
      
      // Muvaffaqiyatli chiqqandan so'ng login sahifasiga yo'naltirish
      window.location.href = '/admin/login';
    } catch (err) {
      console.error("Tizimdan chiqishda kutilmagan xatolik:", err);
      alert("Tizimdan chiqishda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
    }
  };
  
  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.logoContainer}>
        <Link href="/admin/dashboard" className={styles.logo}>
          {!collapsed && <span>W3Schools Admin</span>}
        </Link>
        <button 
          className={styles.collapseButton}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <HiChevronRight /> : <HiChevronLeft />}
        </button>
      </div>
      
      <nav className={styles.navigation}>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`${styles.navLink} ${pathname === item.path ? styles.active : ''}`}
          >
            <item.icon className={styles.icon} />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
      
      <div className={styles.footer}>
        <button onClick={handleLogout} className={styles.logoutButton}>
          <HiLogout className={styles.icon} />
          {!collapsed && <span>Chiqish</span>}
        </button>
      </div>
    </div>
  );
} 