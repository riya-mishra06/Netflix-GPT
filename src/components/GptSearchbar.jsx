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

  // Search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
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

    // Push User
    setChats((prev) => [...prev, { role: "user", text: userQuery }]);

    const prompt =
      "Act as a movie recommendation system & suggest movies based on the query: " +
      userQuery +
      ". Only give top 5 movies, comma separated. Example: Gadar, Sholay, Sanam Teri Kasam, 1920, Golmaal";

    try {
      const response = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });

      const output = await response.response.text();

      // Push AI reply
      setChats((prev) => [...prev, { role: "ai", text: output }]);

      // Extract Movie Names
      const gptMovies = output.split(",").map((m) => m.trim());

      // Search each movie in TMDB
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      console.log("TMDB Movies 👉", tmdbResults); // you will get array of movie objects here
      dispatch(addGptMovieResults({movieNames: gptMovies, movieResults: tmdbResults}));
    } catch (err) {
      setChats((prev) => [
        ...prev,
        { role: "ai", text: "⚠ Error / Rate limit. Try again!" },
      ]);
    }

    searchText.current.value = "";
    setTimeout(() => (isCalling = false), 6000);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-10 bg-black text-white">

      {/* Input Box */}
      <form
        className="flex items-center gap-3 p-6 bg-[#111] rounded-lg w-full max-w-2xl shadow-xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-red-700"
          placeholder={lang[langkey]?.gptSearchPlaceholder}
          autoComplete="off"
        />

        <button
          onClick={handleGptSearchClick}
          className="py-2 px-6 bg-red-700 hover:bg-red-800 rounded-lg"
        >
          {lang[langkey]?.search}
        </button>
      </form>

      {/* Chat */}
      <div className="w-full max-w-2xl flex flex-col gap-3 mt-6">
        {chats.map((chat, i) => (
          <div
            key={i}
            className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
              chat.role === "user"
                ? "ml-auto bg-red-600 text-white rounded-br-none"
                : "mr-auto bg-gray-800 border border-gray-600 rounded-bl-none"
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