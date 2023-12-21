

// import "./navbar.styles.css";

// function NavBar({handleChange,handleSubmit}){
//     return(
//         <div className="search-box">
//             <form onChange={handleChange}>
//                 <input placeholder="Busqueda" type="search" />
//                 <button type="submit" onClick={handleSubmit}>
//                     Buscar
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default NavBar;


import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions";
// import Styles from "./SearchBar.module.css"

const NavBar = ({pagination}) => {
    const dispatch = useDispatch();
    const [searchDog, setSearchDog] = useState("");

    const handleInput = (event) => {
        setSearchDog(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(searchDog) {
            dispatch(getByName(searchDog))}
        setSearchDog("")
        pagination(1)
    }

    return(
        <div >
            <form onSubmit={handleSubmit} >
                <input 
                    type="text" 
                    onChange={handleInput} 
                    value={searchDog} 
                    placeholder="Name of a dog..."/>
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default NavBar;