import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackgrounds = ({ movieId }) => {
  useMovieTrailer(movieId);

  const trailerVideo = useSelector((store) => store.movie?.trailerVideo);

  if (!trailerVideo?.key) return null;

  return (
    <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
      <iframe
        className="w-full h-full object-cover"
        src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo.key}&modestbranding=1&rel=0&showinfo=0`}
        title="Movie Trailer"
        frameBorder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      ></iframe>

      {/* Fade for text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black"></div>
    </div>
  );
};

export default VideoBackgrounds;
