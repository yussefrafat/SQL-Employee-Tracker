DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

-- Table for departement
CREATE TABLE departement (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);

-- Create the table for roles
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);