import { Link } from "react-router-dom";
import "./card.styles.css"


const Card = (props) => {

    const {image, name, temperament, temperaments, weight, id} = props;

    return (
        <div className="card-container">

            <div>
                <Link className="caracteristicas" to={`/home/${id}`}> 
                    <div>
                        <img 
                            className="img"
                            src={image} 
                            alt="dog"
                        />
                    </div>
                        <h3 className="nombre">{name}</h3>
                    
                        <div >
                            <h2>Weight: {weight ? weight : "N/A"} kg</h2>
                            <h2 className="tempera">
                            Temperaments:{" "}
                            {temperaments
                                ? temperaments
                                : temperament
                            }
                            </h2>
                        </div>

                </Link>
            </div>
        </div>
    )
}


export default Card