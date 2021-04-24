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

// Prompt to get new department info
const departmentAdd = [
    {
        type: "input",
        name: "addDepartment",
        message: "Please enter the department name",
        validate: addDepartmentInput => {
            if (addDepartmentInput) {
                return true;
            } else {
                console.log("You must enter a department name.")
                return false;
            }
        }
    }
];

// Prompt to get role info
const roleAdd = [
    {
        type: "input",
        name: "roleName",
        message: "Please enter the name of the new role/title.",
        validate: roleNameInput => {
            if (roleNameInput) {
                return true;
            } else {
                console.log("You must enter a name for the role you want to add.")
                return false;
            }
        }
    },
    {
        type: "input",
        name: "roleSalary",
        message: "What is the salary for this new role?",
        validate: roleSalaryInput => {
            if (roleSalaryInput) {
                return true;
            } else {
                console.log("You must enter a salary for this role.")
                return false;
            }
        }
    },
    {
        type: "input",
        name: "roleId",
        message: "What is the id for this new role",
        validate: roleIdInput => {
            if (roleIdInput) {
                return true;
            } else {
                console.log("You must enter an id for this role")
                return false;
            }
        }

    }
];

const after = [
    {
        type: "list",
        name: "after",
        message: "What would you like to do now?",
        choices: [
            "Main Menu",
            "Quit"
        ]
    }
]


module.exports = {
    starterQuestion, 
    checkQuestion,
    whichViewAll,
    departmentAdd,
    whichAdd,
    roleAdd,
    after
};