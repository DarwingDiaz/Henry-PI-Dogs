import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getTemperament, postDog } from "../../redux/actions/index"
import validation from "./validation"


function Create(){

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        name:"",
        // height:"",
        // weight:"",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span:"",
        image:"",
        temperament:[]    
    })

    const [errors, setErrors] = useState({})

    const allTemperaments = useSelector((state) => state.temperament)
    // const dog = useSelector((state) => state.allDogs)

    // const handleChange = (e) =>{
    //     // setErrors(validation({...input,[e.target.name]:e.target.value}));
    //     // setInput({...input,[e.target.name]: e.target.value});
    //     const { name, value } = e.target;
    //     setInput((prevInput) => ({
    //         ...prevInput,
    //         [name]: value !== undefined ? value : "",
    //       }));
    //     // const updatedInput = { ...input, [name]: value };
    //     // const validationErrors = validation(updatedInput);

    //     // setErrors(validationErrors);
    //     // setInput(updatedInput);

    // }

    const handleChange = (event) => {
                const { name, value } = event.target;
                
                // Actualiza el estado
                setInput((prevInput) => ({
                  ...prevInput,
                  [name]: value,
                }));
              
                // Realiza validaciones después de que el estado se haya actualizado
                // Usando el estado actualizado en setInput
                // También, puedes utilizar setErrors directamente si prefieres
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  ...validation({ ...input, [name]: value }),  // Agrega el valor actualizado
                }));
              };

    const handleSelect = (e)=>{
        const selecTemperament = e.target.value;
            setInput({
                ...input,
                temperament: [...input.temperament, selecTemperament]
            })
    }

    useEffect(() => {
        dispatch(getTemperament())
    }, [dispatch])

    const handleErase = (tempRemove) => {
                setInput({
                    ...input,
                    temperament: input.temperament.filter(
                    (temp) => temp !== tempRemove
                  ),
                });
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        const validationErrors = validation(input);

        setErrors(validationErrors);
    
        if (Object.keys(validationErrors).length === 0) {
            try {
                // Concatenar height y weight con sus respectivos valores
                const doggy = {
                    name: input.name,
                    height: `${input.height_min} - ${input.height_max}`,
                    weight: `${input.weight_min} - ${input.weight_max}`,
                    life_span: input.life_span,
                    image:input.image,
                    temperament: input.temperament,
                };

                console.log('Datos del perro a enviar:', doggy);
    
                // Intentar realizar la solicitud para crear un perro
                const response = await dispatch(postDog(doggy));
    
                console.log('Respuesta del servidor:', response);
    
                setInput({
                    name: "",
                    height_min: "",
                    height_max: "",
                    weight_min: "",
                    weight_max: "",
                    life_span: "",
                    image:"",
                    temperament: [],
                });
    
                alert("The dog was created successfully");
            } catch (error) {
                console.error('Error al crear el perro:', error);
    
                alert("Error creating the dog");
            }
        }
    }

    return(
        <div>
            <div>
                <h1>CREATE DOG</h1>
            </div>
            <div>
                <Link to="/home">
                    <button>HOME</button>
                </Link>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input
                    
                    name="name"
                    placeholder="name"
                    type="text"
                    value={input.name}
                    onChange={handleChange}></input>
                <h2>{errors.name && (<p>{errors.name}</p>)}</h2>

                <label htmlFor="height_min">Height min: </label>
                <input
                    
                    name="height_min"
                    placeholder="height_min"
                    type="number"
                    value={input.height_min}
                    onChange={handleChange}></input>
                <h2>{errors.height_min && (<p>{errors.height_min}</p>)}</h2>
                
                
                <label htmlFor="height_max">Height max: </label>
                <input
                    
                    name="height_max"
                    placeholder="height_max"
                    type="number"
                    value={input.height_max}
                    onChange={handleChange}></input>
                <h2>{errors.height_max && (<p>{errors.height_max}</p>)}</h2>
                
                <label htmlFor="weight_min">Weight min: </label>
                <input
                    
                    name="weight_min"
                    placeholder="weight_min"
                    type="number"
                    value={input.weight_min}
                    onChange={handleChange}></input>
                <h2>{errors.weight_min && (<p>{errors.weight_min}</p>)}</h2>

                <label htmlFor="weight_max">Weight max: </label>
                <input
                    
                    name="weight_max"
                    placeholder="weight_max"
                    type="number"
                    value={input.weight_max}
                    onChange={handleChange}></input>
                <h2>{errors.weight_max && (<p>{errors.weight_min}</p>)}</h2>

                <label htmlFor="life_span">Life Span: </label>
                <input
                    
                    name="life_span"
                    placeholder="life_span"
                    type="number"
                    value={input.life_span}
                    onChange={handleChange}></input>
                <h2>{errors.life_span && (<p>{errors.life_span}</p>)}</h2>

                <label htmlFor="image">Image: </label>
                <input  
                         
                    name="image" 
                    type="url" 
                    value={input.image} 
                    onChange={handleChange}/>

                <label htmlFor="temperaments">Temperaments: </label>
                <select onChange={handleSelect}>
                    <option value="all" disabled key="temp">
                        Temperaments
                    </option>
                    {
                        allTemperaments.map((t) => {
                            return(
                                <option value={t.name} key={t.id}>{t.name}</option>
                            )
                        })
                    }
                </select>
                <h2>{errors.temperament && (<p>{errors.temperament}</p>)}</h2>
                    {
                      !Object.keys(errors).length === 0 ? 
                        (<div>The dog cant be Created Yed</div>)
                        : 
                        (<button type="submit"> Create</button>)  
                    }
            </form>
            <div>
                {input.temperament.map((d, i) => {
                    return (
                            <div key={i++} >
                                <div>
                                    {d}
                                </div>
                                <button onClick={() => handleErase(d)}>X</button>
                            </div>)
                    })
                }
            </div>
        </div>
    )
}

