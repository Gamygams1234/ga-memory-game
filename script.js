const iconSelections = document.getElementById("icon-selections");
const playerSelections = document.getElementById("player-number-selections");
const gridSelections = document.getElementById("grid-selections");

const gameScreen = document.getElementById("game-screen");
const startGameScreen = document.getElementById("start-game-screen");

const startGameButton = document.getElementById("start-game-btn");
const menuOpenButton = document.getElementById("menu-game-btn");

const singlePlayerFooter = document.getElementById("single-player-footer");
const multiPlayerFooter = document.getElementById("multi-player-footer");

const menuModal = document.getElementById("menu-modal");
const singlePlayerEndScreen = document.getElementById("single-player-end");
const mulitPlayerEndScreen = document.getElementById("multi-player-end");
const singleLoseScreen = document.getElementById("single-player-lose");
const singlePlayerLoseText = document.getElementById("single-player-lose-text");

const playerOneTime = document.getElementById("player-one-time");
const panels = document.getElementById("panels");

// arrays for the options
let gameSelections = {
  numbers: {
    4: [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7],
    6: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  },
  icons: {
    4: ["bolt", "car", "ghost", "wine-glass", "mug-hot", "train", "yin-yang", "snowman", "bolt", "car", "ghost", "wine-glass", "mug-hot", "train", "yin-yang", "snowman"],
    6: ["bolt", "car", "ghost", "wine-glass", "mug-hot", "train", "yin-yang", "snowman", "bolt", "car", "ghost", "wine-glass", "mug-hot", "train", "yin-yang", "snowman", "thumbtack", "tag", "anchor", "phone", "star", "music", "bomb", "book", "thumbtack", "tag", "anchor", "phone", "star", "music", "bomb", "book", "fish", "fish", "bug", "bug"],
  },
};

function shuffleArray(arr) {
  arr.sort(() => 0.5 - Math.random());
}

let gameDetails = {
  theme: "numbers",
  players: 1,
  gridSize: 4,
};

let currentPlayers = [];

class Player {
  constructor(player) {
    this.player = player;
    this.score = 0;
  }
}

// this will track the two guesses
let guesses = [];
let currentPlayer = 1;
let moves = 0;
let totalPoints = 0;

// we are adding event listeners to the start of the event
playerSelections?.addEventListener("click", (e) => {
  if (e.target.classList.contains("player-btn")) {
    document.querySelector(".player-btn.selected")?.classList.remove("selected");
    e.target.classList.add("selected");
  }
  gameDetails.players = parseInt(e.target.dataset.selection);
});
iconSelections?.addEventListener("click", (e) => {
  if (e.target.classList.contains("icon-btn")) {
    document.querySelector(".icon-btn.selected")?.classList.remove("selected");
    e.target.classList.add("selected");
  }
  gameDetails.theme = e.target.dataset.selection;
});
gridSelections?.addEventListener("click", (e) => {
  if (e.target.classList.contains("grid-btn")) {
    document.querySelector(".grid-btn.selected")?.classList.remove("selected");
    e.target.classList.add("selected");
  }
  gameDetails.gridSize = parseInt(e.target.dataset.selection);
});

