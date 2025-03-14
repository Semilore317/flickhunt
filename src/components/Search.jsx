import React from 'react'
import searchImage from "/public/search.svg"

const Search = ({searchTerm, setSearchTerm}) => {
    return (
    <div className="relative w-full max-w-lg mx-auto">
        <input
            type="text"
            placeholder="Search for your favorite movie"
            className="w-full px-5 py-3 pl-12 text-white bg-[rgba(225,225,225,0.2)] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
            src={searchImage}
            alt="Search"
            className="absolute left-4 top-3.5 h-5 w-5"
        />
    </div>
    )
}
export default Search
