import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";

const api_base_url = "https://api.themoviedb.org/3";
const api_key = import.meta.env.VITE_TMDB_API_KEY;

const api_options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${api_key}`,
    },
};

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Debounce Effect (Wait 500ms after last keystroke)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchTerm]);

    const fetchMovies = async (query = "") => {
        setIsLoading(true);
        setErrorMessage("");

        try {
            const endpoint = query
                ? `${api_base_url}/search/movie?query=${encodeURIComponent(query)}`
                : `${api_base_url}/discover/movie?sort_by=popularity.desc`;

            const response = await fetch(endpoint, api_options);
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setMovieList(data.results || []);
        } catch (e) {
            console.error(`Error fetching movies: ${e}`);
            setErrorMessage("Error Fetching Movies. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch movies when debouncedSearch updates
    useEffect(() => {
        fetchMovies(debouncedSearch);
    }, [debouncedSearch]);

    return (
        <main>
            <div className="pattern">
                <h3 className="text-6xl font-bold text-gradient sm:p-5 sm:text-center md:text-left md:p-8">
                    flickhunt
                </h3>
            </div>
            <div className="wrapper">
                <header>
                    <img src="/hero.png" alt="hero banner" className="mx-auto" />
                    <h1>
                        Find <span className="text-gradient">Movies</span> You Love
                    </h1>

                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>

                <section className="all-movies">
                    <h2 className="mt-[40px]">All Movies</h2>
                    {isLoading ? (
                        <Spinner />
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <ul>
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    );
};

export default App;
