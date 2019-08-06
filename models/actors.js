const mongoose = require("mongoose");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const actorSchema = new Schema({
  actor_name: {
    type: String,
    required: "Please enter actor name.",
    trim: true,
    unique: true
  },
  sex: {
    type: String,
    required: "Please enter gender.",
    trim: true
  },
  dob: {
    type: Date,
    required: "Please enter dob.",
    trim: true
  },
  bio: {
    type: String,
    required: "Please enter bio.",
    trim: true
  }
});

actorSchema.plugin(mongodbErrorHandler);

const Actor = mongoose.model("Actor", actorSchema);
module.exports = { Actor };
