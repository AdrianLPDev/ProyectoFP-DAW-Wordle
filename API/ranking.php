<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");

    require "conexion.php";
    $tempArray = array();
    $json = file_get_contents("php://input");
    $objUsuario = json_decode($json);
    // Vamos por axios
    $sql = "SELECT RANK() OVER (ORDER BY victorias DESC, intentos ASC) AS ranking, e.usuario, SUM(e.victoria) AS victorias,SUM(e.intentos) AS intentos FROM estadisticas e, usuarios u WHERE u.usuario = e.usuario AND e.victoria = 1 GROUP BY e.usuario ORDER BY ranking;";
    if($query = $mysqli->prepare($sql)) {
        $query->execute();
        $result = $query->get_result();
        if($result->num_rows > 0){
            while($row = $result->fetch_assoc()) {
                array_push($tempArray, $row);
            }
            echo json_encode($tempArray);
        }else{
            echo json_encode($tempArray);
            return;
        } 
    } else {
        $jsonRespuesta = array('msg' => 'ERROR');
        echo json_encode($jsonRespuesta);
    }//Si están vacíos los datos por POST de axios