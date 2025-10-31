import Header from './Header'
import useNowPlayingMovie   from "../hooks/useNowPlayingMovie"
import SecondaryContainer from './SecondaryContainer'
import ImpContainer from './ImpContainer';
import usePopularMovies from "../hooks/usePopularMovies"
import GPTSearch from './GPTSearch';


const Browse = () => {
useNowPlayingMovie();  
usePopularMovies();
  return (
    <>
    <div className=''>
      <Header/>
      <GPTSearch/>
      <ImpContainer/>
    
      <SecondaryContainer/>
   
      
    </div>
    </>
  )
}

export default Browse