// this is for the start of the game
function startGame() {
  // any dom variables at the top
  const restartButtons = document.querySelectorAll(".restart-btn");
  const newGameButtons = document.querySelectorAll(".new-game-btn");
  const resumeGameButtons = document.querySelectorAll(".resume-game-btn");

  moves = 0;
  totalPoints = 0;
  guesses = [];
  currentPlayer = 1;
  let seconds = 0;
  let gridSize = gameDetails.gridSize;
  let gameArray = gameSelections[gameDetails.theme][gameDetails.gridSize];
  let theme = gameDetails.theme;
  let win = false;

  // making a function to add seconds
  function addSeconds() {
    seconds += 1;
    const result = new Date(seconds * 1000).toISOString().slice(14, 19);
    playerOneTime.innerHTML = result;
  }

  // event listeners for the modal and the game functionality

  currentPlayers.length = 0;
  for (let i = 0; i < gameDetails.players; i++) {
    currentPlayers.push(new Player(i + 1));
  }
  // adding the interval timer for single player mode
  if (currentPlayers.length === 1) {
    // adding the interval timer whern the players are only one
    var timerInterval = setInterval(addSeconds, 1000);
    // making the score to 0 when the game has restarted and there is only one player
    playerOneTime.innerHTML = new Date(seconds * 1000).toISOString().slice(14, 19);
    document.getElementById("player-one-moves-score").innerHTML = "0";
  } else {
    let footer = document.getElementById("multi-player-footer");
    footer.innerHTML = "";
    currentPlayers.forEach((player) => {
      let html = `<div class="multi-player-stat" id ="player-${player.player}">
      <div class="multi-player-stat-key mobile">P&nbsp;<span class="player">${player.player}</span> </div>
      <div class="multi-player-stat-key desktop">Player&nbsp;<span class="player">${player.player}</span> </div>
      <div class="multi-player-stat-value" id="player-${player.player}-score">0</div>
    </div>`;
      footer.insertAdjacentHTML("beforeend", html);
    });
    document.getElementById("player-1").classList.add("active");
  }

  shuffleArray(gameArray);

  panels.innerHTML = "";

  // checking what type of grid we have to start
  if (gridSize === 6) {
    if (!panels.classList.contains("six-panels")) {
      panels.classList.add("six-panels");
    }
  } else {
    if (panels.classList.contains("six-panels")) {
      panels.classList.remove("six-panels");
    }
  }

  menuOpenButton.addEventListener("click", (e) => {
    menuModal.style.display = "flex";
    clearInterval(timerInterval);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) {
      menuModal.style.display = "none";
    }
  });

  // populating the gridboard and adding the event listeners
  if (theme === "numbers") {
    gameArray.forEach((num, index) => {
      document.getElementById("panels").insertAdjacentHTML(
        "beforeend",
        `<li class="clickable" data-guess="${index}">
      <div class="front" ></div>
      <div class="back" >${num}</div>
    </li>`
      );
    });
  } else {
    gameArray.forEach((item, index) => {
      document.getElementById("panels").insertAdjacentHTML(
        "beforeend",
        ` <li class="clickable" data-guess="${index}">
      <div class="front" ></div>
      <div class="back" ><i class="fa-solid fas fa fa-thin fa-sharp fa-brands fa-light far fa-${item}"></i></div>
    </li>`
      );
    });
  }

  document.querySelectorAll(".clickable").forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.parentElement.classList.contains("clickable")) {
        e.target.parentElement.classList.toggle("clickable");
        e.target.parentElement.classList.add("clicked", "active");
        makeGuess(gameArray[e.target.parentElement.dataset.guess]);
        // this is the end of the game

        if (totalPoints === gameArray.length / 2) {
          clearInterval(timerInterval);
          // end Modal this is where the magic will happen
          if (currentPlayers.length === 1) {
            singlePlayerEndScreen.style.display = "flex";
            document.getElementById("one-player-time-result").innerHTML = new Date(seconds * 1000).toISOString().slice(14, 19);
            document.getElementById("one-player-moves-result").innerHTML = moves;
            win = true;
          } else {
            document.getElementById("multi-player-end").style.display = "flex";
            document.getElementById("multi-player-result").innerHTML = "";

            let maxScore = Math.max(
              ...currentPlayers.map((item) => {
                return item.score;
              })
            );

            let sortedPlayers = currentPlayers.sort(function (a, b) {
              return b.score - a.score;
            });

            let winners = sortedPlayers.filter((item) => {
              return item.score === maxScore;
            });

            if (winners.length === 1) {
              document.getElementById("multi-player-result-text").innerHTML = `Player ${winners[0].player} Wins!`;
            } else {
              document.getElementById("multi-player-result-text").innerHTML = `It's a tie!`;
            }

            sortedPlayers.forEach((item) => {
              if (item.score === maxScore) {
                document.getElementById("multi-player-result").insertAdjacentHTML(
                  "beforeend",
                  `<div class="item winner">
                <div class="label">Player ${item.player} (Winner)</div>
                <div class="result-data"><span >${item.score}</span>&nbsp;Moves</div>
              </div>`
                );
              } else {
                document.getElementById("multi-player-result").insertAdjacentHTML(
                  "beforeend",
                  `<div class="item">
                <div class="label">Player ${item.player}</div>
                <div class="result-data"><span >${item.score}</span>&nbsp;Moves</div>
              </div>`
                );
              }
            });
          }
        }
        if (currentPlayers.length === 1 && win === false) {
          if (moves >= 30 && gridSize === 4) {
            singleLoseScreen.style.display = "flex";
            singlePlayerLoseText.innerHTML = `You exceeded 30 moves for a 4x4 grid!`;
            clearInterval(timerInterval);
          } else if (moves >= 60 && gridSize === 6) {
            singleLoseScreen.style.display = "flex";
            singlePlayerLoseText.innerHTML = `You exceeded 60 moves for a 6x6 grid!`;
            clearInterval(timerInterval);
          }
        }
      }
    });
  });

  newGameButtons.forEach((item) => {
    item.addEventListener("click", (e) => {
      startGameScreen.style.display = "flex";
      gameScreen.style.display = "none";
      multiPlayerFooter.style.display = "none";
      singlePlayerFooter.style.display = "none";
      menuModal.style.display = "none";
      singlePlayerEndScreen.style.display = "none";
      mulitPlayerEndScreen.style.display = "none";
      singleLoseScreen.style.display = "none";
      clearInterval(timerInterval);
      backToHome();
    });
  });
  resumeGameButtons.forEach((item) => {
    item.addEventListener("click", (e) => {
      menuModal.style.display = "none";
      singlePlayerEndScreen.style.display = "none";
      mulitPlayerEndScreen.style.display = "none";
      singleLoseScreen.style.display = "none";
      timerInterval = setInterval(addSeconds, 1000);
    });
  });
  restartButtons.forEach((item) => {
    item.addEventListener("click", (e) => {
      menuModal.style.display = "none";
      singlePlayerEndScreen.style.display = "none";
      mulitPlayerEndScreen.style.display = "none";
      singleLoseScreen.style.display = "none";
      clearInterval(timerInterval);
      restartGame();
    });
  });

  // this is placing the footers and

  if (currentPlayers.length > 1) {
    multiPlayerFooter.style.display = "flex";
  } else {
    singlePlayerFooter.style.display = "flex";
  }
} // end of start game

