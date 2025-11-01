import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movie);

  if (!movies) return null;

  return (
    <div className="relative z-30 bg-black 
      -mt-20 sm:-mt-58 md:-mt-36 lg:-mt-4 
      pb-10 sm:pb-14 md:pb-20">
      
      <div className="space-y-6 sm:space-y-8 md:space-y-10 px-4 sm:px-6 md:px-8">
        <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
        <MovieList title="Top Rated" movies={movies.topMovies} />
        <MovieList title="Horror Movies" movies={movies.nowPlayingMovies} />
        <MovieList title="Popular" movies={movies.popularMovies} />
        <MovieList title="Upcoming Movies" movies={movies.upcomingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
