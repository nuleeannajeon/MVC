const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

const PORT = process.env.PORT || 8080;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var icecreams = [
    {name: 'vanilla', price: 10, awesomeness: 3},
    {name: 'chocolate', price: 4, awesomeness: 8},
    {name: 'banana', price: 1, awesomeness: 1},
    {name: 'greentea', price: 5, awesomeness: 7},
    {name: 'jawbreakers', price: 6, awesomeness: 2},
    {name: "pistachio", price: 11, awesomeness: 15 }
];

app.get("/icecreams", function(req, res) {
    res.render("all", {icecreams: icecreams} );
});

app.get("/icecreams/:name", function(req, res) {
    // send back the list of notes
    const name = req.params.name
    console.log( `[GET /icecream/name/${name}]` )

    for(var i=0; i<icecreams.length; i++){
        if (icecreams[i].name == name){
            return res.render('each', icecreams[i] );
        }
    }
  });

// * Do not use MySQL for this assignment! Use the `icecreams` variable above as your data. Add the variable to your `server.js` file.

// * Using handlebars and express, create a route called `/icecream/:name`. When the route is hit, it will display the name, price and awesomeness for that specific ice cream.

// * Create an `/icecreams` route. It will loop over all the ice creams and display them all to the user.

app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});