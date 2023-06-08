const Sequelize = require('sequelize');

const database = process.env.DATABASE;
const username = 'root';
const password = process.env.PASSWORD;
const host     = process.env.HOST;
const dialect  = process.env.DIALECT;

const connection = new Sequelize(
    database,
    username,
    password,
    {host, dialect}
);

module.exports = connection;    