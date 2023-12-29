require('dotenv').config();
const axios = require ("axios")
const { Op } = require('sequelize');
const { API_KEY } = process.env;

const { cleanArray} = require ("../utils/utils")
const {Dog, Temperament} = require ("../db")

const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;


const getDogs = async()=>{
    const dbDogs = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
    
    const apiDogsRaw = (await axios.get(URL)).data

    const apiDogs = cleanArray(apiDogsRaw)

    return [...dbDogs, ...apiDogs]
}


const getDogsByName = async (name) =>{

    const dbDogs = await Dog.findAll({
        where:{
            name:{
                [Op.iLike]: `%${name}%`
            }
        },
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })

    const apiDogsRaw = (await axios.get(URL)).data

    const apiDogs = cleanArray(apiDogsRaw)

    const filterApi = apiDogs.filter(dog => String(dog.name).toLowerCase().includes(String(name).toLowerCase()));
     
    return [...filterApi, ...dbDogs];


};

const getDogById = async (id, source) => {

    let dog= {};

    if(source === "api"){
        const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`);
        const dogImagen = await axios(`https://api.thedogapi.com/v1/images/${data.reference_image_id}?api_key=${API_KEY}`);
        
        dog = {
            id: data.id,
            name: data.name,
            image: dogImagen.data.url,
            weight: data.weight.metric,
            height: data.height.metric,
            life: data.life_span,
            temperaments: data.temperament,
        };
    
    } else{
        dog = await Dog.findByPk(id,{
            include:{
                model:Temperament, 
                attributes:["name"],
                through: {
                    attributes: []
                }
            }
    }).then((dog) => ({
        ...dog.dataValues,
        temperament: dog.temperaments.map((temp) => temp.name),
    }));
    }
    return dog;
}

const postDog = async (dogData) =>{
    
    const {image, name, temperament, height, weight, life_span} = dogData
   
    if (temperament.length === 0) {
		return res.sendStatus(500);
	}


    const dogCreate = await Dog.create({
        image: image,
        name, 
        height, 
        weight, 
        life_span
    })

    const temperamentFilter = await Temperament.findAll({
        where: {name : temperament} 
    })

    console.log('Temperamentos encontrados:', temperamentFilter);

     await dogCreate.addTemperaments(temperamentFilter)

     console.log('Temperamentos asociados al perro.');

     return dogCreate
}

module.exports = {
    getDogs,
    postDog, 
    getDogById,
    getDogsByName
}