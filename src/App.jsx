import React, {useState} from 'react'
import Search from './components/Search'

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <main>
            <div className="pattern">
                <h3 className="text-6xl font-bold text-center mt-4 text-gradient">FLickhunt</h3>
            </div>
            <div className="wrapper">
                <header>

                    <img src="../public/hero.png" alt="hero banner" className="mx-auto" />
                    <h1>Find <span className="text-gradient">Movies</span> You Love</h1>
                </header>


                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
        </main>
    )
}
export default App