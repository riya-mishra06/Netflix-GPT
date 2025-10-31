import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
const usePopularMovies = (movieId) => {
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    try {
      const data = await fetch(
"https://api.themoviedb.org/3/movie/popular?page=1",
        API_OPTIONS
      );
      const json = await data.json();

      const filterData = json.results.filter(video => video.type === "Trailer");
      const trailer = filterData.length ? filterData[0] : json.results[0];

      if (trailer) dispatch(addTrailerVideo(trailer));
    } catch (error) {
      console.error("Failed to fetch trailer:", error);
    }
  };

  useEffect(() => {
    if (movieId) addPopularMovies();
  }, [movieId]);
};

export default usePopularMovies;