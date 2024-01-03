import axios from "axios";

import { 
    GET_DOGS, 
    GET_BY_NAME, 
    GET_DETAIL, 
    GET_TEMPERAMENT, 
    POST_DOG,
    ORDER_BY_NAME,
    FILTER_BY_TEMPERAMENT,
    FILTER_CREATED,
    ORDER_WEIGHT,
    CLEAR_DETAIL,
} from "./actionsTypes";



export const getDogs = () => {
    return async function(dispacth){
        try {
            const response = await axios(`http://localhost:3001/dogs/`)

            return dispacth({
                type: GET_DOGS,
                payload:response.data
            })
        } catch (error) {
            window.alert("Error getting dogs")
        }
    }
        
}

export const getByName = (name) => {
    return async function(dispacth){
        try {
            const response = await axios(`http://localhost:3001/dogs/?name=${name}`)
        
            return dispacth({
                type: GET_BY_NAME,
                payload:response.data
            })
        } catch (error) {
            window.alert("Error getting dog by name")
        }
        
    }
}

export const getDetail = (id) =>{
    
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
            window.alert("Error fetching dog details");
        }
    }
}

export const getTemperament = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/temperaments`)
            return dispatch({
                type : GET_TEMPERAMENT,
                payload: response.data
            })
        } catch (error) {
            window.alert("Error when obtaining dog temperaments")
        }
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
            window.alert("Error adding new dog")
        }
   
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

export const clearDetail = () => {
    return {
      type: CLEAR_DETAIL
    };
  };
