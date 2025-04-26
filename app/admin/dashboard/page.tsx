"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { HiDocument, HiAcademicCap, HiUserGroup, HiClock, HiPlus, HiPhotograph, HiCog } from "react-icons/hi";
import Link from "next/link";
import styles from "./dashboard.module.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    pages: 0,
    tutorials: 0,
    users: 0,
    drafts: 0,
  });
  
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        // Statistikalarni API orqali olish
        const statsResponse = await fetch('/api/dashboard/stats');
        if (!statsResponse.ok) {
          throw new Error('Statistikalarni olishda xatolik');
        }
        const statsData = await statsResponse.json();
        setStats(statsData);
        
        // So'nggi faoliyatlarni API orqali olish
        const activitiesResponse = await fetch('/api/dashboard/activities?limit=5');
        if (!activitiesResponse.ok) {
          throw new Error('Faoliyatlarni olishda xatolik');
        }
        const activitiesData = await activitiesResponse.json();
        setActivities(activitiesData);
      } catch (error) {
        console.error('Maʼlumotlarni olishda xatolik:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Vaqtni formatlash funksiyasi
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return diffInHours === 0 ? 'Bugun' : `${diffInHours} soat oldin`;
    } else if (diffInHours < 48) {
      return 'Kecha';
    } else {
      return `${Math.floor(diffInHours / 24)} kun oldin`;
    }
  };

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>Admin Boshqaruv paneli</h1>
        
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIconWrap}>
              <HiDocument className={styles.statIcon} />
            </div>
            <div className={styles.statContent}>
              <p className={styles.statValue}>{isLoading ? '...' : stats.pages}</p>
              <p className={styles.statLabel}>Sahifalar</p>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIconWrap}>
              <HiAcademicCap className={styles.statIcon} />
            </div>
            <div className={styles.statContent}>
              <p className={styles.statValue}>{isLoading ? '...' : stats.tutorials}</p>
              <p className={styles.statLabel}>Darsliklar</p>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIconWrap}>
              <HiUserGroup className={styles.statIcon} />
            </div>
            <div className={styles.statContent}>
              <p className={styles.statValue}>{isLoading ? '...' : stats.users}</p>
              <p className={styles.statLabel}>Foydalanuvchilar</p>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIconWrap}>
              <HiClock className={styles.statIcon} />
            </div>
            <div className={styles.statContent}>
              <p className={styles.statValue}>{isLoading ? '...' : stats.drafts}</p>
              <p className={styles.statLabel}>Qoralama maqolalar</p>
            </div>
          </div>
        </div>
        
        <div className={styles.sectionDivider}>
          <h2 className={styles.sectionTitle}>Tezkor havolalar</h2>
        </div>
        
        <div className={styles.quickLinksGrid}>
          <Link href="/admin/sahifalar/yangi" className={styles.quickLinkCard}>
            <h3 className={styles.quickLinkTitle}>Yangi sahifa</h3>
            <p className={styles.quickLinkDescription}>Yangi sahifa yaratish va nashr qilish</p>
          </Link>
          
          <Link href="/admin/darsliklar/yangi" className={styles.quickLinkCard}>
            <h3 className={styles.quickLinkTitle}>Yangi darslik</h3>
            <p className={styles.quickLinkDescription}>Yangi dasturlash darsligi yaratish</p>
          </Link>
          
          <Link href="/admin/media" className={styles.quickLinkCard}>
            <h3 className={styles.quickLinkTitle}>Media yuklash</h3>
            <p className={styles.quickLinkDescription}>Rasm va fayllarni yuklash va boshqarish</p>
          </Link>
          
          <Link href="/admin/sozlamalar" className={styles.quickLinkCard}>
            <h3 className={styles.quickLinkTitle}>Sozlamalar</h3>
            <p className={styles.quickLinkDescription}>Tizim sozlamalarini o'zgartirish</p>
          </Link>
        </div>
        
        <div className={styles.sectionDivider}>
          <h2 className={styles.sectionTitle}>So'nggi faoliyatlar</h2>
        </div>
        
        <div className={styles.activityFeed}>
          {isLoading ? (
            <div className={styles.activityLoading}>Maʼlumotlar yuklanmoqda...</div>
          ) : activities.length > 0 ? (
            activities.map((activity, index) => (
              <div key={activity.id} className={styles.activityItem}>
                <div className={styles.activityDot}></div>
                <div className={styles.activityContent}>
                  <h3 className={styles.activityTitle}>{activity.title}</h3>
                  <p className={styles.activityDescription}>
                    {activity.description}
                  </p>
                  <span className={styles.activityTime}>
                    {formatTimeAgo(activity.created_at)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.activityEmpty}>
              Hozircha faoliyatlar mavjud emas
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
} 