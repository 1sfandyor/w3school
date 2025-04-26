"use client";

import { useState, useEffect } from 'react';
import { HiSearch, HiBell, HiMoon, HiSun } from 'react-icons/hi';
import styles from './Header.module.css';
import { getUserWithRoleClient } from '@/lib/api/auth';

export function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const { user, profile } = await getUserWithRoleClient();
        setCurrentUser(profile || user);
      } catch (error) {
        console.error('Foydalanuvchi ma\'lumotlarini olishda xatolik:', error);
      }
    };
    
    getUser();
  }, []);
  
  useEffect(() => {
    // Saqlangan qiymatni olish
    const isDark = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(isDark);
    
    // Tema klassini qo'shish
    if (isDark) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }, []);
  
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    // Temani yangilash
    localStorage.setItem('darkMode', String(newMode));
    
    if (newMode) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  };
  
  return (
    <header className={styles.header}>
      <div className={styles.searchContainer}>
        <HiSearch className={styles.searchIcon} />
        <input 
          type="text" 
          placeholder="Qidirish..." 
          className={styles.searchInput} 
        />
      </div>
      
      <div className={styles.actions}>
        <button className={styles.iconButton} onClick={toggleDarkMode}>
          {isDarkMode ? <HiSun /> : <HiMoon />}
        </button>
        
        <button className={styles.iconButton}>
          <HiBell />
          <span className={styles.notificationBadge}>3</span>
        </button>
        
        <div className={styles.userProfile}>
          <div className={styles.avatar}>
            {currentUser?.name?.charAt(0).toUpperCase() || currentUser?.email?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>
              {currentUser?.name || currentUser?.email?.split('@')[0] || 'Admin'}
            </span>
            <span className={styles.userRole}>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}