"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/database.types';
import styles from './login.module.css';

export default function AdminLogin() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [requestingRole, setRequestingRole] = useState<boolean>(false);
  const [roleRequested, setRoleRequested] = useState<boolean>(false);
  
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Foydalanuvchi ma'lumotlarini olish
        const { data: userData, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          setError(userError.message);
          setLoading(false);
          return;
        }

        const user = userData.user;
        setUser(user);
        
        // Admin huquqi borligini tekshirish
        const isAdmin = user.app_metadata?.role === 'admin' || user.user_metadata?.role === 'admin';
        
        if (isAdmin) {
          router.push('/admin/dashboard');
          return;
        }
        
        // Foydalanuvchi tizimga kirgan, lekin admin emas
        setLoading(false);
      } else {
        // Tizimga kirilmagan
        setLoading(false);
      }
    } catch (err: any) {
      console.error('Sessiya tekshirishda xatolik:', err);
      setError('Sessiyani tekshirishda xatolik yuz berdi');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      // Tizimga kirish
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      // Sessiyani yangilash va tekshirish
      await checkSession();
      
    } catch (err: any) {
      console.error('Login xatolik:', err);
      setError('Tizimga kirishda xatolik yuz berdi');
      setLoading(false);
    }
  };

  const handleRequestAdminRole = async () => {
    if (!user) return;
    
    setRequestingRole(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/set-admin-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Admin huquqini so\'rashda xatolik yuz berdi');
      }
      
      setRoleRequested(true);
      
      // Sessiyani yangilash
      await checkSession();
      
    } catch (err: any) {
      console.error('Admin huquqini so\'rashda xatolik:', err);
      setError(err.message);
    } finally {
      setRequestingRole(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setRoleRequested(false);
    } catch (err: any) {
      console.error('Chiqishda xatolik:', err);
      setError('Tizimdan chiqishda xatolik yuz berdi');
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingSpinner}></div>
        <p>Yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>W3Schools Admin Panel</h1>
        
        {user ? (
          // Foydalanuvchi tizimga kirgan holat
          <div className={styles.userInfo}>
            <p>Salom, {user.email}!</p>
            
            {roleRequested ? (
              <div className={styles.message}>
                <p>Admin huquqi so'rovi yuborildi. Iltimos, qayta kirish qiling.</p>
                <button onClick={handleSignOut} className={styles.signOutButton}>
                  Chiqish
                </button>
              </div>
            ) : (
              <div className={styles.message}>
                <p>Sizda admin huquqi mavjud emas. Admin huquqini so'rashingiz mumkin.</p>
                <button
                  onClick={handleRequestAdminRole}
                  disabled={requestingRole}
                  className={styles.requestButton}
                >
                  {requestingRole ? 'So\'rov yuborilmoqda...' : 'Admin huquqini so\'rash'}
                </button>
                <button onClick={handleSignOut} className={styles.signOutButton}>
                  Chiqish
                </button>
              </div>
            )}
          </div>
        ) : (
          // Tizimga kirish formasi
          <form onSubmit={handleSubmit} className={styles.form}>
            {error && <div className={styles.error}>{error}</div>}
            
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
                placeholder="admin@example.com"
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="password">Parol</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.input}
                placeholder="******"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={styles.loginButton}
            >
              {loading ? 'Kirish...' : 'Kirish'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 