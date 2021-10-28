import config from './config.json'
import { tempGetRandomCity, tempGetLoggedInUser, myTrips } from './tempData'

const getAllTrips = async () => {
    // var res = await fetch(`http://${config.server_host}:${config.server_port}/trips`, {
    //     method: 'GET',
    // })
    // return res.json()
    var res = {results: myTrips}
    return res;
}

const getRandomCity = async () => {
    // var res = await fetch(`http://${config.server_host}:${config.server_port}/random`, {
    //     method: 'GET',
    // })
    // return res.json()
    var res = {results: tempGetRandomCity()}
    return res;
}


const getLoggedInUser = async () => {
    // var res = await fetch(`http://${config.server_host}:${config.server_port}/logged-in-user`, {
    //     method: 'GET',
    // })
    // return res.json()
    var res = {results: tempGetLoggedInUser()}
    return res;
}



export {
    getAllTrips,
    getRandomCity,
    getLoggedInUser
}