const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
require('dotenv').config();

//Create connection for the sql databse
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'employees_DB'
});

//Connect to sql database and start app
connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  console.log('WELCOME TO THE EMPLOYEE MANAGEMENT SYSTEM')
  //Call to Start main function goes here
  mainMenu();
});

function mainMenu () {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'menu',
      message: 'What would you like to do?',
      choices: [
        'View Departments',
        'View Roles',
        'View Employees',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update Employee Role'
      ]
    }
  ])
  .then(function(data) {
    switch (data.menu) {
      case "View Departments":
        viewDept();
        break;
      
      case "View Roles":
        viewRoles();
        break;

      case "View Employees":
        viewEmployees();
        break;
    }
  });
};

function viewEmployees() {
  connection.query(`SELECT e.id, e.first_name, e.last_name, 
                   roles.title AS Title, departments.name AS Department, roles.salary,
                   CONCAT(m.first_name,' ',m.last_name) AS Manager                    
                   FROM employees e
                   LEFT JOIN roles ON e.role_id = roles.id
                   LEFT JOIN departments ON roles.dept_id = departments.id
                   LEFT JOIN employees m ON e.manager_id = m.id`, 
    function(err, results) {
      console.table(results);
    }
  );
  connection.end();
}