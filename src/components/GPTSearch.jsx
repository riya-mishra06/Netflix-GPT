import React from 'react'
import GptSearchbar from './GptSearchbar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { bg } from '../utils/constants'

const GPTSearch = () => {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover brightness-50"
          src={bg}
          alt="Background"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
      </div>
      <div className="relative z-20">
        <GptSearchbar/>
        <GptMovieSuggestion/>
      </div>
    </div>
  )
}

export default GPTSearch