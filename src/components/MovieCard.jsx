import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath, title }) => {
  if (!posterPath) return null;

  return (
    <div className="group min-w-[120px] h-[180px] sm:min-w-[140px] sm:h-[210px] md:min-w-[170px] md:h-[260px] lg:min-w-[190px] lg:h-[300px] cursor-pointer transition-transform duration-300 hover:scale-110 relative rounded-lg overflow-hidden bg-black">

      {/* Poster */}
      <img
        className="h-full w-full object-cover rounded-lg"
        src={IMG_CDN_URL + posterPath}
        alt={title || "Movie Poster"}
      />

      {/* Hover Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {/* Hover Title */}
      {title && (
        <p className="absolute bottom-2 left-2 right-2 text-xs sm:text-sm md:text-base font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md">
          {title}
        </p>
      )}
    </div>
  );
};

export default MovieCard;
