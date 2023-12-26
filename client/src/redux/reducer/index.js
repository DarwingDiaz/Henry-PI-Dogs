import { 
    GET_DOGS, 
    GET_BY_NAME, 
    GET_DETAIL, 
    GET_TEMPERAMENT, 
    POST_DOG,
    EMPTY,
    ORDER_BY_NAME,
    ORDER_WEIGHT,
    FILTER_BY_TEMPERAMENT,
    FILTER_CREATED } from "../actions/actionsTypes";


let initialState = {allDogs:[], dogs:[], temperament: [], dogDetail: {}, newDog: {}, createdFiler: null};

// const calculateAverage = (weight) => {
//     if (!weight) {
//         return -1;
//     }

//     let numericWeight = -1;

//     if (typeof weight === 'object') {
//         // Handling cases where weight is an object with 'imperial' or 'metric' properties
//         numericWeight = parseFloat(weight.imperial || weight.metric || -1);
//     } else if (typeof weight === 'string') {
//         // Handling cases where weight is a string
//         numericWeight = parseFloat(weight.split(' ')[0] || -1);
//     }

//     return isNaN(numericWeight) ? -1 : numericWeight;
// }

const calcuteWeightAverage = (weight) =>{
    if (!weight){
        return -1
    }

    const [min,max] = weight.split(' - ').map(parseFloat);

    if(isNaN(min) || isNaN(max)){
        return -1
    }

    const average = (min + max) / 2;

    return isNaN(average) ? -1 : average;
} 
// const calculateAverage = (dog) => {
//     const [ min, max ] = dog.split(" - ")
//     const minimo = Number(min)
//     const maximo = Number(max)
//     let average = (minimo + maximo ) / 2;
//     if(isNaN(average)) {
//         average = 100
//     }
//     return average
// }

// const calculateAverage = (dog) => {
//     // Verifica si dog es una cadena antes de intentar realizar split
//     if (typeof dog !== 'string') {
//         // Maneja el caso en el que dog no es una cadena
//         return -1; // o cualquier otro valor predeterminado que desees
//     }

//     const weights = dog.split(" - ").map(Number);
    

//     // Verifica si minimo y maximo son números válidos
//     if (weights.some(isNaN)) {
//         return -1; // o cualquier otro valor predeterminado que desees
//     }

//     const average = weights.reduce((sum, weight) => sum + weight, 0) / weights.length;

//     return average;
// }

function rootReducer(state =initialState,action){
    switch(action.type){
        case GET_DOGS:
            return{
                ...state,
                allDogs:action.payload,
                dogs:action.payload
            };
        case GET_BY_NAME:
            return{
                ...state,
                dogs: action.payload,
            }
        case GET_DETAIL:
            return{
                ...state,
                dogDetail: action.payload,
            }
        case GET_TEMPERAMENT:
            return{
                ...state,
                temperament: action.payload
            }
        case POST_DOG:
            return{ 
                ...state,
                newDog: action.payload
                
            }
        case EMPTY:
            return {
                ...state,
                  allDogs: [],
                  dogDetail: {},
                  error: false,
            };
        case ORDER_BY_NAME:
                //Ordenar los perros por nombre
        const filterDogs = action.payload === "A-Z" ? state.dogs.sort((a,b) => {
            if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;                return 0
            })
            : state.dogs.sort((a, b) => {
            if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
            if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
            return 0
            });
            return{
            ...state,
            dogs: filterDogs,
            };
        case FILTER_CREATED:
                    //filtro por api o db
        const allDogs = state.allDogs;
        const filterCreated = action.payload === "true" ? allDogs.filter(dog => dog.created) : allDogs.filter(dog => !dog.created)
        
        return {
            ...state,
            dogs: action.payload === "all" ? state.allDogs : filterCreated
        };
        // case ORDER_WEIGHT:
             
        // const isMaxOrder = action.payload === "Max";
        // const sortedDogs = state.dogs.slice().sort((a, b) => {
        // const weightA = calculateAverage(a.weight);
        // const weightB = calculateAverage(b.weight);

        // return isMaxOrder ? weightB - weightA : weightA - weightB;
        // });

        // return {
        // ...state,
        // dogs: sortedDogs,
        // };
        case ORDER_WEIGHT:
            const isDescending = action.payload === 'desc'

            const sortedDogs = state.dogs.slice().sort((a,b) => {
                const weightA = calcuteWeightAverage(a.weight);
                const weightB = calcuteWeightAverage(b.weight);

                return isDescending ? weightB - weightA : weightA - weightB;
            })

            return{
                ...state,
                dogs: sortedDogs
            }
        case FILTER_BY_TEMPERAMENT:
                        //filtrar x temperamento
                        const allDogs2 = state.allDogs;
                        const filteredTemp = action.payload === "all" ? allDogs2 : allDogs2.filter(element => {
                            return element.temperament?.includes(action.payload)
                        })
            
                        return{
                            ...state,
                            dogs: filteredTemp
                        }
            
        default:
            return state
    }
}

export default rootReducer;