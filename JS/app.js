//Variables 
//Para el form de registro.html
var form = document.getElementById("form");
var submit = document.getElementById("registro");
submit.addEventListener("click", formRegistro);

//Funciones
//Función para comprobar el email con una expresión regular
function comprobarEmail(email) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email.trim())) {
        return false
    }else{
        return true;
    }

}

//Función para comprobar si el usuario está ya registrado
function comprobarUsuario (usuario){
    if (testBBDDUsuario() == 'usuario') {
        return true;
    }else{
        return false;
    }
}

//Función para efectuar el registro del usuario
function registroUsuario (usuario){
    app.get(`/addUsuario`, (req, res) => {
        let post = { email: "Post one", usuario: "This is body 1", password };
        let sql = "INSERT INTO posts SET ?";
        let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log("result");
        res.send("Post 1 added");
        });
    });
}

function testBBDDUsuario (usuario){
    conexion.query(`SELECT usuario FROM usuarios WHERE usuario = '${usuario}'`, function (err, result) {
        if (err) throw err;
        console.log(result);
        return result;
    });
}

//Hacer el form para el registro, haciendo las comprobaciones y después efectuando el insertado si es correcto
function formRegistro(){
    //Variables para los nodos del formulario
    var email= document.getElementById("email");
    var usuario = document.getElementById("usuario");
    var password = document.getElementById("password");
    //Variables para los values
    let datoEmail;
    let datoUsuario;
    let datoPassword;
    
    if( comprobarEmail(email.value) == false){
        alert("Error. Campo de Email no válido o vacío.");
    }else{
        datoEmail = email.value;
        let emailRes = comprobarEmail(datoEmail);
        if (usuario.value == null || usuario.value == "" || usuario.value == undefined){
            alert("Error. Campo de Usuario no válido o vacío.");
        }else{
            datoUsuario = usuario.value;
            let usuarioRes = comprobarUsuario(datoUsuario);
            if (emailRes && usuarioRes){
                datoPassword = password.value;
                registrarUsuario(datoEmail, datoUsuario, datoPassword);
                form.action = "../HTML/wordlabras.html";
            }//Fin comprobación BBDD
        }//Fin comprobación Usuario
    }//Fin comprobación Email
}