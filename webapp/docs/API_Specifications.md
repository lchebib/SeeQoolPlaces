# API Specifications

Route 1: sample from homework

Route 2: /random_city
--------------------------------------------------------------------------------------------------
Description: Returns an array of selected city attributes for a particular randomly selected city
Route Parameter(s): None
Query Parameter(s): randomCity
Route Handler: random(req, res)
Return Type: JSON
Return Parameters: {results (JSON array of { CityName (string), AttractionName (string), Photo (string),}) }
Expected (Output) Behaviour:
Return randomCity with its top reviewed attraction and photo

Route 3: /trips
--------------------------------------------------------------------------------------------------
Description: Returns an array of all saved trips
Route Parameter(s): None
Query Parameter(s): None
Route Handler: random(req, res)
Return Type: JSON
Return Parameters: {results (JSON array of { TODO: FILL THIS IN ONCE WE HAVE THE SCHEMA FOR TRIPS }
Expected (Output) Behaviour:
Return all trips with their respective attributes