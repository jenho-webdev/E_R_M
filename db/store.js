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
//Function to get and return all role in rows
async function getAllRoles()
{
  try {
    const query = `
      SELECT role.id, role.title, role.salary, departments.name AS department
      FROM role
      INNER JOIN departments ON role.department_id = departments.id
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
      SELECT employee.id, employee.first_name, employee.last_name, role.title, departments.name AS department, role.salary, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name
      FROM employee
      INNER JOIN role ON employee.role_id = role.id
      INNER JOIN departments ON role.department_id = departments.id
      LEFT JOIN employee AS manager ON employee.manager_id = manager.id
      `;
    const [rows] = await connection.query(query);
    return rows;

  } catch (error) {
    throw error;
  }
}

// function to retrieve all employee
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
    
      await connection.query(query);
      console.log(
        "\x1b[33m%s\x1b[0m",
        `New department, ${answers.departmentName}, added successfully.`
      );
      await viewAllDepartments(); // Console log all exiting departments in a table
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

    const department = rows.find((row) => row.name === answers.menuChoice);
    const department_id = department.id;
    const query = `INSERT INTO role (title, salary, department_id) VALUEs ("${answers.titleName}","${answers.salary}","${department_id}")`;

    await connection.query(query);
    await viewAllRoles(); // Console.log the updated role table in a console.table(role)
    console.log(
      "\x1b[33m%s\x1b[0m",
      `New role, ${answers.titleName}, added successfully.`
    );
  
  } 
  catch (error) 
  {
    throw error;
  }
}

// function for router.post("/add-employee", addEmployee);
async function addEmployee() {
  
    const roleRows = await getAllRoles();
    const roleChoices = roleRows.map((row) => ({
      name: `${row.title}`,
      value: row.id,
    }));

    const employeeRows = await getAllEmployees();
    managerChoices = employeeRows.map((row) => ({
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
        name: "roleChoices",
        message: "What role he/she will be in?",
        choices: roleChoices,
      },
      {
        type: "list",
        name: "managerChoices",
        message: "Who he/she will be reporting to?",
        choices: managerChoices,
      },
    ]);

    const roleID = answers.roleChoices;
    const managerID = answers.managerChoices;
    //cap the first letter 
    let firstName = answers.firstName;
    
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    let lastName = answers.lastName;
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

    //roleID and managerID are without "" to allow for passing in null value.
    const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUEs ("${firstName}","${lastName}", ${roleID}, ${managerID})`;
    
    await connection.query(query);
    await viewAllEmployees();
    console.log(
      "\x1b[33m%s\x1b[0m",
      `New employee, ${firstName} ${lastName} added successfully.`
    ); // Console.log the rows as a table
  } catch (error) {
    throw error;
  }
}


// function to handle router.put("/update-employee-role/:id", updateEmployeeRole);
async function updateEmployeeRole() {
  
  const employeeRows = await getAllEmployees();
  const employeeChoices = employeeRows.map((row) => ({
    name: `${row.first_name} ${row.last_name}`,
    value: row.id,
  }));
 const roleRows = await getAllRoles();
 const roleChoices = roleRows.map((row) => ({
   name: `${row.title}`,
   value: row.id,
 }));

  try {
    //prompt user for new  employee's name
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "employeeChoices",
        message: "Which employee's role would you like to update?",
        choices: employeeChoices,
      },

      {
        type: "list",
        name: "roleChoices",
        message:
          "Select employee's new role.",
        choices: roleChoices,
      },
    ]);

    const eID = answers.employeeChoices;
    const query = `UPDATE employee SET role_id = ${answers.roleChoices} WHERE id = ${answers.employeeChoices}`;
    await connection.query(query);
    
    console.log("\x1b[33m%s\x1b[0m", "Employee's role updated successfully."); // Console.log the rows as a table
    await viewAllEmployees();

  } catch (error) {
    throw error;
  }
}

// function to handle router.put("/update-employee-manager/:id", updateEmployeeManager);
async function updateEmployeeManager() {
  
  const employeeRows = await getAllEmployees();
  const employeeChoices = employeeRows.map((row) => ({
    name: `${row.first_name} ${row.last_name}`,
    value: row.id,
  }));
  
 

  try {
    //prompt user for new  employee's name
    const EEanswers = await inquirer.prompt([
      {
        type: "list",
        name: "employeeChoices",
        message: "Which employee's manager would you like to update?",
        choices: employeeChoices,
      },
    ]);
    //Filter down the employee list to exclude the selected employee that the user would like to update on as 
    //it doesn't make any sense to select the same employee as is own manager.
    
    const managerChoices =  employeeChoices.filter((employee) => employee.value !== EEanswers.employeeChoices);

    const managerAnswer = await inquirer.prompt([
      {
        type: "list",
        name: "managerChoices",
        message:
          "Select new reporting manager.",
        choices: managerChoices,
      },
    ])

   

    const eID = EEanswers.employeeChoices;
    const mID = managerAnswer.managerChoices
    const query = `UPDATE employee SET manager_id = ${mID} WHERE id = ${eID}`;
    await connection.query(query);
    
    console.log(
      "\x1b[33m%s\x1b[0m",
      "Employee's manager updated successfully."
    ); 
    // Console.log the all employee as a table
    await viewAllEmployees();

  } catch (error) {
    throw error;
  }
}


//------------------------------DELETE FUNCTIONS------------------------------------
//  function to handle router.delete("/delete-employee/:id", deleteAnEmployee);
async function deleteAnEmployee() {
  
  const employeeRows = await getAllEmployees();
  const employeeChoices = employeeRows.map((row) => ({
    name: `${row.first_name} ${row.last_name}`,
    value: row.id,
  }));
  
 

  try {
    //prompt user for new  employee's name
    const EEanswers = await inquirer.prompt([
      {
        type: "list",
        name: "employeeChoices",
        message: "Which employee would you like to delete?",
        choices: employeeChoices,
      },
    ]);
    
    const eID = EEanswers.employeeChoices;
    const deleteQuery = `DELETE FROM employee WHERE id = ${eID}`;
    
    await connection.query(deleteQuery);
    
    console.log("\x1b[33m%s\x1b[0m", "Employee deleted successfully."); 
    // Console.log the all employee as a table
    await viewAllEmployees();

  } catch (error) {
    throw error;
  }
}

async function deleteARole() {
   const roleRows = await getAllRoles();
   const roleChoices = roleRows.map((row) => ({
     name: `${row.title}`,
     value: row.id,
   }));

  try {
    //prompt user for new  employee's name
    console.log(
      "\x1b[33m%s\x1b[0m",
      "Deleting a role will also remove any employees that are under the role."
    );
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "roleChoices",
        message: "Which role would you like to delete?",
        choices: roleChoices,
      },
    ]);

    const eID = answers.roleChoices;

   

    const deleteQuery = `DELETE FROM role WHERE id = ${eID}`;
    
    await connection.query(deleteQuery);

    console.log("\x1b[33m%s\x1b[0m", "Employee deleted successfully.");
    // Console.log the all employee as a table
    await viewAllRoles();
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
  updateEmployeeRole,
  updateEmployeeManager,
  deleteAnEmployee,
  deleteARole,
};
