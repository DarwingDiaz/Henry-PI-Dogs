import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions";
import  "./navbar.styles.css"

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
        <nav className="navbar">
            
            <div className="search">
            <div className="logo">
                <h1>logo</h1>
            </div>
            <form onSubmit={handleSubmit} >
                <input 
                    className="input"
                    type="text" 
                    onChange={handleInput} 
                    value={searchDog} 
                    placeholder="Name of a dog..."/>
                <button className="busqueda" type="submit">Search</button>
            </form>
            </div>
        </nav>
    )
}

export default NavBar;