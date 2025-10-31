import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackgrounds = ({ movieId }) => {
  useMovieTrailer(movieId);

  const trailerVideo = useSelector(store => store.movie?.trailerVideo);

  if (!trailerVideo?.key) return null;

  return (
    <div className="w-full h-full absolute inset-0 -z-10">
      <iframe
        width="100%"
        height="100%"
        className="object-cover"
        src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo.key}`}
        title="Movie Trailer"
        frameBorder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackgrounds;
