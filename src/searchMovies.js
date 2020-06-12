import React, {useState} from "react";
import './movieCard.js';
import MovieCard from "./movieCard.js";
export default function SearchMovies(){

    //states- input query, movies
    const[query, setQuery] = useState(''); //the initial value will be empty string
    const[movies, setMovies] = useState([]);
    const searchMovies = async (e) => {
        e.preventDefault();
        //const query = "Jurassic Park";
        const url = `https://api.themoviedb.org/3/search/movie?api_key=027b42f1f6071d2a24017e08414ccaf0&language=en-US&query=${query}&page=1&include_adult=false`;
        
        try {
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results);
        }catch(err){
            console.error(err);
        }
    }
    return (
        <>
        <form className="form" onSubmit={searchMovies}>
            <label className="label" htmlFor="query">Movie Name</label>
            <input className="input" type="text" name="query"
                placeholder="i.e. Jurassic Park"
                value={query} onChange={(e) => setQuery(e.target.value)}/>
            <button className="button" type="submit">Search</button>
        </form>
        <div className="card-list">
            {movies.filter(movie => movie.poster_path).map(movie => (
                <MovieCard movie={movie} key={movie.id}/> //keep movies which have posters
            ))}
        </div>
        </>
    )
}