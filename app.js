const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { async } = require('rxjs');
require('dotenv').config();

//Create connection for the sql databse
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'employees_DB'
});

//Connect to sql database and start app
db.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + db.threadId);
  console.log('WELCOME TO THE EMPLOYEE MANAGEMENT SYSTEM')
  //Call to Start main function goes here
  mainMenu();
});

async function mainMenu () {
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
        'Update Employee Role',
        'Exit'
      ]
    }
  ])
  .then(async function(data) {
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
      
      case "Add Role":
        addRole();
        break;

      case "Add Employee":
        addEmployee();
        break;

      case "Update Employee Role":
        changeRole();
        break;

      case "Exit":
        db.end();
    }
  });
};

//Employee Functions
async function viewEmployees() {
  db.query(`SELECT e.id, e.first_name, e.last_name, 
                   roles.title AS Title, departments.name AS Department, roles.salary,
                   CONCAT(m.first_name,' ',m.last_name) AS Manager                    
                   FROM employees e
                   LEFT JOIN roles ON e.role_id = roles.id
                   LEFT JOIN departments ON roles.dept_id = departments.id
                   LEFT JOIN employees m ON e.manager_id = m.id`, 
    async function(err, results) {
      if (err) throw err;
      console.table(results);
      mainMenu();
    }
  );  
};

function askName() {
  return inquirer.prompt([
    {
      type: 'input' ,
      name: 'firstName',
      message: 'What is the employees first name:'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'What is the employees last name:'
    }
  ]);
}

async function addEmployee() {
  // let roles = db.query('SELECT id, title FROM roles', (err, res) => {
  //   if (err) throw err;    
  // });
  // let managers = db.promise().query('SELECT id, CONCAT(first_name," ",last_name) AS Manager FROM employees');
  //console.log(roles);
  const addName = await askName();
  db.query('SELECT id, title FROM roles', async (err, res) => {
    if (err) throw err;
    let { role } = await inquirer.prompt([
      {
        type: 'list',
        name: 'role',
        message: 'What is the employees role?',
        choices: () => res.map(res => res.title)
      }
    ]);
    let roleId;
    for (const row of res) {
      if (row.title === role) {
        roleId = row.id;
      //return roleId;
      }
    }  
    db.query('SELECT * FROM employees', async (err, res) => {
      if (err) throw err;
      let choices = res.map(res => `${res.first_name} ${res.last_name}`);
      choices.push('none');
      let { manager } = await inquirer.prompt([
        {
          type: 'list',
          name: 'manager',
          message: 'Choose this employees Manager:',
          choices: choices
        }
      ]);
      let managerId;
      let managerName;
      if (manager === 'none') {
        managerId = null;
      } else {
        for (const data of res) {
          data.fullName = `${data.first_name} ${data.last_name}`;
          if (data.fullName === manager) {
            managerId = data.id;
            managerName = data.fullName;
            console.log(managerId);
            console.log(managerName);
          }
        }
      }
      db.query('INSERT INTO employees SET ?',
        {
          first_name: addName.firstName,
          last_name: addName.lastName,
          role_id: roleId,
          manager_id: parseInt(managerId)
        },
        (err, res) => {
          if (err) throw err;
          console.log('EMPLOYEE HAS BEEN ADDED\n');
          mainMenu();
        }
      )
    })
  })
};



async function changeRole() {
  db.query('SELECT * FROM employees', async (err, res) => {
    if (err) throw err;
    let choices = res.map(res => `${res.id} ${res.first_name} ${res.last_name}`);
    let { employee } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Which employee do you want to update:',
        choices: choices
      }
    ]);
    console.log(employee);
    console.log(typeof employee);
    let empId = employee.replace(/\D/g, '');
    console.log(empId);
    db.query('SELECT id, title FROM roles', async (err, res) => {
      if (err) throw err;
      let { role } = await inquirer.prompt([
        {
          type: 'list',
          name: 'role',
          message: 'What is the employees new role?',
          choices: () => res.map(res => res.title)
        }
      ]);
      let roleId;
      for (const row of res) {
        if (row.title === role) {
          roleId = row.id;
          console.log(roleId);
        }
      }
      db.query('UPDATE employees SET ? WHERE ?',
      [
        {
          role_id: roleId
        },
        {
          id: parseInt(empId)
        }
      ],
      (err, res) => {
        if (err) throw err;
        console.log('EMPLOYEE ROLE HAS BEEN UPDATED\n');
        mainMenu();
      });  
    });          
  });
}

// ROLE FUNCTIONS

//View All Roles
async function viewRoles() {
  db.query(`SELECT roles.id, roles.title, departments.name as Department, roles.salary
            FROM roles
            LEFT JOIN departments ON roles.dept_id = departments.id`, 
    async function(err, results) {
      if (err) throw err;
      console.table(results);
      mainMenu();
    }
  );  
};

//Add a Role
function roleData() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is name of the new role?"
    },
    {
      type: 'number',
      name: 'salary',
      message: 'What is the salary for this role?'
    }
  ]);
}

async function addRole() {
  const newRole = await roleData();  
  db.query('SELECT * FROM departments', async (err, res) => {
    if (err) throw err;    
    let { dept } = await inquirer.prompt([
      {
        type: 'list',
        name: 'dept',
        message: 'What department does this role belong to?',
        choices: () => res.map(res => res.name)
      }
    ]);
    let deptId;
    console.log(dept);
    //console.log(department);
    for (const row of res) {
      if (row.name === dept) {
        deptId = row.id;
        console.log(deptId);
      }
    }
    db.query('INSERT INTO roles SET ?',
        {
          title: newRole.name,
          salary: newRole.salary,
          dept_id: parseInt(deptId)          
        },
        (err, res) => {
          if (err) throw err;
          console.log('NEW ROLE HAS BEEN ADDED\n');
          mainMenu();
        }
      )
  })
}