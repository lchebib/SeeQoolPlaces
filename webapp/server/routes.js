const config = require('./config.json')
const mysql = require('mysql')
const e = require('express')
const { all } = require('./server')

const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db
})
connection.connect()

// ********************************************
//            SIMPLE TEST ROUTE EXAMPLE
// ********************************************

// Basic route to test server connection
async function hello(req, res) {
  if (req.query.name) {
    res.send(`Hello, ${req.query.name}! Welcome to the SeeQoolPlaces server!`)
  } else {
    res.send(`Hello! Welcome to the SeeQoolPlaces server!`)
  }
}

// ********************************************
//             User Account Routes
// ********************************************

// Add new username and password
async function add_user(req, res) {
  var username = req.query.username
  var password = req.query.password

  var myQuery = `
    SELECT *
    FROM Accounts
    WHERE username = '${username}';
`
  console.log(myQuery)

  connection.query(myQuery, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      if (results.length > 0) {
        console.log('User already exists')
        res.json({ results: false })
      } else {
        var myQuery = `
          INSERT INTO Accounts (username, password)
          VALUES ('${username}', '${password}')
      `
        console.log(myQuery)

        connection.query(myQuery, function (error, results, fields) {
          if (error) {
            console.log(error)
            res.json({ error: error })
          } else if (results) {
            console.log('Added user ' + username.toString())
            res.json({ results: true })
          }
        })
      }
    }
  })
}

// Auto log in user
async function auto_login(req, res) {
  var clientIP = req.socket.remoteAddress

  // check if user is already logged in
  var myQuery = `
    SELECT *
    FROM LoggedIn
    WHERE clientIP = '${clientIP}';
  `
  console.log(myQuery)

  connection.query(myQuery, function (error, results, fields) {
    if (error) {
      console.log('Error in auto login')
      console.log(error)
      res.json({ results: false })
      // res.json({ error: error })
    } else if (results) {
      // user already logged in --> return username
      if (results.length > 0) {
        console.log(
          'Client IP is already logged in as ' + results[0].username.toString()
        )
        res.json({ results: results[0].username })
      }
      // user not yet logged in --> return false
      else {
        console.log('Client IP not logged in')
        res.json({ results: false })
      }
    }
  })
}

// Manually log in user
async function login(req, res) {
  var username = req.query.username
  var password = req.query.password
  var clientIP = req.socket.remoteAddress

  // check if user is already logged in
  var myQuery = `
    SELECT *
    FROM LoggedIn
    WHERE username = '${username}' AND clientIP = '${clientIP}';
  `
  console.log(myQuery)

  connection.query(myQuery, function (error, results, fields) {
    if (error) {
      console.log('Error trying to log in user: ' + username.toString())
      console.log(error)
      res.json({ results: false })
      // res.json({ error: error })
    } else if (results) {
      // user already logged in
      if (results.length > 0) {
        console.log('User already logged in')
        res.json({ results: true })
      }
      // user not yet logged in --> check if username and password are correct
      else {
        myQuery = `
          SELECT *
          FROM Accounts
          WHERE username = '${username}' AND password = '${password}';
        `
        console.log(myQuery)

        connection.query(myQuery, function (error, results, fields) {
          if (error) {
            console.log(error)
            res.json({ error: error })
          } else if (results) {
            // log in user if username and password are correct
            if (results.length > 0) {
              var myQuery = `
                INSERT INTO LoggedIn (username, clientIP)
                VALUES ('${username}', '${clientIP}'); 
              `
              console.log(myQuery)

              connection.query(myQuery, function (error, results, fields) {
                if (error) {
                  console.log(error)
                  res.json({ results: false })
                  // res.json({ error: error })
                } else if (results) {
                  console.log('Logged in user ' + username.toString())
                  res.json({ results: true })
                }
              })
            } else {
              console.log('Wrong username and/or password')
              res.json({ results: false })
              // res.redirect('http://localhost:3000/failed')
            }
          }
        })
      }
    }
  })
}

