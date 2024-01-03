import Card from "../Card/card.component";
import "./cards.styles.css";

function Cards({allDogs}){

    const dogsList = allDogs;
    
    return(
        <div className="cartas">
            {dogsList?.map((dog) =>
                <Card 
                    className="carta" 
                    key={dog.id}
                    id={dog.id}
                    name={dog.name}
                    image={dog.image}
                    temperament={dog.temperaments.join(",")}
                    weight={dog.weight}
                    height={dog.height}
                    life_span={dog.life_span}
                />
            )}
        </div>
    );
}

export default Cards;