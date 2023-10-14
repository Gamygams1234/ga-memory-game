const gameScreen = document.getElementById("game-screen");
const panels = document.getElementById("panels");

const playerOneTime = document.getElementById("player-one-time")
const playerOneMovesScore = document.getElementById("player-one-moves-score")

// screens for the end of game

const endScreen = document.getElementById("end-screen")
const singleEndScreen = document.getElementById("single-player-end")
const singleLoseScreen = document.getElementById("single-player-lose")


let gameDetails = {
  theme: "numbers",
  players: 1,
  gridSize: 4,
};

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


// this is to suffle any array that comes our way
const shuffleArray = (arr) => arr.sort(() => 0.5 - Math.random());

function startGame() {
  let guesses = [];
  let moves = 0;
  let currentPlayer = 1;
  let playingArray = gameSelections[gameDetails.theme][gameDetails.gridSize];
  let correctGuesses = 0; 
  let seconds = 0;


  function addSeconds() {
    seconds += 1;
    const result = new Date(seconds * 1000).toISOString().slice(14, 19);
    playerOneTime.innerHTML = result;
  }


  //   shuffling the array
  shuffleArray(playingArray);
// adding the interval timer
  var timerInterval = setInterval(addSeconds, 1000);
  //   empty the panels
  panels.innerHTML = "";
  playingArray.forEach((num, index) => {
    panels.insertAdjacentHTML(
      "beforeend",
      ` <li class="clickable" data-guess="${index}">
      <div class="front" ></div>
      <div class="back" >${num}</div>
    </li>`
    );
  });

  function makeGuess(guess) {
    guesses.push(playingArray[guess]);
    if (guesses.length === 2) {
      moves += 1;
      playerOneMovesScore.innerHTML = moves;
      if (guesses[0] === guesses[1]) {
        document.querySelectorAll("li.clicked").forEach((item) => {
          // this is for the correct guess
          correctGuesses += 1;
          item.classList.add("success");
          item.classList.remove("clicked");
          if (correctGuesses === playingArray.length){
            endScreen.style.display = "block"
            singleEndScreen.style.display = "flex"
            clearInterval(timerInterval)
          }
        });
      } else {
        document.querySelectorAll("li.clicked").forEach((item) => {
          // this is for the wrong guess
          item.classList.add("wrong");
          setTimeout(function () {
            item.classList.remove("active");
            item.classList.remove("wrong");
            item.classList.remove("clicked");
            item.classList.add("clickable");
          }, 500);
        });
      }
      guesses.length = 0;

      if (moves >=30){
        endScreen.style.display = "block"
        singleLoseScreen.style.display = "flex"

      }
    }
  }
  document.querySelectorAll(".clickable").forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.parentElement.classList.contains("clickable")) {
        e.target.parentElement.classList.toggle("clickable");
        e.target.parentElement.classList.add("clicked", "active");
        makeGuess(e.target.parentElement.dataset.guess);
      }
    });
  });
}

startGame();
