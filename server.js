const express = require("express");
//cors allows react port to grab data from server port
const cors = require("cors");

//sets up the express App
const app = express();
const PORT = process.env.PORT || 8080;

//require models for syncing
const db = require("./models");

// Sets up the Express app to handle data parsing
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


//api routes
require("./routes/test-api-routes.js")(app);//*****api routes go here*****


//sync sequelize to database and force table reset
db.sequelize.sync({ force: true }).then(function() {
  //add test data into fresh tables
  var run = require("./scripts/seedDB");

  //start express server
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});