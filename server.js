const inquirer = require('inquirer');
const { getDepartments, addDepartment, deleteDepartment } = require("./utils/department");
const { getEmployees, deleteEmployee, getOneEmployee, addEmployee, getEmployeesByManager } = require("./utils/employee");
const { getRoles, addRole, deleteRole } = require("./utils/role");
const starterQuestion = require("./utils/inquirer");




// addDepartment();
// getDepartments();
// deleteDepartment();

// getEmployees();
// deleteEmployee();
// getOneEmployee();
// addEmployee();

// addRole();
// getRoles();
// deleteRole();
getEmployeesByManager();

const start = () => {
  inquirer.prompt(starterQuestion)
  .then (response => {
    if (response.mainQuestion === "View all departments") {
      getDepartments();
    }
    if (response.mainQuestion === "View all roles") {
      getRoles();
    }
    if (response.mainQuestion === "View all employees") {
      getEmployees();
    }
  })
};

// start();
