import React, {useState} from 'react'
import Search from './components/Search'

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <main>
            <div className="pattern">
                <h3 className="text-6xl font-bold text-gradient sm:p-5 sm:text-center md:text-left md:p-8">FLickhunt</h3>
            </div>
            <div className="wrapper">
                <header>

                    <img src="../public/hero.png" alt="hero banner" className="mx-auto" />
                    <h1>Find <span className="text-gradient">Movies</span> You Love</h1>
                </header>

                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <h1 className="text-white">{searchTerm}</h1>
            </div>
        </main>
    )
}
export default App