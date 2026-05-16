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
  const [query, setQuery] = useState('marvel')
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null)

  const API_KEY = 'f1def80d'

  useEffect(() => {
    const searchMovies = async () => {
      if (query.trim().length < 3) return

      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      )

      if (response.data.Search) {
        setMovies(response.data.Search)
      }
    }

    searchMovies()
  }, [query])

  const getMovieDetail = async (id: string) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
    )

    setSelectedMovie(response.data)
  }

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold text-white mb-4">
        🔎 Búsqueda de películas y series - CSR
      </h2>

      <input
        type="text"
        placeholder="Buscar película o serie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-4 rounded-xl text-gray-800 font-semibold mb-6"
      />

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            onClick={() => getMovieDetail(movie.imdbID)}
            className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:scale-105 transition"
          >
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
              alt={movie.Title}
              className="w-full h-80 object-cover"
            />

            <div className="p-4">
              <h3 className="text-gray-800 font-bold text-lg">{movie.Title}</h3>
              <p className="text-gray-600">{movie.Year}</p>
              <p className="text-sm text-blue-600 capitalize">{movie.Type}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="mt-8 bg-yellow-100 rounded-2xl p-6 border-4 border-yellow-400">
          <h3 className="text-3xl font-bold text-gray-800 mb-2">
            {selectedMovie.Title}
          </h3>

          <p className="text-gray-700 mb-2">
            <strong>Año:</strong> {selectedMovie.Year}
          </p>

          <p className="text-gray-700 mb-2">
            <strong>Género:</strong> {selectedMovie.Genre}
          </p>

          <p className="text-gray-700 mb-2">
            <strong>Director:</strong> {selectedMovie.Director}
          </p>

          <p className="text-gray-700 mb-2">
            <strong>Actores:</strong> {selectedMovie.Actors}
          </p>

          <p className="text-gray-700 mb-2">
            <strong>Duración:</strong> {selectedMovie.Runtime}
          </p>

          <p className="text-gray-700 mb-2">
            <strong>Rating IMDB:</strong> {selectedMovie.imdbRating}
          </p>

          <p className="text-gray-700 mt-4">
            <strong>Resumen:</strong> {selectedMovie.Plot}
          </p>

          <button
            onClick={() => setSelectedMovie(null)}
            className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg font-bold"
          >
            Cerrar detalle
          </button>
        </div>
      )}
    </div>
  )
}