const express = require("express");
const router = express.Router();
const PageController = require("../controllers/PageController");

// pagecontroller routes
router.get("/", PageController.index);
router.get("/addmovie", PageController.addMovie);

module.exports = router;
