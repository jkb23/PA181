export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-600 mb-4">O projektu</h1>
          <p className="text-xl text-gray-600 dark:text-gray-100">
            Pomáháme lidem třídit odpad a žít udržitelněji
          </p>
        </header>

        <div className="prose prose-lg mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-gray-100">Naše mise</h2>
            <p className="text-gray-600 mb-4 dark:text-gray-300">
              Projekt "Kam s tím?" vznikl s cílem zjednodušit třídění odpadu a podpořit udržitelný životní styl. 
              Věříme, že každý malý krok k lepšímu životnímu prostředí má smysl.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Naším cílem je vytvořit komunitu lidí, kteří se aktivně zajímají o životní prostředí a chtějí 
              přispět k jeho ochraně.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 dark:text-gray-100">Co nabízíme</h2>
            <div className="grid gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 dark:bg-green-900">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 dark:text-gray-100">Interaktivní mapa kontejnerů</h3>
                    <p className="text-gray-600 dark:text-gray-300">Najděte nejbližší kontejnery na tříděný odpad ve vašem okolí</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 dark:bg-green-900">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 dark:text-gray-100">Aktuální informace</h3>
                    <p className="text-gray-600 dark:text-gray-300">Sdílejte a získávejte informace o stavu kontejnerů</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 dark:bg-green-900">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 dark:text-gray-100">Eko komunita</h3>
                    <p className="text-gray-600 dark:text-gray-300">Sdílejte tipy a nápady s ostatními ekologicky smýšlejícími lidmi</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-gray-100">Kontakt</h2>
            <p className="text-gray-600 mb-4 dark:text-gray-300">
              Máte nějaké otázky nebo návrhy? Neváhejte nás kontaktovat!
            </p>
            <div className="bg-green-50 rounded-lg p-6 dark:bg-gray-900">
              <p className="text-gray-600 dark:text-gray-300">
                Email: info@kamsitim.cz<br />
                Telefon: +420 123 456 789
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 