// Log out user
async function logout(req, res) {
  var username = req.query.username
  var clientIP = req.socket.remoteAddress

  var myQuery = `
    SELECT *
    FROM LoggedIn
    WHERE username = '${username}' AND clientIP = '${clientIP}'; 
  `
  console.log(myQuery)

  connection.query(myQuery, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      if (results.length > 0) {
        var myQuery = `
          DELETE FROM LoggedIn
          WHERE username = '${username}' AND clientIP = '${clientIP}'; 
      `
        console.log(myQuery)

        connection.query(myQuery, function (error, results, fields) {
          if (error) {
            console.log(error)
            res.json({ error: error })
          } else if (results) {
            console.log('Logged out user ' + username.toString())
            res.json({ results: true })
          }
        })
      } else {
        console.log('User was not logged in')
        res.json({ results: true })
      }
    }
  })
}

// ********************************************
//             Home Page Routes
// ********************************************

// Return a random city, and a photo of an attraction or hike
function random_city(req, res) {
  // top 24 'random' cities that we we select from database to show on landing page
  // BC ideas from here: https://www.planetware.com/canada/best-cities-in-british-columbia-cdn-1-284.htm
  // CA ideas from here: https://www.planetware.com/california/best-places-to-visit-in-california-us-ca-138.htm
  const randomCities = [
    ['Vancouver', 'BC'],
    ['Victoria', 'BC'],
    ['Kelowna', 'BC'],
    ['Penticton', 'BC'],
    ['Nanaimo', 'BC'],
    ['Vernon', 'BC'],
    ['San Francisco', 'CA'],
    ['San Diego', 'CA'],
    ['South Lake Tahoe', 'CA'],
    ['Santa Cruz', 'CA'],
    ['Los Angeles', 'CA'],
    ['Yosemite Lake', 'CA']
  ]

  const randomIndex = Math.floor(Math.random() * 11)
  const randomCityName = randomCities[randomIndex][0]
  const randomCityState = randomCities[randomIndex][1]

  var myQuery = `
        SELECT *
        FROM LandingPagePhoto
        WHERE city = '${randomCityName}'
          AND state = '${randomCityState}'
  `

  connection.query(myQuery, function (error, results, fields) {
    if (error) {
      console.log('Error getting random city')
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      res.json({ results: results })
    }
  })
}

// Return names of existing user-made trips to be displayed in sidebar
function all_trips(req, res) {
  var username = req.query.username



  var myQuery = `
    SELECT tripID, tripName, city, state, startDate, endDate
    FROM TripProfile
    WHERE username = '${username}';
  `
  console.log(myQuery)

  connection.query(myQuery, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      console.log('Got all trips')
      res.json({ results: results })
    }
  })
}

// ********************************************
//             Quiz Routes
// ********************************************

// Returns the list of all cities with at least one POI
function all_cities(req, res) {
  var myQuery = `
    SELECT DISTINCT state, city
    FROM POI
    WHERE state IS NOT NULL AND city IS NOT NULL
    ORDER BY city  
  `
  console.log(myQuery)

  connection.query(myQuery, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      console.log('Got all cities')
      res.json({ results: results })
    }
  })
}

// Returns the top 3 cities based on target city size and travel personalities
function quiz_cities(req, res) {
  console.log(req.query)
  var population = req.query.population
  var CoolCat = parseInt(req.query.p0) === 1
  var Adventurer = parseInt(req.query.p1) === 1
  var Entertainer = parseInt(req.query.p2) === 1
  var Family = parseInt(req.query.p3) === 1
  var Enthusiast = parseInt(req.query.p4) === 1
  var Investigator = parseInt(req.query.p5) === 1

  createPersonalityViews()

  var personalitiesQuery = createPersonalitiesQuery(
    CoolCat,
    Adventurer,
    Entertainer,
    Family,
    Enthusiast,
    Investigator
  )

  var populationQuery = createPopulationQuery(population)

  var myQuery = `
    ${personalitiesQuery}
    ${populationQuery}
    SELECT DISTINCT POI.city AS city, POI.state AS state
    FROM POI JOIN filteredCities ON (POI.city, POI.state) = (filteredCities.city, filteredCities.state)
    JOIN personalityPID ON (POI.pid = personalityPID.pid)
    WHERE POI.city IS NOT NULL AND POI.state IS NOT NULL
    GROUP BY POI.city
    ORDER BY COUNT(POI.pid) DESC
    LIMIT 3
    `
  console.log(myQuery)

  connection.query(myQuery, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      console.log('Got top 3 cities')
      console.log(results)
      res.json({ results: results })
    }
  })
}

