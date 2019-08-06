const { Movie } = require("../models/movies");
const { Actor } = require("../models/actors");
const multer = require("multer");
const jimp = require("jimp");
const uuid = require("uuid");

// show all movies in home page
exports.index = async (req, res) => {
  const movies = await Movie.find();

  // res.json(movies);
  res.render("index", { title: "Home", movies });
};

// show form to add new movie
exports.addMovie = async (req, res) => {
  const actors = await Actor.find();
  // console.log(actors);
  res.render("addmovie", { title: "Add Movie", actors });
};

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith("image/");
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "That filetype isn't allowed!" }, false);
    }
  }
};

exports.upload = multer(multerOptions).single("poster");

exports.resize = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  // renaming
  const extension = req.file.mimetype.split("/")[1];
  req.body.poster = `${uuid.v4()}.${extension}`;
  // resizing
  const poster = await jimp.read(req.file.buffer);
  await poster.resize(jimp.AUTO, 100);
  await poster.write(`./public/uploads/${req.body.poster}`);
  next();
};

exports.createMovie = async (req, res) => {
  // res.json(req.body);
  const movie = await new Movie(req.body).save();
  req.flash("success", "Movie created Successfully");
  res.redirect("/");
};

exports.editMovie = async (req, res) => {
  const movie = await Movie.findOne({ _id: req.params.id });
  const actors = await Actor.find();
  // res.json(movie);
  res.render("editmovie", { title: "Edit Movie", movie, actors });
};

exports.updateMovie = async (req, res) => {
  const movie = await Movie.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true
  }).exec();

  req.flash("success", "Movie Successfully updated!");
  res.redirect("/");
};

exports.deleteMovie = async (req, res) => {
  await Movie.findOneAndRemove({ _id: req.params.id });
  req.flash("success", "Movie Successfully deleted!");
  res.redirect("/");
};
