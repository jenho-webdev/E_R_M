const connection = require("../config/connection");
const inquirer = require("inquirer");


//----------------------GET FUNCTIONS-----------------------

//Function to get and return departments in rows
async function getAllDepartments()
{
  try {
    const query = "SELECT * FROM departments";
    const [rows] = await connection.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
}
// Function to return the result to terminal as a table
async function viewAllDepartments() {
  try {
      console.table(await getAllDepartments());
  } catch (error) {
    throw error;
  }
}
//Function to get and return all roles in rows
async function getAllRoles()
{
  try {
    const query = `
      SELECT roles.id, roles.title, roles.salary, departments.name AS department
      FROM roles
      INNER JOIN departments ON roles.department_id = departments.id
    `;
    const [rows] = await connection.query(query);
    return rows; 
  } catch (error) {
    throw error;
  }
}
// Function to return the result to terminal as a table
async function viewAllRoles() {
  try {
     console.table(await getAllRoles())
  } catch (error) {
    throw error;
  }
}

async function getAllEmployees() {
try {
      const query = `
      SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name
      FROM employees
      INNER JOIN roles ON employees.role_id = roles.id
      INNER JOIN departments ON roles.department_id = departments.id
      LEFT JOIN employees AS manager ON employees.manager_id = manager.id
      `;
    const [rows] = await connection.query(query);
    return rows;

  } catch (error) {
    throw error;
  }
}

// function to retrieve all employees
async function viewAllEmployees() {
  try {
    
    console.table(await getAllEmployees()); // Console.log the rows as a table
  } catch (error) {
    throw error;
  }
}

//---------------------ADD FUNCTIONS---------------------------------

// function for router.post("/add-department", addDepartment);
async function addDepartment() {
  try {
    //prompt user for new department name
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Enter the name of the department:",
        //make sure uer input something
        validate: (input) => {
          if (input.trim() === "") {
            return "Department name cannot be empty";
          }
          return true;
        },
      },
    ]);

    const query = `INSERT INTO departments (name) VALUES ("${answers.departmentName}")`;
    
    if (await connection.query(`SELECT COUNT(*) FROM departments WHERE name = '${answers.departmentName}'`) < 1)
    {
      
      await connection.query(query);
      console.log("New department added successfully.");
      await viewAllDepartments(); // Console log all exiting departments in a table
    }
    else
    { 
      console.log(
        "\x1b[35m%s\x1b[0m",
        `Department [${answers.departmentName}] already exist. Return to main menu.`
      );

    }
  }catch (error) 
  {
    throw error;
  }
}
  

// function for router.post("/add-role", addRole);
async function addRole() {
  try {
    //prompt user for new department name

    const rows = await getAllDepartments();
    const departmentNames = rows.map((row) => row.name);
  
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "titleName",
        message: "Enter the title of the new role:",
        //make sure uer input something
        validate: (input) => {
          if (input.trim() === "") {
            return "Title cannot be empty";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary for the role",
        //make sure uer input something
        validate: (input) => {
          if (isNaN(input) || input === "") {
            return "Salary must be a number or can't be empty";
          }
          return true;
        },
      },
      {
        type: "list",
        name: "menuChoice",
        message: "What department this new role be in?",
        choices: departmentNames,
      },
    ]);

    if (await connection.query(`SELECT COUNT(*) FROM roles WHERE title = '${answers.titleName}'`) < 1)
    {
    const department = rows.find((row) => row.name === answers.menuChoice);
    const department_id = department.id;
    const query = `INSERT INTO roles (title, salary, department_id) VALUEs ("${answers.titleName}","${answers.salary}","${department_id}")`;

    await connection.query(query);
    await viewAllRoles(); // Console.log the updated roles table in a console.table(roles)
    console.log("New role added successfully.");
    }
    else
    {
      console.log(
        "\x1b[35m%s\x1b[0m",
        `Role [${answers.titleName}] already exist. Return to main menu.`
      );
    }
  } catch (error) {
    throw error;
  }
}

// function for router.post("/add-employee", addEmployee);
async function addEmployee() {
  
    const rolesRows = await getAllRoles();
    const rolesNames = rolesRows.map((row) => ({
      name:`${row.title}`,
      value:row.id,
    }));

    const employeesRows = await getAllEmployees();
    managerChoices = employeesRows.map((row) => ({
      name: `${row.first_name} ${row.last_name}`,
      value: row.id,
    }));
    //add a none/null option into the manager choices
    managerChoices.unshift({name:"none",value: null});

 try {
    //prompt user for new  employee's name
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter the first name of the new employee:",

        //make sure user input something and chars >= 2
        validate: (input) => {
          if (input.trim() === "" || input.length < 2) {
            return "First Name cannot be empty or less than two characters.";
          } else return true;
        },
      },

      {
        type: "input",
        name: "lastName",
        message: "Enter the last name of the new employee:",
        //make sure uer input something chars >= 2
        validate: (input) => {
          if (input.trim() === "" || input.length < 2) {
            return "Name cannot be empty or less than two characters.";
          } else return true;
        },
      },
      {
        type: "list",
        name: "roleChoice",
        message: "What role he/she will be in?",
        choices: rolesNames,
      },
      {
        type: "list",
        name: "managerChoice",
        message: "Who he/she will be reporting to?",
        choices: managerChoices,
      },
    ]);

    const roleID = answers.roleChoice;
    const managerID = answers.managerChoice;
    //cap the first letter 
    let firstName = answers.firstName;
    
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    let lastName = answers.lastName;
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

    //roleID and managerID are without "" to allow for passing in null value.
    const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUEs ("${firstName}","${lastName}", ${roleID}, ${managerID})`;
    
    await connection.query(query);
    await viewAllEmployees();
    console.log("New employees added successfully."); // Console.log the rows as a table
  } catch (error) {
    throw error;
  }
}


// TODO: router.put("/update-employee-role/:id", updateEmployeeRole);
async function updateEmployee() {
  
  const employeesRows = await getAllEmployees();
  const employeesChoices = employeesRows.map((row) => ({
    name: `${row.first_name} ${row.last_name}`,
    value: row.id,
  }));

  let managerChoices = employeesChoices
  managerChoices.unshift({ name: "none", value: "none" });

  try {
    //prompt user for new  employee's name
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "eChoice",
        message: "which employee profile would you like to update?",
        choices: employeesChoices,
      },
      {
        type: "list",
        name: "roleChoice",
        message: "Update employee's role: please select employee's new role.",
        choices: rolesNames,
      },
      {
        type: "list",
        name: "managerChoice",
        message: "Update employee's reporting manager: Select new reporting manager.",
        choices: employeesChoices,
      },
    ]);

    const eID = answers.employeesChoices;
    const query = `UPDATE employees SET role_id = ${answers.roleChoice}, manager_id = ${answers.managerChoice}`
    await connection.query(query);
    await viewAllEmployees();
    console.log("Employee's info updated successfully."); // Console.log the rows as a table
  } catch (error) {
    throw error;
  }
}



// Export the controller functions
module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployee,
};
