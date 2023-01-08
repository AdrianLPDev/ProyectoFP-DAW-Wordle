<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");

    require "conexion.php";
    $json = file_get_contents("php://input");
    $objUsuario = json_decode($json);
    // Vamos por axios
    if (isset($_POST['usuario']) && isset($_POST['fecha']) && isset($_POST['victoria']) && isset($_POST['intentos'])){
        $usuario = $_POST['usuario'];
        $fecha = $_POST['fecha'];
        $victoria = $_POST['victoria'];
        $intentos = $_POST['intentos'];
        $sql = "INSERT INTO estadisticas(usuario, fecha, victoria, intentos) VALUES(?, ?, ?, ?)";
        if($query = $mysqli->prepare($sql)) {
            $query->bind_param('ssss', $usuario, $fecha, $victoria, $intentos);
            $query->execute();
            $result = $query->get_result();
            if($result){
                echo json_encode(true);
                return;
            }else{
                echo json_encode(false);
                return;
            } 
        } else {
            $jsonRespuesta = array('msg' => 'ERROR');
            echo json_encode($jsonRespuesta);
        }//Si están vacíos los datos por POST de axios
    }else if (isset($_POST['usuario']) && isset($_POST['fecha'])){
        $usuario = $_POST['usuario'];
        $fecha = $_POST['fecha'];
        $sql = "SELECT * FROM estadisticas WHERE usuario = '$usuario' AND fecha = '$fecha'";
        if($query = $mysqli->query($sql)) {
            $result = $query->num_rows;
            if($result > 0){
                echo json_encode(true);
            }else{
                echo json_encode(false);
            }
        } else {//Si la consulta ha dado error
            $jsonRespuesta = array('msg' => 'ERROR');
            echo json_encode($jsonRespuesta);
        }
    }