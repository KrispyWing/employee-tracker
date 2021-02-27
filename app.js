const mysql = require('mysql2');

//Create connection for the sql databse
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Yzerman19!',
  database: 'employees_DB'
});

//Connect to sql database and start app
connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  //Call to Start main function goes here
});