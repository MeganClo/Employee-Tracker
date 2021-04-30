const inquirer = require('inquirer');
const db = require("../db/connection");
require("console.table");
const figlet = require("figlet");

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
            "Update an employee's role",
            // "Delete department, role or employee",
            // "View departement(s) budget",
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

// function that gets to start application off
const start = () => {
    return inquirer.prompt(starterQuestion)
      .then(response => {
        if (response.mainQuestion === "View all departments, roles, or employees") {
          viewAll()
        }
        if (response.mainQuestion === "Add a department, role, or employee") {
          addingStuff()
        }
        if (response.mainQuestion === "Update an employee's role") {
          updateEmployee();
        }
        if (response.mainQuestion === "Quit") {
          figlet('Good Bye', function (err, data) {
            if (err) {
              console.log('Something went wrong...');
              console.dir(err);
              return;
            }
            console.log(data);
          });
          process.exit();
        }
      })
  };
  
  // function to call after choice is made and results are given
  const afterChoice = () => {
    return inquirer.prompt(after)
      .then(response => {
        if (response.after === "Main Menu") {
          start();
        }
        if (response.after === "Quit") {
          figlet('Good Bye', function (err, data) {
            if (err) {
              console.log('Something went wrong...');
              console.dir(err);
              return;
            }
            console.log(data);
          });
          process.exit();
        }
      })
  };
  
  
  // prompt to check if things were entered correctly
  const answerCheck = () => {
    return inquirer.prompt(checkQuestion)
  };
  
  // Get all departments query
  const getDepartments = () => {
    const sql = `SELECT
    departments.id,
    departments.department_name AS "Department" FROM departments;`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }
      console.table(rows);
      afterChoice();
    });
  };
  
  // Get all roles query
  const getRoles = () => {
    const sql = `SELECT
    role.id,
    role.title AS "Title",
    role.salary AS "Salary",
    departments.department_name AS "Department"
    FROM role
    INNER JOIN departments on role.department_id=departments.id;`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }
      console.table(rows);
      afterChoice();
    });
  };
  
  // Get all employees query
  const getEmployees = () => {
    const sql = `SELECT
    employees.id,
    CONCAT (employees.first_name, " ", employees.last_name) AS "Name",
    role.title AS "Title",
    departments.department_name AS "Department",
    role.salary AS "Salary",
    CONCAT(manager.first_name, " " , manager.last_name) AS "Manager"
    FROM employees
    LEFT JOIN role on employees.role_id=role.id
    LEFT JOIN departments on role.department_id=departments.id
    LEFT JOIN employees manager on manager.id = employees.manager_id;`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }
      console.table(rows);
      afterChoice();
    });
  };
  
  // Add a department query
  const addDepartment = () => {
    const sql = `INSERT INTO departments (department_name) VALUES (?);`;
    db.query(sql, params, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      getDepartments();
    });
  };
  
  // add a role query
  const addRole = () => {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`;
    db.query(sql, params, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      getRoles();
    });
  };
  
  // add an employee query
  const addEmployee = () => {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`;
    // let params = ["Monica", "Chandler", 1, 1];
    db.query(sql, params, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      getEmployees();
    });
  };
  
  // function called when user wants to view all of something
  const viewAll = () => {
    return inquirer.prompt(whichViewAll)
      .then(response => {
        if (response.viewAll === "View all departments") {
          getDepartments()
        }
        if (response.viewAll === "View all roles") {
          getRoles()
        }
        if (response.viewAll === "View all employees") {
          getEmployees()
        }
      })
  };
  
  // function to call if a user would like to add a department, role, or employee
  const addingStuff = () => {
    return inquirer.prompt(whichAdd)
      .then(response => {
        if (response.addAWhat === "Add a department") {
          deptAdder();
        }
        if (response.addAWhat === "Add a role") {
          roleAdder();
        }
        if (response.addAWhat === "Add an employee") {
          employeeAdder();
        }
      })
  };
  
  // function to add a department
  const deptAdder = () => {
    return inquirer.prompt(departmentAdd)
      .then(response => {
        params = response.addDepartment;
        console.log(response.addDepartment);
        answerCheck()
          .then(answerCheckData => {
            if (answerCheckData.check === "Yes, take me to the next step.") {
              addDepartment();
            } else { deptAdder(); }
          })
          .catch(err => {
            console.log(err);
          })
      })
  };
  
  // function to add a role
  const roleAdder = () => {
    // Pulling from DB to pass into choices
    const addRoleSql = `SELECT department_name from departments;`;
    let deptChoices = [];
    db.query(addRoleSql, (err, rows) => {
      for (let i = 0; i < rows.length; i++) {
        if (deptChoices.indexOf(rows[i].department_name) === -1) {
          deptChoices.push(rows[i].department_name);
        }
      }
    });
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
        type: "list",
        name: "deptNameChoice",
        message: "What is this role's department?",
        choices: deptChoices
  
      }
    ];
    return inquirer.prompt(roleAdd)
      .then(response => {
        console.table(response);
        params = [response.roleName, response.roleSalary];
        answerCheck()
          .then(answerCheckData => {
            if (answerCheckData.check === "Yes, take me to the next step.") {
              const getDepartIdSql = `SELECT id FROM departments WHERE department_name = '${response.deptNameChoice}';`
              db.query(getDepartIdSql, (err, response) => {
                params.push(response[0].id);
                addRole();
              })
            } else { roleAdder(); }
          })
          .catch(err => {
            console.log(err);
          })
      })
  };
  
  // function to add employee
  const employeeAdder = () => {
    // Pulling from DB to pass into choices
    const roleSql = `SELECT role.title FROM role;`;
    let roleChoices = [];
    const manSql = `SELECT
    employees.id,
    CONCAT (employees.first_name, " ", employees.last_name) AS "Name" FROM employees;`;
    let manChoices = [];
    db.query(roleSql, (err, rows) => {
      for (let i = 0; i < rows.length; i++) {
        roleChoices.push(rows[i].title)
      }
    });
    db.query(manSql, (err, rows) => {
      // console.log(rows);
      for (let i = 0; i < rows.length; i++) {
        manChoices.push(rows[i].Name);
      }
    })
    // questions to get data to pass into query
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
        type: "list",
        name: "employeeRole",
        message: "What is the title for this employee?",
        choices: roleChoices
      },
      {
        type: "list",
        name: "empManagerId",
        message: "Who is this employee's manager?",
        choices: manChoices
      }
    ];
    return inquirer.prompt(empAdd)
      .then(response => {
        console.table(response);
        const manName = response.empManagerId;
        params = [response.firstName, response.lastName];
        let toPassInRole = response.employeeRole;
        // splitting the name to get id from database
        let manNameSplit = manName.split(" ");
        answerCheck()
          .then(answerCheckData => {
            if (answerCheckData.check === "Yes, take me to the next step.") {
              const getEmpRoleIdSql = `SELECT id FROM role WHERE role.title = "${toPassInRole}";`;
              db.query(getEmpRoleIdSql, (err, response) => {
                // console.log(response);
                params.push(response[0].id);
                // console.log(params)
              })
              const getManIdSql = `SELECT id FROM employees WHERE first_name = '${manNameSplit[0]}' AND last_name = '${manNameSplit[1]}';`;
              db.query(getManIdSql, (err, response) => {
                console.log(response);
                params.push(response[0].id);
                // console.log(params);
                addEmployee();
              })
            } else { employeeAdder(); }
          })
          .catch(err => {
            console.log(err);
          })
      })
  };
  
  // function to update an employee
  const updateEmployee = () => {
    const updateSql = `SELECT CONCAT (employees.first_name, " ", employees.last_name) AS "Name" FROM employees;`;
    let empNames = [];
    const updateSql2 = `SELECT title FROM role;`;
    let roleOptions = [];
    db.query(updateSql, (err, rows) => {
      // console.log(rows);
      for (let i = 0; i < rows.length; i++) {
        empNames.push(rows[i].Name)
      }
    });
      db.query(updateSql2, (err, rows) => {
      // console.log(rows);
      for (let i = 0; i < rows.length; i++) {
        roleOptions.push(rows[i].title)
      }
    })
    // Questions to get update Employee information
    const update = [
    
      {
        type: "list",
        name: "employeeNames",
        message: "Choose the employee you'd like to update",
        choices: empNames
      },
      {
        type: "list",
        name: "roles",
        message: "Which role does this employee now have?",
        choices: roleOptions
      }
    ];
    // setting timer to give database enough time to pull information (will want to change to async in the future)
    setTimeout(() => {
      return inquirer.prompt(update)
        .then(response => {
          console.table(response);
          answerCheck()
            .then(answerCheckData => {
              if (answerCheckData.check === "Yes, take me to the next step.") {
                let params = [];
                const roleIdSql = `SELECT id FROM role WHERE role.title = "${response.roles}";`;
                let thisEmpName = response.employeeNames;
                // console.log(thisEmpName);
                let thisName = thisEmpName.split(" ");
                // console.log(thisName);
                const getThisEmpSql = `SELECT id FROM employees WHERE first_name = "${thisName[0]}" AND last_name = "${thisName[1]}";`;
                db.query(roleIdSql, (err, response) => {
                  params.push(response[0].id);
                  db.query(getThisEmpSql, (err, response) => {
                    // console.log(response);
                    params.push(response[0].id);
                    console.log(params);
                    const upSql = `UPDATE employees SET role_id = ? WHERE id = ?`;
                    db.query(upSql, params, (err, response) => {
                      console.log("Employee Updated!");
                      getEmployees();
                    })
                  })
                })
              }
              else { updateEmployee();}
            })
        })
    },500)
  };


module.exports = {

    start

};