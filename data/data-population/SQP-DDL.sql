# DDL Statements

# General Tables

CREATE TABLE GroupMembers(
   name varchar(25) NOT NULL,
   email varchar(50) NOT NULL,
   github varchar(25),
   PRIMARY KEY (name, email)
);


CREATE TABLE LandingPagePhoto (
   city varchar(20),
   state varchar(20),
   photo TINYTEXT,
   FOREIGN KEY (city, state) REFERENCES City(city, state)
);


# User Account-related Tables

CREATE TABLE Accounts(
   username varchar(25) NOT NULL,
   password varchar(25) NOT NULL,
   PRIMARY KEY (username)
);


CREATE TABLE LoggedIn(
   username varchar(25) NOT NULL,
   clientIP varchar(25) NOT NULL,
   PRIMARY KEY (username, clientIP)
);


# POI-related Tables

CREATE TABLE City(
   city varchar(20),
   state varchar(20),
   country varchar(20),
   population int,
   PRIMARY KEY (city, state)
);



CREATE TABLE POI (
   pid int,
   name varchar(50),
   city varchar(20),
   state varchar(20),
   category varchar(20),
   duration_low float,
   duration_high float,
   rating float,
   num_reviews int,
   photo TINYTEXT,
   PRIMARY KEY (pid),
   FOREIGN KEY (city, state) REFERENCES City(city, state)
);


CREATE TABLE Attraction (
   pid int,
   subcategory varchar(25),
   description TINYTEXT,
   tags TINYTEXT,
   photo TINYTEXT,
   FOREIGN KEY (pid) REFERENCES POI(pid)
);


CREATE TABLE Restaurant (
   pid int,
   subcategory varchar(25),
   costLow int,
   costHigh int,
   tags TINYTEXT,
   FOREIGN KEY (pid) REFERENCES POI(pid)
);


CREATE TABLE Trail (
   pid int,
   length float,
   difficulty int,
   low int,
   high int,
   description TINYTEXT,
   route_type varchar(50),
   photo TINYTEXT,
   FOREIGN KEY (pid) REFERENCES POI(pid)
);


# User Trip-related Tables

CREATE TABLE TripProfile(
   tripID int NOT NULL AUTO_INCREMENT,
   username varchar(25) NOT NULL,
   tripName TINYTEXT NOT NULL,
   city varchar(25) NOT NULL,
   state varchar(25) NOT NULL,
   startDate DATE NOT NULL,
   endDate DATE NOT NULL,
   CoolCat boolean DEFAULT false,
   Adventurer boolean DEFAULT false,
   Entertainer boolean DEFAULT false,
   Family boolean DEFAULT false,
   Enthusiast boolean DEFAULT false,
   Investigator boolean DEFAULT false,
   PRIMARY KEY (tripID),
   FOREIGN KEY (username) REFERENCES Accounts(username) ON DELETE CASCADE,
   FOREIGN KEY (city, state) REFERENCES POI(city, state) ON DELETE CASCADE
);


CREATE TABLE TripFavorites(
   tripID int NOT NULL,
   pid int NOT NULL,
   FOREIGN KEY (tripID) REFERENCES TripProfile(tripID) ON DELETE CASCADE,
   FOREIGN KEY (pid) REFERENCES POI(pid) ON DELETE CASCADE
);


CREATE TABLE TripEvents(
   eventID int NOT NULL,
   tripID int NOT NULL,
   pid int NOT NULL,
   start varchar(30) NOT NULL,
   end varchar(30) NOT NULL,
   PRIMARY KEY (eventID, tripID),
   FOREIGN KEY (tripID) REFERENCES TripProfile(tripID) ON DELETE CASCADE,
   FOREIGN KEY (pid) REFERENCES POI(pid) ON DELETE CASCADE
);
