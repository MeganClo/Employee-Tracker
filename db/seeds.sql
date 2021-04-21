INSERT INTO departments (department_name)
VALUES
    ("Facility"),
    ("Students"),
    ("Ghosts"),
    ("Kitchen");

INSERT INTO role (title, salary, department_id)
VALUES 
    ("Headmaster", 500.00, 1),
    ("Professor", 300.00, 1),
    ("Healer", 200.00, 1),
    ("Librarian", 100.00, 1),
    ("Caretaker", 100.00, 1),
    ("Prefect", 10.00, 2),
    ("Quidditch Captain", 15.00, 2),
    ("Quidditch Player", 10.00, 2),
    ("Ghost of Griffindor House", 30.00, 3),
    ("Ghost of Slytherin House", 20.00, 3),
    ("Ghost of Ravenclaw House", 25.00, 3),
    ("Ghost of Hufflepuff House", 25.00, 3),
    ("Head Chef", 1.00, 4),
    ("Sous Chef", .50, 4),
    ("Server", .50, 4),
    ("Dishwasher", .25, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES 
    ("Albus", "Dumbledore", 1, NULL),
    ("Minerva", "McGonagall", 2, 1),
    ("Rubeus", "Hagrid", 2, 1),
    ("Poppy Pomfrey", "McGonagall", 3, 1),
    ("Severus", "Snape", 2, 1),
    ("Filius", "Flitwick", 2, 1),
    ("Pomona", "Sprout", 2, 1),
    ("Irma", "Pince", 4, 1),
    ("Argus", "Filch", 5, 1),
    ("Ron", "Weasly", 6, 2),
    ("Hermoine", "Granger", 6, 2),
    ("Draco", "Malfoy", 6, 5),
    ("Pansy", "Parkinson", 6, 5),
    ("Anthony", "Goldstein", 6, 6),
    ("Padma", "Patil", 6, 6),
    ("Ernie", "Macmillan", 6, 7),
    ("Hannah", "Abbott", 6, 7),
    ("Angelina", "Johnson", 7, 2),
    ("Zacharias", "Smith", 7, 7),
    ("Roger", "Davies", 7, 6),
    ("Graham", "Montague", 7, 5),
    ("Harry", "Potter", 8, 18),
    ("Cho", "Chang", 8, 20),
    ("Cedric", "Diggory", 8, 19),
    ("Fred", "Weasly", 8, 18),
    ("Marcus", "Flint", 8, 21),
    ("Headless", "Nick", 9, 1),
    ("Bloody", "Baron", 10, 1),
    ("Grey", "Lady", 11, 1),
    ("Fat", "Friar", 12, 1),
    ("Dobby", "Elven", 13, 1),
    ("Kreacher", "Elvenstein", 14, 31),
    ("Winky", "Wildser", 14, 31),
    ("Hokey", "Elfson", 15, 31),
    ("Cyclona", "Cicle", 15, 31),
    ("Nolly", "Noley", 16, 31),
    ("Neara", "Nahla", 16, 31);


