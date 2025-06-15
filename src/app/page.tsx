export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Kam s tím?
        </h1>
        <p className="text-xl text-gray-600">
          Najděte nejbližší kontejnery na tříděný odpad
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Mapa kontejnerů</h2>
          <div className="h-96 bg-gray-200 rounded-lg">
            {/* Map component will go here */}
            <p className="text-center text-gray-500 mt-4">
              Načítání mapy...
            </p>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Vyhledávání</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Zadejte typ odpadu..."
              className="w-full p-2 border rounded-lg"
            />
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
              Hledat
            </button>
          </div>
        </section>
      </div>
    </div>
  )
} 