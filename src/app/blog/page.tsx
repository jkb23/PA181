export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: 'Jak správně třídit plastový odpad',
      excerpt: 'Naučte se správně třídit různé druhy plastů a přispějte k lepšímu životnímu prostředí.',
      date: '15. března 2024',
      category: 'Třídění odpadu',
    },
    {
      id: 2,
      title: 'DIY: Vytvořte si vlastní kompostér',
      excerpt: 'Jednoduchý návod na výrobu domácího kompostéru z recyklovaných materiálů.',
      date: '10. března 2024',
      category: 'Kompostování',
    },
    {
      id: 3,
      title: 'Zero waste v kuchyni',
      excerpt: 'Tipy a triky, jak minimalizovat odpad v domácnosti a žít udržitelněji.',
      date: '5. března 2024',
      category: 'Zero waste',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Eko Blog</h1>
        <p className="text-xl text-gray-600">
          Tipy, návody a inspirace pro udržitelný životní styl
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-green-100"></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-green-600 font-medium">{post.category}</span>
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <button className="text-green-600 font-medium hover:text-green-700 transition-colors">
                Číst více →
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
} 