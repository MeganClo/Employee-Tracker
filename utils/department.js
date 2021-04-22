const db = require("../db/connection");

// Get all departments
const getDepartments = () => {
    const sql = `SELECT * FROM departments;`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }
      console.table(rows);
      
    });
};

// Add a department
const addDepartment = () => {
    const sql = `INSERT INTO departments (department_name) VALUES (?);`;
    let params = "Sports";
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(result);
        });
};

// Delete a department
const deleteDepartment = () => {
    const sql = `DELETE FROM departments WHERE id = ?;`;
    let params = 5;
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        } console.log("Department deleted");
            getDepartments();
    })
};

  



module.exports = {
    getDepartments,
    addDepartment,
    deleteDepartment
};