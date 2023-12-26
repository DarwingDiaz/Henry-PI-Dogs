

const cleanArray = (arr) => {
    return arr.map((dog) => {
        return{
            id : dog.id,
            name: dog.name,
            height: dog.height.metric,
            weight: dog.weight.metric,
            image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
            life_span: dog.life_span,
            temperament: dog.temperament,
            created:false,

        }
    })

}

const cleanArrayId = (obj) =>{
    const dog = obj;
    return[{
        id:dog.id,
        image:dog.image,
        name:dog.name,
        temperament:dog.temperament,
        height:dog.height.metric,
        weight:dog.weight.metric,
        life_span:dog.life_span,
    }];
}


module.exports = {cleanArray, cleanArrayId};