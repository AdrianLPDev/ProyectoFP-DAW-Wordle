<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");

    require "conexion.php";
    $json = file_get_contents("php://input");
    $objUsuario = json_decode($json);
    
    //Si vamos por axios
    if (isset($_POST['usuario']) && isset($_POST['email'])){
        $usuario = $_POST['usuario'];
        $email = $_POST['email'];
        $sql = "SELECT * FROM usuarios WHERE usuario = ? OR email = ?";
        if($query = $mysqli->prepare($sql)) {
            $query = $mysqli->prepare("SELECT * FROM usuarios WHERE usuario = ? OR email = ?");
            $query->bind_param('ss', $usuario, $email);
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
        if(empty($objUsuario->email) || empty($objUsuario->usuario) || empty($objUsuario->password)) {
            $jsonRespuesta = array('msg' => 'ERROR');
            echo json_encode($jsonRespuesta);
        } else {
            $sql = "SELECT * FROM usuarios WHERE usuario = '$objUsuario->usuario' OR email = '$objUsuario->email'";
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
    