const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "CampTruco"
});

connection.connect((error) => {
    if (error) throw error
    console.log("Conectado ao Banco de Dados")
});

module.exports = connection