// ********************************************
//             Trip Routes
// ********************************************

// Creates new trip in the database, filters POIs based on city, state, and personalities, and returns unique tripID.
function new_trip(req, res) {

  console.log(req.query)

  // get trip profile parameters
  var username = req.query.username
  var tripName = req.query.tripName
  var city = req.query.city
  var state = req.query.state
  var startDate = req.query.startDate
  var endDate = req.query.endDate
  // var startDate = parseDate(req.query.startDate)
  // var endDate = parseDate(req.query.endDate)
  var CoolCat = parseInt(req.query.p0) === 1
  var Adventurer = parseInt(req.query.p1) === 1
  var Entertainer = parseInt(req.query.p2) === 1
  var Family = parseInt(req.query.p3) === 1
  var Enthusiast = parseInt(req.query.p4) === 1
  var Investigator = parseInt(req.query.p5) === 1

  // create new entry in tripProfile
  var myQuery = `
    INSERT INTO TripProfile (username, tripName, city, state, startDate, endDate, CoolCat, Adventurer, Entertainer, Family, Enthusiast, Investigator)
    VALUES ('${username}', ${tripName}, '${city}', '${state}', '${startDate}', '${endDate}', ${CoolCat}, ${Adventurer}, ${Entertainer}, ${Family}, ${Enthusiast}, ${Investigator});
  `
  console.log(myQuery)

  connection.query(myQuery, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      console.log('Created new trip profile entry')

      // get tripID
      var tripID = 0
      var myQuery = `
        SELECT LAST_INSERT_ID() AS tripID;
      `
      console.log(myQuery)

      connection.query(myQuery, function (error, results, fields) {
        if (error) {
          console.log(error)
          res.json({ error: error })
        } else if (results) {
          tripID = results[0].tripID
          console.log('Trip ID: ' + tripID.toString())
          // generate filtered POIs
          createPersonalityViews()

          var personalitiesQuery = createPersonalitiesQuery(
            CoolCat,
            Adventurer,
            Entertainer,
            Family,
            Enthusiast,
            Investigator
          )

          var viewName = 'Trip_' + tripID.toString()

          var myQuery = `
                CREATE OR REPLACE VIEW ${viewName} AS
                ${personalitiesQuery}
                SELECT DISTINCT pid
                FROM POI NATURAL JOIN personalityPID
                WHERE POI.city = '${city}' AND POI.state = '${state}';
              `
          console.log(myQuery)

          connection.query(myQuery, function (error, results, fields) {
            if (error) {
              console.log(error)
              res.json({ error: error })
            } else if (results) {
              console.log(
                'Generated filtered POIs based on city, state, and personalities'
              )
            }
          })

          // return tripID
          res.json({ results: tripID })
        }
      })
    }
  })
}

