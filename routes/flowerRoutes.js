"use strict";
const express = require("express");
const router = express.Router();
const flowerController = require('../controllers/flowerController');


router.get("/",  ensureAuth, flowerController.fetchAllFlowers);
router.get("/location/:location",  ensureAuth, flowerController.fetchFlowerByLocation);
router.get("/new",  ensureAuth, flowerController.getFlowerForm);
router.get("/:id",  ensureAuth, flowerController.fetchFlowerByID);
router.post("/",  ensureAuth, flowerController.createFlower);
router.delete("/:id",  ensureAuth, flowerController.removeFlower);


function ensureAuth(req, res, next) {
  req.session.returnTo = req.originalUrl;
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  next();
}

module.exports = router;