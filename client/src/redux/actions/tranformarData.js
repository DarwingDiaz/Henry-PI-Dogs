export const tranformarData = (databaseData) =>{
    return databaseData.map((dog) => {
        return {
          id: dog.id,
          image: { id: '', width: 0, height: 0, url: dog.image },
          name: dog.name,
          temperaments: Array.isArray(dog.temperaments)
            ? dog.temperaments.map((temp) => ({ name: temp.name }))
            : [],
          weight: dog.weight,
          height: dog.height,
          life_span: dog.life_span
        };
      });
}