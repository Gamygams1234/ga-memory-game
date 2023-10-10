const gameScreen = document.getElementById("game-screen");
const panels = document.getElementById("panels");

let numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7];

// this is to suffle any array that comes our way
const shuffleArray = (arr) => arr.sort(() => 0.5 - Math.random());

function startGame() {
  let guesses = [];
  let moves = 0;

//   shuffling the array
  shuffleArray(numbersArray);
//   empty the panels
  panels.innerHTML = "";
  numbersArray.forEach((num) => {
    panels.insertAdjacentHTML(
      "beforeend",
      ` <li class="clickable" data-guess="${num}">
      <div class="front" ></div>
      <div class="back" >${num}</div>
    </li>`
    );
  });

  document.querySelectorAll(".clickable").forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.parentElement.classList.contains("clickable")) {
        e.target.parentElement.classList.toggle("active");
        console.log(item)
      }
    });
  });
}

startGame();
