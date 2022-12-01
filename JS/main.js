/**
 * Coger elementos del DOM
 */

/* Cogemos el div de intentos */
const cajaIntentos = document.getElementById("intentos");
/* Cogemos el div del Teclado */
const cajaTeclado = document.getElementById("teclado");

/**
 * Es un array donde podremos navegar por él para saber el número de intentos que lleva el usuario 
 * y donde guardaremos las letras que ha utilizado
 */
 const arrayIntentos = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]
/**
 * Coger o crear las variables necesarias
 */
//NumIntento será el intento de palabra y a la vez la fila actual
var numIntento = 0;
var columnaIntento = 0;

//Número de palabra aleatoria
function numeroRandom(length) {
    //Mínimo el número será 0
    let min = 0;
    //Hasta el número que sea que se pase por parámetro
    let max = length;
    return Math.round(Math.random() * (max - min)) + min;
}
/* Hay muchas formas de obtener la palabra aleatoria, desde la API de https://dle.rae.es/data/random, otras APIs, archivos txt, json, etc..*/
/*Creamos la variable 'palabraAleatoria' para que se le asigne el valor de una palabra aleatoria*/
var palabraAleatoria = '';

/* Expresión regular para borrar lineas duplicadas de un archivo ^(.*)(\n\1)+$ --> https://www.w3schools.io/editor/vscode-duplicate-line/ */
fetch("../TXT/05.txt")
   .then(response => response.text())
   .then((response) => {
    let lineas = response.split("\n");
    palabraAleatoria = lineas[numeroRandom(lineas.length)];
    //Saber la palabra
    console.log(palabraAleatoria);
    return palabraAleatoria;
   })
   .catch(err => console.log(err))
/*LECTURA DE ARCHIVO .JSON - Opción 2*/ 
/*Lector de archivo json con las palabras de 5 letras (1251 palabras)*/
/*
//Número de palabra aleatoria
function numeroRandomJson() {
    //Mínimo el número será 0
    let min = 0;
    //Hasta 1250 porque hay 1251 palabras pero empiezan en 0 al haberlas guardado en un objeto, entonces el primer index es 0
    let max = 1250;
    return Math.round(Math.random() * (max - min)) + min;
}
*/
/*
fetch('./JSON/palabras.json')
  .then(response => response.json())
  .then(data => {
    let json = Object.values(data);
    palabraAleatoria = json[numeroRandomJson()];
    //Saber la palabra
    console.log(palabraAleatoria);
  })
  fetch('https://palabras-aleatorias-public-api.herokuapp.com/random')
  .then(response => response.json())
  .then(data => console.log(data));
*/

/* 
* API DRAE para comprobar si la palabra existe: http://dle.rae.es/srv/search?w={word};
* Repositorio github para la utilización de las palabras de la RAE https://github.com/JorgeDuenasLerin/diccionario-espanol-txt
*/

/**
 * Creamos la variable de juego acabado para saber si ha ganado o ha realizado todos los intentos de tipo boolean 
 * 
 * ¿Por qué no crear una variable de victoria / derrota? Por que el juego tiene dos condiciones, 
 * haber usado todos los intentos o haber ganado, aunque haya ganado, puede tener aún intentos y 
 * eso puede generar problemas en el futuro con la condición. Y si victoria es falso puede no haber ganado
 * pero seguir teniendo intentos infinitos hasta que gane, con lo cual, no es una condición válida.
 * Con derrota el problema que ocasiona es que con esa condición y variable no podemos saber cuándo ha ganado,
 * Porque, cuando gana, no sería cuando 'derrota' = falso. Ya que por defecto está en falso al no haber perdido.
 * 
*/
var juegoAcabado = true;
/* Un contador con el número de intentos que posee el usuario */
let intentoNumero = 0;

/* Constante de todas las letras existentes en el alfabeto castellano-español. Ésto me servirá para crear el teclado */
const letras = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'Ñ',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '«',
]

/**
 * Generar el número de intentos y visualizarlos a tiempo real
 */
