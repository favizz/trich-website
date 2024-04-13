"use client";
import React from "react";
import { auth } from "../../config/firebase";
import { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

const AddMovies = () => {
  const moviesCollectionRef = collection(db, "movies");

  const [movieTitle, setMovieTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState(0);
  const [winOscar, setWinOscar] = useState(false);

  const handleMovieSubmit = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        user_id: auth?.currentUser?.uid,
        name: movieTitle,
        release_date: releaseDate,
        isWinOscar: winOscar,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-400">
      <input
        placeholder="movie name"
        type="text"
        onChange={(e) => setMovieTitle(e.target.value)}
      />
      <input
        placeholder="year"
        type="number"
        onChange={(e) => setReleaseDate(e.target.valueAsNumber)}
      />
      <input
        placeholder="won oscar?"
        type="checkbox"
        onChange={(e) => setWinOscar(e.target.checked)}
      />
      <button onClick={() => handleMovieSubmit()}>Submit</button>
    </div>
  );
};

export default AddMovies;