export default Create;

// import { useState, useEffect} from "react";
// import validation from "./validation"
// import { getTemperament, postDog} from "../../redux/actions";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import "./create.styles.css"


// function Create(){

//     const dispatch = useDispatch();
//     // const navigate = useNavigate();
//     // const dog = useSelector((state) => state.allDogs)
//     const allTemperaments = useSelector((state) => state.temperament)


//     const handleChange = (event) => {
//         const { name, value } = event.target;
        
//         // Actualiza el estado
//         setInput((prevInput) => ({
//           ...prevInput,
//           [name]: value,
//         }));
      
//         // Realiza validaciones después de que el estado se haya actualizado
//         // Usando el estado actualizado en setInput
//         // También, puedes utilizar setErrors directamente si prefieres
//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           ...validation({ ...input, [name]: value }),  // Agrega el valor actualizado
//         }));
//       };




    // const handleSubmit = (event) => {
    //     const formData = new FormData(event.target)
    //     event.preventDefault();
    //     const dog = Object.fromEntries(formData.entries());
    //     const validationErrors = validation(input);
    //     setErrors(validationErrors);

    //     console.log('objeto dog:' , dog)

    //     if(Object.keys(validationErrors).length === 0) {
    //         setInput((prevInput)=>({
    //             ...prevInput,
    //             name: dog.name,
    //             height: `${dog.height_min} - ${dog.height_max}`,
    //             weight: `${dog.weight_min} - ${dog.weight_max}`,
    //             life_span: dog.life_span,
    //             temperament: [dog.temperament],
                
    //         }));
            
    //         navigate("/home");
    //     }
    //     const doggy = {
    //         name: dog.name,
    //         height: `${dog.height_min} - ${dog.height_max}`,    
    //         weight: `${dog.weight_min} - ${dog.weight_max}`,
    //         life_span: dog.life_span,
    //         temperament: input.temperament,
            
    //     }
    //     dispatch(postDog(doggy));
    //     alert("The dow was created")
    // }
    
//     // const handleErase = (dog) => {
//     //     setInput({
//     //         ...input,
//     //         temperament: input.temperament.filter(tem => tem !== dog)
//     //     })
//     // }

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const validationErrors = validation();
//         setErrors(validationErrors);
    
//         if (Object.keys(validationErrors).length === 0) {
//           // Concatenamos weight y height
//           const doggy = {
//             ...input,
//             weight: `${input.weight_min} - ${input.weight_max}`,
//             height: `${input.height_min} - ${input.height_max}`,
//           };
    
