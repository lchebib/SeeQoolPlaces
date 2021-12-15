# Web Scraping Instructions


## Instructions for scraping data

Scraping was performed using the [scrapy](https://docs.scrapy.org/en/latest/) framework, a fast and powerful web scraping framework for Python3.
### Scraping trails from [Hiking Project](https://www.hikingproject.com/)
In a new terminal, naviagate to the hikingproject spiders directory and run the scrapy crawl command.
```bash
cd data-scraping/hikingproject/hikingproject/spiders
scrapy crawl hikingproject_bc
```
### Scraping trails from [Tripadvisor](https://www.tripadvisor.ca/)

In a new terminal, naviagate to the tripadvisor spiders directory and run the scrapy crawl command.
```bash
cd data-scraping/tripadvisor/tripadvisor/spiders
scrapy crawl attractions_bc
```



## Description of scraped data
### Hiking Project - Trails
We scraped data from Hiking Project to get top trails in British Columbia and Canada. We scraped data using the Python scrapy framework. We then cleaned and preprocessed the data with Pandas in Google Colab.
- PID (each attraction has a unique ID that identifies it among all POI's)
- trail_name
- difficulty
- rating (rated 1 to 5 on Hiking Project)
- num_reviews
- route_type (point to point / Loop)
- length (in km)
- high (highest point)
- low (lowest point)
- gmaps_link
- description
- photo
- lat (latitude)
- lon (longitude)
- city
- state
- suggested duration (we estimated 3km per hour)
- category (restaurants, attractions, trails)

### Tripadvisor - Attractions
We scraped data from Tripadvisor to get top attractions in British Columbia and Canada. We scraped data using the Python scrapy framework. We then cleaned and preprocessed the data with Pandas in Google Colab.
Here are the column headers:
- PID (each attraction has a unique ID that identifies it among all POI's)
- attraction_name (name of attraction)
- attraction_rating (rated 1 to 5 on Tripadvisor)
- tags (tags refer to anything that was listed after the subcategory)
- num_reviews
- about (description, null for some attractions)
- suggested_duration (of of five possible durations, where null, we added a duration)
- subcategory (we used the first item listed in "tags" for this)
- photo (link to first photo shown on TA)
- city
- state (we use "state" to refer to province and state)
- category (restaurants, attractions, trails)

### Tripadvisor - Restaurants
We scraped data from Tripadvisor to get top attractions in British Columbia and Canada. We scraped data using the Python scrapy framework. We then cleaned and preprocessed the data with Pandas in Google Colab.
Here are the column headers:
- PID (each attraction has a unique ID that identifies it among all POI's)
- name (of restaurant)
- rating (rated 1 to 5 on Tripadvisor)
- num_reviews
- tags
- subcategory
- city
- state
- cost_low (extracted from the $$ range and made into separate column)
- cost_high (extracted from the $$ range and made into separate column)
- suggested_duration
- category (restaurants, attractions, trails)



## Sources

[Tripadvisor Attractions - BC](https://www.tripadvisor.com/Attractions-g154922-Activities-a_allAttractions.true-British_Columbia.html)  

[Tripadvisor Attractions - CA](https://www.tripadvisor.com/Attractions-g28926-Activities-a_allAttractions.true-California.html)  

[Tripadvisor Restaurants - BC](https://www.tripadvisor.com/Restaurants-g154922-British_Columbia.html)  

[Tripadvisor Restaurants - CA](https://www.tripadvisor.com/Restaurants-g28926-California.html)  

[Hiking Trails - BC](https://www.hikingproject.com/directory/8006666/british-columbia)  

[Hiking Trails - CA](https://www.hikingproject.com/directory/8007121/california)  
