const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/MovieController");
const ActorController = require("../controllers/ActorController");
const { catchErrors } = require("../handlers/errorHandlers");

// pagecontroller routes
// Read
router.get("/", MovieController.index);
router.get("/addmovie", MovieController.addMovie);

// Create
router.post(
  "/addmovie",
  MovieController.upload,
  catchErrors(MovieController.resize),
  catchErrors(MovieController.createMovie)
);

// Edit
router.get("/editmovie/:id", catchErrors(MovieController.editMovie));

// Update
router.post(
  "/editmovie/:id",
  MovieController.upload,
  catchErrors(MovieController.resize),
  catchErrors(MovieController.updateMovie)
);

// Delete
router.post("/deletemovie/:id", catchErrors(MovieController.deleteMovie));

router.get("/actors", catchErrors(ActorController.getActor));
router.post("/addactor", catchErrors(ActorController.createActor));

module.exports = router;
