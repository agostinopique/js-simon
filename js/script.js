/* 
**Descrizione:**
Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 5 secondi.
Dopo 5 secondi l’utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

    1. Aggiungere un event listener per far partire il gioco al click del bottone;
    2. Creare una timing function (setInterval) per la visualizzazioe dei numeri;
    2 bis. Creare e appendee i cubi con i numeri generati randomicamente all'interno del contenitore;
    3. Scaduto il tempo, rimuovere il testo all'interno dei cubi;
    4. Triggerare i prompt per la richiesta dei numeri all'utente;
    5. Verificare i numeri inseriti dall'utente con i numeri estratti in questa partita;
    6. Mostrare le casistiche di vittoria o perdita;
 */

let time = 5;

let simonNumbers = [];

let guessedNumbers = [];

document.getElementById('playBtn').addEventListener('click', play);

const results = document.getElementById('results');

// const countDown = setInterval(simonTimer, 1000);

function play() {
    this.innerHTML = 'RESET';

    const section = document.querySelector('div.container');

    section.innerHTML = '';

    simonNumbers = [];

    guessedNumbers = [];

    for(let i = 0; i < 5; i++){
        
        section.append(cellGenerator());
        
    }

    const timer = setInterval(function(){
        console.log(time--);
        if(time < 0){
            clearInterval(timer);
            section.innerHTML = '';
            console.log('FINE');
            time = 5;
            indovinaNumeri();
        }
    }, 1000)

}

function cellGenerator(){
    const sq = document.createElement('div');

    sq.className = 'cell';
    sq.classList.add('border', 'border-white');

    let randomNum = randomNumber(1, 10);

    sq.innerText = randomNum;


    if(simonNumbers.includes(randomNum)){

        let flag = false;
    
        while (!flag) {
            randomNum = randomNumber(1, 10);
            if(!simonNumbers.includes(randomNum)){
                flag = true;
                simonNumbers.push(randomNum);
            }
        }
    } else {
        simonNumbers.push(randomNum);
    }

    console.log('Estratti', simonNumbers);
    return sq;

}

/**
 * 
 * @param {number} min 
 * @param {number} max 
 */
function randomNumber(min, max){

    return Math.floor(Math.random() * (max - min + 1) + min)

}

function indovinaNumeri(){


    for(let i = 0; i < 5; i++){
        let tentativo = parseInt(prompt(`Indovina ${5 - i} numeri!`));
            
        guessedNumbers.push(tentativo);
        console.log('Utente', guessedNumbers);
    } 

    checkNumbers();

}


function checkNumbers(){
    let indovinati = 0;
    let correctNumbers = [];

    for(let i = 0; i < guessedNumbers.length; i++){
        if(simonNumbers.includes(guessedNumbers[i]) ){
            indovinati++;
            correctNumbers.push(guessedNumbers[i]);
        }
    }
    console.log(correctNumbers);

    results.innerText = `Hai indovinato ${indovinati} numeri! ${correctNumbers.length}`;

    return correctNumbers;
}


