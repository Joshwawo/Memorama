//Variables 
let td = 0;
let td1 = null;
let td2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimentos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerIncial = 30;
let tiempoRegresivoId = null;



//Apuntes html
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');
let noti = document.getElementById('hola');
let reset = document.getElementById('reset');
let win = document.getElementById('win');

let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => {
    return Math.random() - 0.5
})
// console.log(numeros)

reset.addEventListener('click', ()=>{
    location.reload();
})

function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;

    }
}


function contarTiempo() {
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;

        if (timer == 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            noti.innerHTML = 'Se Te Acabo el tiempo 😥😥';
            // setTimeout(() => {
            //     // location.reload();
                
            // }, 5000);

        }
    }, 1000);
}

//Funcion main 
function destapart(id) {

    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }

    td++;
    // console.log(td);

    if (td == 1) {
        //Mostrar el primer numero
        td1 = document.getElementById(id);
        primerResultado = numeros[id]
        td1.innerHTML = primerResultado;

        //Deshabilidat el primer boton 
        td1.disabled = true;
    } else if (td == 2) {
        //Mostar el segundo numero
        td2 = document.getElementById(id);
        segundoResultado = numeros[id];
        td2.innerHTML = segundoResultado;

        td2.disabled = true;

        //Incrementar Movimientos
        movimentos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimentos}`;

        if (primerResultado == segundoResultado) {
            //Encerar el contador de tarjetas destapas
            td = 0;
            //Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            if (aciertos == 8) {
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😎`;
                mostrarTiempo.innerHTML = `Felicidades! Solo tardaste ${timerIncial - timer} segundos `
                mostrarMovimientos.innerHTML = `Movimientos: ${movimentos} 😎😯`;
                win.innerHTML = 'Felicidades Ganaste 😲🥳🥳';

            }
        } else {
            //mostar momentanea valores y voler a tapar 
            setTimeout(() => {
                td1.innerHTML = ' ';
                td2.innerHTML = ' ';
                td1.disabled = false;
                td2.disabled = false;
                td = 0;

            }, 800);
        }

    }
}

