const connection = require('../config/connection');


// Function to retrieve all departments
async function viewAllDepartments() {
  try {
    const query = 'SELECT * FROM departments';
    const [rows] = await connection.query(query);
    console.table(rows);
  } catch (error) {
    throw error;
  }
}

async function viewAllRoles() {
  try {
    const query = `
      SELECT roles.id, roles.title, roles.salary, departments.name AS departments
      FROM roles
      INNER JOIN department ON roles.department_id = department.id
    `;
    const [rows] = await connection.query(query);
    console.table(rows); // Console.log the rows as a table
  } catch (error) {
    throw error;
  }
}

// Function to retrieve all employees
async function viewAllEmployees() {
  try {
    const query = `
      SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name
      FROM employee
      INNER JOIN role ON employee.role_id = role.id
      INNER JOIN department ON role.department_id = department.id
      LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    `;
    const [rows] = await connection.query(query);
    console.table(rows); // Console.log the rows as a table
  } catch (error) {
    throw error;
  }
}

// TODO: router.post("/add-department", addDepartment);

// TODO: router.post("/add-role", addRole);
// TODO: router.post("/add-employee", addEmployee);
// TODO: router.put("/update-employee-role/:id", updateEmployeeRole);

// Export the controller functions
module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  //addDepartment,
};