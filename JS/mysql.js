var mysql = require('mysql');

var conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wordlabras',
    port: 3306
})

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('Conexión a la base de datos exisota');
    }
})