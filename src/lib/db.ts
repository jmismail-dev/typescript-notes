import mysql from 'mysql';

const connection = mysql.createConnection({
    host: process.env.DB_HOSTNAME || 'localhost',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'ts-notes',
    port: 3306,
});


export default connection;