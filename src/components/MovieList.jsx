import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="w-full">
      {/* Section Title */}
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white px-4 sm:px-6 pt-6 pb-3">
        {title}
      </h1>

      {/* Horizontal Movie Slider */}
      <div className="flex overflow-x-auto no-scrollbar gap-3 sm:gap-4 px-4 sm:px-6 pb-6 scroll-smooth">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            posterPath={movie?.poster_path}
            title={movie?.title || movie?.name}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
