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
    if (isset($_POST['usuario'])){
        $usuario = $_POST['usuario'];
        $sql = "SELECT usuario, fecha, CASE victoria WHEN 0 THEN 'Derrota' WHEN 1 THEN 'Victoria'END AS Resultado, intentos FROM estadisticas WHERE usuario = ?";
        if($query = $mysqli->prepare($sql)) {
            $query->bind_param('s', $usuario);
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
    }