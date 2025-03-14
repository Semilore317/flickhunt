import React, {useState, useEffect} from 'react'
import Search from './components/Search'

const api_base_url=  'https://api.themoviedb.org/3';

const api_key = import.meta.env.VITE_TMDB_API_KEY;

const api_options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${api_key}`,
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const [errorMessage, setErrorMessage] = useState('')

    const fetchMovies = async () => {
        try{
            const endpoint = `${api_base_url}/movies/${searchTerm}`
        }catch(e){
            console.log(`Error fetching movies: ${e}`);
            setErrorMessage(`Error Fetching Movies: \n ${e.response.data}`);
        }
    }

    useEffect(() => {

    }, [])
    return (
        <main>
            <div className="pattern">
                <h3 className="text-6xl font-bold text-gradient sm:p-5 sm:text-center md:text-left md:p-8">flickhunt</h3>
            </div>
            <div className="wrapper">
                <header>

                    <img src="../public/hero.png" alt="hero banner" className="mx-auto" />
                    <h1>Find <span className="text-gradient">Movies</span> You Love</h1>

                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>

                <section className="all-movies">
                    <h2>All Movies</h2>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </section>
            </div>
        </main>
    )
}
export default App