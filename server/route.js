const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'me',
    password: 'secret',
    database: 'my_db'
});