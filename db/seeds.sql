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
    ("Head of House", 10.00, 2),
    ("Quiddich Captain", 15.00, 2),
    ("Quiddich Player", 10.00, 2),
    ("Ghost of Griffindor House", 30.00, 3),
    ("Ghost of Slytherin House", 20.00, 3),
    ("Ghost of Ravenclaw House", 25.00, 3),
    ("Ghost of Hufflepuff House", 25.00, 3),
    ("Head Chef", 1.00, 4),
    ("Sous Chef", .50, 4),
    ("Server", .50, 4),
    ("Dishwasher", .25, 4);