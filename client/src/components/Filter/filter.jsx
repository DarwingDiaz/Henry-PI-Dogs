import React from 'react';
import {useDispatch, useSelector} from "react-router-dom";
import { orderByName } from '../../redux/actions';
import "./filter.css";


function Filter({setCurrentPage}) {

    const dispatch = useDispatch();
    
    const handleName = (e) =>{
        dispatch(orderByName(e.target.value));
        setCurrentPage(0);
    }
    return (
        <div>
            <select onChange={handleName} className="filterButton">
                <option disabled defaultValue="">
                    Order by Name
                </option>
                <option value="asc">A-Z</option>
                <option value="des">Z-A</option>
            </select>
        </div>
        
    );
}

export default Filter;