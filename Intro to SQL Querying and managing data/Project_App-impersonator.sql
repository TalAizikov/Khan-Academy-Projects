/* What does the app's SQL look like? */
CREATE TABLE book_log (
    id INTEGER PRIMARY KEY,
    fullname TEXT,
    age INTEGER
    );
CREATE TABLE book (
    id INTEGER PRIMARY KEY,
    userid INTEGER,
    date TEXT,
    title TEXT
    );

INSERT INTO book_log (fullname, age)
    VALUES ("Fred Hunter", "58");
    
INSERT INTO book (userid, date, title)
    VALUES (1, "01/20/1975","Lord of the Rings");
INSERT INTO book (userid, date, title)
    VALUES (1, "06/16/1980","Ringworld");
INSERT INTO book (userid, date, title)
    VALUES (1, "07/20/1989","Ender's Game");
INSERT INTO book (userid, date, title)
    VALUES (1, "02/02/2016","Sapiens");
    
UPDATE book SET title = "Sapiens: A Human Journey" WHERE id = 4;
SELECT * FROM book;

DELETE FROM book WHERE id= 2;
SELECT * FROM book;
