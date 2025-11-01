import React from "react";
import GptSearchbar from "./GptSearchbar";
import GptMovieSuggestion from "./GptMovieSuggestion";
import { bg } from "../utils/constants";

const GPTSearch = () => {
  return (
    <div className="relative w-full min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={bg}
          className="w-full h-full object-cover brightness-40"
          alt="Netflix Background"
        />
        {/* Netflix dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-20 flex flex-col items-center 
                      px-2 sm:px-4 md:px-10 min-h-screen pt-24 md:pt-32">
        
        {/* Search Bar */}
        <div className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl mb-6 sm:mb-10">
          <GptSearchbar />
        </div>

        {/* Movie Suggestions (Netflix Rows) */}
        <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-full">
          <GptMovieSuggestion />
        </div>
      </div>
    </div>
  );
};

export default GPTSearch;
