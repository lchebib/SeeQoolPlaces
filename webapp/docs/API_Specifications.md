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
Return city attributes with all the above attributes 