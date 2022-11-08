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

let numIntento = 0;
let columnaActualIntento = 0;

/**
 * Coger o crear las variables necesarias
 */

/*Número de palabra aleatoria*/
function numeroRandom() {
    /*Mínimo el número será 0 */
    let min = 0;
    /*Hasta 1250 porque hay 1251 palabras pero empiezan en 0 al haberlas guardado en un objeto, entonces el primer index es 0*/
    let max = 1250;
    return Math.round(Math.random() * (max - min)) + min;
}
/* Hay muchas formas de obtener la palabra aleatoria, desde la API de https://dle.rae.es/data/random, otras APIs, archivos txt, json, etc..*/
/*Creamos la variable 'palabraAleatoria' para que se le asigne el valor de una palabra aleatoria*/
var palabraAleatoria = '';
/*Lector de archivo json con las palabras de 5 letras (1251 palabras)*/
fetch('./JSON/palabras.json')
  .then(response => response.json())
  .then(data => {
    let json = Object.values(data);
    palabraAleatoria = json[numeroRandom()];
    /*Saber la palabra*/
    console.log(palabraAleatoria);
  })

  
/* API DRAE para comprobar si la palabra existe: http://dle.rae.es/srv/search?w={word};*/


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
        divIntento.setAttribute('id', 'filaIntento-' + filaIntentosNumero + '-letra-' + (numeroIntento+1));
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

/**
 * recogerClick(letra)
 * 
 */
function recogerClick(letra) {
    if(!juegoAcabado){
        /**
         * Otra forma de hacerlo: letras.slice(-1) pero devolviendo un objeto aunque siendo mucho más rápido
         * Comprobamos si ha pulsado backspace '«' para borrar una letra escrita
        */
        if(letra == letras(letras.length - 1)){
            borrarLetra();
            return;
        }
        /*Aquí comprobaremos si ha clickeado en ENTER que será cuando quiera comprobar la palabra*/
        if (letra == "ENTER"){
            /*Utilizaremos una funcion comprobarPalabra para comprobar que la palabra escrita es correta, existe y luego si coincide */
            comprobarPalabra();
            return;
        }
        addLetra(letra);

    }
}
/**
 * addLetra()
 */
function addLetra(letra){/*Me da cosa poner eñes por lo que lo pongo en spanglish*/
    if (columnaActualIntento < 5 && numIntento < 6) {

        /*
        const tile = document.getElementById('filaIntentos-' + numIntento + '-tile-' + currentTile)
        tile.textContent = letter
        arrayIntentos[numIntento][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
        */
    }
}
function borrarLetra(){
    if(columnaActualIntento < 5){
        columnaActualIntento--;

    }
    /*
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('filaIntentos-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        arrayIntentos[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
    */
}
/**
 * Comprobamos si la palabra es correcta
 * @param void
 * @returns cambia la ventana a estadísticas
 */
function comprobarPalabra(){
    if(arrayIntentos[filaIntentos] == palabraAleatoria){
        juegoAcabado = true;

        location.href = "HTML/stats.html";
    }
}

