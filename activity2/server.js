var express = require("express");
var mysql = require("mysql");

var app = express();

var PORT = process.env.PORT || 8080;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "wjsalstj1005",
  database: "actors_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

app.get("/cast", function(req, res) {
    connection.query("SELECT * FROM actor", function(err, result) {
      if (err) throw err;

      var html = "<h1> Awesome Actors CAST </h1>";
      html += "<ul>";
      for (var i = 0; i < result.length; i++) {
        html += "<li><p>ID:"+ result[i].id +"Name: " + result[i].name + "</p></li>";
      }
      html += "</ul>";

      res.send(html);
    });
});
app.get("/coolness-charts", function(req, res) {
    connection.query("SELECT * FROM actor", function(err, result) {
      if (err) throw err;

      var html = "<h1> How COOL are the actors? </h1>";
      html += "<ul>";
      for (var i = 0; i < result.length; i++) {
        html += "<li><p>Name: "+ result[i].name +"Coolness Points: " + result[i].coolness_points + "</p></li>";
      }
      html += "</ul>";

      res.send(html);
    });
});
app.get("/attitude-chart/:att", function(req, res) {
    var att = req.params.att;

    connection.query("SELECT * FROM actor WHERE attitude = ?", att, function(err, result) {
      if (err) throw err;

      var html = "<h1> Actors' Attitudes </h1>";
      html += "<ul>";
      for (var i = 0; i < result.length; i++) {
        html += "<li><p>Name: "+ result[i].name +" Attitude: " + result[i].attitude + "</p></li>";
      }
      html += "</ul>";

      res.send(html);
    });
});
// * **Instructions**

//   * Create a Node Application with Express and MySQL with three Express routes.

//     * Create a `/cast` route that will display all the actors and their data ordered by their id's.

//     * Create a `/coolness-chart` route that will display all the actors and their data ordered by their coolness points.

//     * Create a `/attitude-chart/:att` route that will display all the actors for a specific type of attitude.
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});