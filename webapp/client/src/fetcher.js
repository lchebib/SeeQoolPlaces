import config from './config.json'

const getAllTrips = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/trips`, {
        method: 'GET',
    })
    return res.json()
}

const getRandomCity = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/random`, {
        method: 'GET',
    })
    return res.json()
}






export {
    getAllTrips,
    getRandomCity
}