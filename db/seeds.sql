INSERT INTO Users (fullName, email, googleIdToken) VALUES ('Ben Money Jones', 'benjones@gmail.com', 'ev9ejgAdkdjdjf0');
INSERT INTO Users (fullName, email, googleIdToken) VALUES ('Ahmed Chalab', 'ahmed@gmail.com', 'ev9ejgAdkdjdjf0');
INSERT INTO Users (fullName, email, googleIdToken) VALUES ('Wendy Fry', 'wendy@gmail.com', 'ev9ejgAdkdjdjf0');
INSERT INTO Users (fullName, email, googleIdToken) VALUES ('Mandy Brown', 'mbrown@gmail.com', 'ev9ejgAdkdjdjf0');
INSERT INTO Users (fullName, email, googleIdToken) VALUES ('Sara Johnson', 'sara@gmail.com', 'ev9ejgAdkdjdjf0');
INSERT INTO Users (fullName, email, googleIdToken) VALUES ('Philip J Fry', 'pjfry@gmail.com', 'ev9ejgAdkdjdjf0');
INSERT INTO Users (fullName, email, googleIdToken) VALUES ('Tonya Crabapple', 'tonya@gmail.com', 'ev9ejgAdkdjdjf0');

INSERT INTO Events (eventTitle, eventLocation, eventDesc, eventDateTime, byob) VALUES ('Plaza Park Clean UP', '200 3rd Ave North, Minneapolis, MN 55423', 'This is a short description', '2019-1-23 23:59:59', true);
INSERT INTO Events (eventTitle, eventLocation, eventDesc, eventDateTime, byob) VALUES ('Road Side UP', '5500 Fremont Ave S, Minneapolis, MN 55423', 'This is a short description', '2019-8-11 23:59:59', true);
INSERT INTO Events (eventTitle, eventLocation, eventDesc, eventDateTime, byob) VALUES ('Get the trash outta here', '7600 Oliver Ave S, Richfield, MN 55423', 'This is a short description', '2019-8-23 23:59:59', true);
INSERT INTO Events (eventTitle, eventLocation, eventDesc, eventDateTime, byob) VALUES ('Clean Up America!', '5600 South 14th Street, Minneapolis, MN 55423', 'This is a short description', '2019-10-23 23:59:59', true);


INSERT INTO UsersEvents (userId, eventId) VALUES (3, 1);
INSERT INTO UsersEvents (userId, eventId) VALUES (3, 2);
INSERT INTO UsersEvents (userId, eventId, organizer) VALUES (3, 3, true);
INSERT INTO UsersEvents (userId, eventId) VALUES (3, 4);
INSERT INTO UsersEvents (userId, eventId) VALUES (2, 1);
INSERT INTO UsersEvents (userId, eventId) VALUES (2, 2);
INSERT INTO UsersEvents (userId, eventId) VALUES (3, 1);
INSERT INTO UsersEvents (userId, eventId, organizer) VALUES (6, 1, true);
INSERT INTO UsersEvents (userId, eventId) VALUES (4, 3);