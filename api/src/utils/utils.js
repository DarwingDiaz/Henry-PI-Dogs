const cleanArray = (arr) => {
    return arr.map((dog) => {
        return{
            id : dog.id,
            image: dog.image.url,
            name: dog.name,
            temperament: dog.temperament,
            height: dog.height.metric,
            weight: dog.weight.metric,
            life_span: dog.life_span,
            created:false,

        }
    })

}

module.exports = {cleanArray};