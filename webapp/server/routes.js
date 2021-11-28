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

// Route 1 (handler)
async function hello (req, res) {
  if (req.query.name) {
    res.send(`Hello, ${req.query.name}! Welcome to the SeeQoolPlaces server!`)
  } else {
    res.send(`Hello! Welcome to the SeeQoolPlaces server!`)
  }
}

// ********************************************
//             Landing Page Routes
// ********************************************

// Route 2 (handler) - return a random city, and a photo of an attraction or hike
async function random_city (req, res) {
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
        WHERE city = "${randomCityName}"
          AND state = "${randomCityState}"
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

// Route 3 (handler) - Return names of existing user-made trips to be displayed in sidebar
// TODO: Placeholder. Update query once Trips schema is confirmed.
async function all_trips (req, res) {
  connection.query(
    `SELECT *
    FROM Trips`,
    function (error, results, fields) {
      if (error) {
        console.log(error)
        res.json({ error: error })
      } else if (results) {
        res.json({ results: results })
      }
    }
  )
}

// Route 5 (handler) - Returns the list of all cities
async function all_cities (req, res) {
  var myQuery = `
    SELECT DISTINCT state, city
    FROM POI
    ORDER BY city  
  `

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

// Route 4 (handler) - Returns top 3 cities based on desired city size and travel personalities
function quizCities (req, res) {
  createPersonalityViews()
  var personalitiesQuery = createPersonalitiesQuery(
    req.query.p0,
    req.query.p1,
    req.query.p2,
    req.query.p3,
    req.query.p4,
    req.query.p5
  )

  var populationQuery = createPopulationQuery(req.query.population)

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
      res.json({ results: results })
    }
  })
}

// Route 10 (handler) - Returns trip POIs based on city, state, and travel personalities
async function trip_pois (req, res) {
  const username = req.params.username ? req.params.username : 'admin'
  const tripID = req.params.tid ? req.params.tid : 0
  const tripTable = username + 'Trip' + tripID.toString()

  const city = req.params.city ? req.params.city : 'Vancouver'
  const state = req.params.state ? req.params.state : 'BC'

  const p0 = req.query.p0 ? req.query.p0 : 'false'
  const p1 = req.query.p1 ? req.query.p1 : 'false'
  const p2 = req.query.p2 ? req.query.p2 : 'false'
  const p3 = req.query.p3 ? req.query.p3 : 'false'
  const p4 = req.query.p4 ? req.query.p4 : 'true'
  const p5 = req.query.p5 ? req.query.p5 : 'false'

  createPersonalityViews()
  var personalitiesQuery = createPersonalitiesQuery(p0, p1, p2, p3, p4, p5)

  var myQuery = `
    ${personalitiesQuery}
    SELECT *
    FROM personalityPID NATURAL JOIN POI;
    `
  console.log(myQuery)

  connection.query(myQuery, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      console.log('Got POIs based on city, state, and personalities')
      res.json({ results: results })
    }
  })

  // var myQuery = `
  //   CREATE OR REPLACE VIEW ${tripTable} AS
  //   ${personalitiesQuery}
  //   SELECT '${username}' AS username, ${tripID} AS tid, POI.pid AS pid
  //   FROM personalityPID JOIN POI ON personalityPID.pid = POI.pid
  //   WHERE POI.city = '${city}' AND POI.state = '${state}';
  //   `
  // console.log(myQuery)

  // connection.query(myQuery, function (error, results, fields) {
  //   if (error) {
  //     console.log(error)
  //     res.json({ error: error })
  //   } else if (results) {
  //     console.log('Got POIs based on city, state, and personalities')
  //   }
  // })

  // myQuery = `
  //   SELECT *
  //   FROM ${tripTable};
  //   `
  // console.log(myQuery)

  // connection.query(myQuery, function (error, results, fields) {
  //   if (error) {
  //     console.log(error)
  //     res.json({ error: error })
  //   } else if (results) {
  //     res.json({ results: results })
  //   }
  // })
}

// Route 6 (handler) - Returns the top city after quiz
async function quiz_topcity (req, res) {
  var myQuery = `
  SELECT POI.city, POI.state, COUNT(*) as count
  FROM selectedPOI NATURAL JOIN POI
  WHERE selectedPOI.pid IS NOT NULL
  GROUP BY POI.city, POI.state
  ORDER BY count DESC
  LIMIT 3;  
  `

  connection.query(myQuery, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      res.json({ results: results })
    }
  })
}

// Route 7 (handler) - Returns the attractions after quiz
async function quiz_attraction (req, res) {
  const name = req.params.state ? req.params.state : 'CA'
  //
  var myQuery = `
  SELECT *
  FROM selectedPOI NATURAL JOIN POI
  WHERE POI.category = 'Attractions';  
  `

  connection.query(myQuery, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      res.json({ results: results })
    }
  })
}

// Route 8 (handler) - Returns the restaurants after quiz
async function quiz_restaurant (req, res) {
  const name = req.params.state ? req.params.state : 'CA'
  //
  var myQuery = `
  SELECT *
  FROM selectedPOI NATURAL JOIN POI
  WHERE POI.category = 'Restaurants';  
  `

  connection.query(myQuery, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      res.json({ results: results })
    }
  })
}

// Route 9 (handler) - Returns the trails after quiz
async function quiz_trail (req, res) {
  const name = req.params.state ? req.params.state : 'CA'
  //
  var myQuery = `
  SELECT *
  FROM selectedPOI NATURAL JOIN POI
  WHERE POI.category = 'Trails';  
  `

  connection.query(myQuery, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      res.json({ results: results })
    }
  })
}

// ********************************************
//             Save Trip Route
// ********************************************

// ********************************************
//             Remove Trip Route
// ********************************************

// ********************************************
//             Filter POIs
// ********************************************

async function createPersonalityViews () {
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
      WHERE costHigh <= 2
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
      LIMIT 48
      ),
      Enthusiast_Restaurant AS (
      SELECT pid
      FROM POI
      WHERE Category = 'restaurants'
      ORDER BY num_reviews DESC
      LIMIT 48
      ),
      Enthusiast_Trail AS (
      SELECT pid
      FROM POI
      WHERE Category = 'trails'
      ORDER BY num_reviews DESC
      LIMIT 48
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

function createPersonalitiesQuery (p0, p1, p2, p3, p4, p5) {
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
    if (p[0] === 'true') {
      if (firstPersonality) {
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

function createPopulationQuery (population) {
  // city size based on https://data.oecd.org/popregion/urban-population-by-city-size.htm
  var citySize = new Array()
  citySize[0] = new Array(0, '1') // any city
  citySize[1] = new Array(1, '500000') // (large) metropolitan
  citySize[2] = new Array(2, '200000') // mid-size urban area
  citySize[3] = new Array(3, '500000') // small urban area

  var populationQuery = ''

  if (population > 1) {
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

module.exports = {
  hello,
  random_city,
  all_trips,
  quizCities,
  all_cities,
  trip_pois,
  trip_attraction,
  trip_restaurant,
  trip_trail,
  quiz_topcity
}