const db = require("../db/connection");


// Get all roles
const getRoles = () => {
    const sql = `SELECT
    role.id,
    role.title,
    role.salary,
    departments.department_name
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

module.exports = {
    getRoles
};