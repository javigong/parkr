const mysqlssh = require('mysql-ssh');
const fs = require('fs');

mysqlssh.connect({
    host: 'ec2-52-9-101-33.us-west-1.compute.amazonaws.com',
    user: 'ec2-user',
    privateKey: fs.readFileSync(process.env.HOME + '/.ssh/parkr.pem')
}, {
    host: '172.17.0.2',
    user: 'root',
    password: 'P@rkrDev',
    database: 'dbparkr'
})