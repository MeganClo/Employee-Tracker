const db = require("../db/connection");

// Get all roles
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
    });
};

// Add a role
const addRole = () => {
  const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`;
  // let params = ["Quidditch Coach", 400.00, 1];
  db.query(sql, params, (err, result) => {
      if (err) {
          console.log(err);
          return;
      }
      getRoles();
      });
};


// Delete a role
const deleteRole = () => {
  const sql = `DELETE FROM role WHERE id = ?;`;
  let params = 4;
  db.query(sql, params, (err, result) => {
      if (err) {
          console.log(err);
          return;
      } console.log("Role deleted");
          getRoles();
  })
};

module.exports = {
    getRoles,
    addRole,
    deleteRole
};