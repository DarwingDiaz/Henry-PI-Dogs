const { Router } = require('express');
const dogsRouter = Router()
const {
    getDogsHandler,
    getDogsIdHandler,
    getDogsNameHandler,
    postDogsHandler
} = require("../handlers/dogsHandlers")

const validate = (req, res, next) =>{
    const {image, name, height, weight, life_span} = req.body
    if(!image) return res.status(400).json({error: "Missing image"})
    if(!name) return res.status(400).json({error: "Missing name"})
    if(!height) return res.status(400).json({error: "Missing height"})
    if(!weight) return res.status(400).json({error: "Missing weight"})
    if(!life_span) return res.status(400).json({error: "Missing life_span"})
    next();
} 

dogsRouter.get("/", getDogsHandler) 

dogsRouter.get("/:id",getDogsIdHandler)

dogsRouter.post("/",validate, postDogsHandler)

module.exports = dogsRouter