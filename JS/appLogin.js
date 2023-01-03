const urlBase = 'http://localhost/Proyecto/API/'
var form = document.getElementById("form");
var submit = document.getElementById("login");
var resultado = false;
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

//Función para comprobar si el usuario está ya registrado
async function comprobarUsuario (usuario, password){
    var data = new FormData();
    data.append('usuario', usuario);
    data.append('password', password);
    await axios.post(`${urlBase}login.php`, data).then(respuesta => {setResult(respuesta.data)});
}

//Hacer el form para el registro, haciendo las comprobaciones y después efectuando el insertado si es correcto
async function formRegistro(){
    //Variables para los nodos del formulario
    var usuario = document.getElementById("usuario");
    var password = document.getElementById("password");
    //Variables para los values
    let datoUsuario;
    let datoPassword;
    if (usuario.value == null || usuario.value == "" || usuario.value == undefined){
        alert("Error. Campo de usuario no válido o vacío.");
    }else{
        datoUsuario = usuario.value;
        //Si no ha encontrado ningún usuario con ese usuario
        if (password.value == null || password.value == "" || password.value == undefined){
            alert("Error. Campo de contraseña no válida o vacía.");
        }else{
            datoPassword = password.value;
            await comprobarUsuario(datoUsuario, datoPassword)
            if(resultado==true){
                //En caso de entrada directa
                form.action = "./HTML/wordlabras.html";
                window.location.href = `./HTML/wordlabras.html?usuario=${datoUsuario}`;
            }else{
                alert("Error. No existe una cuenta registrada con ese usuario.");
            }//Fin Comprobar Usuario+Email en BBDD
        } //Fin comprobación Password
    }//Fin comprobación Usuario
}