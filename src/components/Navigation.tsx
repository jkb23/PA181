'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const navItems = [
    { name: 'Domů', path: '/' },
    { name: 'Mapa', path: '/mapa' },
    { name: 'Blog', path: '/blog' },
    { name: 'O projektu', path: '/o-projektu' },
  ];

  return (
    <nav className="bg-white shadow mb-8">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold text-green-600">Kam s tím?</Link>
          <Link href="/blog" className="hover:text-green-600">Blog</Link>
          <Link href="/mapa" className="hover:text-green-600">Mapa</Link>
          <Link href="/o-projektu" className="hover:text-green-600">O projektu</Link>
        </div>
        <div className="flex items-center gap-4">
          {status === "loading" ? null : session ? (
            <>
              <span className="text-gray-700">{session.user?.name || session.user?.email}</span>
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