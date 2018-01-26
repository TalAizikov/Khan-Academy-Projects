CREATE TABLE store (id INTEGER Primary Key,name TEXT, quantity integer,cost numeric);
INSERT INTO store VALUES (1,"flannel t-shirt",1,5);
INSERT INTO store VALUES (2,"collared shirt",1,35);
INSERT INTO store VALUES (3,"blouse",1,21);
INSERT INTO store VALUES (4,"sweatpant",1,30);
INSERT INTO store VALUES (5,"pant",1,22);
INSERT INTO store VALUES (6,"shirt",1,6);
INSERT INTO store VALUES (7,"sweater",1,25);
INSERT INTO store VALUES (8,"open jacket",1,50);
INSERT INTO store VAlUES (9, "sandals",1,79.99);
INSERT INTO store VALUES (10,"shoes",1,99);
INSERT INTO store VALUES (11, "raincoat",1,111);
INSERT INTO store VALUES (12,"rainboots",1,33);
SELECT * FROM store;
SELECT SUM(cost) FROM store;

