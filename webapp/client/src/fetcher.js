import config from './config.json'


// ********************************************
//             All Page Fetchers
// ********************************************

const getAllTrips = async (username) => {
  var res = await fetch(`http://${config.server_host}:${config.server_port}/trips?username=${username}`, {
    method: 'GET',
  })
  return res.json()
}



const logout = async username => {
  var res = await fetch(`http://${config.server_host}:${config.server_port}/logout?username=${username}`, {
    method: 'GET',
  })
  return res.json();
}



// ********************************************
//             Landing Page Fetchers
// ********************************************

const authenticateUser = async (username) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/authenticate/user?username=${username}`,
    {
      method: 'GET',
    }
  )
  return res.json()
}

const login = async (username, password) => {
  var res = await fetch(`http://${config.server_host}:${config.server_port}/login?username=${username}&password=${password}`, {
    method: 'GET',
  })
  return res.json();
}

const signUp = async (username, password) => {
  var res = await fetch(`http://${config.server_host}:${config.server_port}/add_user?username=${username}&password=${password}`, {
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
}


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
}


// ********************************************
//             QuizPage1 Fetchers
// ********************************************

const getQuizCities = async (population, p0, p1, p2, p3, p4, p5) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/quizCities?population=${population}&p0=${p0}&p1=${p1}&p2=${p2}&p3=${p3}&p4=${p4}&p5=${p5}`,
    {
      method: 'GET'
    }
  )
  return res.json()
}


// ********************************************
//             CreateTripPage Fetchers
// ********************************************



const newTrip = async (username, tripName, city, state, startDate, endDate, p0, p1, p2, p3, p4, p5) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/new_trip?username=${username}&tripName='${tripName}'&city=${city}&state=${state}&startDate=${startDate}&endDate=${endDate}&p0=${p0}&p1=${p1}&p2=${p2}&p3=${p3}&p4=${p4}&p5=${p5}`,
    {
      method: 'GET',
    }
  )
  return res.json()
}

const getPopulation = async (city, state) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/population?city=${city}&state=${state}`,
    {
      method: 'GET',
    }
  )
  return res.json()
}

// ********************************************
//             TripPage Fetchers
// ********************************************

const authenticateTrip = async (username, tripID) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/authenticate/trip?username=${username}&tripID=${tripID}`,
    {
      method: 'GET',
    }
  )
  return res.json()
}

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

const postSaveTrip = async (tripID, favorites, events) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/trip/save_trip?tripID=${tripID}&favorites=${favorites}&events=${events}`,
    {
      method: 'GET',
    }
  )
  return res.json()
}

const postDeleteTrip = async (tripID) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/delete_trip?tripID=${tripID}`,
    {
      method: 'GET',
    }
  )
  return res.json()
}


const getTripFavorites = async (tripID) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/trip/favorites?tripID=${tripID}`,
    {
      method: 'GET',
    }
  )
  return res.json()
}

const getTripEvents = async (tripID) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/trip/events?tripID=${tripID}`,
    {
      method: 'GET',
    }
  )
  return res.json()
}


export {
  getAllTrips,
  getRandomCity,
  logout,
  login,
  signUp,
  getAllCities,
  getQuizCities,
  newTrip,
  getTripAttractions,
  getTripTrails,
  getTripRestaurants,
  postSaveTrip,
  postDeleteTrip,
  getTripEvents,
  getTripFavorites,
  authenticateTrip,
  authenticateUser,
  getPopulation
}