"use client";
import React from "react";
import { useState, useEffect } from "react";
import { UpdateMovie } from "./UpdateMovies";
import { GetMovieList } from "./GetMovies";

const MovieData = () => {
  const [movies, setMovies] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");

  useEffect(() => {
    GetMovieList(setMovies);
  }, []);

  return (
    <div>
      <h1>Movie Data:</h1>
      <div>
        {movies.map((m, idx) => (
          <div key={idx}>
            <p>
              Title: {m.name}; Release Date: {m.release_date};{" "}
              {m.isWinOscar ? "Won" : "No"}
            </p>
            <input placeholder="new title" onChange={(e) => setNewMovieTitle(e.target.value)}/>
            <button onClick={() =>UpdateMovie(m.id, newMovieTitle)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieData;
