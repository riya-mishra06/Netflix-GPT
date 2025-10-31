import Header from './Header'
import useNowPlayingMovie   from "../hooks/useNowPlayingMovie"
import SecondaryContainer from './SecondaryContainer'
import ImpContainer from './ImpContainer';


const Browse = () => {
useNowPlayingMovie();  
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