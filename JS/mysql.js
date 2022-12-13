//const express = require('express');
const mysql = require('mysql');

//Conexión guardada en una variable
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wordlabras',
    port: 3306
})

//Conexión con la base de datos
conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('Conexión a la base de datos exisota');
        
    }
})

export function comprobarEmail(email) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email.trim())) {
        return alert("Error. Campo de Email no válido o vacío.");
    }else{

        return true;
    }
}

export function comprobarUsuario(usuario) {
    //Conectamos con la BBDD y comprobamos que el usuario no está creado ya   
    if (!emailRegex.test(email.trim())) {
        return alert("Error. Campo de Email no válido o vacío.");
    }else{
        
        return true;
    }
}

export function registrarUsuario(email, usuario, password) {
    //Conectamos con la BBDD y insertamos los datos
    conexion.query(`INSERT INTO usuarios (email, usuario, password) VALUES ("${email}", "${usuario}", "${password}")`)  
    
}
//conexion.end();