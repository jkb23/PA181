'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

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
          <Link href="/blog" className="hover:text-green-600 dark:hover:text-green-400">Blog</Link>
          <Link href="/mapa" className="hover:text-green-600 dark:hover:text-green-400">Mapa</Link>
          <Link href="/o-projektu" className="hover:text-green-600 dark:hover:text-green-400">O projektu</Link>
        </div>
        <div className="flex items-center gap-4">
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
                Odhlásit
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Přihlásit</Link>
              <Link href="/register" className="bg-white border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-50 transition">Registrovat</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 