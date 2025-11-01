import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, dp, LANG } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { HiMenu, HiX } from "react-icons/hi";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

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
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black via-black/70 to-transparent px-4 md:px-10 py-3 flex justify-between items-center backdrop-blur-md">

      {/* Logo */}
      <img
        src={LOGO}
        alt="Netflix"
        className="w-28 sm:w-36 cursor-pointer hover:opacity-90 transition"
        onClick={() => navigate("/browse")}
      />

      {user && (
        <>
          {/* Mobile Menu Toggle */}
          <div className="md:hidden text-white text-3xl" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <HiX /> : <HiMenu />}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-5 text-white">

            {/* GPT Button */}
            <button
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition font-medium"
              onClick={handleGptSearchClick}
            >
              {showGptSearch ? "Home" : "Ask AI"}
            </button>

            {/* Language Dropdown */}
            {showGptSearch && (
              <select
                className="bg-black/70 text-white border border-white/40 rounded-lg px-3 py-2 cursor-pointer"
                onChange={handleLanguageChange}
              >
                {LANG.map((l) => (
                  <option key={l.identifier} value={l.identifier}>{l.name}</option>
                ))}
              </select>
            )}

            {/* Profile */}
            <div className="relative">
              <img
                src={dp}
                className="w-10 h-10 rounded-md cursor-pointer border border-gray-500"
                onClick={() => setMenuOpen(!menuOpen)}
              />

              {/* Dropdown */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-black text-white border border-gray-600 rounded-md shadow-lg py-2 animate-fadeIn">
                  <p className="px-4 py-2 hover:text-red-400 cursor-pointer">Profile</p>
                  <p className="px-4 py-2 hover:text-red-400 cursor-pointer">Settings</p>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 hover:bg-red-600 rounded-md"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Slide Menu */}
          {mobileMenu && (
            <div className="absolute top-14 right-4 bg-black/95 w-48 text-white p-4 rounded-lg shadow-lg border border-gray-700 md:hidden animate-slideDown">

              <button
                className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 mb-3"
                onClick={handleGptSearchClick}
              >
                {showGptSearch ? "Home" : "Ask AI"}
              </button>

              {showGptSearch && (
                <select
                  onChange={handleLanguageChange}
                  className="w-full bg-black border border-white/40 p-2 rounded mb-3"
                >
                  {LANG.map((l) => (
                    <option key={l.identifier} value={l.identifier}>{l.name}</option>
                  ))}
                </select>
              )}

              <button onClick={handleSignOut} className="w-full bg-red-600 py-2 rounded-lg">
                Sign Out
              </button>
            </div>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