// this is the function that handles the guesses
function makeGuess(num) {
  guesses.push(num);
  if (guesses.length === 2) {
    moves += 1;
    if (currentPlayers.length === 1) {
      document.getElementById("player-one-moves-score").innerHTML = moves;
    }

    if (guesses[0] === guesses[1]) {
      document.querySelectorAll("li.clicked").forEach((item) => {
        item.classList.add("success");
        item.classList.remove("clicked");
      });
      totalPoints += 1;
      currentPlayers[currentPlayer - 1].score += 1;

      if (currentPlayers.length > 1) {
        // using the backticks to find the actual players score
        document.getElementById(`player-${currentPlayer}-score`).innerHTML = currentPlayers[currentPlayer - 1].score;
      }
    } else {
      // this is the magic for the wrong ans
      document.querySelectorAll("li.clicked").forEach((item) => {
        item.classList.add("wrong");
        setTimeout(() => {
          item.classList.remove("active");
          item.classList.remove("wrong");
          item.classList.remove("clicked");
          item.classList.add("clickable");
        }, 500);
      });
      if (currentPlayer + 1 > currentPlayers.length) {
        currentPlayer = 1;
      } else {
        currentPlayer += 1;
      }
      if (currentPlayers.length > 1) {
        document.querySelectorAll(".multi-player-stat").forEach((item) => {
          item.classList.remove("active");
        });
        document.querySelectorAll(".multi-player-stat")[currentPlayer - 1].classList.add("active");
      }
    }
    guesses.length = 0;
  }
}

// restrart game happens when we go back to the home screen

function backToHome() {
  currentPlayers.length = 0;
}
function restartGame() {
  currentPlayers.length = 0;
  startGame();
}

startGameButton.addEventListener("click", (e) => {
  startGameScreen.style.display = "none";
  gameScreen.style.display = "flex";
  startGame();
});
