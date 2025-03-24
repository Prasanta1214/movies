
import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';
import Layout from './components/Layout';
import {Route ,Routes} from 'react-router-dom'
import Home from './components/home/Home';
import Header from './components/header/Header';

import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
function App() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] =useState();
  const [movie ,setMovie] = useState();


  useEffect(() => {
    const getMovies = 'http://localhost:8080/api/v1/movies'; // Replace with the actual API URL

    axios.get(getMovies)
      .then((response) => {
        
        setMovies(response.data); // Axios automatically parses JSON
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        setMovies(null);
      });
  }, []);

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  const getMovieData = async(movieId)=>{
    try {
      const response= await api.get(`http://localhost:8080/api/v1/movies/${movieId}`)
      const singleMovie=response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.rewiews)
    } catch (error) {
      
    }
  }

  return (
    <div className='App'>
     <Header></Header>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route path='/'element={<Home movies={movies}/>}></Route>
        <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
        <Route path='/Reviews/:movieId' element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews}/>}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