// Retrieve filtered POIs based on tripID
function retrieve_trip(req, res) {
  var tripID = req.query.tripID

  // retrieve trip profile
  myQuery = `
    SELECT *
    FROM TripProfile
    WHERE tripID = ${tripID};
  `
  console.log(myQuery)

  connection.query(myQuery, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      if (results.length > 0) {
        console.log('Retrieved trip profile for Trip ' + tripID.toString())

        // generate filtered POIs
        createPersonalityViews()

        var personalitiesQuery = createPersonalitiesQuery(
          results[0].CoolCat,
          results[0].Adventurer,
          results[0].Entertainer,
          results[0].Family,
          results[0].Enthusiast,
          results[0].Investigator
        )

        var viewName = 'Trip_' + tripID.toString()
        var city = results[0].city
        var state = results[0].state

        myQuery = `
          CREATE OR REPLACE VIEW ${viewName} AS
          ${personalitiesQuery}
          SELECT DISTINCT pid
          FROM POI NATURAL JOIN personalityPID
          WHERE POI.city = '${city}' AND POI.state = '${state}';
        `
        console.log(myQuery)

        connection.query(myQuery, function (error, results, fields) {
          if (error) {
            console.log(error)
            res.json({ error: error })
          } else if (results) {
            console.log(
              'Generated filtered POIs based on city, state, and personalities'
            )
            res.json({ results: true })
          }
        })
      } else {
        console.log('Trip does not exist')
        res.json({ results: false })
      }
    }
  })
}

// Returns the attractions from filtered POIs
function trip_attractions(req, res) {
  const tripID = req.query.tripID ? req.query.tripID : 0
  var viewName = 'Trip_' + tripID.toString()

  var myQuery = `
    SELECT *
    FROM ${viewName} NATURAL JOIN Attraction NATURAL JOIN POI;  
  `
  console.log(myQuery)

  connection.query(myQuery, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      console.log('Got filtered Attractions')
      res.json({ results: results })
    }
  })
}

// Returns the restaurants from filtered POIs
function trip_restaurants(req, res) {
  const tripID = req.query.tripID ? req.query.tripID : 0
  var viewName = 'Trip_' + tripID.toString()

  var myQuery = `
    SELECT *
    FROM ${viewName} NATURAL JOIN Restaurant NATURAL JOIN POI;  
  `
  console.log(myQuery)

  connection.query(myQuery, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      console.log('Got filtered Restaurants')
      res.json({ results: results })
    }
  })
}

// Returns the trails from filtered POIs
function trip_trails(req, res) {

  const tripID = req.query.tripID ? req.query.tripID : 0
  var viewName = 'Trip_' + tripID.toString()

  var myQuery = `
    SELECT *
    FROM ${viewName} NATURAL JOIN Trail NATURAL JOIN POI;  
  `
  console.log(myQuery)

  connection.query(myQuery, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      console.log('Got filtered Trails')
      res.json({ results: results })
    }
  })
}

// Returns the trip Favorited POIs
function trip_favorites(req, res) {
  const tripID = req.query.tripID ? req.query.tripID : 0

  var trailResults = []
  var trailQuery = `
    SELECT category, city, description, difficulty, duration_high, duration_low, high, 
    length,low, name, num_reviews, photo, pid, rating, route_type, state
    FROM TripFavorites NATURAL JOIN POI NATURAL JOIN Trail
    WHERE tripID = ${tripID};
  `
  console.log(trailQuery)

  var restResults = []
  var restQuery = `
    SELECT category, city, costLow, costHigh, duration_high, duration_low, 
    name, num_reviews, pid, rating, state, subcategory, tags
    FROM TripFavorites NATURAL JOIN POI NATURAL JOIN Restaurant
    WHERE tripID = ${tripID}
  `
  console.log(restQuery)

  var attrResults = []
  var attrQuery = `
    SELECT category, city, description, duration_high, duration_low, 
    name, num_reviews, photo, pid, rating, state, subcategory, tags
    FROM TripFavorites NATURAL JOIN POI NATURAL JOIN Attraction
    WHERE tripID = ${tripID}
  `
  console.log(attrQuery)

  connection.query(trailQuery, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results.length > 0) {
      console.log('Got favorite trails')
      trailResults = results
    }

    connection.query(restQuery, function (error, results, fields) {
      if (error) {
        console.log(error)
        res.json({ error: error })
      } else if (results.length > 0) {
        console.log('Got favorite restaurants')
        restResults = results
      }

      connection.query(attrQuery, function (error, results, fields) {
        if (error) {
          console.log(error)
          res.json({ error: error })
        } else if (results.length > 0) {
          console.log('Got favorite attractions')
          attrResults = results
        }

        var allResults = [...trailResults, ...restResults, ...attrResults]
        res.json({ results: allResults })
      })
    })
  })
}

