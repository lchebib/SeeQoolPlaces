# SeeQoolPlaces

SeeQoolPlaces is a web application that assists an eager traveller in choosing a destination and scheduling activities aligned with their interests and travel goals. 

## List of dependencies

### Server dependencies - Node.js
For a list of server dependencies, see package.json in the server directory. 

### Client dependencies - Node.js
For a list of client dependencies, see package.json in the client directory. 

### Data scraping dependencies - Python
- [scrapy](https://docs.scrapy.org/en/latest/)
- [requests](https://docs.python-requests.org/en/latest/)
- [beautifulsoup4](https://pypi.org/project/beautifulsoup4/)
- [re](https://pypi.org/project/regex/)

### Data cleaning dependencies - Python
- [csv](https://docs.python.org/3/library/csv.html)
- [mysql.connector](https://dev.mysql.com/doc/connector-python/en/)
- [pandas](https://pandas.pydata.org/docs/)
- [numpy](https://numpy.org/doc/stable/user/index.html)

## Instructions for building web application locally

Ensure you have the latest stable version of the Node.js package manager [npm](https://docs.npmjs.com/) on your machine.

```bash
node -v
npm -v
```


In a new terminal, naviagate to the server directory and download the required server dependencies.
```bash
cd webapp/server
npm install
```

In another new terminal, naviagate to the client directory and download the required client dependencies.
```bash
cd webapp/client
npm install
```

To launch the application, first use the server terminal to start the server application by running the command:
```bash
npm start
```

Once the server is running, use the client terminal to start the client application by running the command:
```bash
npm start
```

## Instructions for scraping data
Please see the README_scraping.md file in the data-scraping directory.

Scraping was performed using the [scrapy](https://docs.scrapy.org/en/latest/) framework, a fast and powerful web scraping framework for Python.
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



## Instructions for cleaning scraped data
Pre-cleaning of the csv data was performed in Python using Google Colab notebooks with the help of the pandas and numpy libraries. Further cleaning and verification of data was performed in Python using the files in the PyParse folder.

## Application description

The following subsections provide an overview of the purpose and features of each page of our application.
 
### **Landing Page:**

The user is invited to log in to an existing account or sign up and create a new account by giving a unique username and a password. These user details are verified and then stored in the SeeQoolPlaces database. Upon successful login or signup, our system records indicate the user as logged in at their current IP address. Users wishing to logout are redirected back to this page.
 
### **Home Page**

The journey begins as we guide our user along the path of our simple 3-step trip creation process (viz., choose a city, find activities, plan the trip). If a user is unsure where to start, we encourage them to take our trip quiz to start planning a new trip. Otherwise, we randomly select and feature one of our top travel destinations to serve as a jumping off point for the user. To further anchor our user in the SeeQoolPlaces experience, no matter where a user is on our site, the sidebar is the user’s travel companion. Within the sidebar, the user sees two options for creating a new trip: 1) new trips can be created with the help of our trip quiz if the user needs some help deciding where to go, or, 2) created directly if the user already knows where they want to go and what sort of travel personalities will suit their needs. Our seasoned users who have already planned and created trips will see these trips displayed in the sidebar for easy navigation.
 
### **Quiz Page:**

At SeeQoolPlaces, we greatly value the user experience both on the app and on the trail. Our trip quiz helps users begin to imagine what they might want from this trip, and in turn, the quiz helps us determine what  activities to suggest that will meet their travel desires. The quiz is split into two routes. Take the first route “Where shall I go? What shall I do when I’m there?” for suggestions on both the travel destination and activities. Otherwise, a user with a destination already in mind takes the second route for just activity suggestions. For both routes, we create for our user a travel personality based on one or more of our 6 personalities: Enthusiast, Cool Cat, Investigator, Entertainer, Family, and Adventurer. Our team matched each personality with certain activities based on our shared experiences using our available data, including activity category, keywords or “tags” used to describe the activity, and other category specific attributes such as cost of a restaurant or difficulty of a trail.
 
---
### Route 1: Where shall I go? What shall I do when I’m there? 
### **Quiz Page 1**

A familiar Buzzfeed-style quiz prompts a series of questions to answer based on how appealing, or “Qool”, it sounds. There is one question to learn the traveller’s preference with regard to the city population, and the remaining 12 questions provide context for determining their travel personality. Based on the selected answers, we calculate their travel personality and use the final results to filter through our entire MySQL database of activities. We then deliver and display the top 3 cities with the most activities alongside a blurb about their travel personality. The user will select a city before moving onto the next stage, or, they can retake the quiz.

---

### Route 2: I know where I’m going, but what shall I do?
#### **Quiz Select City Page**
We first ask the traveller which city they plan to visit. This page features a cascading menu with all the possible destinations available in our database. After selection, the user can take the quiz.
 
### **Quiz Page 2**

This page is nearly identical to the first quiz, except this route only features the 12 personality-based questions since the destination has already been chosen. At the end of the quiz, we provide a description of the user’s travel personality. With that, the user continues to the next stage of finalizing their trip, unless they’d like to retake our quiz. 

### **Create Trip Page**

On this page, a user finalizes the details of their trip before it is manifested. There are two paths to the Create Trip Page. If a user arrives here after the quiz, the chosen destination and travel personalities will autofill the form. If a user navigates here from clicking “Create Trip” on the sidebar, then they must choose a destination from the dropdown menu. No matter the path, the traveller provides necessary details for the trip, including the trip name and travel dates, and is welcome to edit any information on the form. To ensure a trip meets our quality standards, we don’t allow trips to have fewer than 10 recommended activities. This may happen if the chosen destination, say a small town, had few activities to begin with, and is further narrowed by a large combination of personalities. Rest assured, during this event we run our city-recommendation algorithm based on the desired city and personalities to offer an alternate destination that is guaranteed to have at least 10 activities. Once submitted, we query our database to collect the recommended activities for the chosen destination and personalities (if any) and create the trip.

---

### **Trip Page**
At long last, the user arrives at the final leg of the journey. At the heart of our application is the Trip Page, where a user can browse through the 3 categories of suggested activities, trails, restaurants, and attractions, that a city has to offer, based on their trip personalities. Below, the user can toggle between category tabs to see a grid of activities and perform a variety of actions. By clicking on an activity, a card is rendered on the right, to give an in-depth view of the activity and helpful details such as a photo, description, and other category-specific attributes. On this card, a user can click “Add to Favorites'' which populates a color-coded list within the right sidebar. As the user browses through the activities, at any point they may click on one of their favorite activities in the sidebar to render it once again in the card, and if they so wish, can remove it from their favorites.
 
On the card, a user can also click “Add to Schedule” to create an event in the interactive calendar above. This calendar will create an event, color-coded by category, with the given activity name and will place it on the first day of the trip. The duration of the event is automatically sized based on our upper estimated duration for the activity. This drag-and-drop calendar makes it easy for a user to adjust the duration and date of an event by simply dragging to resize or by dropping it on a new timeslot. It even features three different view modes, a weekly view, a daily view, and an agenda view which shows a list of all scheduled events.
 
To save progress on a trip, a user can click the “Save Trip” button on the right sidebar to save their favorites and events and can come back to a trip anytime by clicking on it within the left sidebar. If a user wishes to delete a trip, they simply click “Delete Trip” on the right sidebar, and it is removed from their trips.



## Authors and acknowledgement
The authors of this project are Emily Connor, Joel Lim, Xulei Qin, and Lana Chebib. Special thanks to the University of Pennsylvania CIS550 staff and TAs for guidance and support in creating this project.


## License
[MIT](https://choosealicense.com/licenses/mit/)