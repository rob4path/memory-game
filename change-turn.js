document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");
  const resultDisplayPlayer1 = document.querySelector("#resultPlayer1");
  const resultDisplayPlayer2 = document.querySelector("#resultPlayer2");
  const congrats = document.getElementById("congrats");
  const congratsOne = document.getElementById("congratsOne");
});


function changeTurnPlayerOne() {
    let playerOneNameInput = document.getElementById("playerOneNameInput").value;

    playerTurn = "playerOne";
    document.getElementById("playerTurn").innerText =
      `${playerOneNameInput}, it's your turn!`;

    document.getElementById("playerTurn").style.color = "yellow";
  }
  function changeTurnPlayerTwo() {
    let playerTwoNameInput = document.getElementById("playerTwoNameInput").value;

    playerTurn = "playerTwo";
    document.getElementById("playerTurn").innerText =
      `${playerTwoNameInput}, it's your turn!`;

    document.getElementById("playerTurn").style.color = "green";
  }
  function changeTurn() {
    if (cardsFlipped === 2) {
      if (playerTurn === "playerOne") {
        changeTurnPlayerTwo()
      } else {
        changeTurnPlayerOne()
      }

    }
  }



  function playersName() {
    let playerOneNameInput = document.getElementById("playerOneNameInput").value;
    let playerTwoNameInput = document.getElementById("playerTwoNameInput").value;
    let playerOneName = document.getElementById("playerOneName");
    let TwoPlayerOneName = document.getElementById("TwoPlayerOneName");
    let TwoPlayerTwoName = document.getElementById("TwoPlayerTwoName");

    playerOneName.innerHTML = playerOneNameInput;
    TwoPlayerOneName.innerHTML = playerOneNameInput;

    TwoPlayerTwoName.innerHTML = playerTwoNameInput;
  }