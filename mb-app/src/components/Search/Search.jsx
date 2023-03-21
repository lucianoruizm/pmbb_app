//import { useState } from "react";
import './Search.css';

export const Search = ({ setSearch, page }) => {

    return (
     <div className="search-container">
         <input
           className="input-search"
           placeholder="Buscar..."
           type='text'
           onChange={(e) => {
            setSearch(e.target.value)
            page(1);
           }}
         />
     </div>
    )
}