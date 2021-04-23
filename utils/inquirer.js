// inquirer questions
const starterQuestion = [
    {
        type: "list",
        name: "mainQuestion",
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "View employees by manager",
            "View all employees by department",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee",
            "Delete department, role or employee",
            "View departement(s) budget",
            "Quit"
            ]
    }
];

// question to call to check if information was entered correctly
const checkQuestion = [
    {
        type: "list",
        name: "check", 
        message: "Is the above information correct?",
        choices: [
            "Yes, take me to the next step.", 
            "No, please allow me to re-enter that information."
        ]
    }
];

// question to call if they want to view all of department, role, or employees.
const whichViewAll = [
    {
        type: "list",
        name: "viewAll",
        message: "I would like to view all...",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees"
        ]
    }
]


module.exports = starterQuestion, checkQuestion;