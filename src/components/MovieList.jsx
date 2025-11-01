import React from 'react'
import MovieCard from "./MovieCard"

const MovieList = ({ title, movies }) => {

  if (!movies || movies.length === 0) return null

  return (
    <div className=" w-full">
      <h1 className="text-xl md:text-2xl font-semibold text-white px-6 pt-6 pb-3">
        {title}
      </h1>

      <div className="flex overflow-x-scroll no-scrollbar gap-4 px-6 pb-6">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            posterPath={movie?.poster_path} 
          />
        ))}
      </div>
    </div>
  )
}

export default MovieList