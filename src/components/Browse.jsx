import Header from './Header'
import useNowPlayingMovie   from "../hooks/useNowPlayingMovie"
import SecondaryContainer from './SecondaryContainer'
import ImpContainer from './ImpContainer';
import usePopularMovies from "../hooks/usePopularMovies"


const Browse = () => {
useNowPlayingMovie();  
usePopularMovies();
  return (
    <>
    <div className=''>
      <Header/>
    <ImpContainer/>
    
      <SecondaryContainer/>
   
      
    </div>
    </>
  )
}

export default Browse