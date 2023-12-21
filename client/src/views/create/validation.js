// const validation = (input) => {

//     const nameRegex = /^[a-zA-Z]+$/;
//     // const numberRegex = new RegExp(/^[0-9]+$/)
    
//     let errors = [];
  


//     if(!input.name){
//         errors.name = "Name is required"
//     }else if(!nameRegex.test(input.name)){
//         errors.name = "The name should not have numbers or symbols"
//     }else if(input.name.length > 15) {
//         errors.name= "The name is too long"
//     }

//     if(Number(input.minimun_weight) < 0) {
//         errors.minimun_weight = "The minimum weight must be greater than 0"
//     } else if( input.minimun_weight > input.maximun_weight) {
//         errors.minimun_weight = "The minimum weight cannot be greater than the maximum"
//     } 

//     if(Number(input.maximun_weight) < 0) {
//         errors.maximun_weight = "The maximum weight cannot be 0"
//     } else if( input.maximun_weight > 62) {
//         errors.maximun_weight = "The maximum weight cannot be greater than 62"
//     }


//     if(Number(input.minimun_height) < 0) {
//         errors.minimun_height = "The minimum height cannot be 0"
//     } else if( input.minimun_height > input.maximun_height) {
//         errors.minimun_height = "The minimum height cannot be greater than the maximum"
//     } 

//     if(Number(input.maximun_height) < 0) {
//         errors.maximun_height = "The maximum height cannot be 0"
//     } else if( input.maximun_height > 100) {
//         errors.maximun_height = "The maximum height cannot be more than 100"
//     }

//     // if(!input.life_span || input.life_span <= 0 || !numberRegex.test(input.life_span)) {
//     //     errors.life_span = "The life span must be greater"
//     // }



//     return errors;

// }

// export default validation;

const validation = (input) => {
    const nameRegex = new RegExp(/^[a-zA-Z]+$/)
    const numRegex = new RegExp(/^[0-9]+$/)
    const urlRegex = new RegExp(/^(http|https):\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/)
    let errors = {};
    
    //CHEADO
    if(!input.name) {
        errors.name = "Must be a name"
    } else if (!nameRegex.test(input.name)) {
        errors.name = "The name cant contain numbers or special caracters"
    } else if(input.name.length > 12) {
        errors.name = "El tamaño máximo son 12 caracteres"
    }

    if(Number(input.weight_min) < 0) {
        errors.weight_min = "El minimo no puede ser 0"
    } else if( input.weight_min > input.weight_max) {
        errors.weight_min = "El minimo no puede ser mayor al maximo"
    } 

    if(Number(input.weight_max) < 0) {
        errors.weight_max = "El maximo no puede ser 0"
    } else if( input.weight_max > 62) {
        errors.weight_max = "El maxino no puede ser mayor a 62"
    }


    if(Number(input.height_min) < 0) {
        errors.height_min = "El minimo no puede ser 0"
    } else if( input.height_min > input.height_max) {
        errors.height_min = "El minimo no puede ser mayor al maximo"
    } 

    if(Number(input.height_max) < 0) {
        errors.height_max = "El maximo no puede ser 0"
    } else if( input.height_max > 100) {
        errors.height_max = "El maxino no puede ser mayor a 100"
    }



    if(!input.life_span || input.life_span <= 0 || !numRegex.test(input.life_span)) {
        errors.life_span = "The life span must be greater"
    }


    if (input.image && !urlRegex.test(input.image)) {
        errors.image = "La imagen debe ser una URL válida";
    }

    return errors
}

export default validation;