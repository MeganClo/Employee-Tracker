const db = require("../../db/connection");

// Get all departments
const getDepartments = () => {
    const sql = `SELECT * FROM departments;`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log("Error");
        console.log(err);
        return;
      }
      console.log(rows);
      
    });
};

// Add a department
router.post ('/departments', ({ body }, res) => {
    const sql = `INSERT INTO departments (department_name) VALUES (?);`
    const params = body.department_name;
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: body
        });
    });
});

// Delete a department
router.delete ('/departments/:id', (req, res) => {
    const sql = `DELETE FROM departments WHERE id = ?;`;
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({ 
                message: "Department not found"
            });
        } else {
            res.json({
                message: "deleted",
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});
  


module.exports = {
    getDepartments
};