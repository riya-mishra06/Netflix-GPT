import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, dp, LANG } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from '../utils/configSlice'

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch(() => navigate("/error"));
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/95 via-black/70 to-transparent px-8 py-4 flex justify-between items-center">
      <img
        className="w-32 sm:w-40 cursor-pointer hover:scale-105 transition-transform duration-300"
        src={LOGO}
        alt="Netflix Logo"
        onClick={() => navigate("/browse")}
      />

      {user && (
        <div className="flex items-center gap-4">

          {/* ✅ GPT Search Button */}
          <button
            className="py-2 px-4 m-2 bg-purple-700 text-white rounded-lg cursor-pointer hover:bg-purple-800 transition-all"
            onClick={handleGptSearchClick}
          >
          {showGptSearch ? "Homepage" : "GPT Search"}
          </button>

          {/* ✅ Language Selector */}

          {showGptSearch && <select
            className="
              p-2 px-4 bg-black text-white border border-white/50 rounded-lg 
              backdrop-blur-md focus:outline-none focus:border-white 
              transition cursor-pointer hover:bg-gray-900
            "
            onChange={handleLanguageChange}
          >
            {LANG.map((language) => (
              <option
                key={language.identifier}
                value={language.identifier}
                className="bg-black text-white"
              >
                {language.name}
              </option>
            ))}
          </select>

          }

          <div className="relative group flex items-center">

            {/* Profile Image */}
            <img
              className="h-10 w-10 mt-1 sm:h-11 sm:w-11 rounded-md object-cover border border-gray-600 cursor-pointer hover:scale-110 transition"
              src={dp}
              alt="User Icon"
            />

            {/* Tooltip */}
            <div className="absolute hidden group-hover:flex flex-col bg-black/80 text-white text-xs px-3 py-2 rounded-md top-12 right-0 shadow-md border border-gray-700">
              <p className="whitespace-nowrap hover:text-red-400 cursor-pointer">Profile</p>
              <p className="whitespace-nowrap mt-1 hover:text-red-400 cursor-pointer">Settings</p>
            </div>
          </div>

          {/* ✅ Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md text-sm sm:text-base transition-all shadow-md hover:shadow-red-500/30"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
