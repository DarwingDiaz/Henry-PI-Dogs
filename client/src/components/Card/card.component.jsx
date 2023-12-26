import { Link } from "react-router-dom";
import "./card.styles.css"


const Card = ({image, name, temperament,  weight, id}) => {
    return (
        <div className="card-container">

            <div>
                <div >
                    <Link className="caracteristicas" to={`/home/${id}`}> 
                    <div>
                        <img  
                            className="img"
                            src={image} 
                            alt={name.url} 
                            height="150px" 
                            width="150px"
                            onError={(e) => {
                                e.target.src= "https://media.vandalsports.com/i/1200x1200/8-2023/2023822115940_1.jpg";
                                e.target.onError = null;
                                e.preventDefault()
                                }
                            }
                        />
                    </div>
                        <h3 className="nombre">{name}</h3>
                    
                        <div >
                            <h2>Weight: {weight}kg</h2>
                             <h2 className="tempera">Temperaments: {Array.isArray(temperament)
                                ? temperament.join(", ")
                                : temperament
                                ? temperament
                                : "[temperamentos]"}
                            </h2>
                        </div>

                    </Link>
                </div>
            </div>
        </div>
    )
}


export default Card