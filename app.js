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

// view all employees from database

function viewEmployees() {
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + 'employees found!');
        console.table('All Employees:', res);
        options();
    })
};

// view all roles from database
function viewRoles() {
    var query = 'SELECT * FROM role';
    connection.query(query, function(err,res) {
        if(err)throw err;
        console.table('All Departments:', res);
        options();
    })
};

// add an employee to the database
function addEmployee() {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'first_name',
                    type: 'input',
                    message: ' What is the employees first name? '
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: 'What is the employee last name?'
                },
                {
                   name: 'manager_id',
                   type: 'input',
                   message: 'What is the employees managers ID? '
                },
                {
                    name: 'role',
                    type: 'list',
                    choices: function() {
                    var roleArray = [];
                    for (let i = 0; i < res.length; i++) {
                        roleArray.push(res[i].title);
                    }
                    return roleArray;
                    },
                    message: 'What is this employee role? '
                }
            ]).then(function (answer) {
                let role_id;
                for (let a = 0; a < res.length; a++) {
                    if (res[a].title == answer.role) {
                        role_id = res[a].id;
                        console.log(role_id)
                    }
                }
                connection.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: role_id,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log('Your employee has been added!');
                        options();
                    })
            })
    })
};

// add a role to the database
function addRole() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: 'new_role',
                type: 'input',
                message: "What new role would you like to add?"
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this role? (Enter number)'
            },
            {
                name: 'Department',
                type: 'list',
                choices: function() {
                    var deptArray =[];
                    for (let i = 0; i < res.length; i++) {
                        deptArray.push(res[i].name);
                    }
                    return deptArray;
                },
            }
        ]).then(function (answer) {
            let department_id;
            for (let a = 0; a < res.length; a++) {
                if (res[a].name == answer.Department) {
                    department_id = res[a].id;
                }
            }

            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.new_role,
                    salary: answer.salary,
                    department_id: department_id
                },
                function (err, res) {
                    if(err)throw err;
                    console.log('Your new role has been added!');
                    console.table('All Roles:', res);
                    options();
                })
        })
    })
};

// update a role in teh database 
function updateRole() {

};

// delete an employee
function deleteEmployee() {

};

// exit the app
function exitApp() {

};