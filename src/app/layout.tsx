import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Navigation from '../components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kam s tím? - Eco-Friendly Waste Management',
  description: 'Find nearby containers for specific waste types and promote responsible recycling',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <body className={`${inter.className} bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100`}>
        <Providers>
          <Navigation />
          <main className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
} 