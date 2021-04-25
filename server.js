const inquirer = require('inquirer');
const db = require("./db/connection");
require("console.table");
const figlet = require("figlet");

// const {deleteDepartment } = require("./utils/department");
// const { deleteEmployee, getOneEmployee, addEmployee, getEmployeesByManager } = require("./utils/employee");
// const { addRole, deleteRole } = require("./utils/role");
const { starterQuestion, whichViewAll, departmentAdd, whichAdd, checkQuestion, after } = require("./utils/inquirer");

figlet('Employee Tracker', function(err, data) {
  if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
  }
  console.log(data);
  start();
});

// function that gets to start application off
const start = () => {
  return inquirer.prompt(starterQuestion)
  .then (response => {
    if (response.mainQuestion === "View all departments, roles, or employees") {
      viewAll()
    }
    if (response.mainQuestion === "Add a department, role, or employee") {
      addingStuff()
    }
    if (response.mainQuestion === "Quit") {
      figlet('Good Bye', function(err, data) {
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
const afterChoice = () =>  {
  return inquirer.prompt(after)
  .then (response => {
    if (response.after === "Main Menu") {
      start();
    }
    if (response.after === "Quit") {
      figlet('Good Bye', function(err, data) {
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
      afterChoice();
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
      afterChoice();
      });
};

// function called when user wants to view all of something
const viewAll = () => {
  return inquirer.prompt(whichViewAll)
  .then (response => {
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
  .then (response => {
    if (response.addAWhat === "Add a department"){
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
  .then (response => {
    params = response.addDepartment;
    console.log(response.addDepartment);
    answerCheck()
    .then (answerCheckData => {
      if (answerCheckData.check === "Yes, take me to the next step."){
        addDepartment();
      } else {deptAdder();}
    })
    .catch(err => {
      console.log(err);
    })
  })
};

const roleAdder = async () => {
  // query to pull departments
  const depNameSql = `SELECT departments.department_name 
  FROM role 
  LEFT JOIN departments 
  ON role.department_id = departments.id;`;
  // empty array to add department name into
  const deptChoices = [];
  // query and for loop to put one of each department name into array
  await db.query(depNameSql, (error, rows) => {
    for (let i = 0; i < rows.length; i++) {
      if (deptChoices.indexOf(rows[i].name) === -1) {
        deptChoices.push(rows[i].name);
      }
    }
    if (error) {
      console.log(error);
    }
  });

  inquirer.prompt([
    {
      type: 'input',
      name: 'roleName',
      message: 'Please enter the name of the new role/title',
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
      type: 'number',
      name: 'roleSalary',
      message: 'What is the salary for this role?',
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
      type: 'list',
      name: 'department',
      message: 'What department does this role belong to?',
      choices: deptChoices
    }
  ])
  .then(response => {
    const getDepartIdSql = `SELECT id FROM departments WHERE name = '${response.department}';`
    let department_id;

    db.query(getDepartIdSql, (err, rows) => {
      department_id = rows[0].id;

      const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?);`
      const params = [`${response.title}`, response.salary, department_id];

      db.query(sql, params, (err, rows) => {
        console.log(rows);
        console.log(`${response.title} successfully added to Roles database!`);
      })
    });
  });
};

// const roleAdder = () => {
//   // Pulling from DB to pass into choices
//   const addRoleSql = `SELECT departments.department_name FROM role LEFT JOIN departments ON role.department_id = departments.id;`;
//   let deptChoices = [];

//   db.query(addRoleSql, (err, rows) => {
//     for (let i = 0; i < rows.length; i++) {
//         if(deptChoices.indexOf(rows[i].name) === -1) {
//             deptChoices.push(rows[i].name)
//             console.log(deptChoices);
//         }    
//     }
//   });
//   // Prompt to get role info
//   const roleAdd = [
//     {
//         type: "input",
//         name: "roleName",
//         message: "Please enter the name of the new role/title.",
//         validate: roleNameInput => {
//             if (roleNameInput) {
//                 return true;
//             } else {
//                 console.log("You must enter a name for the role you want to add.")
//                 return false;
//             }
//         }
//     },
//     {
//         type: "input",
//         name: "roleSalary",
//         message: "What is the salary for this new role?",
//         validate: roleSalaryInput => {
//             if (roleSalaryInput) {
//                 return true;
//             } else {
//                 console.log("You must enter a salary for this role.")
//                 return false;
//             }
//         }
//     },
//     {
//         type: "list",
//         name: "deptNameChoice",
//         message: "What is this role's department?",
//         choices: deptChoices

//     }
//   ];
//   return inquirer.prompt(roleAdd)
//   .then (response => {
//     console.log(response);
//     params = [response.roleName, response.roleSalary, response.deptNameChoice];
//     console.table(params);
//     answerCheck()
//     .then(answerCheckData => {
//       if (answerCheckData.check === "Yes, take me to the next step.") {
//         addRole();
//       } else {roleAdder();}
//     })
//     .catch(err => {
//       console.log(err);
//     })
//   })
// };



