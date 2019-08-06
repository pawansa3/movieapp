const { Actor } = require("../models/actors");

exports.createActor = async (req, res) => {
  const actor = await new Actor(req.body).save();
  req.flash("success", "Actor created Successfully");
  res.redirect("/addmovie");
};

exports.getActor = async (req, res) => {
  const actors = await Actor.find();
  res.render("actors", { title: "Actor", actors });
};
