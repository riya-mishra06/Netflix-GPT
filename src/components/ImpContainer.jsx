import { useSelector } from "react-redux";
import VideoBackgrounds from "./VideoBackgrounds";
import VideoTitle from "./VideoTitle";

const ImpContainer = () => {
  const movies = useSelector((store) => store.movie?.nowPlayingMovies);

  // handle loading
  if (!movies || movies.length === 0) return null;

  const mainMovie = movies[0];

  const {
    original_title = "No Title",
    overview = "No Description Available",
    id,
  } = mainMovie || {};

  return (
    <div className="relative w-full">
      {/* ======= Main Movie Title (Hero section) ======= */}
      <div className="pt-[6rem] md:pt-[7rem] lg:pt-[8rem] px-4 sm:px-6 md:px-10 lg:px-16">
        <VideoTitle title={original_title} overview={overview} />
      </div>

      {/* ======= Background Video ======= */}
      <div className="w-full h-full">
        <VideoBackgrounds movieId={id} />
      </div>

      {/* Gradient overlay bottom (Netflix fade to black) */}
      <div className="absolute bottom-0 w-full h-[120px] md:h-[200px] bg-gradient-to-b from-transparent to-black"></div>
    </div>
  );
};

export default ImpContainer;
