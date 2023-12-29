import { Link } from "react-router-dom";
import "./card.styles.css"


const Card = (props) => {

    const {image, name, temperament,  weight, id} = props;

    const temperamentArray = typeof temperament === 'string' ? temperament.split(",") : [];

    
    const handleError = (e) => {
        e.target.src =
          "https://media.vandalsports.com/i/1200x1200/8-2023/2023822115940_1.jpg";
      };

    return (
        <div className="card-container">

            <div>
                <Link className="caracteristicas" to={`/home/${id}`}> 
                    <div>
                        <img 
                            className="img"
                            src={image ? image.url : ""} 
                            alt="dog"
                            height="200px" 
                            width="200px"
                            onError={handleError}
                        />
                    </div>
                        <h3 className="nombre">{name}</h3>
                    
                        <div >
                            <h2>Weight: {weight ? weight : "N/A"} kg</h2>
                             <h2 className="tempera">
                                Temperaments: 
                                {temperamentArray.length > 3 ? (
            <p>{`${temperamentArray[0]}, ${temperamentArray[1]}, ${temperamentArray[2]}`}</p>
          ) : (
            <p>{`${temperament}`}</p>
          )}
                            </h2>
                        </div>

                </Link>
            </div>
        </div>
    )
}


export default Card