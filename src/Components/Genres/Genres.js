import React,{useEffect} from 'react'
import CloseButton from "react-bootstrap/CloseButton";
import axios from 'axios'


const Genres = ({genres, setGenres,selectedGenres,setSelectedGenres,media_type}) => {
   


    useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/genre/${media_type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    .then(res => {setGenres(res.data.genres)
   
  })
  // eslint-disable-next-line 
  },[])

  const handleAddSetSelectedGenres = (genre) =>{

    setSelectedGenres([...selectedGenres,genre])
    setGenres(genres.filter((value) => value.id !== genre.id))
      
  }

  const handleRemoveSetSelectedGenres = (genre) =>{
    
    setSelectedGenres( selectedGenres.filter(value => value.id !== genre.id))
    setGenres([...genres,genre])
   
  }
  return (
    <>
    <div className="geners">
        {
            selectedGenres.map((genreList) => (

          <span key={genreList.id} className='selected_genres'>
            {genreList.name}
            <CloseButton  onClick={() => handleRemoveSetSelectedGenres(genreList)}/>
          </span>
        ))}

        

        {
           genres && genres.map((genreList) => (
          <span key={genreList.id} onClick={() => 
         { handleAddSetSelectedGenres(genreList) 
         
          }}>
            {genreList.name}
           
          </span>
        ))}
      </div>
      
    </>
  )
}

export default Genres
