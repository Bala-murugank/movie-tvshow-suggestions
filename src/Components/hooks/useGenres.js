const useGenres = (selected_genres) => {
         
         if(selected_genres.length < 1 ) return " "

         return selected_genres.reduce((acc,curr) => acc.id + "," + curr.id)
 
}

export default useGenres