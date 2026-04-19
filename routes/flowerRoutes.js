"use strict";
const express = require("express");
const router = express.Router();
const flowerController = require('../controllers/flowerController');

router.get("/", flowerController.fetchAllFlowers);
router.get("/:id", flowerController.fetchFlowerByID);
router.get("/location/:location", flowerController.fetchFlowerByLocation);
router.post("/", flowerController.createFlower);
router.delete("/:id", flowerController.removeFlower);

module.exports = router;