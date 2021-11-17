const users = {
  loggedIn: { "username": "Admin" },
  admin: { "username": "Admin" }
}

const tempPOIS = [
  {
    pid: 0,
    name: "Coit Tower",
    city: "San Francisco",
    state: "CA",
    category: "attractions",
    subcategory: "Points of Interest & Landmarks",
    tags: "Architectural Buildings,Observation Decks & Towers,Monuments & Statues",
    description: "Monument tower overlooking San Francisco. Tower includes murals from 1934 showing California business, agriculture and home life of the period. 360 Degree viewing platform at top of 212 ft tower.",
    rating: 4,
    numReviews: 4500,
    durationLow: 1,
    durationHigh: 2,
    photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/95/48/3d/coit-tower-from-financial.jpg?w=1100&h=-1&s=1"
  },
  {
    pid: 1,
    name: "Coit Tower",
    city: "San Francisco",
    state: "CA",
    category: "attractions",
    subcategory: "Points of Interest & Landmarks",
    tags: "Architectural Buildings,Observation Decks & Towers,Monuments & Statues",
    description: "Monument tower overlooking San Francisco. Tower includes murals from 1934 showing California business, agriculture and home life of the period. 360 Degree viewing platform at top of 212 ft tower.",
    rating: 4,
    numReviews: 4500,
    durationLow: 1,
    durationHigh: 2,
    photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/95/48/3d/coit-tower-from-financial.jpg?w=1100&h=-1&s=1"
  },
  {
    pid: 2,
    name: "Coit Tower",
    city: "San Francisco",
    state: "CA",
    category: "attractions",
    subcategory: "Points of Interest & Landmarks",
    tags: "Architectural Buildings,Observation Decks & Towers,Monuments & Statues",
    description: "Monument tower overlooking San Francisco. Tower includes murals from 1934 showing California business, agriculture and home life of the period. 360 Degree viewing platform at top of 212 ft tower.",
    rating: 4,
    numReviews: 4500,
    durationLow: 1,
    durationHigh: 2,
    photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/95/48/3d/coit-tower-from-financial.jpg?w=1100&h=-1&s=1"
  },
  {
    pid: 3,
    name: "Coit Tower",
    city: "San Francisco",
    state: "CA",
    category: "attractions",
    subcategory: "Points of Interest & Landmarks",
    tags: "Architectural Buildings,Observation Decks & Towers,Monuments & Statues",
    description: "Monument tower overlooking San Francisco. Tower includes murals from 1934 showing California business, agriculture and home life of the period. 360 Degree viewing platform at top of 212 ft tower.",
    rating: 4,
    numReviews: 4500,
    durationLow: 1,
    durationHigh: 2,
    photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/95/48/3d/coit-tower-from-financial.jpg?w=1100&h=-1&s=1"
  },
  {
    pid: 4,
    name: "Coit Tower",
    city: "San Francisco",
    state: "CA",
    category: "attractions",
    subcategory: "Points of Interest & Landmarks",
    tags: "Architectural Buildings,Observation Decks & Towers,Monuments & Statues",
    description: "Monument tower overlooking San Francisco. Tower includes murals from 1934 showing California business, agriculture and home life of the period. 360 Degree viewing platform at top of 212 ft tower.",
    rating: 4,
    numReviews: 4500,
    durationLow: 1,
    durationHigh: 2,
    photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/95/48/3d/coit-tower-from-financial.jpg?w=1100&h=-1&s=1"
  },
  {
    pid: 5,
    name: "Coit Tower",
    city: "San Francisco",
    state: "CA",
    category: "attractions",
    subcategory: "Points of Interest & Landmarks",
    tags: "Architectural Buildings,Observation Decks & Towers,Monuments & Statues",
    description: "Monument tower overlooking San Francisco. Tower includes murals from 1934 showing California business, agriculture and home life of the period. 360 Degree viewing platform at top of 212 ft tower.",
    rating: 4,
    numReviews: 4500,
    durationLow: 1,
    durationHigh: 2,
    photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/95/48/3d/coit-tower-from-financial.jpg?w=1100&h=-1&s=1"
  },
  {
    pid: 6,
    name: "Coit Tower",
    city: "San Francisco",
    state: "CA",
    category: "attractions",
    subcategory: "Points of Interest & Landmarks",
    tags: "Architectural Buildings,Observation Decks & Towers,Monuments & Statues",
    description: "Monument tower overlooking San Francisco. Tower includes murals from 1934 showing California business, agriculture and home life of the period. 360 Degree viewing platform at top of 212 ft tower.",
    rating: 4,
    numReviews: 4500,
    durationLow: 1,
    durationHigh: 2,
    photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/95/48/3d/coit-tower-from-financial.jpg?w=1100&h=-1&s=1"
  },
  {
    pid: 7,
    name: "Coit Tower",
    city: "San Francisco",
    state: "CA",
    category: "attractions",
    subcategory: "Points of Interest & Landmarks",
    tags: "Architectural Buildings,Observation Decks & Towers,Monuments & Statues",
    description: "Monument tower overlooking San Francisco. Tower includes murals from 1934 showing California business, agriculture and home life of the period. 360 Degree viewing platform at top of 212 ft tower.",
    rating: 4,
    numReviews: 4500,
    durationLow: 1,
    durationHigh: 2,
    photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/95/48/3d/coit-tower-from-financial.jpg?w=1100&h=-1&s=1"
  },
  {
    pid: 8,
    name: "Coit Tower",
    city: "San Francisco",
    state: "CA",
    category: "attractions",
    subcategory: "Points of Interest & Landmarks",
    tags: "Architectural Buildings,Observation Decks & Towers,Monuments & Statues",
    description: "Monument tower overlooking San Francisco. Tower includes murals from 1934 showing California business, agriculture and home life of the period. 360 Degree viewing platform at top of 212 ft tower.",
    rating: 4,
    numReviews: 4500,
    durationLow: 1,
    durationHigh: 2,
    photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/95/48/3d/coit-tower-from-financial.jpg?w=1100&h=-1&s=1"
  },
  {
    pid: 9,
    name: "Coit Tower",
    city: "San Francisco",
    state: "CA",
    category: "attractions",
    subcategory: "Points of Interest & Landmarks",
    tags: "Architectural Buildings,Observation Decks & Towers,Monuments & Statues",
    description: "Monument tower overlooking San Francisco. Tower includes murals from 1934 showing California business, agriculture and home life of the period. 360 Degree viewing platform at top of 212 ft tower.",
    rating: 4,
    numReviews: 4500,
    durationLow: 1,
    durationHigh: 2,
    photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/95/48/3d/coit-tower-from-financial.jpg?w=1100&h=-1&s=1"
  },
  {
    pid: 10,
    name: "Coit Tower",
    city: "San Francisco",
    state: "CA",
    category: "attractions",
    subcategory: "Points of Interest & Landmarks",
    tags: "Architectural Buildings,Observation Decks & Towers,Monuments & Statues",
    description: "Monument tower overlooking San Francisco. Tower includes murals from 1934 showing California business, agriculture and home life of the period. 360 Degree viewing platform at top of 212 ft tower.",
    rating: 4,
    numReviews: 4500,
    durationLow: 1,
    durationHigh: 2,
    photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/95/48/3d/coit-tower-from-financial.jpg?w=1100&h=-1&s=1"
  },
  {
    pid: 11,
    name: "Coit Tower",
    city: "San Francisco",
    state: "CA",
    category: "attractions",
    subcategory: "Points of Interest & Landmarks",
    tags: "Architectural Buildings,Observation Decks & Towers,Monuments & Statues",
    description: "Monument tower overlooking San Francisco. Tower includes murals from 1934 showing California business, agriculture and home life of the period. 360 Degree viewing platform at top of 212 ft tower.",
    rating: 4,
    numReviews: 4500,
    durationLow: 1,
    durationHigh: 2,
    photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/95/48/3d/coit-tower-from-financial.jpg?w=1100&h=-1&s=1"
  },
  {
    pid: 12,
    name: "Coit Tower",
    city: "San Francisco",
    state: "CA",
    category: "attractions",
    subcategory: "Points of Interest & Landmarks",
    tags: "Architectural Buildings,Observation Decks & Towers,Monuments & Statues",
    description: "Monument tower overlooking San Francisco. Tower includes murals from 1934 showing California business, agriculture and home life of the period. 360 Degree viewing platform at top of 212 ft tower.",
    rating: 4,
    numReviews: 4500,
    durationLow: 1,
    durationHigh: 2,
    photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/95/48/3d/coit-tower-from-financial.jpg?w=1100&h=-1&s=1"
  },
  {
    pid: 13,
    name: "Coit Tower",
    city: "San Francisco",
    state: "CA",
    category: "attractions",
    subcategory: "Points of Interest & Landmarks",
    tags: "Architectural Buildings,Observation Decks & Towers,Monuments & Statues",
    description: "Monument tower overlooking San Francisco. Tower includes murals from 1934 showing California business, agriculture and home life of the period. 360 Degree viewing platform at top of 212 ft tower.",
    rating: 4,
    numReviews: 4500,
    durationLow: 1,
    durationHigh: 2,
    photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/95/48/3d/coit-tower-from-financial.jpg?w=1100&h=-1&s=1"
  },
  {
    pid: 14,
    name: "Coit Tower",
    city: "San Francisco",
    state: "CA",
    category: "attractions",
    subcategory: "Points of Interest & Landmarks",
    tags: "Architectural Buildings,Observation Decks & Towers,Monuments & Statues",
    description: "Monument tower overlooking San Francisco. Tower includes murals from 1934 showing California business, agriculture and home life of the period. 360 Degree viewing platform at top of 212 ft tower.",
    rating: 4,
    numReviews: 4500,
    durationLow: 1,
    durationHigh: 2,
    photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/95/48/3d/coit-tower-from-financial.jpg?w=1100&h=-1&s=1"
  },
  {
    pid: 15,
    name: "Coit Tower",
    city: "San Francisco",
    state: "CA",
    category: "attractions",
    subcategory: "Points of Interest & Landmarks",
    tags: "Architectural Buildings,Observation Decks & Towers,Monuments & Statues",
    description: "Monument tower overlooking San Francisco. Tower includes murals from 1934 showing California business, agriculture and home life of the period. 360 Degree viewing platform at top of 212 ft tower.",
    rating: 4,
    numReviews: 4500,
    durationLow: 1,
    durationHigh: 2,
    photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/95/48/3d/coit-tower-from-financial.jpg?w=1100&h=-1&s=1"
  },
  {
    pid: 16,
    name: "Coit Tower",
    city: "San Francisco",
    state: "CA",
    category: "attractions",
    subcategory: "Points of Interest & Landmarks",
    tags: "Architectural Buildings,Observation Decks & Towers,Monuments & Statues",
    description: "Monument tower overlooking San Francisco. Tower includes murals from 1934 showing California business, agriculture and home life of the period. 360 Degree viewing platform at top of 212 ft tower.",
    rating: 4,
    numReviews: 4500,
    durationLow: 1,
    durationHigh: 2,
    photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/95/48/3d/coit-tower-from-financial.jpg?w=1100&h=-1&s=1"
  },
  {
    pid: 17,
    name: "Slanted Door",
    city: "San Francisco",
    state: "CA",
    category: "restaurants",
    subcategory: "Restaurant",
    tags: "Asian,Vietnamese,Vegetarian-Friendly",
    rating: 4,
    numReviews: 3500,
    durationLow: 1,
    durationHigh: 2,
    costLow: 2,
    costHigh: 3
  },
  {
    pid: 18,
    name: "Slanted Door",
    city: "San Francisco",
    state: "CA",
    category: "restaurants",
    subcategory: "Restaurant",
    tags: "Asian,Vietnamese,Vegetarian-Friendly",
    rating: 4,
    numReviews: 3500,
    durationLow: 1,
    durationHigh: 2,
    costLow: 2,
    costHigh: 3
  },
  {
    pid: 19,
    name: "Slanted Door",
    city: "San Francisco",
    state: "CA",
    category: "restaurants",
    subcategory: "Restaurant",
    tags: "Asian,Vietnamese,Vegetarian-Friendly",
    rating: 4,
    numReviews: 3500,
    durationLow: 1,
    durationHigh: 2,
    costLow: 2,
    costHigh: 3
  },
  {
    pid: 20,
    name: "Slanted Door",
    city: "San Francisco",
    state: "CA",
    category: "restaurants",
    subcategory: "Restaurant",
    tags: "Asian,Vietnamese,Vegetarian-Friendly",
    rating: 4,
    numReviews: 3500,
    durationLow: 1,
    durationHigh: 2,
    costLow: 2,
    costHigh: 3
  },
  {
    pid: 21,
    name: "Slanted Door",
    city: "San Francisco",
    state: "CA",
    category: "restaurants",
    subcategory: "Restaurant",
    tags: "Asian,Vietnamese,Vegetarian-Friendly",
    rating: 4,
    numReviews: 3500,
    durationLow: 1,
    durationHigh: 2,
    costLow: 2,
    costHigh: 3
  },
  {
    pid: 22,
    name: "Slanted Door",
    city: "San Francisco",
    state: "CA",
    category: "restaurants",
    subcategory: "Restaurant",
    tags: "Asian,Vietnamese,Vegetarian-Friendly",
    rating: 4,
    numReviews: 3500,
    durationLow: 1,
    durationHigh: 2,
    costLow: 2,
    costHigh: 3
  },
  {
    pid: 23,
    name: "Slanted Door",
    city: "San Francisco",
    state: "CA",
    category: "restaurants",
    subcategory: "Restaurant",
    tags: "Asian,Vietnamese,Vegetarian-Friendly",
    rating: 4,
    numReviews: 3500,
    durationLow: 1,
    durationHigh: 2,
    costLow: 2,
    costHigh: 3
  },
  {
    pid: 24,
    name: "Slanted Door",
    city: "San Francisco",
    state: "CA",
    category: "restaurants",
    subcategory: "Restaurant",
    tags: "Asian,Vietnamese,Vegetarian-Friendly",
    rating: 4,
    numReviews: 3500,
    durationLow: 1,
    durationHigh: 2,
    costLow: 2,
    costHigh: 3
  },
  {
    pid: 25,
    name: "Slanted Door",
    city: "San Francisco",
    state: "CA",
    category: "restaurants",
    subcategory: "Restaurant",
    tags: "Asian,Vietnamese,Vegetarian-Friendly",
    rating: 4,
    numReviews: 3500,
    durationLow: 1,
    durationHigh: 2,
    costLow: 2,
    costHigh: 3
  },
  {
    pid: 26,
    name: "Slanted Door",
    city: "San Francisco",
    state: "CA",
    category: "restaurants",
    subcategory: "Restaurant",
    tags: "Asian,Vietnamese,Vegetarian-Friendly",
    rating: 4,
    numReviews: 3500,
    durationLow: 1,
    durationHigh: 2,
    costLow: 2,
    costHigh: 3
  },
  {
    pid: 27,
    name: "Slanted Door",
    city: "San Francisco",
    state: "CA",
    category: "restaurants",
    subcategory: "Restaurant",
    tags: "Asian,Vietnamese,Vegetarian-Friendly",
    rating: 4,
    numReviews: 3500,
    durationLow: 1,
    durationHigh: 2,
    costLow: 2,
    costHigh: 3
  },
  {
    pid: 28,
    name: "Slanted Door",
    city: "San Francisco",
    state: "CA",
    category: "restaurants",
    subcategory: "Restaurant",
    tags: "Asian,Vietnamese,Vegetarian-Friendly",
    rating: 4,
    numReviews: 3500,
    durationLow: 1,
    durationHigh: 2,
    costLow: 2,
    costHigh: 3
  },
  {
    pid: 29,
    name: "Slanted Door",
    city: "San Francisco",
    state: "CA",
    category: "restaurants",
    subcategory: "Restaurant",
    tags: "Asian,Vietnamese,Vegetarian-Friendly",
    rating: 4,
    numReviews: 3500,
    durationLow: 1,
    durationHigh: 2,
    costLow: 2,
    costHigh: 3
  },
  {
    pid: 30,
    name: "Slanted Door",
    city: "San Francisco",
    state: "CA",
    category: "restaurants",
    subcategory: "Restaurant",
    tags: "Asian,Vietnamese,Vegetarian-Friendly",
    rating: 4,
    numReviews: 3500,
    durationLow: 1,
    durationHigh: 2,
    costLow: 2,
    costHigh: 3
  },
  {
    pid: 31,
    name: "Slanted Door",
    city: "San Francisco",
    state: "CA",
    category: "restaurants",
    subcategory: "Restaurant",
    tags: "Asian,Vietnamese,Vegetarian-Friendly",
    rating: 4,
    numReviews: 3500,
    durationLow: 1,
    durationHigh: 2,
    costLow: 2,
    costHigh: 3
  },
  {
    pid: 32,
    name: "Slanted Door",
    city: "San Francisco",
    state: "CA",
    category: "restaurants",
    subcategory: "Restaurant",
    tags: "Asian,Vietnamese,Vegetarian-Friendly",
    rating: 4,
    numReviews: 3500,
    durationLow: 1,
    durationHigh: 2,
    costLow: 2,
    costHigh: 3
  },
  {
    pid: 33,
    name: "Slanted Door",
    city: "San Francisco",
    state: "CA",
    category: "restaurants",
    subcategory: "Restaurant",
    tags: "Asian,Vietnamese,Vegetarian-Friendly",
    rating: 4,
    numReviews: 3500,
    durationLow: 1,
    durationHigh: 2,
    costLow: 2,
    costHigh: 3
  },
  {
    pid: 34,
    name: "Slanted Door",
    city: "San Francisco",
    state: "CA",
    category: "restaurants",
    subcategory: "Restaurant",
    tags: "Asian,Vietnamese,Vegetarian-Friendly",
    rating: 4,
    numReviews: 3500,
    durationLow: 1,
    durationHigh: 2,
    costLow: 2,
    costHigh: 3
  },
  {
    pid: 35,
    name: "Mile Rock View Point",
    city: "San Francisco",
    state: "CA",
    category: "trails",
    description: "The Mile Rock Viewpoint features a stunning overlook of the Golden Gate Bridge, Marin Headlands, and even Point Reyes on a clear day. You can continue on the path down to a small rocky beach and the Pacific ocean. The cliffs are eroding badly here and are very dangerous, but the trail is wide and safe if you take your time.",
    rating: 5,
    numReviews: 6,
    length: 1,
    durationLow: .5,
    durationHigh: 1,
    elevationHigh: 1500,
    elevationLow: 500,
    routeType: "Loop",
    difficulty: "easy",
    photo: "https://cdn2.apstatic.com/photos/hike/7007902_large_1554323814.jpg"
  },
  {
    pid: 36,
    name: "Mile Rock View Point",
    city: "San Francisco",
    state: "CA",
    category: "trails",
    description: "The Mile Rock Viewpoint features a stunning overlook of the Golden Gate Bridge, Marin Headlands, and even Point Reyes on a clear day. You can continue on the path down to a small rocky beach and the Pacific ocean. The cliffs are eroding badly here and are very dangerous, but the trail is wide and safe if you take your time.",
    rating: 5,
    numReviews: 6,
    length: 1,
    durationLow: .5,
    durationHigh: 1,
    elevationHigh: 1500,
    elevationLow: 500,
    routeType: "Loop",
    difficulty: "easy",
    photo: "https://cdn2.apstatic.com/photos/hike/7007902_large_1554323814.jpg"
  },
  {
    pid: 37,
    name: "Mile Rock View Point",
    city: "San Francisco",
    state: "CA",
    category: "trails",
    description: "The Mile Rock Viewpoint features a stunning overlook of the Golden Gate Bridge, Marin Headlands, and even Point Reyes on a clear day. You can continue on the path down to a small rocky beach and the Pacific ocean. The cliffs are eroding badly here and are very dangerous, but the trail is wide and safe if you take your time.",
    rating: 5,
    numReviews: 6,
    length: 1,
    durationLow: .5,
    durationHigh: 1,
    elevationHigh: 1500,
    elevationLow: 500,
    routeType: "Loop",
    difficulty: "easy",
    photo: "https://cdn2.apstatic.com/photos/hike/7007902_large_1554323814.jpg"
  },
  {
    pid: 38,
    name: "Mile Rock View Point",
    city: "San Francisco",
    state: "CA",
    category: "trails",
    description: "The Mile Rock Viewpoint features a stunning overlook of the Golden Gate Bridge, Marin Headlands, and even Point Reyes on a clear day. You can continue on the path down to a small rocky beach and the Pacific ocean. The cliffs are eroding badly here and are very dangerous, but the trail is wide and safe if you take your time.",
    rating: 5,
    numReviews: 6,
    length: 1,
    durationLow: .5,
    durationHigh: 1,
    elevationHigh: 1500,
    elevationLow: 500,
    routeType: "Loop",
    difficulty: "easy",
    photo: "https://cdn2.apstatic.com/photos/hike/7007902_large_1554323814.jpg"
  },
  {
    pid: 39,
    name: "Mile Rock View Point",
    city: "San Francisco",
    state: "CA",
    category: "trails",
    description: "The Mile Rock Viewpoint features a stunning overlook of the Golden Gate Bridge, Marin Headlands, and even Point Reyes on a clear day. You can continue on the path down to a small rocky beach and the Pacific ocean. The cliffs are eroding badly here and are very dangerous, but the trail is wide and safe if you take your time.",
    rating: 5,
    numReviews: 6,
    length: 1,
    durationLow: .5,
    durationHigh: 1,
    elevationHigh: 1500,
    elevationLow: 500,
    routeType: "Loop",
    difficulty: "easy",
    photo: "https://cdn2.apstatic.com/photos/hike/7007902_large_1554323814.jpg"
  },
  {
    pid: 40,
    name: "Mile Rock View Point",
    city: "San Francisco",
    state: "CA",
    category: "trails",
    description: "The Mile Rock Viewpoint features a stunning overlook of the Golden Gate Bridge, Marin Headlands, and even Point Reyes on a clear day. You can continue on the path down to a small rocky beach and the Pacific ocean. The cliffs are eroding badly here and are very dangerous, but the trail is wide and safe if you take your time.",
    rating: 5,
    numReviews: 6,
    length: 1,
    durationLow: .5,
    durationHigh: 1,
    elevationHigh: 1500,
    elevationLow: 500,
    routeType: "Loop",
    difficulty: "easy",
    photo: "https://cdn2.apstatic.com/photos/hike/7007902_large_1554323814.jpg"
  },
  {
    pid: 41,
    name: "Mile Rock View Point",
    city: "San Francisco",
    state: "CA",
    category: "trails",
    description: "The Mile Rock Viewpoint features a stunning overlook of the Golden Gate Bridge, Marin Headlands, and even Point Reyes on a clear day. You can continue on the path down to a small rocky beach and the Pacific ocean. The cliffs are eroding badly here and are very dangerous, but the trail is wide and safe if you take your time.",
    rating: 5,
    numReviews: 6,
    length: 1,
    durationLow: .5,
    durationHigh: 1,
    elevationHigh: 1500,
    elevationLow: 500,
    routeType: "Loop",
    difficulty: "easy",
    photo: "https://cdn2.apstatic.com/photos/hike/7007902_large_1554323814.jpg"
  },
  {
    pid: 42,
    name: "Mile Rock View Point",
    city: "San Francisco",
    state: "CA",
    category: "trails",
    description: "The Mile Rock Viewpoint features a stunning overlook of the Golden Gate Bridge, Marin Headlands, and even Point Reyes on a clear day. You can continue on the path down to a small rocky beach and the Pacific ocean. The cliffs are eroding badly here and are very dangerous, but the trail is wide and safe if you take your time.",
    rating: 5,
    numReviews: 6,
    length: 1,
    durationLow: .5,
    durationHigh: 1,
    elevationHigh: 1500,
    elevationLow: 500,
    routeType: "Loop",
    difficulty: "easy",
    photo: "https://cdn2.apstatic.com/photos/hike/7007902_large_1554323814.jpg"
  },
  {
    pid: 43,
    name: "Mile Rock View Point",
    city: "San Francisco",
    state: "CA",
    category: "trails",
    description: "The Mile Rock Viewpoint features a stunning overlook of the Golden Gate Bridge, Marin Headlands, and even Point Reyes on a clear day. You can continue on the path down to a small rocky beach and the Pacific ocean. The cliffs are eroding badly here and are very dangerous, but the trail is wide and safe if you take your time.",
    rating: 5,
    numReviews: 6,
    length: 1,
    durationLow: .5,
    durationHigh: 1,
    elevationHigh: 1500,
    elevationLow: 500,
    routeType: "Loop",
    difficulty: "easy",
    photo: "https://cdn2.apstatic.com/photos/hike/7007902_large_1554323814.jpg"
  },
  {
    pid: 44,
    name: "Mile Rock View Point",
    city: "San Francisco",
    state: "CA",
    category: "trails",
    description: "The Mile Rock Viewpoint features a stunning overlook of the Golden Gate Bridge, Marin Headlands, and even Point Reyes on a clear day. You can continue on the path down to a small rocky beach and the Pacific ocean. The cliffs are eroding badly here and are very dangerous, but the trail is wide and safe if you take your time.",
    rating: 5,
    numReviews: 6,
    length: 1,
    durationLow: .5,
    durationHigh: 1,
    elevationHigh: 1500,
    elevationLow: 500,
    routeType: "Loop",
    difficulty: "easy",
    photo: "https://cdn2.apstatic.com/photos/hike/7007902_large_1554323814.jpg"
  },
  {
    pid: 45,
    name: "Mile Rock View Point",
    city: "San Francisco",
    state: "CA",
    category: "trails",
    description: "The Mile Rock Viewpoint features a stunning overlook of the Golden Gate Bridge, Marin Headlands, and even Point Reyes on a clear day. You can continue on the path down to a small rocky beach and the Pacific ocean. The cliffs are eroding badly here and are very dangerous, but the trail is wide and safe if you take your time.",
    rating: 5,
    numReviews: 6,
    length: 1,
    durationLow: .5,
    durationHigh: 1,
    elevationHigh: 1500,
    elevationLow: 500,
    routeType: "Loop",
    difficulty: "easy",
    photo: "https://cdn2.apstatic.com/photos/hike/7007902_large_1554323814.jpg"
  },
  {
    pid: 46,
    name: "Mile Rock View Point",
    city: "San Francisco",
    state: "CA",
    category: "trails",
    description: "The Mile Rock Viewpoint features a stunning overlook of the Golden Gate Bridge, Marin Headlands, and even Point Reyes on a clear day. You can continue on the path down to a small rocky beach and the Pacific ocean. The cliffs are eroding badly here and are very dangerous, but the trail is wide and safe if you take your time.",
    rating: 5,
    numReviews: 6,
    length: 1,
    durationLow: .5,
    durationHigh: 1,
    elevationHigh: 1500,
    elevationLow: 500,
    routeType: "Loop",
    difficulty: "easy",
    photo: "https://cdn2.apstatic.com/photos/hike/7007902_large_1554323814.jpg"
  },
  {
    pid: 47,
    name: "Mile Rock View Point",
    city: "San Francisco",
    state: "CA",
    category: "trails",
    description: "The Mile Rock Viewpoint features a stunning overlook of the Golden Gate Bridge, Marin Headlands, and even Point Reyes on a clear day. You can continue on the path down to a small rocky beach and the Pacific ocean. The cliffs are eroding badly here and are very dangerous, but the trail is wide and safe if you take your time.",
    rating: 5,
    numReviews: 6,
    length: 1,
    durationLow: .5,
    durationHigh: 1,
    elevationHigh: 1500,
    elevationLow: 500,
    routeType: "Loop",
    difficulty: "easy",
    photo: "https://cdn2.apstatic.com/photos/hike/7007902_large_1554323814.jpg"
  },
  {
    pid: 48,
    name: "Mile Rock View Point",
    city: "San Francisco",
    state: "CA",
    category: "trails",
    description: "The Mile Rock Viewpoint features a stunning overlook of the Golden Gate Bridge, Marin Headlands, and even Point Reyes on a clear day. You can continue on the path down to a small rocky beach and the Pacific ocean. The cliffs are eroding badly here and are very dangerous, but the trail is wide and safe if you take your time.",
    rating: 5,
    numReviews: 6,
    length: 1,
    durationLow: .5,
    durationHigh: 1,
    elevationHigh: 1500,
    elevationLow: 500,
    routeType: "Loop",
    difficulty: "easy",
    photo: "https://cdn2.apstatic.com/photos/hike/7007902_large_1554323814.jpg"
  },
  {
    pid: 49,
    name: "Mile Rock View Point",
    city: "San Francisco",
    state: "CA",
    category: "trails",
    description: "The Mile Rock Viewpoint features a stunning overlook of the Golden Gate Bridge, Marin Headlands, and even Point Reyes on a clear day. You can continue on the path down to a small rocky beach and the Pacific ocean. The cliffs are eroding badly here and are very dangerous, but the trail is wide and safe if you take your time.",
    rating: 5,
    numReviews: 6,
    length: 1,
    durationLow: .5,
    durationHigh: 1,
    elevationHigh: 1500,
    elevationLow: 500,
    routeType: "Loop",
    difficulty: "easy",
    photo: "https://cdn2.apstatic.com/photos/hike/7007902_large_1554323814.jpg"
  },
  {
    pid: 50,
    name: "Mile Rock View Point",
    city: "San Francisco",
    state: "CA",
    category: "trails",
    description: "The Mile Rock Viewpoint features a stunning overlook of the Golden Gate Bridge, Marin Headlands, and even Point Reyes on a clear day. You can continue on the path down to a small rocky beach and the Pacific ocean. The cliffs are eroding badly here and are very dangerous, but the trail is wide and safe if you take your time.",
    rating: 5,
    numReviews: 6,
    length: 1,
    durationLow: .5,
    durationHigh: 1,
    elevationHigh: 1500,
    elevationLow: 500,
    routeType: "Loop",
    difficulty: "easy",
    photo: "https://cdn2.apstatic.com/photos/hike/7007902_large_1554323814.jpg"
  },
  {
    pid: 51,
    name: "Mile Rock View Point",
    city: "San Francisco",
    state: "CA",
    category: "trails",
    description: "The Mile Rock Viewpoint features a stunning overlook of the Golden Gate Bridge, Marin Headlands, and even Point Reyes on a clear day. You can continue on the path down to a small rocky beach and the Pacific ocean. The cliffs are eroding badly here and are very dangerous, but the trail is wide and safe if you take your time.",
    rating: 5,
    numReviews: 6,
    length: 1,
    durationLow: .5,
    durationHigh: 1,
    elevationHigh: 1500,
    elevationLow: 500,
    routeType: "Loop",
    difficulty: "easy",
    photo: "https://cdn2.apstatic.com/photos/hike/7007902_large_1554323814.jpg"
  },
  {
    pid: 52,
    name: "Mile Rock View Point",
    city: "San Francisco",
    state: "CA",
    category: "trails",
    description: "The Mile Rock Viewpoint features a stunning overlook of the Golden Gate Bridge, Marin Headlands, and even Point Reyes on a clear day. You can continue on the path down to a small rocky beach and the Pacific ocean. The cliffs are eroding badly here and are very dangerous, but the trail is wide and safe if you take your time.",
    rating: 5,
    numReviews: 6,
    length: 1,
    durationLow: .5,
    durationHigh: 1,
    elevationHigh: 1500,
    elevationLow: 500,
    routeType: "Loop",
    difficulty: "easy",
    photo: "https://cdn2.apstatic.com/photos/hike/7007902_large_1554323814.jpg"
  }
];


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
    state: "CA",
    city: "Joshua Tree",
    photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/e7/91/8d/photo1jpg.jpg?w=1400&h=-1&s=1"
  },
  {
    state: "BC",
    city: "Vancouver",
    photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/a6/09/9f/beautiful-view-of-stanley.jpg?w=2000&h=-1&s=1"
  },
  {
    state: "CA",
    city: "Big Sur",
    photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/7b/35/5a/pfeiffer-big-sur-state.jpg?w=2200&h=-1&s=1"
  }
];

