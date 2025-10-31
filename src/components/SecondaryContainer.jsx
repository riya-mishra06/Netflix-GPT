import MovieList from "./MovieList"
import { useSelector } from "react-redux"

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movie)

  return (
    <>
      <div className="-mt-40  relative z-30  bg-black">
       <div>
         <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Trending"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Horry movie"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"Upcoming Movies"} movies={movies.nowPlayingMovies} />
  
        </div>   
        </div>
    </>
  )
}

export default SecondaryContainer
