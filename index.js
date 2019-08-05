const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const routes = require("./routes");
const errorHandlers = require("./handlers/errorHandlers");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SECRET || "SUPERSECRET",
    key: process.env.KEY || "SUPERKEY",
    resave: false,
    saveUninitialized: false
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.flashes = req.flash();
  next();
});

app.use("/", routes);

app.use(errorHandlers.notFound);
app.use(errorHandlers.flashValidationErrors);

if (app.get("env") === "development") {
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Express server running at port ${port}`));
