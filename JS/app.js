//Imports de las funciones del JS con la conexión a la BBDD
import { comprobarEmail } from "./mysql";
import { comprobarUsuario } from "./mysql";
import { registrarUsuario } from "./mysql";
//Para el form de registro.html
var form = document.getElementById("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    formRegistro();
});

function formRegistro(){
    //Variables para los nodos del formulario
    var email= document.getElementById("email");
    var usuario = document.getElementById("usario");
    var password = document.getElementById("password");
    //Variables para los values
    let datoEmail;
    let datoUsuario;
    let datoPassword;
    if((email.value == null || email.value == "" || email.value == undefined)){
        alert("Error. Campo de Email no válido o vacío.");
    }else{
        datoEmail = email.value;
        let emailRes = comprobarEmail(datoEmail);
        if (usuario.value == null || usuario.value == "" || usuario.value == undefined){
            alert("Error. Campo de Usuario no válido o vacío.");
        }else{
            datoUsuario = usuario.value;
            let usuarioRes = comprobarUsuario(datoUsuario);
            if (emailRes == true && comprobarUsuario){
                datoPassword = password.value;
                registrarUsuario(datoEmail, datoUsuario, datoPassword);
                form.action = "../HTML/wordlabras.html";
            }//Fin comprobación BBDD
        }//Fin comprobación Usuario
    }//Fin comprobación Email
}

function registrarUsuario (usuario){
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


