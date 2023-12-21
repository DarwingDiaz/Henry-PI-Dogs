// import { Link } from "react-router-dom"

// import "./card.styles.css";



// function Card({dog}){

//     const {name, image, weight, temperament, id} = dog

//     return (
//         <div className="card-container">
//             <Link to={`/home/${id}`}>

                
//                 <img 
//                 src={image} 
//                 alt={`${name}`} 
//                 height="250px" 
//                 width="200px"
//                 onError={(e) => {
//                     e.target.src= "https://media.vandalsports.com/i/1200x1200/8-2023/2023822115940_1.jpg";
//                     e.target.onError = null;
//                     e.preventDefault()
//                 }}/>
//                 <h1>Name: {name}</h1>
//                 <h2>Temperament: {temperament}</h2>
//                 <h2>Weight: {weight.metric} KG</h2>

//             </Link>
// I       </div>
//     )
// }

// export default Card;

import React from "react";
import { Link } from "react-router-dom";
import "./card.styles.css"


const Card = ({image, name, temperament,  weight, id}) => {
    return (
        <div className="card-container">
            <div>
                <img  
                src={image} 
                alt={`${name.url}`} 
                height="250px" 
                width="200px"
                onError={(e) => {
                    e.target.src= "https://media.vandalsports.com/i/1200x1200/8-2023/2023822115940_1.jpg";
                    e.target.onError = null;
                    e.preventDefault()
                }}
                />
            </div>

            <div>
                <div >
                    <Link to={`/home/${id}`}> 
                    <h3>{name}</h3>
                    </Link>
                    <h2>{weight.metric}kg</h2>
                    <h2>{Array.isArray(temperament)
                            ? temperament.join(", ")
                            : temperament
                            ? temperament
                            : "[temperamentos]"}
                    </h2>
                </div>
            </div>
        </div>
    )
}


export default Card