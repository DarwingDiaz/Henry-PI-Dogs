// import { useParams ,Link } from "react-router-dom";
// import { useEffect} from "react";
// import { useDispatch, useSelector} from "react-redux";
// import { getDetail, clearDetail } from "../../redux/actions";
// import Loading from "../../components/Loading/loading.component";
// // import axios from "axios";

// import "./detail.styles.css";

// function Detail(){

//     const dispatch = useDispatch();
//     const {id} = useParams();
//     // const [dog, setDog] = useState({});

//     useEffect(() => {
        
//             dispatch(getDetail(id));
    
//     }, [dispatch, id]);

//     const dog = useSelector((state) => state.dogDetail)
    
//     const handleClick = (e) =>{
//         dispatch(clearDetail(e))
//     }


//     return(
//         <div>
//             <Link to={"/home"}>
//                 <button className="button" onClick={(e) => handleClick(e)}>
//                     Go Home
//                 </button>
//             </Link>
//             {dog && dog[0] ? (
//                 <div >
                
//                 <h1 >ID: {dog[0].id}</h1>
//                 <img
//             src={
//                 dog[0].image
//                 ? dog[0].image
//                 : "https://www.helpguau.com/wp-content/uploads/2019/06/perro-buscando.jpg"
//             }
//             alt="perro"
//             width="200"
//             height="200"
//             />
//                 <h1>Name: {dog[0].name}</h1>
//                 <h1>Height: {dog[0].height}</h1>
//                 <h1>Weight: {dog[0].weight}</h1>
//                 <h1>Temperaments: {dog[0].temperament}</h1>
//                 <h1>Life span: {dog[0].life_span}</h1>
//             </div>
                
//                 ):(
//                     <Loading/>
//                 )}

//         </div>
//     );
// }

// export default Detail;

import React from "react";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    //getAllDogs, 
    //clearDetail, 
    getDetail} from "../../redux/actions";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/loading.component";


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
        <div >
            <div>
            <Link to="/home">
                <button>Go home</button>
            </Link>  
            
            {dog && dog[0] ? (
                <div >
                
                <h1 >ID: {dog[0].id}</h1>
                <img
            src={`https://cdn2.thedogapi.com/images/${dog[0].image}.jpg`}
            alt={dog[0].name}
            width="200"
            height="200"
            />
                <h1>Name: {dog[0].name}</h1>
                <h1>Height: {dog[0].height}</h1>
                <h1>Weight: {dog[0].weight}</h1>
                <h1>Temperaments: {dog[0].temperament}</h1>
                <h1>Life span: {dog[0].life_span}</h1>
            </div>
                
                ):(
                    <Loading/>
                )}
    </div>
        </div>
    )
}

export default Detail