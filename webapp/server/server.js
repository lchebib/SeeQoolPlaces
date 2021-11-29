const express = require('express');
const mysql = require('mysql');


const routes = require('./routes')
const config = require('./config.json')
const cors = require('cors');

const app = express();
app.use(cors({
     origin: '*'
 }));

// Route 1 - register as GET 
app.get('/hello', routes.hello)

// Route 2 - register as GET 
app.get('/add_user', routes.add_user)

// Route 2 - register as GET 
app.get('/login', routes.login)

// Route 2 - register as GET 
app.get('/logout', routes.logout)

// Route 2 - register as GET 
app.get('/random_city', routes.random_city)

// Route 3 - register as GET 
app.get('/trips', routes.all_trips)

// Route 5 - register as GET 
app.get('/cities/', routes.all_cities)
// app.get('/cities/:state', routes.all_cities)

// Route 4 - register as GET 
app.get('/quizCities', routes.quizCities)

// Route 6 - register as GET 
app.get('/new_trip', routes.new_trip)

// Route 10 - register as GET
app.get('/trip_pois/', routes.trip_pois)

// Route 7 - register as GET 
app.get('/trip/attractions', routes.trip_attractions)

// Route 8 - register as GET 
app.get('/trip/restaurants', routes.trip_restaurants)

// Route 9 - register as GET 
app.get('/trip/trails', routes.trip_trails)

// Route 6 - register as GET 
app.get('/delete_trip', routes.delete_trip)

// Route 6 - register as GET 
app.get('/test', routes.test)

app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
