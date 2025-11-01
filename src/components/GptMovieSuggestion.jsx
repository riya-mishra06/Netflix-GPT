import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);

  if (!movieNames) return null;

  return (
    <div className="w-full py-4 px-2 sm:px-4 md:px-8 lg:px-12">
      <div className="bg-black/80 text-white rounded-lg sm:rounded-xl shadow-lg 
                      p-3 sm:p-5 md:p-6 backdrop-blur-md border border-white/10">

        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
          Movies For You
        </h2>

        <div className="flex flex-col gap-6">
          {movieNames.map((movieName, index) => (
            <MovieList
              key={movieName}
              title={movieName}
              movies={movieResults[index]}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default GptMovieSuggestion;
