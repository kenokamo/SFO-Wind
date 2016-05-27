// https://github.com/kenokamo/SFO-Wind.git
// https://git.heroku.com/ancient-taiga-46604.git 

var path = require("path");
var express = require("express");
var ForecastIo = require("forecastio"); // https://developer.forecast.io/

var app = express();
var weather = new ForecastIo("15ac346e0c65bab345ccdeaa1c5132d2");

app.use(express.static(path.resolve(__dirname, "public")));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/api", function(req, res, next) {
  var zipcode = 00000;
  var latitude = 37.62;
  var longitude = -122.37;

  weather.forecast(latitude, longitude, function(err, data) {
    if (err) {
      next();
      return;
    }
    res.json({
      zipcode: zipcode,
      windSpeed: data.currently.windSpeed,
      windBearing: data.currently.windBearing
    });
  });
});

app.use(function(req, res) {
  res.status(404).render("404");
});

var http = require('http');
var server = http.createServer(app);
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});

