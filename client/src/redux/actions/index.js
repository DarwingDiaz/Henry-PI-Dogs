import axios from "axios";

import { 
    GET_DOGS, 
    GET_BY_NAME, 
    GET_DETAIL, 
    GET_TEMPERAMENT, 
    POST_DOG,
    EMPTY, 
    ORDER_BY_NAME,
    FILTER_BY_TEMPERAMENT,
    FILTER_CREATED,
    ORDER_WEIGHT
} from "./actionsTypes";


export function getDogs(){
    return async function(dispacth){
        const response = await axios(`http://localhost:3001/dogs/`)
        
        return dispacth({
            type: GET_DOGS,
            payload:response.data
        })
    }
}

export function getByName(name){
    return async function(dispacth){
        const response = await axios(`http://localhost:3001/dogs/?name=${name}`)
        
        return dispacth({
            type: GET_BY_NAME,
            payload:response.data
        })
    }
}

export function getDetail(id){
    // Enviar el id al reducer para crear la seccion de Description
    return async function (dispatch) {
        try {
            const response = await axios.get(
                `http://localhost:3001/dogs/${id}`
            );
            
            
            return dispatch ({
                type: GET_DETAIL,
                payload: response.data
            })
        }
        catch(error) {
            console.log("Error fetching dog details:",error);
        }
    }
}

export function getTemperament() {
    return async function (dispatch) {
        const response = await axios.get(`http://localhost:3001/temperaments`)
        return dispatch({
            type : GET_TEMPERAMENT,
            payload: response.data
        })
    }
}

export const postDog = (payload) => async dispatch => {
        
    try {
            
        await axios.post('http://localhost:3001/dogs', payload)
        .then(response =>{
            dispatch({
                type: POST_DOG,
                payload: response.data
                });
            })
        } catch (error) {
            return(error)
        }
   
};

//se usa para reestablecer el edo globlal cuando es necesario
export const empty = () => {
    return {
      type: EMPTY
    };
};

export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload: payload
    }
}

export function orderWeight(orderType){
    return {
        type: ORDER_WEIGHT,
        payload: orderType
    }
}

export const filterTemperament = (temperament) => {
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload: temperament
    }
}

export const filterCreateDog = (payload) => {
    return{
        type: FILTER_CREATED,
        payload
    }
}
