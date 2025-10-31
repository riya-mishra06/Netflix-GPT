import { useSelector } from "react-redux";
import VideoBackgrounds from "./VideoBackgrounds";
import VideoTitle from "./VideoTitle";

const ImpContainer = () => {
    const movies = useSelector(store => store.movie?.nowPlayingMovies);

    // Return null if movies is undefined or empty
    if (!movies || movies.length === 0) return null;

    const mainMovie = movies[0];
   

    const { original_title, overview,id} = mainMovie;

    return (
        <div>
            <VideoTitle title={original_title} overview={overview} />
            <VideoBackgrounds movieId={id} />
        </div>
    );
};

export default ImpContainer;
