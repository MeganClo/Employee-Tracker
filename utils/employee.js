const db = require("../db/connection");
const cTable = require('console.table');

// Get all employees
const getEmployees = () => {
    const sql = `SELECT
    CONCAT (employees.first_name, " ", employees.last_name) AS "Name",
    role.title
    FROM employees
    INNER JOIN role on employees.role_id=role.id;`;
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