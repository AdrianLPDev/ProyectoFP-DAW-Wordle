const urlBase = 'http://localhost/Proyecto/API/'
var tbody = document.getElementById("tbody");
recogerStats();
async function recogerStats(){
    let usuario = localStorage.getItem('usuario');
    var data = new FormData();
    var arrayStats = [];
    data.append('usuario', usuario);
    await axios.post(`${urlBase}mostrarEstadisticas.php`, data)
    .then(respuesta => {
        //console.log(respuesta.data);//Pruebas
        arrayStats = respuesta.data;
        arrayStats.forEach((obj) => {
            //console.log(obj);//Pruebas
            let user = obj.usuario;
            let fecha = obj.fecha;
            let resultado = obj.Resultado;
            let intentos = obj.intentos;
            //Creamos la tabla
            const tr = document.createElement('tr');
            tbody.append(tr);
            let td1 = document.createElement('td');
            //Usuario
            let td2 = document.createElement('td');
            td2.textContent = user;
            tr.append(td2);
            //Fecha
            td1.textContent = fecha;
            tr.append(td1);
            //Victoria
            let td3 = document.createElement('td');
            td3.textContent = resultado;
            tr.append(td3);
            //Intentos
            let td4 = document.createElement('td');
            td4.textContent = intentos;
            tr.append(td4);
        })

    })
    .catch(error => console.log(error))

}