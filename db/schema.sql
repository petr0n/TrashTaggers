### Schema


CREATE DATABASE trashTaggerDb;
USE trashTaggerDb;


DROP TABLE Events;
DROP TABLE Users;
DROP TABLE UsersEvents;
DROP TABLE Session;

CREATE TABLE events
(
	id int NOT NULL AUTO_INCREMENT,
	eventTitle varchar(255) NOT NULL,
	eventLocation varchar(255) NOT NULL,
    googleGeoLocation varchar(255) NOT NULL,
    eventDesc TEXT NOT NULL,
    eventDateTime DATETIME NOT NULL,
    byob BOOLEAN DEFAULT NULL,
    createdAt DATETIME DEFAULT now(),
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);

CREATE TABLE users 
(
	id int NOT NULL AUTO_INCREMENT,
    fullName varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
    googleIdToken varchar(255) NOT NULL, 
    createdAt DATETIME DEFAULT now(),
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);

CREATE TABLE usersEvents
( 
    id int NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
    eventId INT NOT NULL,
    organizer BOOLEAN DEFAULT false,
    createdAt DATETIME DEFAULT now(),
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE Session 
(
  sid varchar(255) NOT NULL,
  expires datetime DEFAULT NULL,
  data text,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (sid)
);


ALTER TABLE `trashTaggerDb`.`Events` 
CHANGE COLUMN `updatedAt` `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
CHANGE COLUMN `createdAt` `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ;


ALTER TABLE `trashTaggerDb`.`Users` 
CHANGE COLUMN `updatedAt` `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
CHANGE COLUMN `createdAt` `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ;


ALTER TABLE `trashTaggerDb`.`UsersEvents` 
CHANGE COLUMN `updatedAt` `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
CHANGE COLUMN `createdAt` `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ;
