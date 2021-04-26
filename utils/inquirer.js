const db = require("../db/connection");

// Pulling from DB to pass into choices
// let deptChoices = []
// const addRoleSql = `SELECT 
// departments.department_name FROM role
// LEFT JOIN departments ON role.department_id = departments.id;`
// db.query(addRoleSql, (err, rows) => {
//     for (let i = 0; i < rows.length; i++) {
//         if(deptChoices.indexOf(rows[i].name) === -1) {
//             deptChoices.push(rows[i].name)
//         }    
//     }
// });

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
// const roleAdd = [
//     {
//         type: "input",
//         name: "roleName",
//         message: "Please enter the name of the new role/title.",
        // validate: roleNameInput => {
        //     if (roleNameInput) {
        //         return true;
        //     } else {
        //         console.log("You must enter a name for the role you want to add.")
        //         return false;
        //     }
        // }
//     },
//     {
//         type: "input",
//         name: "roleSalary",
//         message: "What is the salary for this new role?",
        // validate: roleSalaryInput => {
        //     if (roleSalaryInput) {
        //         return true;
        //     } else {
        //         console.log("You must enter a salary for this role.")
        //         return false;
        //     }
        // }
//     },
//     {
//         type: "list",
//         name: "deptNameChoice",
//         message: "What is this role's department?",
//         choices: deptChoices

//     }
// ];

// Prompt to get role info
const empAdd = [
    {
        type: "input",
        name: "firstName",
        message: "Please enter this employee's first name",
        validate: firstNameInput => {
            if (firstNameInput) {
                return true;
            } else {
                console.log("You must enter this employee's first name.")
                return false;
            }
        }
    },
    {
        type: "input",
        name: "lastName",
        message: "Please enter this employee's last name",
        validate: lastNameInput => {
            if (lastNameInput) {
                return true;
            } else {
                console.log("You must enter this employee's last name.")
                return false;
            }
        }
    },
    {
        type: "input",
        name: "empRoleId",
        message: "What is the id for this employee's role",
        validate: empRoleIdInput => {
            if (empRoleIdInput) {
                return true;
            } else {
                console.log("You must enter an id for this employee's role.")
                return false;
            }
        }

    },
    {
        type: "input",
        name: "empManagerId",
        message: "What is the id for this employee's role",
        validate: empManagerIdInput => {
            if (empManagerIdInput) {
                return true;
            } else {
                console.log("You must enter an id for this employee's role.")
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

    after
};