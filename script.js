let fields = [];
let gameOver = false;
let currentShape = 'cross';

let Audio_cross = new Audio('audio/beep2.mp3');
let Audio_circle = new Audio('audio/shortTone3.mp3');
let Audio_win = new Audio('audio/win.mp3');
let Audio_restart = new Audio('audio/newgame.mp3');
let Audio_lose = new Audio('audio/loose.mp3');


function fillShape(id) {
    if (!fields[id] && !gameOver)  //Wenn das Feld nicht gefüllt ist und Wenn wir nicht gameOver haben
    {
        if (currentShape == 'cross') {
            currentShape = 'circle';
            document.getElementById('player-1').classList.remove('player-inactive');
            document.getElementById('player-2').classList.add('player-inactive');
            Audio_circle.play();
        } else {
            currentShape = 'cross';
            document.getElementById('player-2').classList.remove('player-inactive');
            document.getElementById('player-1').classList.add('player-inactive');
            Audio_cross.play();
        }

        fields[id] = currentShape; //Array wird hier mit den Strings gefüllt
        console.log(fields);
        draw();
        checkForWin();
    }

}


function draw() {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i] == 'circle') {
            document.getElementById(`circle-${i}`).classList.remove('d-none');

        }

        if (fields[i] == 'cross') {
            document.getElementById('cross-' + i).classList.remove('d-none');
        }
    }
}


function checkForWin() {
    let winner;

    /*Auswerten : 'circle' =='circle' //true
                    'circle' == 'cross' //false */
    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-1').style.transform = 'scaleX(1)';
        document.getElementById('line-1').classList.remove('d-none');
    }

    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
        document.getElementById('line-2').style.transform = 'scaleX(1)';
        document.getElementById('line-2').classList.remove('d-none');
    }

    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        winner = fields[6];
        document.getElementById('line-3').style.transform = 'scaleX(1)';
        document.getElementById('line-3').classList.remove('d-none');
    }

    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-4').style = 'top: 198px';
        document.getElementById('line-4').style.transform = 'translateX(-138px) rotate(90deg) scaleX(1)';
        document.getElementById('line-4').classList.remove('d-none');
    }

    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
        document.getElementById('line-5').style.transform = 'rotate(90deg) scaleX(1)';
        document.getElementById('line-5').classList.remove('d-none');
    }

    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-6').style = 'top: 198px';
        document.getElementById('line-6').style.transform = 'translateX(138px) rotate(90deg) scaleX(1)';
        document.getElementById('line-6').classList.remove('d-none');
    }

    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-7').style.transform = 'rotate(45deg) scaleX(1)';
        document.getElementById('line-7').classList.remove('d-none');
    }

    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-8').style.transform = 'rotate(-45deg) scaleX(1)';
        document.getElementById('line-8').classList.remove('d-none');
    }

    if (winner) {
        console.log('gewonnen', winner);
        gameOver = true; //Beim Gewinnen Gameover=true
        console.log(gameOver);
        //countArrayIndex = 0;
        setTimeout(function () {
            Audio_win.play();
        }, 500);

        setTimeout(function () {
            document.getElementById('gameOver').classList.remove('d-none'); //GameOver Img Anzeige wird um 1,2 Sek verzögert aufgerufen
            document.getElementById('restart-btn').classList.remove('d-none');
            document.getElementById('showWinner').classList.remove('d-none');
            document.getElementById('showWinner').innerHTML = '';
            if (winner == 'cross') {
                document.getElementById('showWinner').innerHTML += 'The Winner is Player2/' + winner + ' -- good Game!';
            } else {
                document.getElementById('showWinner').innerHTML += 'The Winner is Player1/' + winner + ' -- good Game!';
            }
        }, 1200); //Zeit verzögert aufgerufen
    }

    //Fall für Remi Wenn Keiner gewonnen hat
    if ((fields[0] && fields[1] && fields[2] && fields[3] && fields[4] && fields[5]
        && fields[6] && fields[7] && fields[8] &&fields[9] != '') && !gameOver) 
    {   
        gameOver = true; //Beim Remi auch Gameover=true
        console.log(gameOver);
        Audio_lose.play();
        setTimeout(function(){ //Lininen und die X-O löschen
            for (let i = 1; i < 9; i++) {
                document.getElementById('line-' + i).classList.add('d-none');
            }
        
            for (let i = 0; i < 9; i++) {
                document.getElementById('circle-' + i).classList.add('d-none');
                document.getElementById('cross-' + i).classList.add('d-none');
            }
        },1500)
        setTimeout(function(){
            document.getElementById('restart-btn').classList.remove('d-none');
            document.getElementById('noWinner').classList.remove('d-none');
            document.getElementById('showWinner').classList.remove('d-none');
            document.getElementById('showWinner').innerHTML = '';
            document.getElementById('showWinner').innerHTML = 'No Player is winning';
        },500)
    }

}

function restart() {
    gameOver = false;
    fields = [];
    Audio_restart.play();
    document.getElementById('gameOver').classList.add('d-none');
    document.getElementById('restart-btn').classList.add('d-none');
    document.getElementById('showWinner').classList.add('d-none');
    for (let i = 1; i < 9; i++) {
        document.getElementById('line-' + i).classList.add('d-none');
    }

    for (let i = 0; i < 9; i++) {
        document.getElementById('circle-' + i).classList.add('d-none');
        document.getElementById('cross-' + i).classList.add('d-none');
    }
    document.getElementById('noWinner').classList.add('d-none');
}

