import config from './config.json'
import { tempGetRandomCity, tempGetLoggedInUser, tempMyTrips, tempLogout, tempLogin, tempSignUp, tempGetAllCities, tempGetPOIS } from './tempData'

// ********************************************
//             All Page Fetchers
// ********************************************

const getAllTrips = async () => {
  // var res = await fetch(`http://${config.server_host}:${config.server_port}/trips`, {
  //     method: 'GET',
  // })
  // return res.json()
  var res = { results: tempMyTrips }
  return res;
}


const getLoggedInUser = async () => {
  // var res = await fetch(`http://${config.server_host}:${config.server_port}/logged-in-user`, {
  //     method: 'GET',
  // })
  // return res.json()
  var res = { results: tempGetLoggedInUser() }
  return res;
}


const logout = async (username) => {
  // var res = await fetch(`http://${config.server_host}:${config.server_port}/logout`, {
  //     method: 'POST',
  // })

  return tempLogout(username);

}

const login = async (username) => {
  // var res = await fetch(`http://${config.server_host}:${config.server_port}/login`, {
  //     method: 'POST',
  // })

  return tempLogin(username);

}

const signUp = async (username) => {
  // var res = await fetch(`http://${config.server_host}:${config.server_port}/signup`, {
  //     method: 'POST',
  // })

  return tempSignUp(username);

}

// ********************************************
//             Home Page Fetchers
// ********************************************


const getRandomCity = async () => {
  // var res = await fetch(`http://${config.server_host}:${config.server_port}/random`, {
  //     method: 'GET',
  // })
  // return res.json()
  var res = { results: tempGetRandomCity() }
  return res;
}


// ********************************************
//             QuizPage0 Fetchers
// ********************************************

// ********************************************
//             SelectCityPage Fetchers
// ********************************************

const getAllCities = async () => {
  // var res = await fetch(`http://${config.server_host}:${config.server_port}/cities`, {
  //     method: 'GET',
  // })
  // return res.json()
  var res = tempGetAllCities();
  return res;
}

// ********************************************
//             QuizPage0 Fetchers
// ********************************************

// ********************************************
//             QuizPage1 Fetchers
// ********************************************

// ********************************************
//             QuizPage2 Fetchers
// ********************************************

// const getQuizCities = async (size, p0, p1, p2, p3, p4, p5) => {
//   var res = await fetch(`http://${config.server_host}:${config.server_port}/quiz?size=${size}&p0=${p0}&p1=${p1}&p2=${p2}&p3=${p3}&p4=${p4}&p5=${p5}`, {
//     method: 'GET',
//   })
//   return res.json()
// }

const getQuizCities = async (size, p0, p1, p2, p3, p4, p5) => {
  var res = await fetch(`http://${config.server_host}:${config.server_port}/quiz?size=${size}&p0=${p0}&p1=${p1}&p2=${p2}&p3=${p3}&p4=${p4}&p5=${p5}`, {
    method: 'GET',
  })
  return res.json()
}

// ********************************************
//             QuizPage2 Fetchers
// ********************************************

const getAllPOIs = async (tripID) => {
  // TODO
  // var res = await fetch(`http://${config.server_host}:${config.server_port}/cities`, {
  //     method: 'GET',
  // })
  // return res.json()
  var res = tempGetPOIS();
  return res;
}


// ********************************************
//             CreateTripPage Fetchers
// ********************************************

const postCreateTrip = async (tripDetails) => {
  console.log(tripDetails)
  var res = await fetch(`http://${config.server_host}:${config.server_port}/createtrip`, {
    method: 'GET',
    body: JSON.stringify(tripDetails)
  });
  // const content = await rawResponse.json();

  // console.log(content);

  return res.json()

}

export {
  getAllTrips,
  getRandomCity,
  getLoggedInUser,
  logout,
  login,
  signUp,
  getAllCities,
  getQuizCities,
  getAllPOIs,
  postCreateTrip
}