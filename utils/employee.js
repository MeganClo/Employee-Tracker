const db = require("../db/connection");
const cTable = require('console.table');

// Get all employees
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
      
    });
};

// Get One employee
const getOneEmployee = () => {
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
  LEFT JOIN employees manager on manager.id = employees.manager_id
  WHERE employees.id = ?;`
  let params = 3;
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(result);
  })
};

// Get employees by manager
const getEmployeesByManager = () => {
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
  LEFT JOIN employees manager on manager.id = employees.manager_id
  WHERE employees.manager_id = ?;`;
  let params = 1;
    db.query(sql, params, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }
      console.table(rows);
      
    });
};


// Add an employee
const addEmployee = () => {
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`;
  // let params = ["Monica", "Chandler", 1, 1];
  db.query(sql, params, (err, result) => {
      if (err) {
          console.log(err);
          return;
      }
      console.table(result);
      });
};

// Delete an employee
const deleteEmployee = () => {
  const sql = `DELETE FROM employees WHERE id = ?;`;
  let params = 5;
  db.query(sql, params, (err, result) => {
      if (err) {
          console.log(err);
          return;
      } console.log("Employee deleted");
          getEmployees();
  })
};

// Update an employee
const updateEmployee = () => {
  
}

module.exports = {
    getEmployees,
    deleteEmployee,
    getOneEmployee,
    addEmployee,
    getEmployeesByManager
};