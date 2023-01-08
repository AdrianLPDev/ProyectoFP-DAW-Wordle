const urlBase = 'http://localhost/Proyecto/API/'
var tbody = document.getElementById("tbody");
recogerStats();

async function recogerStats(){
    var arrayStats = [];
    await axios.post(`${urlBase}ranking.php`)
    .then(respuesta => {
        //console.log(respuesta.data);//PRUEBAS
        arrayStats = respuesta.data;
        arrayStats.forEach((obj) => {
            //console.log(obj);//PRUEBAS
            let rank = obj.ranking;
            let usuario = obj.usuario;
            let victorias = obj.victorias;
            let intentos = obj.intentos;
            //Creamos la tabla
            const tr = document.createElement('tr');
            tbody.append(tr);
            let td1 = document.createElement('td');
            //Ranking
            let td2 = document.createElement('td');
            td2.textContent = rank;
            tr.append(td2);
            //Usuario
            td1.textContent = usuario;
            tr.append(td1);
            //Victorias
            let td3 = document.createElement('td');
            td3.textContent = victorias;
            tr.append(td3);
            //Intentos
            let td4 = document.createElement('td');
            td4.textContent = intentos;
            tr.append(td4);
        })

    })
    .catch(error => console.log(error))

}