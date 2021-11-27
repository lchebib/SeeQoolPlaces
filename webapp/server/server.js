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
app.get('/random_city', routes.random)

// Route 3 - register as GET 
app.get('/trips', routes.all_trips)

// Route 5 - register as GET 
// query 2
app.get('/cities/', routes.all_cities)
// app.get('/cities/:state', routes.all_cities)

// Route 4 - register as GET 
app.get('/quizCities', routes.quizCities)
// query 9
// /quiz?city=string, state=string, population=int&p0=boolean&p1=boolean&p2=boolean&p3=boolean&p4=boolean&p5=boolean

// Route 10 - register as GET
app.get('/trip_pois/', routes.trip_pois)

// Route 6 - register as GET 
// post quiz: query 10
app.get('/quiz/topcity', routes.quiz_topcity)

// Route 7 - register as GET 
// post quiz: query 11
app.get('/quiz/attraction', routes.quiz_attraction)

// Route 8 - register as GET 
// post quiz: query 12
app.get('/quiz/restaurant', routes.quiz_restaurant)

// Route 9 - register as GET 
// post quiz: query 13
app.get('/quiz/trail', routes.quiz_trail)


app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
