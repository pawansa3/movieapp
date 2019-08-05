exports.index = (req, res) => {
  res.render("index", { title: "Home" });
};

exports.addMovie = (req, res) => {
  res.render("addmovie", { title: "Add Movie" });
};
