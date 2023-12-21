const axios = require ("axios")
require('dotenv').config();
const {
    API_KEY
  } = process.env;

const { cleanArray , cleanArrayId } = require ("../utils/utils")
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

    const dog = source === "api" 
        ? (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`)).data 
    : await Dog.findByPk(id,{
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

    return cleanArrayId(dog);
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