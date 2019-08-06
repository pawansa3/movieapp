const mongoose = require("mongoose");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const movieSchema = new Schema({
  movie_name: {
    type: String,
    required: "Please enter a movie name.",
    trim: true,
    unique: 1
  },
  release_year: {
    type: Number,
    required: "Please enter movie release year.",
    trim: true
  },
  plot: {
    type: String,
    required: "Please enter movie plot.",
    trim: true
  },
  poster: String,
  cast: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Actor",
      required: "Please select movie casts."
    }
  ]
});

movieSchema.plugin(mongodbErrorHandler);

function autopopulate(next) {
  this.populate("cast");
  next();
}

movieSchema.pre("find", autopopulate);
movieSchema.pre("findOne", autopopulate);

const Movie = mongoose.model("Movie", movieSchema);
module.exports = { Movie };
