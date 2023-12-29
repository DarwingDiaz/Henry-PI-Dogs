

const cleanArray = (arr) => {
    return arr.map((dog) => {
        return{
            id : dog.id,
            image: dog.image,
            name: dog.name,
            temperament: dog.temperament,
            height: dog.height.metric,
            weight: dog.weight.metric,
            life_span: dog.life_span,
            created:false,

        }
    })

}

// const cleanArrayId = (obj) =>{
//     const dog = obj;
//     return[{
//         id:dog.id,
//         image:dog.image,
//         name:dog.name,
//         temperament:dog.temperament,
//         height:dog.height.metric,
//         weight:dog.weight.metric,
//         life_span:dog.life_span,
//     }];
// }

const cleanArrayId = (obj) => {
    const dog = obj;

    // Verifica si la propiedad 'image' está definida
    const imageUrl = dog.image ? dog.image : "https://www.helpguau.com/wp-content/uploads/2019/06/perro-buscando.jpg";

    return [{
        id: dog.id,
        image: imageUrl,
        name: dog.name,
        temperament: dog.temperament,
        height: dog.height.metric,
        weight: dog.weight.metric,
        life_span: dog.life_span,
    }];
};


module.exports = {cleanArray, cleanArrayId};