arrayIntentos.forEach((filaIntentos, filaIntentosNumero) => {
    const divFila = document.createElement('div');
    divFila.setAttribute('id', 'filaIntento-' + filaIntentosNumero);
    divFila.classList.add('filaIntento');
    filaIntentos.forEach((_intento, numeroIntento) => {
        const divIntento = document.createElement('div');
        divIntento.setAttribute('id', 'filaIntento-' + filaIntentosNumero + '-columnaIntentos-' + (numeroIntento+1));
        divIntento.classList.add('cajaIntento');
        divFila.append(divIntento);
    })
    cajaIntentos.append(divFila);
})

/* Contador para saber el número de botones creados, al llegar a 10, se resetea para crear otro div con 10 botones */
var contadorBoton = 0;
/*Por cada letra en el array 'letras', es decir, cada letra del teclado, crearemos un botón */
for (let contadorLetra = 0; contadorLetra < letras.length; contadorLetra++) {
    /*Pero antes crearemos un div por cada 10 letras */
    if (contadorBoton == 0 || contadorBoton / 10 == 1) {
        var divBotonesLetras = document.createElement("div");
        contadorBoton = 0;
    }
    /* Creamos un botón letra */
    const botonLetra = document.createElement("button");
    /* Dicho botón contendrá de texto la letra que sea */
    botonLetra.textContent = letras[contadorLetra];
    /* El id será la letra para luego saber qué letra ha pulsado el usuario y buscarlo por el ID */
    botonLetra.setAttribute('id', letras[contadorLetra]);
    /* Añadimos un evento de click a cada botón, la función anónima devuelve la función recogerClick que tiene como parámetro la letra (que será la del botón) */
    botonLetra.addEventListener('click', () => recogerClick(letras[contadorLetra]));
    /*Añadimos al div todos los botones */
    divBotonesLetras.append(botonLetra);
    /*Y le damos al padre que es la caja del teclado el hijo que sería el div con los 10 botones */
    cajaTeclado.append(divBotonesLetras);
    contadorBoton++;
}

//PARA EL TECLADO
//Añadimos un evento también para que el documento pueda leer la entrada por teclado
document.addEventListener('keydown', (e) => RecogerTecla(e));

// RecogerTecla(evento)
function RecogerTecla(evento) {
        let letra = evento.key.toUpperCase();
        console.log(letra);
         if(letra == "BACKSPACE"){
            borrarLetra();
            //Paramos aquí
            return;
        }
        /*Aquí comprobaremos si ha clickeado en ENTER que será cuando quiera comprobar la palabra*/
        if (letra == "ENTER"){
            /*Utilizaremos una funcion comprobarPalabra para comprobar que la palabra escrita es correta, existe y luego si coincide */
            comprobarPalabra();
            //Paramos aquí
            return;
        }
        /*Este bucle es para que sólo escriba las letras del teclado y no lo haga con las pulsaciones de teclas como CTRL, F12, etc..*/
        letras.forEach(letraDeLetras => {
            if(letraDeLetras == letra){
                addLetra(letra);
            }
        });
        

    //}
}
//FIN DE 'PARA EL TECLADO'

/**
 * recogerClick(letra)
 * 
 */
function recogerClick(letra) {
    //if(!juegoAcabado){
        /**
         * Otra forma de hacerlo: letras.slice(-1) pero devolviendo un objeto aunque siendo mucho más rápido
         * Comprobamos si ha pulsado backspace '«' para borrar una letra escrita
        */
        if(letra == "«"){
            borrarLetra();
            //Paramos aquí
            return;
        }
        /*Aquí comprobaremos si ha clickeado en ENTER que será cuando quiera comprobar la palabra*/
        if (letra == "ENTER"){
            /*Utilizaremos una funcion comprobarPalabra para comprobar que la palabra escrita es correta, existe y luego si coincide */
            comprobarPalabra();
            //Paramos aquí
            return;
        }
        addLetra(letra);

    //}
}
/**
 * addLetra()
 */
