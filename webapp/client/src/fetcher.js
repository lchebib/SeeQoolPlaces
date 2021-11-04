import config from './config.json'
import { tempGetRandomCity, tempGetLoggedInUser, tempMyTrips, tempLogout, tempLogin, tempSignUp } from './tempData'

const getAllTrips = async () => {
    // var res = await fetch(`http://${config.server_host}:${config.server_port}/trips`, {
    //     method: 'GET',
    // })
    // return res.json()
    var res = { results: tempMyTrips }
    return res;
}

const getRandomCity = async () => {
    // var res = await fetch(`http://${config.server_host}:${config.server_port}/random`, {
    //     method: 'GET',
    // })
    // return res.json()
    var res = { results: tempGetRandomCity() }
    return res;
}

const getAllCities = async () => {
    // var res = await fetch(`http://${config.server_host}:${config.server_port}/cities`, {
    //     method: 'GET',
    // })
    // return res.json()
    var res = { results: tempGetRandomCity() }
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

// const getAllCities = async() +> {

// }


export {
    getAllTrips,
    getRandomCity,
    getLoggedInUser,
    logout,
    login,
    signUp,
    getAllCities
}