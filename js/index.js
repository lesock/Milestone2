let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compturn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector("#feedback-box");
const keyRed = document.querySelector("#key__red");
const keyRedLight = document.querySelector("#one")
const keyGreen = document.querySelector("#key__green");
const keyGreenLight = document.querySelector("#two")
const keyYellow = document.querySelector("#key__yellow");
const keyYellowLight = document.querySelector("#three")
const keyWhite = document.querySelector("#key__white");
const keyWhiteLight = document.querySelector("#four")
const gameDifficulty = document.querySelector("#difficulty-switch");
const powerButton = document.querySelector("#click");
const startButton = document.querySelector("#start-button__box");

gameDifficulty.addEventListener('click', (event) => {
  if (gameDifficulty.checked == true && powerButton.checked == true) {
    strict = true;
    turnCounter.innerHTML = "B";
    clearColor();
    clearInterval(intervalId);
  } else if (gameDifficulty.checked == false && powerButton.checked == true) {
    strict = false;
    turnCounter.innerHTML = "A";
    clearColor();
    clearInterval(intervalId);
    
  }
});

powerButton.addEventListener('click', (event) => {
  if (powerButton.checked == true) {
    on = true;
    turnCounter.innerHTML = "------";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
    
  }
});

startButton.addEventListener ('click', (event) => {
    if (on || win) {
    play();
  }
});

function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;
  for (var i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;

  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  on = false;

  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }

  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
}

function one() {
  if (noise) {
    let audio = document.getElementById("bass").play();
  }
  noise = true;
  keyRedLight.style.backgroundColor = "white";
}

function two() {
  if (noise) {
    let audio = document.getElementById("snare").play();
  }
  noise = true;
  keyGreenLight.style.backgroundColor = "white";
}

function three() {
  if (noise) {
    let audio = document.getElementById("cymbal").play();
  }
  noise = true;
  keyYellowLight.style.backgroundColor = "white";
}

function four() {
  if (noise) {
    let audio = document.getElementById("maracas").play();
  }
  noise = true;
  keyWhiteLight.style.backgroundColor = "white";
}

function clearColor() {
  keyRedLight.style.backgroundColor = "black";
  keyGreenLight.style.backgroundColor = "black";
  keyYellowLight.style.backgroundColor= "black";
  keyWhiteLight.style.backgroundColor= "black";
}

function flashColor() {
  keyRedLight.style.backgroundColor = "white";
  keyGreenLight.style.backgroundColor = "white";
  keyYellowLight.style.backgroundColor= "white";
  keyWhiteLight.style.backgroundColor = "white";
}

keyRed.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

keyGreen.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

keyYellow.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

keyWhite.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  if (playerOrder.length == 3 && good) {
    winGame();
  }

  if (good == false) {
    flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();

      if (strict) {
        play();
      } else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);

    noise = false;
  }

  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }

}

function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
}