function addLetra(letra){/*Me da cosa poner eñes por lo que lo pongo en spanglish*/
    if (columnaIntento < 5 && numIntento < 6) {
        let letraIntento = document.getElementById('filaIntento-' + numIntento + '-columnaIntentos-' + (columnaIntento+1));
        letraIntento.textContent = letra;
        letraIntento.innerHTML = letra;
        arrayIntentos[numIntento][columnaIntento] = letra;
        letraIntento.setAttribute('datos', letra);
        columnaIntento++;
    }
}
function borrarLetra(){
    let letraIntento = document.getElementById('filaIntento-' + numIntento + '-columnaIntentos-' + (columnaIntento));
    //Vaciamos el contenido del div
    letraIntento.textContent = '';
    //Vaciamos el contenido del array que contiene las letras y palabras
    arrayIntentos[numIntento][columnaIntento] = '';
    //Vaciamos el atributo de datos
    letraIntento.setAttribute('datos', '');
    if(columnaIntento > 0){
        //Restamos una columna para situarnos donde debemos
        columnaIntento--;
    }
}
/**
 * Comprobamos si la palabra es correcta
 * @param void
 * @returns cambia la ventana a estadísticas
 */
function comprobarPalabra () {
    var contadorPalabraDetectada = 0;
    let palabraIntento = arrayIntentos[numIntento].join('').toLocaleLowerCase();
    if(columnaIntento > 4){
        fetch("../TXT/05.txt")
        .then(response => response.text())
        .then((response) => {
            let lineas = response.split("\n");
            lineas.forEach(palabra => {
                if(palabra == palabraIntento){
                    contadorPalabraDetectada++;
                    efectos();
                    /*
                    * Juntamos con .join todas las letras de la fila escrita con palabras y 
                    * la comparamos con la palabra aleatoria pasa a mayusculas ya que las letras 
                    * escritas estarán en mayúsculas
                    */
                    if (palabraAleatoria == palabraIntento) {
                        juegoAcabado = true;
                        console.log("Has ganado!");
                        return
                    } else {
                        if(numIntento >= 5){
                            juegoAcabado = false;
                            alert('Game Over');
                            return
                        }
                        if(numIntento < 5){
                            console.log("Palabra intento: "+palabraIntento);
                            console.log("Palabra del bucle: "+palabraIntento);
                            //Sumamos uno a la posición de la fila por lo que bajaremos de fila para escribir
                            numIntento++;
                            //Reseteamos la posición de la columna
                            columnaIntento = 0;
                        }
                    }
                }
            });
            if (contadorPalabraDetectada == 0){
                console.log(contadorPalabraDetectada);
                alert('La palabra no existe');
                return
            }
        })
        .catch(err => console.log(err))
    }
   
}

//Métodos para los colores y efectos

function addColorATecla(letra, color) {
    const tecla = document.getElementById(letra);
    tecla.classList.add(color);
}

function efectos() {
    //Cogemos el nodo de la fila entera
    const filaIntento = document.querySelector('#filaIntento-' + numIntento).childNodes;
    //La palabra la ponermos en mayúsculas para cuando la comparemos
    let compruebaPalabra = palabraAleatoria.toUpperCase();
    //Creamos un array donde guardaremos la palabra entera para ir comprobando letra por letra si coincide
    const palabraIntento = [];

    //Pintamos de negro por defecto
    filaIntento.forEach(cuadro => {
        palabraIntento.push({ letra: cuadro.getAttribute('datos'), color: 'caja-gris-oscuro' });
    });

    //Pintamos de naranja si existe la letra en algún lugar de la palabra aleatoria
    palabraIntento.forEach(palabraIntento => {
        if (compruebaPalabra.includes(palabraIntento.letra)) {
            palabraIntento.color = 'caja-naranja';
            compruebaPalabra = compruebaPalabra.replace(palabraIntento.letra, '');
        }
    });

    //Pintamos de verde si la posicion de la letra coincide con el de la palabra aleatoria
    palabraIntento.forEach((palabraIntento, index) => {
        if (palabraIntento.letra == palabraAleatoria[index].toUpperCase()) {
            palabraIntento.color = 'caja-verde';
            compruebaPalabra = compruebaPalabra.replace(palabraIntento.letra, '');
        }
    });

    filaIntento.forEach((cuadro, index) => {
        setTimeout(() => {
            cuadro.classList.add('girar');
            cuadro.classList.add(palabraIntento[index].color);
            addColorATecla(palabraIntento[index].letra, palabraIntento[index].color);
        }, 500 * index);
    });
}

