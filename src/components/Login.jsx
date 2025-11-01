import React, { useRef, useState } from "react";
import Header from "./Header";
import validate from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  const handleButtonClick = () => {
    const message = validate(
      !isSignInForm ? name.current?.value : null,
      email.current.value,
      password.current.value,
      isSignInForm
    );
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(() => alert("✅ Account created successfully!"))
        .catch((error) => setErrorMessage(error.message));
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(() => alert("✅ Signed in successfully!"))
        .catch((error) => setErrorMessage(error.message));
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">

      {/* Header */}
      <Header />

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          className="w-full h-full object-cover opacity-60"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9ba9f0e2-b246-47f4-bd1f-3e84c23a5db8/web/IN-en-20251020-TRIFECTA-perspective_d6da84e9-6145-4b1e-bb51-e402c966a045_large.jpg"
          alt="Background"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Card */}
      <div className="bg-black/80 rounded-xl p-8 sm:p-10 w-[90%] sm:w-[70%] md:w-[35%] shadow-2xl border border-white/10 backdrop-blur-md animate-fadeIn">

        <h2 className="text-3xl font-bold text-white mb-6">
          {isSignInForm ? "Sign In" : "Create Account"}
        </h2>

        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">

          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="p-3 rounded bg-neutral-800 focus:bg-neutral-700 text-white placeholder-gray-400 border border-neutral-700 focus:border-red-600 outline-none"
            />
          )}

          <input
            ref={email}
            type="email"
            placeholder="Email Address"
            className="p-3 rounded bg-neutral-800 focus:bg-neutral-700 text-white placeholder-gray-400 border border-neutral-700 focus:border-red-600 outline-none"
          />

          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-3 rounded bg-neutral-800 focus:bg-neutral-700 text-white placeholder-gray-400 border border-neutral-700 focus:border-red-600 outline-none"
          />

          {errorMessage && (
            <p className="text-red-500 text-sm font-semibold">{errorMessage}</p>
          )}

          <button
            onClick={handleButtonClick}
            className="bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold shadow-md transition-all hover:scale-[1.02]"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p className="text-gray-300 text-sm mt-5 text-center">
          {isSignInForm ? (
            <>
              New to Netflix?{" "}
              <span
                className="text-white font-medium cursor-pointer hover:underline"
                onClick={toggleSignInForm}
              >
                Create Account
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-white font-medium cursor-pointer hover:underline"
                onClick={toggleSignInForm}
              >
                Sign In
              </span>
            </>
          )}
        </p>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-gray-400 text-xs text-center">
        © 2025 Netflix Clone • Made by <span className="text-red-500">Riya ❤️</span>
      </footer>
    </div>
  );
};

export default Login;
