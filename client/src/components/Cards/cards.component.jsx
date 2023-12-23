import Card from "../Card/card.component";
import "./cards.styles.css";

function Cards({allDogs}){

    const dogsList = allDogs;

    return(
        <div className="cartas">
            {dogsList?.map(dog =>
                <Card className="carta" key={dog.id} dog = {dog}/>
            )}
        </div>
    );
}

export default Cards;