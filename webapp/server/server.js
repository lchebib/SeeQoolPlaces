const express = require('express');
const mysql = require('mysql');


const routes = require('./routes')
const config = require('./config.json')
const cors = require('cors');

const app = express();
app.use(cors({
  origin: '*'
}));

// ********************************************
//             Test Routes
// ********************************************

// Route 1 - register as GET 
app.get('/hello', routes.hello)

// Route 6 - register as GET 
app.get('/test', routes.test)


// ********************************************
//             User Account Routes
// ********************************************

// Register new user
// requires: username and password --> /add_user?username=<username>&password=<password> (no quotations)
// returns true if successful; false if username already exists
app.get('/add_user', routes.add_user)

// Log in user
// requires: username and password --> /login?username=<username>&password=<password> (no quotations)
// returns true if successful; redirects to localhost:3000/failed otherwise
app.get('/login', routes.login)

// Log out user
// requires: username --> /login?username=<username> (no quotations)
// always returns true
app.get('/logout', routes.logout)


// ********************************************
//             Home Page Routes
// ********************************************

// Random city
// requires: none
// returns [{city, state, photo}]
app.get('/random_city', routes.random_city)

// All trips
// requires: username --> /trips?username=<username> (no quotations)
// returns [{tripID, tripName, city, state}]
app.get('/trips', routes.all_trips)


// ********************************************
//             Quiz Routes
// ********************************************

// All states and cities (to populate the destination menu)
// requires: none
// returns [{state, city}], ordered by city
app.get('/cities/', routes.all_cities)

// Top 3 Cities based on quiz results
// requires population and personalities --> /quizCities?population=1&p0=0&p1=1&...&p5=0 (population=[0,3], [0,1] for false/true)
// returns [{city, state}]
app.get('/quizCities', routes.quizCities)


// ********************************************
//             Trip Routes
// ********************************************

// DEPRECATED, but currently called in TripPage > componentWillMount() > getAllPOIs() to populate tabsCard
// leaving this here temporarily until we've fully migrated to the new routes
// moving forward, please use trip_attraction, trip_trails, and trip_restaurants to populate tabsCard
app.get('/trip_pois/', routes.trip_pois)

// Create new trip
// requires username, "tripName", city, state, and personalities --> /new_trip?username=admin&tripName="trip name with spaces"&city=<city>&state=<state>&p0=0&p1=1&...&p5=0 
// only tripName has quotations; username, city, and state no quotations; [0,1] for false/true in personalities
// returns {tripID: int}
app.get('/new_trip', routes.new_trip)

// Get trip attractions (for tabsCard)
// requires tripID --> /trip/attractions?tripID=2
// returns [{pid, subcategory, description, tags, photo}]
app.get('/trip/attractions', routes.trip_attractions)

// Get trip restaurants (for tabsCard)
// requires tripID --> /trip/restaurants?tripID=2
// returns [{pid, subcategory, costLow, costHigh, tags}]
app.get('/trip/restaurants', routes.trip_restaurants)

// Get trip trails (for tabsCard)
// requires tripID --> /trip/trails?tripID=2
// returns [{pid, length, difficulty, low, high, description, route_type, photo}]
app.get('/trip/trails', routes.trip_trails)

// Delete trip permanently from user account
// requires tripID --> /delete_trip?tripID=2
// always returns true
app.get('/delete_trip', routes.delete_trip)


app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;