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


const mysql = require('mysql2');
const { Client } = require('ssh2');
const sshClient = new Client();
const dbServer = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}
const tunnelConfig = {
    host: process.env.DB_SSH_HOST,
    port: 22,
    username: process.env.DB_SSH_USER,
    privateKey: require('fs').readFileSync('./parkr.pem')
}
const forwardConfig = {
    srcHost: '172.17.0.2',
    srcPort: 3306,
    dstHost: dbServer.host,
    dstPort: dbServer.port
};
const SSHConnection = new Promise((resolve, reject) => {
    sshClient.on('ready', () => {
        sshClient.forwardOut(
            forwardConfig.srcHost,
            forwardConfig.srcPort,
            forwardConfig.dstHost,
            forwardConfig.dstPort,
            (err, stream) => {
                if (err) reject(err);
                const updatedDbServer = {
                    ...dbServer,
                    stream
                };
                const connection = mysql.createConnection(updatedDbServer);
                connection.connect((error) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(connection);
                });
            });
    }).connect(tunnelConfig);
});