const {Dog, Temperament} = require ("../db")
const axios = require ("axios")

require('dotenv').config();
const {
    API_KEY
  } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;


const getTemperaments = async () =>{
    const allData = await axios(URL);

    let everyTemperament = allData.data.map(dog => dog.temperament ? dog.temperament : "No Info").map(dog => dog?.split(", "));
    let eachTemperament = [...new Set(everyTemperament.flat())];
    eachTemperament.forEach(temp => {
        if(temp) {
            Temperament.findOrCreate({where: {name: temp}})
        }
    })
    eachTemperament = await Temperament.findAll();
    return eachTemperament
}

module.exports = {
    getTemperaments
}