import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDetail} from "../../redux/actions";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/loading.component";
import "./detail.styles.css"

const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams()
    
    useEffect(() => {
        if(id) {
            dispatch(getDetail(id));
        }
    }, [dispatch, id])
    
    // const getImageUrl = () => {
    //     if (dog && dog[0] && dog[0].reference_image_id) {
    //       const imageUrlBase = "https://tu-api-de-imagenes.com/";
    //       const referenceImageId = dog[0].reference_image_id;
    //       return `${imageUrlBase}${referenceImageId}.jpg`;
    //     } else {
    //       return "https://www.helpguau.com/wp-content/uploads/2019/06/perro-buscando.jpg";
    //     }
    //   };
    

    const dog = useSelector((state) => state.dogDetail)
    // const temp = dog?.temperament?.join(", ");


    return (
        <div>
        <div className="detailContainer">
            <div className="imageContainer">
                {dog && dog[0] ? (
                <img
                    src={`https://cdn2.thedogapi.com/images/${dog[0].image}.jpg`}
                    alt={dog[0].name}
                    width="200"
                    height="200"
                />
                ) : (
                    <Loading />
                )} 
            </div>
            <div className="characteristicsContainer">
            {dog && dog[0] ? (
                <div>

                    <h1 >ID: {dog[0].id}</h1>
                    <h1>Name: {dog[0].name}</h1>
                    <h1>Height: {dog[0].height} Kg</h1>
                    <h1>Weight: {dog[0].weight} Cm</h1>
                    <h1>Temperaments: {dog[0].temperament}</h1>
                    <h1>Life span: {dog[0].life_span}</h1>
                   
                </div>
                ):(
                    <Loading/>
                )}
            </div>
            
    </div>
    <div className="buttonReturn">
    <Link to="/home">
        <button>Return home</button>
    </Link> 
    </div>
    </div>
    )
}

export default Detail