// Returns the trip Events
function trip_events(req, res) {
  const tripID = req.query.tripID ? req.query.tripID : 0

  var myQuery = `
    SELECT name AS title, eventID AS id, start, end, pid, category
    FROM TripEvents NATURAL JOIN POI
    WHERE tripID = ${tripID};  
  `
  console.log(myQuery)

  connection.query(myQuery, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      console.log('Got trip Events')
      res.json({ results: results })
    }
  })
}

// Save trip Favorites and Events
function save_trip(req, res) {
  var tripID = req.query.tripID ? req.query.tripID : 0
  var favorites = JSON.parse(req.query.favorites)
  var events = JSON.parse(req.query.events)

  if (favorites.length > 0) {
    // delete all existing favorites for given trip ID
    var myQuery = `
      DELETE FROM TripFavorites 
      WHERE tripID = ${tripID};
    `
    console.log(myQuery)

    connection.query(myQuery, function (error, results, fields) {
      if (error) {
        console.log(error)
        res.json({ error: error })
      } else if (results) {
        console.log('Deleted existing trip Favorites')

        // insert new favorites for trip ID
        for (let pid of favorites) {
          myQuery = `
              INSERT INTO TripFavorites (tripID, pid)
              VALUES (${tripID}, ${pid});
            `
          console.log(myQuery)

          connection.query(myQuery, function (error, results, fields) {
            if (error) {
              console.log(error)
              res.json({ error: error })
            }
            // else if (results) {
            //   console.log('Saved trip Favorites')
            // }
          })
        }
        console.log('Saved trip Favorites')
      }
    })
  } else {
    console.log('No favorites to store or invalid trip ID')
    res.json({ results: false })
  }

  if (events.length > 0) {
    // delete all existing events for given trip ID
    var myQuery = `
      DELETE FROM TripEvents 
      WHERE tripID = ${tripID};
    `
    console.log(myQuery)

    connection.query(myQuery, function (error, results, fields) {
      if (error) {
        console.log(error)
        res.json({ error: error })
      } else if (results) {
        console.log('Deleted existing trip Events')

        // insert new events for trip ID
        for (let event of events) {
          var eventID = event.id
          var pid = event.pid
          var start = event.start
          var end = event.end

          myQuery = `
            INSERT INTO TripEvents (eventID, tripID, pid, start, end)
            VALUES (${eventID}, ${tripID}, ${pid}, '${start}', '${end}');
          `
          console.log(myQuery)

          connection.query(myQuery, function (error, results, fields) {
            if (error) {
              console.log(error)
              res.json({ error: error })
            }
            // else if (results) {
            //   console.log('Saved trip Events')
            // }
          })
        }
        console.log('Saved trip Events')
      }
    })
  } else {
    console.log('No events to store')
    res.json({ results: false })
  }

  res.json({ results: true })
}

// Update trip details
function update_trip(req, res) {
  const tripID = req.query.tripID ? req.query.tripID : 0
  const tripName = req.query.tripName ? req.query.tripName : ''
  const city = req.query.city ? req.query.city : ''
  const state = req.query.state ? req.query.state : ''
  const startDate = req.query.startDate ? req.query.startDate : ''
  const endDate = req.query.endDate ? req.query.endDate : ''

  var myQuery = `
    UPDATE TripProfile
    SET tripName = ${tripName}, city = '${city}', state = '${state}', startDate = ${startDate}, endDate = ${endDate}
    WHERE tripID = ${tripID};
  `
  console.log(myQuery)

  connection.query(myQuery, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      console.log('Updated trip details')
      res.json({ results: true })
    }
  })
}