//           dispatch(postDog(doggy));
//           alert('The dog was created');
//         } else {
//           alert('The dog cannot be created yet');
//         }
//     };

//     const handleErase = (temperamentToRemove) => {
//         setInput((prevInput) => ({
//           ...prevInput,
//           temperament: prevInput.temperament.filter(
//             (temp) => temp !== temperamentToRemove
//           ),
//         }));
//       };

//     useEffect(() => {
//         dispatch(getTemperament())
//     }, [dispatch])
    
//     return (
//         <div>
//             <div>
//             <h1 >CREATE DOG</h1>
//             <div>
//                 <Link to="/home">
//                     <button >HOME</button>
//                 </Link>
//             </div>
//             <div>
//                 <form onSubmit={handleSubmit} >
//                     <div>
//                         <h3 >Name:</h3>
//                         <input 
//                             name="name"
//                             key="1"
//                             required 
//                             type="text" 
//                             value={input.name} 
//                             onChange={handleChange} 
//                             placeholder="Type a name of dog"/>
//                         <h2>{errors.name && (<p>{errors.name}</p>)}</h2>
//                     </div>
//                     <div>
//                         <h3 >Height min:</h3>
//                         <input required 
//                         key="2"
//                         name="height_min"
//                         min="0" 
//                         type="number" 
//                         value={input.height_min} 
//                         onChange={handleChange}/>
//                         <h2>{errors.height_min && (<p>{errors.height_min}</p>)}</h2>
//                         <h3>Height Max:</h3>
//                         <input required 
//                         key="3"
//                         name="height_max"
//                         min="0" 
//                         type="number" 
//                         value={input.height_max} 
//                         onChange={handleChange}/>
//                         <h2>{errors.height_max && (<p>{errors.height_max}</p>)}</h2>
//                     </div>
//                     <div>
//                         <h3>Weight Min:</h3>
//                         <input 
//                         key="4"
//                         required 
//                         name="weight_min"
//                         min="0" 
//                         type="number" 
//                         value={input.weight_min} 
//                         onChange={handleChange}/>
//                         <h2>{errors.weight_min && (<p>{errors.weight_min}</p>)}</h2>
//                         <h3>Weight Max:</h3>
//                         <input 
//                         key="5"
//                         required 
//                         name="weight_max"
//                         min="0" 
//                         type="number" 
//                         value={input.weight_max} 
//                         onChange={handleChange}/>
//                         <h2>{errors.weight_max && (<p>{errors.weight_max}</p>)}</h2>
//                     </div>
//                     <div>
//                         <h3>Life Span:</h3>
//                         <input required 
//                         key="6"
//                         name="life_span"
//                         min="0" 
//                         type="number" 
//                         value={input.life_span} 
//                         onChange={handleChange}/>
//                         <h2>{errors.life_span && (<p>{errors.life_span}</p>)}</h2>
//                     </div>
//                     <div>
//                         <h3>Image:</h3>
//                         <input  
//                         key="7"
//                         name="image" 
//                         type="url" 
//                         value={input.image} 
//                         onChange={handleChange}/>
//                     </div>
//                     <div>
//                         <h3>TEMPERAMENTS</h3>
//                         <select onChange={handleSelect}>
//                             <option value="all" disabled key="temp" >
//                                 Temperaments
//                             </option>
//                             {
//                             allTemperaments.map((t) => {
//                             return (
//                                 <option value={t.name} key={t.id}>{t.name}</option>
//                                 )
//                             })
//                         }
//                         </select>
//                         <h2>{errors.temperament && (<p>{errors.temperament}</p>)}</h2>
//                     </div>
//                     {
//                         !Object.keys(errors).length === 0
//                         ? (
//                         <div>The dog cant be Created Yed</div>
//                         ):(
//                         <button type="submit"> Create</button>
//                     )}
//                 </form>
//                     <div>
//                         {input.temperament.map((d, i) => {
//                             return (
//                                 <div key={i++} >
//                                     <div>
//                                         {d}
//                                     </div>
//                                     <button onClick={() => handleErase(d)}>X</button>
//                                 </div>
//                             )
//                         })}
//                     </div>
//             </div>
//             </div>
//         </div>
//     )

// }



// export default Create;