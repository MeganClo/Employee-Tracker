const inquirer = require('inquirer');
const db = require("./db/connection");

// const {deleteDepartment } = require("./utils/department");
// const { deleteEmployee, getOneEmployee, addEmployee, getEmployeesByManager } = require("./utils/employee");
// const { addRole, deleteRole } = require("./utils/role");
const { starterQuestion, whichViewAll, departmentAdd, whichAdd, checkQuestion, roleAdd, after } = require("./utils/inquirer");

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
  // let params = ["Quidditch Coach", 400.00, 1];
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
      deptAdd();
    }
    if (response.addAWhat === "Add a role") {
      roleAdder();
    }
    if (response.addAWhat === "Add an employee") {
      
    }
  })
};

// function to add a department
const deptAdd = () => {
  return inquirer.prompt(departmentAdd)
  .then (response => {
    params = response.addDepartment;
    console.log(response.addDepartment);
    answerCheck()
    .then (answerCheckData => {
      if (answerCheckData.check === "Yes, take me to the next step."){
        addDepartment();
      } else {deptAdd();}
    })
    .catch(err => {
      console.log(err);
    })
  })
};




const roleAdder = () => {
  return inquirer.prompt(roleAdd)
  .then (response => {
    params = [response.roleName, response.roleSalary, response.roleId];
    console.table(params);
    answerCheck()
    .then(answerCheckData => {
      if (answerCheckData.check === "Yes, take me to the next step.") {
        addRole();
      } else {roleAdder();}
    })
    .catch(err => {
      console.log(err);
    })
  })
}

start();

