import React from "react";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

const VideoTitle = ({ title, overview, backdropPath }) => {
  return (
    <div className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-screen text-white flex items-end">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${backdropPath})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10"></div>
      </div>

      {/* Content */}
      <div className="pl-4 sm:pl-10 pb-20 max-w-lg sm:max-w-xl md:max-w-2xl space-y-4">
        
        {/* Title */}
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]">
          {title}
        </h1>

        {/* Overview */}
        <p className="hidden sm:block text-sm sm:text-base md:text-lg font-medium text-gray-200 line-clamp-3 drop-shadow-xl">
          {overview}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 sm:gap-4 mt-4">
          <button className="flex items-center bg-white text-black font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-gray-300 transition duration-300 shadow-lg text-sm sm:text-base">
            <FaPlay className="mr-2" />
            Play
          </button>

          <button className="flex items-center bg-gray-700/70 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-gray-600/80 transition duration-300 shadow-lg text-sm sm:text-base">
            <AiOutlineInfoCircle className="mr-2 text-lg" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
