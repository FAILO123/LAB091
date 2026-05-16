import axios from 'axios'
import MovieSearch from './MovieSearch'

interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

async function getPopularMovies(): Promise<Movie[]> {
  const response = await axios.get(
    'https://www.omdbapi.com/?apikey=f1def80d&s=marvel'
  )

  return response.data.Search || []
}

export default async function MoviesPage() {
  const movies = await getPopularMovies()

  return (
    <main className="min-h-screen bg-[#070A13] text-white">
      <section className="relative overflow-hidden px-8 py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-purple-900/20 to-blue-900/30"></div>
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-red-500/20 blur-3xl"></div>
        <div className="absolute top-40 -right-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="inline-block rounded-full border border-red-400/40 bg-red-500/10 px-5 py-2 text-sm text-red-200 mb-5">
              Laboratorio Next.js · SSR + CSR
            </p>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              🎬 Galería de Películas
              <span className="block bg-gradient-to-r from-yellow-300 via-red-400 to-purple-400 bg-clip-text text-transparent">
                y Series
              </span>
            </h1>

            <p className="mt-5 text-gray-300 text-lg max-w-2xl mx-auto">
              Aplicación híbrida usando OMDb API, renderizado del servidor e interactividad del cliente.
            </p>
          </div>

          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-black text-yellow-300">
                  🍿 Películas Populares
                </h2>
                <p className="text-gray-400 mt-1">
                  Cargadas con SSR antes de mostrar la página
                </p>
              </div>

              <span className="hidden md:block rounded-full bg-green-500/10 px-4 py-2 text-green-300 border border-green-400/30">
                SSR
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {movies.map((movie) => (
                <article
                  key={movie.imdbID}
                  className="group overflow-hidden rounded-3xl bg-white/10 border border-white/10 shadow-2xl backdrop-blur hover:-translate-y-2 transition duration-300"
                >
                  <div className="relative h-96 overflow-hidden bg-gray-900">
                    <img
                      src={
                        movie.Poster !== 'N/A'
                          ? movie.Poster
                          : 'https://via.placeholder.com/300x450'
                      }
                      alt={movie.Title}
                      className="h-full w-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent"></div>

                    <span className="absolute top-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs text-yellow-300 border border-yellow-300/30 capitalize">
                      {movie.Type}
                    </span>

                    <div className="absolute bottom-0 p-5">
                      <h3 className="text-xl font-black leading-tight">
                        {movie.Title}
                      </h3>
                      <p className="text-gray-300 mt-1">{movie.Year}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <MovieSearch />

          <section className="mt-14 rounded-3xl bg-white/95 p-7 shadow-2xl">
            <h2 className="text-2xl font-black text-gray-900 mb-5">
              📊 Comparación SSR vs CSR
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full overflow-hidden rounded-xl">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-4 text-left text-gray-800">Característica</th>
                    <th className="p-4 text-left text-gray-800">SSR</th>
                    <th className="p-4 text-left text-gray-800">CSR</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-t">
                    <td className="p-4 text-gray-800 font-bold">SEO</td>
                    <td className="p-4 text-green-600">✅ Excelente</td>
                    <td className="p-4 text-red-600">❌ Limitado</td>
                  </tr>

                  <tr className="border-t bg-gray-50">
                    <td className="p-4 text-gray-800 font-bold">Tiempo inicial</td>
                    <td className="p-4 text-green-600">✅ Rápido</td>
                    <td className="p-4 text-yellow-600">⚠️ Más lento</td>
                  </tr>

                  <tr className="border-t">
                    <td className="p-4 text-gray-800 font-bold">Interactividad</td>
                    <td className="p-4 text-yellow-600">⚠️ Limitada</td>
                    <td className="p-4 text-green-600">✅ Dinámica</td>
                  </tr>

                  <tr className="border-t bg-gray-50">
                    <td className="p-4 text-gray-800 font-bold">Uso principal</td>
                    <td className="p-4 text-blue-600">Contenido inicial</td>
                    <td className="p-4 text-purple-600">Búsquedas dinámicas</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}