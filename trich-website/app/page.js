import Image from "next/image";
import { Auth } from "./components/auth";
import MovieData from "./components/MovieData";
import AddMovies from "./components/AddMovies";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-16">
      <AddMovies/>
      <MovieData/>
    </main>
  );
}
