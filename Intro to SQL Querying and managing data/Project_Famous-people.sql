/* Create table about the people and what they do here */
CREATE TABLE famous_people (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullname TEXT,
    type TEXT);
CREATE TABLE works (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    people_id INTEGER,
    name TEXT);
INSERT INTO famous_people (fullname, type) VALUES ("J.K.Rowling", "author");
INSERT INTO famous_people (fullname, type) VALUES ("Ed Sheeran", "musician");
INSERT INTO famous_people (fullname, type) VALUES ("One Direction", "musician");
INSERT INTO famous_people (fullname, type) VALUES ("John Green", "author");
INSERT INTO famous_people (fullname, type) VALUES ("Hank Green", "musician");
INSERT INTO famous_people (fullname, type) VALUES ("Sal Khan", "other");
INSERT INTO famous_people (fullname, type) VALUES ("Bill Gates", "other");
INSERT INTO famous_people (fullname, type) VALUES ("Steve Jobs", "other");
INSERT INTO works (people_id, name) VALUES (1, "Harry Potter and the Sorcerer's Stone");
INSERT INTO works (people_id, name) VALUES (1, "Harry Potter and the Chamber of Secrets");
INSERT INTO works (people_id, name) VALUES (1, "Harry Potter and the Prisoner of Azkaban");
INSERT INTO works (people_id, name) VALUES (1, "Harry Potter and the Goblet of Fire");
INSERT INTO works (people_id, name) VALUES (1, "Harry Potter and the Order of the Phoenix");
INSERT INTO works (people_id, name) VALUES (1, "Harry Potter and the Half Blood Prince");
INSERT INTO works (people_id, name) VALUES (1, "Harry Potter and the Deathly Hallows");
INSERT INTO works (people_id, name) VALUES (2, "A Team");
INSERT INTO works (people_id, name) VALUES (2, "Photograph");
INSERT INTO works (people_id, name) VALUES (2, "Don't");
INSERT INTO works (people_id, name) VALUES (2, "Drunk");
INSERT INTO works (people_id, name) VALUES (3, "One Thing");
INSERT INTO works (people_id, name) VALUES (3, "What Makes You Beautiful");
INSERT INTO works (people_id, name) VALUES (3, "Live While We're Young");
INSERT INTO works (people_id, name) VALUES (3, "Best Song Ever");
