const db = require("../db/connection");
const cTable = require('console.table');

// Get all employees
const getEmployees = () => {
    const sql = `SELECT * FROM employees;`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }
      console.table(rows);
      
    });
};


module.exports = {
    getEmployees
};