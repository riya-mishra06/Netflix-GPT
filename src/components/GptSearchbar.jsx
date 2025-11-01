import React, { useRef, useState } from "react";
import lang from "../utils/languageContant";
import { useDispatch, useSelector } from "react-redux";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_OPTIONS, GEMINI_KEY } from "../utils/constants";
import { addGptMovieResults } from "../utils/gptSlice";

const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

let isCalling = false;

const GptSearchbar = () => {
  const dispatch = useDispatch();
  const langkey = useSelector((store) => store.config?.lang) || "en";
  const searchText = useRef();
  const [chats, setChats] = useState([]);

  // Search TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    if (isCalling) return;
    isCalling = true;

    const userQuery = searchText.current.value;
    if (!userQuery.trim()) return;

    setChats((prev) => [...prev, { role: "user", text: userQuery }]);

    const prompt =
      `Recommend top 5 movies based on: ${userQuery}. 
       Format: Movie1, Movie2, Movie3, Movie4, Movie5`;

    try {
      const response = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });

      const output = await response.response.text();
      setChats((prev) => [...prev, { role: "ai", text: output }]);

      const gptMovies = output.split(",").map((m) => m.trim());
      const promiseArray = gptMovies.map(searchMovieTMDB);
      const tmdbResults = await Promise.all(promiseArray);

      dispatch(addGptMovieResults({ movieNames: gptMovies, movieResults: tmdbResults }));
    } catch (err) {
      setChats((prev) => [...prev, { role: "ai", text: "⚠️ Try again" }]);
    }

    searchText.current.value = "";
    setTimeout(() => (isCalling = false), 5000);
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Search Box */}
      <form
        className="w-full max-w-md sm:max-w-xl md:max-w-2xl flex gap-2 sm:gap-3
                   bg-black/70 p-3 sm:p-4 rounded-lg backdrop-blur-md
                   border border-white/20 shadow-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="flex-1 px-4 py-2 rounded-md bg-gray-900 text-white placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-red-600 transition"
          placeholder={lang[langkey]?.gptSearchPlaceholder}
        />

        <button
          onClick={handleGptSearchClick}
          className="px-4 sm:px-6 py-2 rounded-md bg-red-600 hover:bg-red-700 transition font-semibold"
        >
          {lang[langkey]?.search}
        </button>
      </form>

      {/* Chat Bubbles */}
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl flex flex-col gap-3 mt-6">
        {chats.map((chat, i) => (
          <div
            key={i}
            className={`max-w-[85%] p-3 sm:p-4 rounded-lg text-sm sm:text-base leading-relaxed shadow
            ${
              chat.role === "user"
                ? "ml-auto bg-red-600 text-white rounded-br-none"
                : "mr-auto bg-gray-900 text-gray-200 border border-gray-700 rounded-bl-none"
            }`}
          >
            {chat.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GptSearchbar;
