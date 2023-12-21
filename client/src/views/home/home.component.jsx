import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    getDogs, 
    filterCreateDog,
    filterTemperament, 
    orderByName, 
    orderWeight, 
    getTemperament } from "../../redux/actions/index"
import NavBar from "../../components/navbar/navbar.components";
import Card from "../../components/Card/card.component"
import Pagination from "../../components/Pagination/pagination.component";
import Loading from "../../components/Loading/loading.component"

import "./home.styles.css";

function Home(){

    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs) || [];
    const allTemperaments = useSelector((state) => {return state.temperament})
    const [searchString, setSearchString] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
        setDogsPerPage(8);
    }

    const currentDogs = allDogs.slice(
        (currentPage - 1) * dogsPerPage,
        currentPage * dogsPerPage
    )

    const handleClick = () => {
        dispatch(getDogs());
        setCurrentPage(1);
        setSearchString("");
    }

    const handlerFilterCreated = (event) => {
        dispatch(filterCreateDog(event.target.value))
        setCurrentPage(1)
    }

    const handlerFilterTemperament = (event) => {
        dispatch(filterTemperament(event.target.value))
        setCurrentPage(1)
    }

    const handlerFilterByName = (event) => {
        const selectedValue = event.target.value
        dispatch(orderByName(selectedValue))
        setCurrentPage(1)
        //setSearchString(`Order by ${selectedValue}`)
        setSearchString(selectedValue === "Order" ? "" : `Order by ${selectedValue}`)
    }

    const handlerFilterByWeight = (event) => {
        
        dispatch(orderWeight(event.target.value))
        setCurrentPage(1)
        setSearchString(`Order by ${event.target.value}`)
    }

    // function handleChange(e){
    //      e.preventDefault();
    //     setSearchString(e.target.value)
    // }

    //*Filtro con la backend

    // function handleSubmit(e){
    //     e.preventDefault()
    //     dispatch(getByName(searchString))
    // }

    //*filtro sobre el estado 
    // const [filtered,setFiltered] = useState(allDogs);
   

    

    // function handleSubmit(e){
    //     e.preventDefault();
    //     const filtered = allDogs.filter((dog) => 
    //         dog.name.toLowerCase().includes(searchString.toLowerCase())
    //     );
    //     setFiltered(filtered);
    // }


    useEffect(() => {
        
        dispatch(getDogs())
        dispatch(getTemperament())
 
    },[dispatch]);


    return(
        <div >
            <header>
                        <div >
                            <Link to="/">
                                <button >Doggy</button>
                            </Link>
                        </div>
                    <div >
                        <div >
                            <button onClick={handleClick} >Reset</button>
                            <Link to="/create">
                                <button >Create DOG</button>
                            </Link>
                        </div>
                        <NavBar pagination={pagination} />
                        <div>
                                <div>
                                    <select onChange={(event) => handlerFilterByName(event)}>
                                        <option  key={1} disabled value="Order" >Order by name</option>
                                        <option  key={3} value="A-Z">A-Z</option>
                                        <option  key={2} value="Z-A">Z-A</option>
                                    </select>

                                    <select onChange={(event) => handlerFilterByWeight(event)}>
    <option key={3} disabled value="Order">Order by weight</option>
    <option key={1} value="Max">Max</option>
    <option key={2} value="Min">Min</option>
</select>

                                    <select onChange={(event) => handlerFilterCreated(event)}>
                                        <option  key={4} disabled value="Order" >Order by created</option>
                                        <option  key={1} value="all">ALL</option>
                                        <option  key={2} value="db">Created</option>
                                        <option  key={3} value="api">api</option>
                                    </select>

                                    <select onChange={(event) => handlerFilterTemperament(event)}>
                                        <option  key={2} disabled value="Temperaments">Temperaments</option>
                                        <option  key={1 + "e"} value="all">All</option>
                                        {allTemperaments.map((temp, index) => (
                                            <option  value={temp.name} key={index}>
                                                {temp.name}
                                            </option>
                                        ))}
                                    </select>
                                    {searchString && <p >{searchString}</p>}
                        </div>
                    </div>
            </div>    
            </header>
                <div >
                    {Object.keys(allDogs).length ?
                        <div>
                            {
                                currentDogs?.map((dog) => {
                                    return (
                                        <div key={dog.id} >
                                            <Card 
                                                id={dog.id} 
                                                image={dog.image} 
                                                name={dog.name} 
                                                temperament={dog.temperament} 
                                                weight={dog.weight}
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div> : 
                            <div>
                                <Loading />
                            </div>
                    }
                    <Pagination  dogsPerPage={dogsPerPage} allDogs={allDogs.length} pagination={pagination}/>
                </div>
        </div>
    )

    // (
    //     <div className="home">
    //         <h2 className="home-title">Home</h2>
    //         <NavBar handleChange={handleChange} handleSubmit={handleSubmit} />
    //         <Cards allDogs = {allDogs} />
    //     </div>
    // );
}

export default Home;