// Deletes trip given tripID
function delete_trip(req, res) {
  const tripID = req.query.tripID ? req.query.tripID : 0
  console.log('TripID to delete: ' + tripID.toString())

  var myQuery = `
    DELETE FROM TripProfile
    WHERE tripID = ${tripID};  
  `
  console.log(myQuery)

  connection.query(myQuery, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      console.log('Deleted Trip ID ' + tripID.toString())
      res.json({ results: true })
    }
  })
}

// // ********************************************
// //             Parse Date / Time
// // ********************************************

// // Convert date received from CreateTripPage into a db-compatible format
// function parseDate(rawDate) {
//   dateValues = rawDate.split(' ')
//   // console.log('Date Values: ')
//   // console.log(dateValues)

//   // format e.g. Sun Dec 12 2021 20:10:22 GMT 0900
//   formattedDate =
//     dateValues[3].toString() +
//     '-' +
//     parseMonth(dateValues[1].toString()) +
//     '-' +
//     dateValues[2].toString()
//   // console.log("Formatted date = " + formattedDate)

//   return formattedDate
// }

// // Converts written month into its int equivalent
// function parseMonth(month) {
//   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

//   var monthIndex = months.indexOf(month) + 1

//   if (monthIndex < 10) {
//     return '0' + monthIndex.toString()
//   }
//   else {
//     return monthIndex.toString()
//   }
// }

// ********************************************
//             Filter POIs
// ********************************************

