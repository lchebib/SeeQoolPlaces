
// Temporary trips
const myTrips = [
{
	tid: "1",
	name: "San Francisco",
},
{
	tid: "2",
	name: "Malibu",
},
{
	tid: "3",
	name: "Victoria",
}
];


// Temporary randomly generated city and photo
const randomCities = [
	{
		cid: "1",
		name: "Joshua Tree",
		photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/e7/91/8d/photo1jpg.jpg?w=1400&h=-1&s=1"
	},
	{
		cid: "2",
		name: "Vancouver",
		photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/a6/09/9f/beautiful-view-of-stanley.jpg?w=2000&h=-1&s=1"
	},
	{
		cid: "3",
		name: "Big Sur",
		photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/7b/35/5a/pfeiffer-big-sur-state.jpg?w=2200&h=-1&s=1"
	}
	];



	function tempGetRandomCity() {
		const randomIndex = Math.floor(Math.random() * 4);
		return randomCities[randomIndex]
	}

	export { myTrips, tempGetRandomCity };