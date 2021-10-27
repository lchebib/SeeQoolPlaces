const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db
});
connection.connect();

// ********************************************
//            SIMPLE TEST ROUTE EXAMPLE
// ********************************************

// Route 1 (handler)
async function hello(req, res) {
  // a GET request to /hello?name=Steve
  if (req.query.name) {
    res.send(`Hello, ${req.query.name}! Welcome to the SeeQoolPlaces server!`)
  } else {
    res.send(`Hello! Welcome to the SeeQoolPlaces server!`)
  }
}

// ********************************************
//             Landing Page Routes
// ********************************************

// Route 1 (handler) - return a random city, and a photo of an attraction or hike
async function random(req, res) {
  // top 24 'random' cities that we we select from database to show on landing page
  // BC ideas from here: https://www.planetware.com/canada/best-cities-in-british-columbia-cdn-1-284.htm
  // CA ideas from here: https://travel.usnews.com/rankings/best-places-to-visit-in-california/ 
  const randomCities = ['Vancouver', 'Victoria', 'Kelowna', 'Penticton', 'Whistler', 'Nanaimo', 'Squamish',
    'Nelson', 'Revelstoke', 'Kamloops', 'Vernon', 'Yosemite Valley', 'San Francisco', 'San Diego', 'Big Sur',
    'Three Rivers', 'Santa Monica', 'Los Angeles', 'Laguna Beach', 'Sonoma', 'Joshua Tree', 'Sausalito',
    'Malibu', 'Mammoth Lakes'];
  // returns a random number 0-25
  const randomIndex = Math.floor(Math.random() * 25);
  // random city to use for query 
  const randomCity = randomCities[randomIndex];

  // TODO: 
  // Xulei -- this query is really just a placeholder! we need a query to use to test our DB
  // once it it up and running
  // right now this query will (I hope) return the attraction and photo from the attraction
  // with the most reviews in the randomCity
  connection.query(`SELECT AttractionName, Photo 
        FROM Attractions 
        WHERE city = ${randomCity} AND NumRevews >= ALL (SELECT NumReviews
                    FROM Attractions
                    WHERE city = ${randomCity} AND photo NOT NULL)
        LIMIT 1`, function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({ error: error })
    } else if (results) {
      res.json({ results: results })
    }
  });
}

// Route 2 (handler) - return cached trips to view in sidebar


// ********************************************
//             Save Trip Route
// ********************************************

// ********************************************
//             Remove Trip Route
// ********************************************



module.exports = {
  hello,
  random
}



// ********************************************
//             EXAMPLES FROM HW 
// ********************************************

// // Route 2 (handler)
// async function jersey(req, res) {
//   const colors = ['red', 'blue', 'white']
//   const jersey_number = Math.floor(Math.random() * 20) + 1
//   const name = req.query.name ? req.query.name : "player"

//   if (req.params.choice === 'number') {
//     // TODO: TASK 1: inspect for issues and correct 
//     res.json({ message: `Hello, ${name}!`, jersey_number: jersey_number })
//   } else if (req.params.choice === 'color') {
//     var lucky_color_index = Math.round(Math.random());
//     // TODO: TASK 2: change this or any variables above to return only 'red' or 'blue' at random (go Quakers!)
//     res.json({ message: `Hello, ${name}!`, jersey_color: colors[lucky_color_index] })
//   } else {
//     // TODO: TASK 3: inspect for issues and correct
//     res.json({ message: `Hello, ${name}, we like your jersey!` })
//   }
// }

// // ********************************************
// //               GENERAL ROUTES
// // ********************************************


// // Route 3 (handler)
// async function all_matches(req, res) {
//   // TODO: TASK 4: implement and test, potentially writing your own (ungraded) tests
//   // We have partially implemented this function for you to 
//   // parse in the league encoding - this is how you would use the ternary operator to set a variable to a default value
//   // we didn't specify this default value for league, and you could change it if you want! 
//   // use this league encoding in your query to furnish the correct results
//   const league = req.params.league ? req.params.league : 'D1'
//   const pageNo = req.query.page ? parseInt(req.query.page) : 1;
//   const limit = req.query.pagesize ? parseInt(req.query.pagesize) : 10;

//   if (req.query.page && !isNaN(req.query.page)) {
//     // This is the case where page is defined.
//     // The SQL schema has the attribute OverallRating, but modify it to match spec! 
//     // TODO: query and return results here:

//     let offset = (limit * pageNo) - limit;
//     connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals  
//         FROM Matches 
//         WHERE Division = '${league}'
//         ORDER BY HomeTeam, AwayTeam
//         LIMIT ${limit} OFFSET ${offset}`, function (error, results, fields) {

//       if (error) {
//         console.log(error)
//         res.json({ error: error })
//       } else if (results) {
//         res.json({ results: results })
//       }
//     });

