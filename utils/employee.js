const db = require("../db/connection");
const cTable = require('console.table');

// Get all employees
const getEmployees = () => {
    const sql = `SELECT
    employees.id,
    CONCAT (employees.first_name, " ", employees.last_name) AS "Name",
    role.title,
    departments.department_name,
    role.salary
    FROM employees
    INNER JOIN role on employees.role_id=role.id
    INNER JOIN departments on role.department_id=departments.id;`;
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