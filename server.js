// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Tables and Waitlist Data
// =============================================================
var tables = [];
var waitlist = [];
var reservations = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "main.html"));
});

app.get("/reservation", function(req, res) {
  res.sendFile(path.join(__dirname, "reservation.html"));
});

app.get("/table", function(req, res) {
    res.sendFile(path.join(__dirname, "table.html"));
  });

// Displays all tables
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// Displays all waitlsits
app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
  });


// Create New Reservations - takes in JSON input
app.post("/api/reservations", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;


//   if statement to handle reservation based on current table occupancy 
  if(tables.length >= 5){
      waitlist.push(newReservation)
  }else{
      tables.push(newReservation)
  }

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});