//   } else {
//     // The SQL schema has the attribute OverallRating, but modify it to match spec! 
//     // we have implemented this for you to see how to return results by querying the database
//     connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals  
//         FROM Matches 
//         WHERE Division = '${league}'
//         ORDER BY HomeTeam, AwayTeam`, function (error, results, fields) {

//       if (error) {
//         console.log(error)
//         res.json({ error: error })
//       } else if (results) {
//         res.json({ results: results })
//       }
//     });
//   }
// }

// // Route 4 (handler)
// async function all_players(req, res) {
//   const pageNo = req.query.page ? parseInt(req.query.page) : 1;
//   const limit = req.query.pagesize ? parseInt(req.query.pagesize) : 10;

//   if (req.query.page && !isNaN(req.query.page)) {
//     // This is the case where page is defined.
//     // The SQL schema has the attribute OverallRating, but modify it to match spec! 
//     // TODO: query and return results here:

//     let offset = (limit * pageNo) - limit;
//     connection.query(`SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value 
//         FROM Players 
//         ORDER BY Name
//         LIMIT ${limit} OFFSET ${offset}`, function (error, results, fields) {

//       if (error) {
//         console.log(error)
//         res.json({ error: error })
//       } else if (results) {
//         res.json({ results: results })
//       }
//     });

//   } else {
//     // The SQL schema has the attribute OverallRating, but modify it to match spec! 
//     // we have implemented this for you to see how to return results by querying the database
//     connection.query(`SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value 
//         FROM Players 
//         ORDER BY Name`, function (error, results, fields) {

//       if (error) {
//         console.log(error)
//         res.json({ error: error })
//       } else if (results) {
//         res.json({ results: results })
//       }
//     });
//   }
// }



// // ********************************************
// //             MATCH-SPECIFIC ROUTES
// // ********************************************

// // Route 5 (handler)
// async function match(req, res) {

//   //const id = req.query.id ? parseInt(req.query.id) : 1;
//   const id = parseInt(req.query.id);

//   connection.query(`SELECT MatchId, Date, Time, HomeTeam as Home, AwayTeam as Away, FullTimeGoalsH as HomeGoals, 
//     FullTimeGoalsA as AwayGoals, HalfTimeGoalsH as HTHomeGoals, HalfTimeGoalsA as HTAwayGoals, ShotsH as ShotsHome,
//     ShotsA as ShotsAway, ShotsOnTargetH as ShotsOnTargetHome, ShotsOnTargetA as ShotsOnTargetAway, FoulsH as FoulsHome,
//     FoulsA as FoulsAway, CornersH as CornersHome, CornersA as CornersAway, YellowCardsH as YCHome, YellowCardsA as YCAway,
//     RedCardsH as RCHome, RedCardsA as RCAway
//         FROM Matches
//         WHERE MatchId = ${id}`, function (error, results, fields) {

//     if (error) {
//       console.log(error)
//       res.json({ error: error })
//     } else if (results) {
//       res.json({ results: results })
//     }
//   });
// }

// // ********************************************
// //            PLAYER-SPECIFIC ROUTES
// // ********************************************

// // Route 6 (handler)
// async function player(req, res) {
//   // player id
//   const id = parseInt(req.query.id);
//   const bestPosObject = connection.query(`SELECT BestPosition
//   FROM Players 
//   WHERE PlayerId = ${id}`, function (error, results, fields) {

//     if (error) {
//       console.log(error);
//       res.json({ results: results })
//     }
//     //res.end(JSON.stringify(results));
//     let bestPosition;
//     try {
//       bestPosition = results[0].BestPosition;
//     }
//     catch (err) {
//       bestPosition = 0;
//     }
//     //console.log(bestPosition);

//     if (bestPosition === 'GK') {
//       connection.query(`SELECT PlayerId, Name, Age, Photo, Nationality, Flag, OverallRating as Rating, 
//       Potential, Club, ClubLogo, Value, Wage, InternationalReputation, Skill, JerseyNumber, 
//       ContractValidUntil, Height, Weight, BestPosition, BestOverallRating, ReleaseClause, 
//       GKPenalties, GKDiving, GKHandling, GKKicking, GKPositioning, GKReflexes 
//              FROM Players
//              WHERE PlayerId = ${id}`, function (error, results, fields) {

//         if (error) {
//           console.log(error)
//           res.json({ error: error })
//         } else if (results) {
//           res.json({ results: results })
//         }
//       });
//     } else {
//       connection.query(`SELECT PlayerId, Name, Age, Photo, Nationality, Flag, OverallRating as Rating, 
//       Potential, Club, ClubLogo, Value, Wage, InternationalReputation, Skill, JerseyNumber, 
//       ContractValidUntil, Height, Weight, BestPosition, BestOverallRating, ReleaseClause, 
//       NPassing, NBallControl, NAdjustedAgility, NStamina, NStrength, NPositioning 
//              FROM Players
//              WHERE PlayerId = ${id}`, function (error, results, fields) {

