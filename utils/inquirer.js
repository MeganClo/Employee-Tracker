// inquirer questions
const starterQuestion = [
    {
        type: "list",
        name: "mainQuestion",
        message: "What would you like to do?",
        choices: [
            "View all departments, roles, or employees",
            // "View employees by manager",
            // "View all employees by department",
            "Add a department, role, or employee",
            // "Add a role",
            // "Add an employee",
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
        message: "I would like to...",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees"
        ]
    }
];

// Question to ask if they want to add a department, role, or employee
const whichAdd = [
    {
        type: "list",
        name: "addAWhat",
        message: "I would like to...",
        choices: [
            "Add a department",
            "Add a role",
            "Add an employee"
        ]
    }
];

// Prompt to get department info
const departmentAdd = [
    {
        type: "input",
        name: "addDepartment",
        message: "Please enter the department name",
        validate: addDepartmentInput => {
            if (addDepartmentInput) {
                return true;
            } else {
                console.log("You must enter a department name")
                return false;
            }
        }
    }
];


module.exports = {
    starterQuestion, 
    checkQuestion,
    whichViewAll,
    departmentAdd,
    whichAdd
};