const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// creates connection to sql database 
const connection = mysql.createConnection({
    host: 'localhost',
    port: 5908,
    user: 'root',
    password: 'Lille59000',
    database: 'employee_db'
})

// connects to sql server and sql database

connection.connect(function(err){
    if (err) throw err;
    options();
})

// prompts user with list of options to choose from 
function options() {
    inquirer
    .prompt({
        name: 'action',
        type: 'list',
        message: 'Welcome to our employee database! What would you like to do?',
        choices: [
            'View all employees',
            'View all departments',
            'View all roles',
            'Add an employee',
            'Add a department',
            'Add a role',
            'Update employee role',
            'Delete an employee',
            'EXIT'
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case 'View all employees':
                viewEmployees();
                break;
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Add a departement':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Update employee role':
                updateRole();
                break;
            case 'Delete an employee':
                deleteEmployee();
                break;
            case 'EXIT':
                exitApp();
                break;
            default:
                break;
            
        }
    })
};

// view all employees

function viewEmployees() {
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + 'employees found!')
    })
}