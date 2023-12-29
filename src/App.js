
import './App.css';
import { Route, Routes } from "react-router-dom";
import React from "react";
import "react-circular-progressbar/dist/styles.css";
import Header from './Components/Header/Header';
import FooterNavigatioin from './Components/FooterNavigation/FooterNavigatioin';
import TrendingToday from './Components/Trendings/TrendingToday';
import WebSeries from './Components/WebSeries/WebSeries';
import Search from './Components/Search/Search';
import Movies from './Components/Movies/Movies';


function App() {
  return (
    <div className="App">
     
      
        <Header />
     

      <div className="movie_suggestion_content">
        <Routes>
          <Route
            path="/"
            element={
             
                <TrendingToday />
              
            }
          />
          <Route
            path="movies"
            element={
              
                <Movies />
              
            }
          />
          <Route
            path="series"
            element={
              
                <WebSeries />
             
            }
          />
          <Route
            path="search"
            element={
                <Search />
             
            }
          />
        </Routes>
      </div>
      
         <FooterNavigatioin />
      
     
     
    </div>
  );
}

export default App;
