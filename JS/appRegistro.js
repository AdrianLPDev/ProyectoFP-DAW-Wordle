const urlBase = 'http://localhost/Proyecto/API/'
var form = document.getElementById("form");
var submit = document.getElementById("registro");
var resultado = true;
//Evento para el botón
submit.addEventListener("click", function(event){
    event.preventDefault();
    formRegistro();
});

function getResult (){
    return resultado;
}

function setResult (respuesta) {
    resultado = respuesta;
}
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
async function comprobarUsuario (email, usuario){
    var data = new FormData();
    data.append('email', email);
    data.append('usuario', usuario);
    await axios.post(`${urlBase}comprobarUsuario.php`, data).then(respuesta => {setResult(respuesta.data)});
}

//Función para efectuar el registro del usuario
function registrarUsuario(email, usuario, password){
    var data = new FormData();
    data.append('email', email);
    data.append('usuario', usuario);
    data.append('password', password);
    axios.post(`${urlBase}agregarUsuario.php`, data)
    .then(respuesta => {console.log(respuesta.data); window.location.href = "../index.html";})
    .catch(error => console.log(error))
    //En caso de Axios

}

//Hacer el form para el registro, haciendo las comprobaciones y después efectuando el insertado si es correcto
async function formRegistro(){
    //Variables para los nodos del formulario
    var email = document.getElementById("email");
    var usuario = document.getElementById("usuario");
    var password = document.getElementById("password");
    //Variables para los values
    let datoEmail;
    let datoUsuario;
    let datoPassword;
    
    if(comprobarEmail(email.value) == false){
        alert("Error. Campo de email no válido o vacío.");
    }else{
        datoEmail = email.value;
        if (usuario.value == null || usuario.value == "" || usuario.value == undefined){
            alert("Error. Campo de usuario no válido o vacío.");
        }else{
            datoUsuario = usuario.value;
            //Si no ha encontrado ningún usuario con ese usuario/email
            if (password.value == null || password.value == "" || password.value == undefined){
                alert("Error. Campo de contraseña no válido o vacío.");
            }else{
                await comprobarUsuario(datoEmail, datoUsuario)
                if(resultado==false){
                    datoPassword = password.value;
                    registrarUsuario(datoEmail, datoUsuario, datoPassword);
                    //En caso de entrada directa
                    form.action = "../index.html";
                }else{
                    alert("Error. Ya existe una cuenta registrada con ese usuario o email.");
                }//Fin Comprobar Usuario+Email en BBDD
            } //Fin comprobación Password
        }//Fin comprobación Usuario
    }//Fin comprobación Email
}