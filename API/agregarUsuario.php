<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");

    require "conexion.php";
    //Llamada axios
    $json = file_get_contents("php://input");
    //Llamada directa
    $objUsuario = json_decode($json);
    //Valores por Axios
    $usuario = $_POST['usuario'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    //Si vamos por axios
    if (isset($_POST['usuario']) && isset($_POST['email']) && isset($_POST['password'])){
        $sql = "INSERT INTO usuarios(email, usuario, password) VALUES(?, ?, ?)";
        if($query = $mysqli->prepare($sql)) {
            $query->bind_param('sss', $email, $usuario, $password);
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
    }else{ 
        if(empty($objUsuario->email) || empty($objUsuario->usuario) || empty($objUsuario->password)) {
            $jsonRespuesta = array('msg' => 'ERROR');
            echo json_encode($jsonRespuesta);
        } else {
            $sql = "INSERT INTO usuarios(email, usuario, password) VALUES('$objUsuario->email', '$objUsuario->usuario', '$objUsuario->password')";
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