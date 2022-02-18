const fs = require('fs');

module.exports = {
    development: {
        database: {
            host: '172.17.0.2',
            port: 3306,
            user: 'parkrdev',
            password: 'P@rkrDevs2022!',
            database: 'dbparkr',
        },
        tunnelSSH: {
            user: 'ec2-user',
            host: 'ec2-52-9-101-33.us-west-1.compute.amazonaws.com',
            port: 22,
            privateKey: fs.readFile('parkr.pem', function read(err, data) {
                if (err) {
                    throw err;
                }
                var content = data;

                console.log(content);

            }),
            dstHost: 'ec2-52-9-101-33.us-west-1.compute.amazonaws.com',
            dstPort: 22,
            srcHost: '172.17.0.2',
            srcPort: 3306
        },
    },
    production: {
        database: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        tunnelSSH: {
            user: process.env.TUNNEL_USER,
            host: process.env.TUNNEL_SSH_HOST,
            port: process.env.TUNNEL_PORT,
            dstHost: process.env.TUNNEL_DST_HOST,
            dstPort: process.env.TUNNEL_DST_PORT,
            srcHost: process.env.TUNNEL_SRC_HOST,
            srcPort: process.env.TUNNEL_SRC_PORT,
            localHost: process.env.TUNNEL_LOCAL_HOST,
            localPort: process.env.TUNNEL_LOCAL_PORT,
        },
    },
};