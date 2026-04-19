"use strict";
const model = require('../models/flowerModel');

async function fetchAllFlowers(req, res){
    try {
        const flowers = await model.getAllFlowers();
        res.json(flowers);
    }
    catch (err){
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function fetchFlowerByID(req, res){
    const id = req.params.id;
    if (id){
        try {
            const flower = await model.getOneFlowerByID(id);
            res.json(flower);
        }
        catch (err){
            console.error(err);
            res.status(500).send("Server error");
        }
        } else {
            res.status(400).send("Missing required id param!");
    }
}

async function fetchFlowerByLocation(req, res){
    const location = req.params.location;
    try {
        const flowers = await model.getFlowersByLocation(location);

    if (!flowers){
        return res.status(404).send("Flowers not found or your location does not exist!");
    }

    res.json(flowers);
    
    }
    catch (err){
        console.log(err);
        res.status(500).send("Server error");
    }
}

async function createFlower(req, res){
    const {name, location, description} = req.body;
    if (name && location && description){
        try {
            const newFlower = await model.addFlower(name, location, description);
            res.status(201).json(newFlower);
        } catch (err) {
            console.log(err);
            res.status(500).send("Server error");
        }
        } else {
            res.status(400).send("Missing required flower fields!");
        }
}

async function removeFlower(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const deletedCount = await model.deleteFlower(id);
            if (deletedCount > 0) {
                res.send(`Flower with id ${id} deleted successfully.`);
            } else {
                res.status(404).send("Product not found.");
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }
}

module.exports = {
    fetchAllFlowers,
    fetchFlowerByID,
    fetchFlowerByLocation,
    createFlower,
    removeFlower
}







