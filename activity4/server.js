var express = require("express");
var exphbs = require("express-handlebars");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var animals = [
  {
    animalType: "dog",
    pet: true,
    fierceness: 4
  }, {
    animalType: "cat",
    pet: true,
    fierceness: 10
  }, {
    animalType: "giraffe",
    pet: false,
    fierceness: 4
  }, {
    animalType: "zebra",
    pet: false,
    fierceness: 8
  }, {
    animalType: "lion",
    pet: false,
    fierceness: 10
  }
];

app.get("/dog", function(req, res) {
  // Handlebars requires an object to be sent to the dog.handlebars file. Lucky for us, animals[0] is an object!
  // 1. Send the dog object from the animals array to the dog.handlebars file.
  res.render('dog', animals[0])

});

app.get("/all-pets", function(req, res) {
  // Handlebars requires an object to be sent to the index.handlebars file.
  // 2. Send the animals to the index.handlebars file. Remember that animals is an array and not an object.
    // for(var i=0; i<animals.length; i++){
    //   if(animals[i].pet){
    //     res.render('index', animals[i] )
    //   }
    // } ********ASK WHY.... you dont put {animals:animals} like icecream example
    
    var data = { animals: [] };
    for (var i = 0; i < animals.length; i += 1) {
      var currentAnimal = animals[i];
      if (currentAnimal.pet) {
        data.animals.push(currentAnimal);
      }
    }
  
    res.render("index", data);

});

app.get("/all-non-pets", function(req, res) {
  // Handlebars requires an object to be sent to the index.handlebars file.
  // 3. Send all the animals that are not pets to the index.handlebars file.
  // for(var i=0; i<animals.length; i++){
  //   if (!animals[i].pet){
  //     res.render('index', animals[i] )
  //   }
  // }

  var data = { animals: [] };
  for (var i = 0; i < animals.length; i += 1) {
    var currentAnimal = animals[i];
    if (!currentAnimal.pet) {
      data.animals.push(currentAnimal);
    }
  }
  res.render('index', data)
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
