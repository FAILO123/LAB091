'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

interface MovieDetail extends Movie {
  Plot: string
  Genre: string
  Director: string
  Actors: string
  Runtime: string
  imdbRating: string
}

export default function MovieSearch() {
  const [query, setQuery] = useState('batman')
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null)

  const API_KEY = 'f1def80d'

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
        )

        if (response.data.Search) {
          setMovies(response.data.Search)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchMovies()
  }, [query])

  const getMovieDetail = async (id: string) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
    )

    setSelectedMovie(response.data)
  }

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-4xl font-black text-cyan-300">
            🔎 Explorador de Películas
          </h2>

          <p className="text-gray-400 mt-1">
            Búsqueda dinámica usando CSR
          </p>
        </div>

        <span className="hidden md:block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-cyan-300">
          CSR
        </span>
      </div>

      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Busca películas o series..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/10 backdrop-blur px-6 py-5 text-white placeholder:text-gray-400 text-lg outline-none focus:border-cyan-400"
        />

        <div className="absolute right-5 top-5 text-2xl">
          🔍
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {movies.map((movie) => (
          <article
            key={movie.imdbID}
            onClick={() => getMovieDetail(movie.imdbID)}
            className="group overflow-hidden rounded-3xl bg-white/10 border border-white/10 shadow-2xl backdrop-blur cursor-pointer hover:-translate-y-2 transition duration-300"
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

              <span className="absolute top-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs text-cyan-300 border border-cyan-300/30 capitalize">
                {movie.Type}
              </span>

              <div className="absolute bottom-0 p-5">
                <h3 className="text-xl font-black leading-tight text-white">
                  {movie.Title}
                </h3>

                <p className="text-gray-300 mt-1">
                  {movie.Year}
                </p>
              </div>

            </div>
          </article>
        ))}
      </div>

      {selectedMovie && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">

          <div className="bg-[#111827] border border-white/10 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl">

            <div className="grid md:grid-cols-2">

              <img
                src={selectedMovie.Poster}
                alt={selectedMovie.Title}
                className="w-full h-full object-cover"
              />

              <div className="p-8 text-white">

                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-4xl font-black">
                      {selectedMovie.Title}
                    </h2>

                    <p className="text-yellow-400 mt-2">
                      ⭐ {selectedMovie.imdbRating}/10 IMDb
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedMovie(null)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-6 space-y-3 text-gray-300">

                  <p>
                    <span className="font-bold text-white">📅 Año:</span> {selectedMovie.Year}
                  </p>

                  <p>
                    <span className="font-bold text-white">🎭 Género:</span> {selectedMovie.Genre}
                  </p>

                  <p>
                    <span className="font-bold text-white">🎬 Director:</span> {selectedMovie.Director}
                  </p>

                  <p>
                    <span className="font-bold text-white">👥 Actores:</span> {selectedMovie.Actors}
                  </p>

                  <p>
                    <span className="font-bold text-white">⏱ Duración:</span> {selectedMovie.Runtime}
                  </p>

                </div>

                <div className="mt-6">
                  <h3 className="font-black text-xl mb-2">
                    📖 Sinopsis
                  </h3>

                  <p className="text-gray-300 leading-relaxed">
                    {selectedMovie.Plot}
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}