// Creates views of filtered POIs based on travel personality type
async function createPersonalityViews() {
  // Case 1: Cool Cat
  var CoolCat = `
    CREATE OR REPLACE VIEW CoolCat AS
      WITH CoolCat_Attraction AS (
      SELECT pid
      FROM Attraction
      WHERE tags REGEXP 'Art|Music'
      ),
      CoolCat_Restaurant AS (
      SELECT pid
      FROM Restaurant
      WHERE subcategory REGEXP 'Brewery|Cafe|Quick Bites'
      ),
      CoolCat_Trail AS (
      SELECT pid
      FROM (SELECT pid FROM POI WHERE duration_high <= 3 AND Category = 'trails') A NATURAL JOIN Trail
      WHERE Trail.difficulty <= 3
      )
      SELECT *
      FROM CoolCat_Attraction 
      UNION
      SELECT *
      FROM CoolCat_Restaurant 
      UNION
      SELECT *
      FROM CoolCat_Trail    
  `

  connection.query(CoolCat, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      // console.log('Created view for Cool Cat')
    }
  })

  // Case 2: Adventurer
  var Adventurer = `
    CREATE OR REPLACE VIEW Adventurer AS
      WITH Adventurer_Attraction AS (
      SELECT pid
      FROM Attraction
      WHERE tags REGEXP 'Sports'
      ),
      Adventurer_Restaurant AS (
      SELECT pid
      FROM Restaurant
      WHERE costHigh <= 2
      ),
      Adventurer_Trail AS (
      SELECT pid
      FROM Trail
      )
      SELECT *
      FROM Adventurer_Attraction 
      UNION
      SELECT *
      FROM Adventurer_Restaurant 
      UNION
      SELECT *
      FROM Adventurer_Trail    
`

  connection.query(Adventurer, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      // console.log('Created view for Adventurer')
    }
  })

  // Case 3: Entertainer
  var Entertainer = `
    CREATE OR REPLACE VIEW Entertainer AS
      WITH Entertainer_Attraction AS (
      SELECT pid
      FROM Attraction
      WHERE tags REGEXP 'Clubs|Bars|Spa|Museums|Art|Opera'
      ),
      Entertainer_Restaurant AS (
      SELECT pid
      FROM Restaurant
      WHERE costLow >= 3
      ),
      Entertainer_Trail AS (
      SELECT pid
      FROM (SELECT pid FROM POI WHERE duration_high <= 1 AND Category = 'trails') A NATURAL JOIN Trail
      WHERE Trail.difficulty = 1
      )
      SELECT *
      FROM Entertainer_Attraction 
      UNION
      SELECT *
      FROM Entertainer_Restaurant 
      UNION
      SELECT *
      FROM Entertainer_Trail  
`

  connection.query(Entertainer, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      // console.log('Created view for Entertainer')
    }
  })

  // Case 4: Family
  var Family = `
    CREATE OR REPLACE VIEW Family AS
      WITH Family_Attraction AS (
      SELECT pid
      FROM Attraction
      WHERE tags REGEXP 'Theme Parks|Beaches|Children|Parks'
      ),
      Family_Restaurant AS (
      SELECT pid
      FROM Restaurant
      WHERE costHigh <= 3
      ),
      Family_Trail AS (
      SELECT pid
      FROM (SELECT pid FROM POI WHERE duration_high <= 2 AND Category = 'trails') A NATURAL JOIN Trail
      WHERE Trail.difficulty = 1
      )
      SELECT *
      FROM Family_Attraction 
      UNION
      SELECT *
      FROM Family_Restaurant 
      UNION
      SELECT *
      FROM Family_Trail       
`

  connection.query(Family, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      // console.log('Created view for Family')
    }
  })

  // Case 5: Enthusiast
  var Enthusiast = `
    CREATE OR REPLACE VIEW Enthusiast AS
      WITH Enthusiast_Attraction AS (
      SELECT pid
      FROM POI
      WHERE Category = 'attractions'
      ORDER BY num_reviews DESC
      ),
      Enthusiast_Restaurant AS (
      SELECT pid
      FROM POI
      WHERE Category = 'restaurants'
      ORDER BY num_reviews DESC
      ),
      Enthusiast_Trail AS (
      SELECT pid
      FROM POI
      WHERE Category = 'trails'
      ORDER BY num_reviews DESC
      )
      SELECT *
      FROM Enthusiast_Attraction 
      UNION
      SELECT *
      FROM Enthusiast_Restaurant 
      UNION
      SELECT *
      FROM Enthusiast_Trail  
`

  connection.query(Enthusiast, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      // console.log('Created view for Enthusiast')
    }
  })

  // Case 6: Investigator
  var Investigator = `
    CREATE OR REPLACE VIEW Investigator AS
      WITH Investigator_Attraction AS (
      SELECT pid
      FROM Attraction
      WHERE tags REGEXP 'Museums|Landmarks|Historic|History|Science'
      ),
      Investigator_Restaurant AS (
      SELECT pid
      FROM Restaurant
      WHERE subcategory REGEXP 'Brewery|Cafe'
      ),
      Investigator_Trail AS (
      SELECT pid
      FROM (SELECT pid FROM POI WHERE duration_high <= 5 AND Category = 'trails') A NATURAL JOIN Trail
      WHERE Trail.difficulty <= 3
      )
      SELECT *
      FROM Investigator_Attraction 
      UNION
      SELECT *
      FROM Investigator_Restaurant 
      UNION
      SELECT *
      FROM Investigator_Trail
`

  connection.query(Investigator, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      // console.log('Created view for Investigator')
    }
  })
}

// Dynamically generates the SQL query based on travel personalities
function createPersonalitiesQuery(p0, p1, p2, p3, p4, p5) {
  var personalities = new Array()
  personalities[0] = new Array(p0, 'CoolCat')
  personalities[1] = new Array(p1, 'Adventurer')
  personalities[2] = new Array(p2, 'Entertainer')
  personalities[3] = new Array(p3, 'Family')
  personalities[4] = new Array(p4, 'Enthusiast')
  personalities[5] = new Array(p5, 'Investigator')

  var firstPersonality = true
  var personalitiesQuery = 'WITH personalityPID AS ('

  for (let p of personalities) {
    if (p[0] == 1) {
      if (firstPersonality === true) {
        personalitiesQuery += 'SELECT * FROM ' + p[1]
        firstPersonality = false
      } else {
        personalitiesQuery += ' UNION ALL SELECT * FROM ' + p[1]
      }
    }
  }
  personalitiesQuery += ') '

  return personalitiesQuery
}

