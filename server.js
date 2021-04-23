const inquirer = require('inquirer');
const { getDepartments, addDepartment, deleteDepartment } = require("./utils/department");
const { getEmployees, deleteEmployee, getOneEmployee, addEmployee, getEmployeesByManager } = require("./utils/employee");
const { getRoles, addRole, deleteRole } = require("./utils/role");
const { starterQuestion, whichViewAll, departmentAdd, whichAdd, checkQuestion, roleAdd } = require("./utils/inquirer");

// function that gets to start application off
const start = () => {
  return inquirer.prompt(starterQuestion)
  .then (response => {
    if (response.mainQuestion === "View all departments, roles, or employees") {
      viewAll();
    }
    if (response.mainQuestion === "Add a department, role, or employee") {
      addingStuff();
    }
  })
};

// prompt to check if things were entered correctly
const answerCheck = () => {
  return inquirer.prompt(checkQuestion)
};


// function called when user wants to view all of something
const viewAll = () => {
  return inquirer.prompt(whichViewAll)
  .then (response => {
    if (response.viewAll === "View all departments") {
      getDepartments();
    }
    if (response.viewAll === "View all roles") {
      getRoles();
    }
    if (response.viewAll === "View all employees") {
      getEmployees();
    }
  })
};

// function to call if a user would like to add a department, role, or employee
const addingStuff = () => {
  return inquirer.prompt(whichAdd)
  .then (response => {
    if (response.addAWhat === "Add a department"){
      deptAdd();
    }
    if (response.addAWhat === "Add a role") {
      roleAdder();
    }
  })
};

// function to add departments
const deptAdd = () => {
  return inquirer.prompt(departmentAdd)
  .then (response => {
    params = response.addDepartment;
    console.log(response.addDepartment);
    answerCheck()
    .then (answerCheckData => {
      if (answerCheckData.check === "Yes, take me to the next step."){
        addDepartment();
      } else {deptAdd();}
    })
    .catch(err => {
      console.log(err);
    })
  })
};

const roleAdder = () => {
  return inquirer.prompt(roleAdd)
  .then (response => {
    params = [response.roleName, response.roleSalary, response.roleId];
    console.table(params);
    answerCheck()
    .then(answerCheckData => {
      if (answerCheckData.check === "Yes, take me to the next step.") {
        addRole();
      } else {roleAdder();}
    })
    .catch(err => {
      console.log(err);
    })
  })
}

start();
