const {Dog, Temperament} = require ("../db")
const axios = require ("axios")

require('dotenv').config();
const {
    API_KEY
  } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_ke{API_KEY}`;


const getTemperaments = async () =>{
    const {data} = await axios(URL);

    const temperaments = data.flatMap((dog) => {
        return dog.temperament ? dog.temperament.split(", ") : []
    })
    
    const tempFilter = temperaments.reduce((result, index) => {
        if (result.indexOf(index) === -1) {
          result.push(index);
        }
        return result;
      }, []);
    
      const dogTemperaments = await Promise.all(
        tempFilter.map(async (temperament) => {
          const [dbTemperament] = await Temperament.findOrCreate({
            where: { name: temperament },
            defaults: {
              name: temperament,
            },
          });
          return dbTemperament.dataValues;
        })
      );
      return dogTemperaments;
}

module.exports = {
    getTemperaments
}