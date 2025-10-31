import React from 'react';
import { FaPlay } from 'react-icons/fa'; // Play icon
import { AiOutlineInfoCircle } from 'react-icons/ai'; // Info icon

const VideoTitle = ({ title, overview, backdropPath }) => {
  return (
    <div className="relative h-screen w-full text-white">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${backdropPath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="absolute bottom-1/4 left-10 max-w-xl">
        {/* Title */}
        <h1 className="text-6xl font-bold mb-4 drop-shadow-xl">{title}</h1>

        {/* Overview */}
        <p className="text-lg mb-6 line-clamp-3 drop-shadow-lg">{overview}</p>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button className="flex items-center bg-white text-black font-semibold px-6 py-3 rounded hover:bg-gray-300 transition duration-300 shadow-lg">
            <FaPlay className="mr-2" />
            Play
          </button>
          <button className="flex items-center bg-gray-700 bg-opacity-70 text-white font-semibold px-6 py-3 rounded hover:bg-opacity-90 transition duration-300 shadow-lg">
            <AiOutlineInfoCircle className="mr-2 text-lg" />
            More Info
          </button>
        </div>
      </div>

      {/* Optional bottom fade */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
};

export default VideoTitle;
