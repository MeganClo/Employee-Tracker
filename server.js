
const inquirer = require('inquirer');
const { getDepartments } = require("./utils/department");
const { getEmployees } = require("./utils/employee");
const starterQuestion = require("./utils/inquirer");

// getDepartments();

getEmployees();

// const start = () => {
//   inquirer.prompt(starterQuestion);
//   console.log("questions");
// };

// start();

