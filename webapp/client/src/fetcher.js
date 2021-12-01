import config from './config.json'
import {
  tempGetQuizCities,
  tempGetRandomCity,
  tempGetLoggedInUser,
  tempMyTrips,
  tempLogout,
  tempLogin,
  tempSignUp,
  tempGetAllCities,
  tempGetPOIS
} from './tempData'

// ********************************************
//             All Page Fetchers
// ********************************************

const getAllTrips = async (username) => {
  var res = await fetch(`http://${config.server_host}:${config.server_port}/trips?username=${username}`, {
    method: 'GET',
  })
  return res.json()
  // var res = { results: tempMyTrips }

  // res.results.map(trip => {
  //   localStorage.setItem(trip.id, JSON.stringify(trip))
  // })

  // return res
}

const signUp = async (username, password) => {
  var res = await fetch(`http://${config.server_host}:${config.server_port}/add_user?username=${username}&password=${password}`, {
    method: 'GET',
  })
  return res.json();
}

const logout = async username => {
  var res = await fetch(`http://${config.server_host}:${config.server_port}/logout?username=${username}`, {
    method: 'GET',
  })
  return res.json();
}

const login = async (username, password) => {
  var res = await fetch(`http://${config.server_host}:${config.server_port}/login?username=${username}&password=${password}`, {
    method: 'GET',
  })
  return res.json();
}


// ********************************************
//             Home Page Fetchers
// ********************************************

const getRandomCity = async () => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/random_city`,
    {
      method: 'GET'
    }
  )
  return res.json()
  // var res = { results: tempGetRandomCity() }
  // return res;
}

// ********************************************
//             QuizPage0 Fetchers
// ********************************************

// ********************************************
//             SelectCityPage Fetchers
// ********************************************

const getAllCities = async () => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/cities`,
    {
      method: 'GET'
    }
  )
  return res.json()
  // var res = tempGetAllCities();
  // return res;
}


// ********************************************
//             QuizPage1 Fetchers
// ********************************************

const getQuizCities = async (population, p0, p1, p2, p3, p4, p5) => {

  // population = JSON.stringify(population)
  // p0 = JSON.stringify(p1)
  // p1 = JSON.stringify(p2)
  // p2 = JSON.stringify(p3)
  // p3 = JSON.stringify(p4)
  // p4 = JSON.stringify(p5)
  // p5 = JSON.stringify(p6)


  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/quizCities?population=${population}&p0=${p0}&p1=${p1}&p2=${p2}&p3=${p3}&p4=${p4}&p5=${p5}`,
    {
      method: 'GET'
    }
  )
  return res.json()
  // var res = tempGetQuizCities();
  // return res;
}


// ********************************************
//             CreateTripPage Fetchers
// ********************************************


const getTripPOIS = async (tripID, username) => {
  // var res = await fetch(
  //   `http://${config.server_host}:${config.server_port}/trip_pois?tid=${tripID}&username=${username}`,
  //   {
  //     method: 'GET',
  //   }
  // )
  // return res.json()

  var res = { results: tempGetPOIS() };
  return res;
}


const newTrip = async (username, tripName, city, state, p0, p1, p2, p3, p4, p5) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/new_trip?username=${username}&tripName='${tripName}'&city=${city}&state=${state}&p0=${p0}&p1=${p1}&p2=${p2}&p3=${p3}&p4=${p4}&p5=${p5}`,
    {
      method: 'GET',
    }
  )
  return res.json()
  // const content = await rawResponse.json();
  // console.log(content);
}

// ********************************************
//             TripPage Fetchers
// ********************************************

const getTripAttractions = async (tripID) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/trip/attractions?tripID=${tripID}`,
    {
      method: 'GET',
    }
  )
  return res.json()
}

const getTripTrails = async (tripID) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/trip/trails?tripID=${tripID}`,
    {
      method: 'GET',
    }
  )
  return res.json()
}

const getTripRestaurants = async (tripID) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/trip/restaurants?tripID=${tripID}`,
    {
      method: 'GET',
    }
  )
  return res.json()
}

const postSaveTrip = async (tripID) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/save_trip?tripID={tripID}`,
    {
      method: 'GET',
    }
  )
  // return res.json()
}

const postDeleteTrip = async (tripID) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/delete_trip?tripID={tripID}`,
    {
      method: 'GET',
    }
  )
  // return res.json()
}

export {
  getAllTrips,
  getRandomCity,
  logout,
  login,
  signUp,
  getAllCities,
  getQuizCities,
  getTripPOIS,
  newTrip,
  getTripAttractions,
  getTripTrails,
  getTripRestaurants,
  postSaveTrip,
  postDeleteTrip
}