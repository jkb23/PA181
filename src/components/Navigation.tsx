'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";
import { useTranslation } from '../app/providers';
import { SessionProvider } from "next-auth/react";


export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { lang, setLang, t } = useTranslation();

  useEffect(() => {
    // On mount, check localStorage and set dark mode
    const stored = localStorage.getItem('darkMode');
    if (stored === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('darkMode', next ? 'true' : 'false');
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const languages = [
    { code: 'cs', label: 'Čeština', flag: '🇨🇿' },
    { code: 'sk', label: 'Slovenčina', flag: '🇸🇰' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  const navItems = [
    { name: 'Domů', path: '/' },
    { name: 'Mapa', path: '/mapa' },
    { name: 'Blog', path: '/blog' },
    { name: 'O projektu', path: '/o-projektu' },
  ];

  return (
    <nav className="bg-white shadow mb-8 dark:bg-gray-800 dark:text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold text-green-600 dark:text-green-400">Kam s tím?</Link>
          <Link href="/blog" className="hover:text-green-600 dark:hover:text-green-400">{t('blog')}</Link>
          <Link href="/mapa" className="hover:text-green-600 dark:hover:text-green-400">{t('map')}</Link>
          <Link href="/o-projektu" className="hover:text-green-600 dark:hover:text-green-400">{t('about')}</Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setLangDropdown((v) => !v)}
              aria-label="Změnit jazyk"
              className="text-2xl focus:outline-none hover:text-green-600 transition"
            >
              <span role="img" aria-label="language-flag" className="text-2xl">
                {languages.find(l => l.code === lang)?.flag || '🌐'}
              </span>
            </button>
            {langDropdown && (
              <div className="absolute right-0 mt-2 w-20 bg-white dark:bg-gray-800 rounded shadow-lg z-50">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangDropdown(false); }}
                    className={`w-full flex items-center justify-center px-4 py-2 text-left hover:bg-green-100 dark:hover:bg-gray-700 ${lang === l.code ? 'font-bold' : ''}`}
                  >
                    <span role="img" aria-label={l.label} className="text-2xl">{l.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Přepnout na světlý režim' : 'Přepnout na tmavý režim'}
            className="text-2xl focus:outline-none hover:text-green-600 transition"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          {status === "loading" ? null : session ? (
            <>
              <span className="text-gray-700 dark:text-gray-100">{session.user?.name || session.user?.email}</span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                {t('logout')}
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">{t('login')}</Link>
              <Link href="/register" className="bg-white border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-50 transition">{t('register')}</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 