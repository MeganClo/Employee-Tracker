const inquirer = require('inquirer');
const { getDepartments, addDepartment } = require("./utils/department");
const { getEmployees } = require("./utils/employee");
const { getRoles } = require("./utils/role");
const starterQuestion = require("./utils/inquirer");


addDepartment();
getDepartments();

getEmployees();

getRoles();

// const start = () => {
//   inquirer.prompt(starterQuestion);
//   console.log("questions");
// };

// start();

