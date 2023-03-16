//import { useState } from "react";
import './Search.css';

export const Search = ({ setSearch }) => {

    let searchBtn = (e) => {
        e.preventDefault();
    }

    return (
     <div className="search-container">
         <input
           className="input-search"
           placeholder="Buscar..."
           type='text'
           onChange={(e) => {
            setSearch(e.target.value)
           }}
         />
         <button
            onClick={searchBtn}
         >
          Buscar
         </button>
     </div>
    )
}