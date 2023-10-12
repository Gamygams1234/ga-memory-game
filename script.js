const gameScreen = document.getElementById("game-screen");
const panels = document.getElementById("panels");

let numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7];

// this is to suffle any array that comes our way
const shuffleArray = (arr) => arr.sort(() => 0.5 - Math.random());

function startGame() {
  let guesses = [];
  let moves = 0;
  let currentPlayer = 1;
  let playingArray = numbersArray;
  let correctGuesses = 0; 



  //   shuffling the array
  shuffleArray(playingArray);
  //   empty the panels
  panels.innerHTML = "";
  playingArray.forEach((num) => {
    panels.insertAdjacentHTML(
      "beforeend",
      ` <li class="clickable" data-guess="${num}">
      <div class="front" ></div>
      <div class="back" >${num}</div>
    </li>`
    );
  });

  function makeGuess(guess) {
    guesses.push(guess);
    if (guesses.length === 2) {
      moves += 1;
      if (guesses[0] === guesses[1]) {
        document.querySelectorAll("li.clicked").forEach((item) => {
          // this is for the correct guess
          correctGuesses += 1;
          item.classList.add("success");
          item.classList.remove("clicked");
          if (correctGuesses === playingArray.length){
            alert("You win the game!")
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
