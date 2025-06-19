import Link from 'next/link';
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold text-green-600 mb-6">
          Kam s tím?
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 dark:text-gray-200">
          Najděte nejbližší kontejnery na tříděný odpad a přispějte k lepšímu životnímu prostředí
        </p>
        {session ? (
          <div className="mb-6">
            <p className="text-lg text-green-700 font-semibold dark:text-green-200">Vítejte, {session.user?.name || session.user?.email}!</p>
          </div>
        ) : (
          <div className="mb-6 flex justify-center gap-4">
            <Link href="/login" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Přihlásit</Link>
            <Link href="/register" className="bg-white border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-50 transition">Registrovat</Link>
          </div>
        )}
        <Link 
          href="/mapa"
          className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Najít kontejnery
        </Link>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center dark:bg-gray-800 dark:text-white">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 dark:bg-green-900">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3 dark:text-gray-100">Interaktivní mapa</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Najděte nejbližší kontejnery na tříděný odpad ve vašem okolí
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center dark:bg-gray-800 dark:text-white">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 dark:bg-green-900">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3 dark:text-gray-100">Aktuální stav</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Informace o naplnění kontejnerů od ostatních uživatelů
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center dark:bg-gray-800 dark:text-white">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 dark:bg-green-900">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3 dark:text-gray-100">Eko komunita</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Sdílejte tipy a nápady s ostatními ekologicky smýšlejícími lidmi
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-50 rounded-lg p-12 text-center dark:bg-gray-900">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-gray-100">
          Připojte se k naší eko komunitě
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto dark:text-gray-200">
          Sdílejte své zkušenosti s tříděním odpadu a inspirujte ostatní k ekologickému chování
        </p>
        <Link
          href="/blog"
          className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Navštívit blog
        </Link>
      </section>
    </div>
  )
} 