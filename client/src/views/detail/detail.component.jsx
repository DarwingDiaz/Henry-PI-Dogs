import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDetail, clearDetail} from "../../redux/actions";
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

    const handleClick = (e) => {
        dispatch(clearDetail());
    };
    

    const dog = useSelector((state) => state.dogDetail)

    return (
        <div>
        <div className="detailContainer">
            <div className="imageContainer">
                {dog ? (
                <img
                    className="image"
                    src={dog.image}
                    alt="perro"
                    width="200"
                    height="200"
                />
                ) : (
                    <Loading />
                )} 
            </div>
            <div className="characteristicsContainer">
            {dog ? (
      <div>
         <h1>ID: {dog.id}</h1>
         <h1>Name: {dog.name}</h1>
         <h1>Height: {dog.height ? dog.height : 'N/A'} cm</h1>
         <h1>Weight: {dog.weight ? dog.weight: "N/A" } kg</h1>
         <h1>Temperaments: { dog.temperaments ? dog.temperaments.join(', ') : dog.temperament}</h1>
         <h1>Life span: {dog.life_span ? dog.life_span : "N/A"}</h1>
      </div>
                ):(
                    <Loading/>
                )}
            </div>
            
    </div>

    <div>
        <Link  to="/home">
            <button onClick={handleClick} className="buttonReturn" >Return home</button>
        </Link> 
    </div>
    </div>
    )
}

export default Detail