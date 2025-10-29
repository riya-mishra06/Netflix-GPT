import React, { useRef, useState } from 'react';
import Header from './Header';
import validate from '../utils/validate';
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth';

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
      name?.current?.value,
      email.current.value,
      password.current.value,
      isSignInForm
    );
    setErrorMessage(message);

    if (message) return; // Stop if invalid

    // Success - you can add login/signup logic here
    console.log('✅ Form submitted successfully!');
  };

  return (
    <>
      <div className="relative w-full h-screen flex flex-col">
        <Header />

        {/* Background */}
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover brightness-50"
            src="https://assets.nflxext.com/ffe/siteui/vlv3/9ba9f0e2-b246-47f4-bd1f-3e84c23a5db8/web/IN-en-20251020-TRIFECTA-perspective_d6da84e9-6145-4b1e-bb51-e402c966a045_large.jpg"
            alt="Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
        </div>

        {/* Login Box */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/75 backdrop-blur-sm text-white rounded-xl shadow-2xl px-10 py-8 w-[90%] sm:w-[60%] md:w-[35%] transition-all duration-300 hover:scale-[1.02]">
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-6 tracking-wide text-red-600 drop-shadow-md">
              {isSignInForm ? 'Sign In' : 'Create Account'}
            </h2>

            {/* Full Name only for Sign Up */}
            {!isSignInForm && (
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="p-3 m-2 w-full rounded bg-gray-700 placeholder-gray-300 text-white focus:ring-2 focus:ring-red-500 outline-none transition"
              />
            )}

            <input
              ref={email}
              type="email"
              placeholder="Email Address"
              className="p-3 m-2 w-full rounded bg-gray-700 placeholder-gray-300 text-white focus:ring-2 focus:ring-red-500 outline-none transition"
            />

            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="p-3 m-2 w-full rounded bg-gray-700 placeholder-gray-300 text-white focus:ring-2 focus:ring-red-500 outline-none transition"
            />

            {/* Error message */}
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2 font-semibold">
                {errorMessage}
              </p>
            )}

            <button
              onClick={handleButtonClick}
              className="p-3 mt-6 bg-red-600 hover:bg-red-700 w-full rounded font-semibold text-lg shadow-md transition-transform duration-200 hover:scale-[1.03]"
            >
              {isSignInForm ? 'Sign In' : 'Sign Up'}
            </button>

            <div className="flex justify-between items-center w-full text-sm text-gray-400 mt-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-red-600" /> Remember me
              </label>
              <span className="hover:underline cursor-pointer">Need help?</span>
            </div>

            <p className="py-5 text-gray-300">
              {isSignInForm ? (
                <>
                  New to Netflix?{' '}
                  <span
                    className="text-white font-semibold cursor-pointer hover:underline"
                    onClick={toggleSignInForm}
                  >
                    Sign up now
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <span
                    className="text-white font-semibold cursor-pointer hover:underline"
                    onClick={toggleSignInForm}
                  >
                    Sign in
                  </span>
                </>
              )}
            </p>

            <p className="text-xs text-gray-400 text-center max-w-sm">
              This page is protected by Google reCAPTCHA to ensure you’re not a bot.
            </p>
          </form>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-4 w-full text-center text-gray-500 text-xs">
          <p>
            © 2025 Netflix Clone • Designed by{' '}
            <span className="text-red-500 font-medium">Riya ❤️</span>
          </p>
        </footer>
      </div>
    </>
  );
};

export default Login;