// Dynamically creates the city size filter query
function createPopulationQuery(pop) {
  var population = parseInt(pop)

  // city size based on https://data.oecd.org/popregion/urban-population-by-city-size.htm
  var citySize = new Array()
  citySize[0] = new Array(0, '1') // any city
  citySize[1] = new Array(1, '500000') // (large) metropolitan
  citySize[2] = new Array(2, '100000') // mid-size urban area
  citySize[3] = new Array(3, '30000') // small urban area

  var populationQuery = ''

  if (population > 1) {
    populationQuery +=
      ', filteredCities AS (SELECT city, state FROM City WHERE population >= ' +
      citySize[population][1] +
      ' AND population < ' +
      citySize[population - 1][1] +
      ') '
  } else {
    populationQuery +=
      ', filteredCities AS (SELECT city, state FROM City WHERE population >= ' +
      citySize[population][1] +
      ') '
  }

  return populationQuery
}

function generateFilteredPOIs(tripID) {
  // generate filtered POIs
  createPersonalityViews()

  var personalitiesQuery = createPersonalitiesQuery(
    CoolCat,
    Adventurer,
    Entertainer,
    Family,
    Enthusiast,
    Investigator
  )

  var viewName = 'Trip_' + tripID.toString()

  var myQuery = `
    CREATE OR REPLACE VIEW ${viewName} AS
    ${personalitiesQuery}
    SELECT DISTINCT pid
    FROM POI NATURAL JOIN personalityPID
    WHERE POI.city = '${city}' AND POI.state = '${state}';
  `
  console.log(myQuery)

  connection.query(myQuery, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      console.log(
        'Generated filtered POIs based on city, state, and personalities'
      )
    }
  })
}

function population(req, res) {
  console.log(req.query)
  var city = req.query.city
  var state = req.query.state

  var myQuery = `
    SELECT population
    FROM City
    WHERE city = '${city}' AND state = '${state}';  
  `
  console.log(myQuery)

  connection.query(myQuery, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      res.json({ results: results })
      console.log(`Got population:${results}`)
    }
  })
}

// ********************************************
//             Authenticate
// ********************************************

function test(req, res) {
  var username = req.query.username
  var clientIP = req.socket.remoteAddress
  // console.log('Username: ' + username.toString())
  // console.log('Client IP: ' + clientIP.toString())

  // TODO: make this function work...

  if (authenticateUser(username, clientIP) == true) {
    res.send('Logged In!!')
  } else {
    res.redirect('http://localhost:3000/failed')
  }
}

function authenticate_user(req, res) {
  var username = req.query.username
  var clientIP = req.socket.remoteAddress

  var myQuery = `
    SELECT *
    FROM LoggedIn
    WHERE clientIP = '${clientIP}' AND username = '${username}';  
  `
  console.log(myQuery)

  connection.query(myQuery, function (error, results, fields) {
    if (results) {
      if (results.length > 0) {
        console.log('Authenticated user')
        res.json({ results: true })
      } else {
        console.log('Username NOT logged in with this client IP')
        res.json({ results: false })
      }
    } else {
      console.log(error)
    }
  })
}

function authenticate_trip(req, res) {
  var username = req.query.username
  var tripID = req.query.tripID

  var myQuery = `
  SELECT *
  FROM TripProfile
  WHERE username = '${username}' AND tripID=${tripID};
`
  console.log(myQuery)

  connection.query(myQuery, function (error, results, fields) {
    if (results) {
      if (results.length > 0) {
        console.log(`Authenticated trip ${tripID}`)
        res.json({ results: true })
      } else {
        console.log(`User does NOT have trip with tripID ${tripID}`)
        res.json({ results: false })
      }
    } else {
      console.log(error)
    }
  })
}


module.exports = {
  add_user,
  auto_login,
  login,
  logout,
  hello,
  random_city,
  all_trips,
  all_cities,
  quiz_cities,
  new_trip,
  retrieve_trip,
  trip_attractions,
  trip_restaurants,
  trip_trails,
  trip_favorites,
  trip_events,
  save_trip,
  update_trip,
  delete_trip,
  test,
  authenticate_trip,
  authenticate_user,
  population
}
