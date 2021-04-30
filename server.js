const inquirer = require('inquirer');
const db = require("./db/connection");
require("console.table");
const figlet = require("figlet");
const { start } = require("./utils/inquirer");

// fun graphics to open application
figlet('Employee Tracker', function (err, data) {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(data);
  start();
});






