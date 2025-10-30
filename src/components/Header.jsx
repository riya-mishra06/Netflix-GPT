import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {addUser, removeUser} from "../utils/userSlice"
import {LOGO,DP} from "../utils/constants"
const Header = () => { 
  const dispatch = useDispatch()

  const navigate = useNavigate();
  const user = useSelector((state) => state.user); // 👈 Get user from Redux

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/"); // redirect to login/home page
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
        navigate("/error");
      });
  };

useEffect(() => {
  const unsubscrible = onAuthStateChanged(auth, (user) => {
  if (user) {
    const {uid,email,displayname} = user;
    dispatch(addUser({uid:uid,email:email,displayname:displayname}))
  navigate("/browse")
  } else {
   dispatch(removeUser());
    navigate("/")
  }
});
//this is will be called when component unmount
return () => unsubscrible();
},[])



  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/90 via-black/70 to-transparent px-8 py-4 flex justify-between items-center">
        {/* Netflix Logo */}
        <img
          className="w-32 sm:w-40 cursor-pointer hover:scale-105 transition-transform duration-300"
          src={LOGO}   alt="Netflix Logo"
          onClick={() => navigate("/browse")}
        />

        {/* Show user profile & sign out only if logged in */}
        {user && (
          <div className="flex items-center gap-4">
            {/* Profile Avatar */}
            <div className="relative group">
              <img
                className="h-10 w-10 sm:h-11 sm:w-11 rounded-md object-cover border border-gray-600 cursor-pointer hover:scale-110 transition-transform duration-300"
                src={DP}         alt="User Icon"
              />
              
              {/* Tooltip */}
              <div className="absolute hidden group-hover:flex flex-col bg-black/80 text-white text-xs px-3 py-2 rounded-md top-12 right-0 shadow-md border border-gray-700">
                <p className="whitespace-nowrap hover:text-red-400 cursor-pointer">Profile</p>
                <p className="whitespace-nowrap mt-1 hover:text-red-400 cursor-pointer">Settings</p>
              </div>
            </div>

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-red-500/30"
            >
              Sign Out
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
