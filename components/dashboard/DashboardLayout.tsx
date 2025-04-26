"use client";

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import styles from './DashboardLayout.module.css';
import { getUserWithRoleClient } from '@/lib/api/auth';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        // Yangi funksiya orqali foydalanuvchi va admin rolini tekshirish
        const { user, isAdmin } = await getUserWithRoleClient();
        
        if (!user) {
          console.log('DashboardLayout: No user found, redirecting to login');
          router.push('/admin/login');
          return;
        }
        
        if (!isAdmin) {
          console.log('DashboardLayout: User is not admin, redirecting to login');
          router.push('/admin/login');
          return;
        }
        
        console.log('DashboardLayout: User is admin, allowing access');
        setIsAuthorized(true);
      } catch (error) {
        console.error('Autentifikatsiya tekshirishda xatolik:', error);
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);
  
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Yuklanmoqda...</p>
      </div>
    );
  }
  
  if (!isAuthorized) {
    return null; // Router already redirecting, don't render anything
  }
  
  return (
    <div className={styles.container}>
      <Sidebar />
      
      <div className={styles.content}>
        <Header />
        
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
}