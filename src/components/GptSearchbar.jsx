import React from 'react'
import lang from "../utils/languageContant"
import { useSelector } from "react-redux";

const GptSearchbar = () => {

  const langkey = useSelector((store) => store.config?.lang) || "en";

  return (
    <div className="w-full min-h-screen flex items-start justify-center py-10">
      <form 
        className="flex items-center gap-3 p-6 m-4 md:m-12 bg-black rounded-lg shadow-lg w-full max-w-2xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          name="search"
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-700"
          placeholder={lang[langkey]?.gptSearchPlaceholder}
          autoComplete="off"
        />

        <button
          type="submit"
          className="py-2 px-6 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold shadow transition-colors duration-200"
        >
          {lang[langkey]?.search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchbar;
