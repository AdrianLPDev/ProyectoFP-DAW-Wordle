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

    }else if (isset($_POST['usuario']) && isset($_POST['fecha'])){
        $usuario = $_POST['usuario'];
        $fecha = $_POST['fecha'];
        $sql = "SELECT * FROM estadisticas WHERE usuario = ? fecha = ?";
        if($query = $mysqli->prepare($sql)) {
            $query->bind_param('ii',$usuario,$fecha);
            $query->execute();
            $query->store_result();
            $rows = $query->num_rows;
            //$result = $query->get_result();
            if($rows > 0){//Si hay resultados{
                echo json_encode($rows);
            }else{
                echo json_encode($rows);
            }
            /*
            if($result->num_rows >= 1){//Si hay resultados
                echo json_encode($result);
                //echo json_encode(true);
                return;
            }else{//Si no hay resultados
                echo json_encode(false);
                return;
            } 
            */
        } else {//Si la consulta ha dado error
            $jsonRespuesta = array('msg' => 'ERROR');
            echo json_encode($jsonRespuesta);
        }
    }