//Temporary cities to select
const tempAllCities = [
  {
    state: "CA",
    city: "Los Angeles"
  },
  {
    state: "CA",
    city: "San Francisco"
  },
  {
    state: "CA",
    city: "Big Sur"
  },
  {
    state: "CA",
    city: "San Diego"
  },
  {
    state: "CA",
    city: "Santa Cruz"
  },
  {
    state: "BC",
    city: "Vancouver"
  },
  {
    state: "BC",
    city: "Vernon"
  },
  {
    state: "BC",
    city: "Whistler"
  },
  {
    state: "BC",
    city: "Victoria"
  },
  {
    state: "BC",
    city: "Kelowna"
  },
]


function tempGetPOIS() {
  return tempPOIS;
}

function tempGetRandomCity() {
  const randomIndex = Math.floor(Math.random() * 3);
  return tempRandomCities[randomIndex];
}

function tempGetAllCities() {
  return tempAllCities;
}


function tempGetLoggedInUser() {

  return users.loggedIn;

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

// function tempUserExists(username) {
//   var all_users = localStorage.getItem("all_users");

//   if (all_users.length > 0) {

//     all_users.forEach(user => {

//       if (user.username === username) {

//         return true;
//       }
//     })
//   }

//   return false;

// }

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

export { tempMyTrips, tempGetRandomCity, tempGetLoggedInUser, tempLogout, tempLogin, tempSignUp, tempGetAllCities, tempGetPOIS };