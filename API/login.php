<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");

    require "conexion.php";
    $json = file_get_contents("php://input");
    $objUsuario = json_decode($json);
    $usuario = $_POST['usuario'];
    $password = $_POST['password'];
    
    //Si vamos por axios
    if (isset($_POST['usuario']) && $_POST['password']){
        $sql = "SELECT * FROM usuarios WHERE usuario = ? OR password = ?";
        if($query = $mysqli->prepare($sql)) {
            $query = $mysqli->prepare("SELECT * FROM usuarios WHERE usuario = ? OR password = ?");
            $query->bind_param('ss', $usuario, $password);
            $query->execute();
            $result = $query->get_result();
            if($result->num_rows >= 1){
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
    }else{ 
        if(empty($objUsuario->usuario) || empty($objUsuario->password)) {
            $jsonRespuesta = array('msg' => 'ERROR');
            echo json_encode($jsonRespuesta);
        } else {
            $sql = "SELECT * FROM usuarios WHERE usuario = '$objUsuario->usuario' OR password = '$objUsuario->password'";
            $result = $mysqli->query($sql);
            if($result) {
                $jsonRespuesta = array('msg' => 'OK');
                echo json_encode(true);
                return;
            } else {
                echo json_encode(false);
                return;
            }
            
        }
    }//Si están vacíos los datos por POST, nos vamos por el submit directo