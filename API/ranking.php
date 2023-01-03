<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    function obtenerRanking(){
        $query = $this->connect()->query('SET @ai = 0; SELECT (@ai := @ai + 1) AS ranking, e.usuario, SUM(e.victoria) AS victorias,SUM(e.intentos) AS intentos FROM estadisticas e, usuarios u WHERE u.usuario = e.usuario AND e.victoria = 1 GROUP BY e.usuario;');
        return $query;
    }