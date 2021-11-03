const all_users = [
	{ "loggedIn": { "username": "admin" } },
	{ "admin": { "username": "admin" } }
]

localStorage.setItem("all_users", all_users)


// Temporary trips
const tempMyTrips = [
	{
		id: "100",
		name: "San Francisco",
	},
	{
		id: "101",
		name: "Surf Trip to Malibu",
	},
	{
		id: "102",
		name: "Christmas in Victoria",
	}
];


// Temporary cities
const tempRandomCities = [
	{
		id: "1",
		city: "Joshua Tree",
		photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/e7/91/8d/photo1jpg.jpg?w=1400&h=-1&s=1"
	},
	{
		id: "2",
		city: "Vancouver",
		photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/a6/09/9f/beautiful-view-of-stanley.jpg?w=2000&h=-1&s=1"
	},
	{
		id: "3",
		city: "Big Sur",
		photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/7b/35/5a/pfeiffer-big-sur-state.jpg?w=2200&h=-1&s=1"
	}
];

// // Temporary users
// const tempUsers = [
// 	{
// 		username: "Admin",
// 		status: true,
// 	},
// 	{
// 		username: "Oprah",
// 		status: false,
// 	}
// ];


function tempGetRandomCity() {
	const randomIndex = Math.floor(Math.random() * 3);
	return tempRandomCities[randomIndex];
}


function tempGetLoggedInUser() {
	// return tempUsers.find(user => user.status === true)

	var users = localStorage.getItem('all_users');

	console.log(users)

	// if (users.length > 0) {

	// 	users.forEach(user => {

	// 		if ("loggedIn" in user) {

	// 			return user.username;
	// 		}
	// 	})
	// }

	return false;

}


function tempLogout(username) {

	// tempUsers.findIndex((user, index) => {
	// 	if (user.username == username) {
	// 		if (user.status === true) {
	// 			tempUsers[index].status = false;
	// 			return true;
	// 		}
	// 		return false;
	// 	}
	// })

	var user = localStorage.getItem("all_users");
	var loggedIn = localStorage.getItem('loggedIn');
	if (user === loggedIn) {
		localStorage.removeItem('loggedIn');
		return true;
	} else {
		return false;
	}

}

function tempLogin(username) {
	// tempUsers.findIndex((user, index) => {
	// 	if (user.username == username) {
	// 		if (user.status === false) {
	// 			tempUsers[index].status = true;
	// 			return true;
	// 		}
	// 		return false;
	// 	}
	// })

	var user = localStorage.getItem(username);

	if (user) {
		localStorage.setItem('loggedIn', user);
		return true;
	} else {
		return false;
	}
}

function tempUserExists(username) {
	var all_users = localStorage.getItem("all_users");

	if (all_users.length > 0) {

		all_users.forEach(user => {

			if (user.username === username) {

				return true;
			}
		})
	}

	return false;

}

function tempSignUp(username) {
	// tempUsers.findIndex((user, index) => {
	// 	if (user.username == username) {
	// 		return false;
	// 	}
	// 	tempUsers.push({ username: username, status: true })
	// 	return true;
	// })

	var user = localStorage.getItem(username);

	if (user) {
		return false;
	} else {
		localStorage.setItem(username, username);
		tempLogin(username);
	}
}

export { tempMyTrips, tempGetRandomCity, tempGetLoggedInUser, tempLogout, tempLogin, tempSignUp };