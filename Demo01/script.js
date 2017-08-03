window.onload = function(){

var guess = document.querySelector('.guess');
var lastResult = document.querySelector('.lastResult');
var lowOrHi = document.querySelector('.lowOrHi');
var guessField = document.getElementById('guessField');
var guessSubmit = document.querySelector('.guessSubmit');

var randomNumber = Math.floor(Math.random()*100) + 1;
var guessCount = 1;
var resetButton;

guessField.focus();

function checkGuess(){
    var userGuess = Number(guessField.value);

    if(guessCount === 1){
        guess.textContent = "之前你猜测的数字：";
    }
    guess.textContent += userGuess + " ";

    if(userGuess === randomNumber){
        lastResult.textContent = "恭喜你，猜对了";
        lastResult.style.background = 'green';
        lowOrHi.textContent = " ";
        setGameOver();
    } else {
        lastResult.textContent = "你猜错了";
        lastResult.style.background = 'red';
        if(userGuess < randomNumber) {
            lowOrHi.textContent = "你猜的数字比目标数字要小！";
        } else if(userGuess > randomNumber) {
            lowOrHi.textContent = '你猜的数字比目标数字要大！';
        }
    }
    guessCount++;
    guessField.value = "";
    guessField.focus();

}

guessSubmit.addEventListener('click',checkGuess);

function setGameOver(){
    guessField.disabled = true;
    guessSubmit.disabled = true;

    resetButton = document.createElement('button');
    resetButton.textContent = '重新开始';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click',resetGame);
}

function resetGame(){
    guessCount = 1;
    var resetParas = document.querySelectorAll('.resultParas p');
    for(var i=0; i<resetParas.length; i++){
        resetParas[i].textContent = "";
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guess.guessField = "";
    guessField.focus();

    lastResult.style.background = 'white';
    randomNumber = Math.floor(Math.random()*100) +1;
}


}