//         if (error) {
//           console.log(error)
//           res.json({ error: error })
//         } else if (results) {
//           res.json({ results: results })
//         }
//       });
//     }

//   });
// }


// // ********************************************
// //             SEARCH ROUTES
// // ********************************************

// // Route 7 (handler)
// async function search_matches(req, res) {
//   // TODO: TASK 8: implement and test, potentially writing your own (ungraded) tests
//   // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string
//   const home = req.query.Home ? req.query.Home : '';
//   const away = req.query.Away ? req.query.Away : '';
//   const pageNo = req.query.page ? parseInt(req.query.page) : 1;
//   const limit = req.query.pagesize ? parseInt(req.query.pagesize) : 10;

//   if (req.query.page && !isNaN(req.query.page)) {
//     // This is the case where page is defined.

//     let offset = (limit * pageNo) - limit;
//     connection.query(`SELECT  MatchId, Date, Time, HomeTeam as Home, AwayTeam as Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsH AS AwayGoals
//         FROM Matches
//         WHERE HomeTeam LIKE '%${home}%' and AwayTeam LIKE '%${away}%'
//         ORDER BY HomeTeam, AwayTeam
//         LIMIT ${limit} OFFSET ${offset}`, function (error, results, fields) {

//       if (error) {
//         console.log(error)
//         res.json({ error: error })
//       } else if (results) {
//         res.json({ results: results })
//       }
//     });

//   } else {

//     connection.query(`SELECT  MatchId, Date, Time, HomeTeam as Home, AwayTeam as Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsH AS AwayGoals
//     FROM Matches
//     WHERE HomeTeam LIKE '%${home}%' and AwayTeam LIKE '%${away}%'
//     ORDER BY HomeTeam, AwayTeam`, function (error, results, fields) {

//       if (error) {
//         console.log(error)
//         res.json({ error: error })
//       } else if (results) {
//         res.json({ results: results })
//       }
//     });
//   }
// }

// // Route 8 (handler)
// async function search_players(req, res) {
//   // TODO: TASK 9: implement and test, potentially writing your own (ungraded) tests
//   // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string
//   const name = req.query.Name ? req.query.Name : '';
//   const nationality = req.query.Nationality ? req.query.Nationality : '';
//   const club = req.query.Club ? req.query.Club : '';
//   const ratingLow = req.query.RatingLow ? parseInt(req.query.RatingLow) : 0;
//   const ratingHigh = req.query.RatingHigh ? parseInt(req.query.RatingHigh) : 100;
//   const potentialLow = req.query.PotentialLow ? parseInt(req.query.PotentialLow) : 0;
//   const potentialHigh = req.query.PotentialHigh ? parseInt(req.query.PotentialHigh) : 100;
//   const pageNo = req.query.page ? parseInt(req.query.page) : 1;
//   const limit = req.query.pagesize ? parseInt(req.query.pagesize) : 10;

//   if (req.query.page && !isNaN(req.query.page)) {
//     // This is the case where page is defined.

//     let offset = (limit * pageNo) - limit;
//     connection.query(`SELECT  PlayerId, Name, Nationality, OverallRating AS Rating, 
//     Potential, Club, Value
//         FROM Players
//         WHERE (Name LIKE '%${name}%') and (Nationality LIKE '%${nationality}%') and (Club LIKE '%${club}%')
//         and (OverallRating BETWEEN ${ratingLow} and ${ratingHigh}) and (Potential BETWEEN ${potentialLow}
//         and ${potentialHigh})
//         ORDER BY Name
//         LIMIT ${limit} OFFSET ${offset}`, function (error, results, fields) {

//       if (error) {
//         console.log(error)
//         res.json({ error: error })
//       } else if (results) {
//         res.json({ results: results })
//       }
//     });

//   } else {

//     connection.query(`SELECT  PlayerId, Name, Nationality, OverallRating AS Rating, 
//     Potential, Club, Value
//         FROM Players
//         WHERE (Name LIKE '%${name}%') and (Nationality LIKE '%${nationality}%') and (Club LIKE '%${club}%')
//         and (OverallRating BETWEEN ${ratingLow} and ${ratingHigh}) and (Potential BETWEEN ${potentialLow}
//         and ${potentialHigh})
//         ORDER BY Name`, function (error, results, fields) {

//       if (error) {
//         console.log(error)
//         res.json({ error: error })
//       } else if (results) {
//         res.json({ results: results })
//       }
//     });
//   }
// }

