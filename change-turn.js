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

  function onePlayer() {
    clearBoard();
    clearScore();
    cardsWonPlayer1 = cardsWon;
    cardsWonPlayer2 = cardsWon;
    resultDisplay.style.display = "contents";
    resultDisplayPlayer1.style.display = "none";
    resultDisplayPlayer2.style.display = "none";
    twoPlayersScore.style.display = "none";
    onePlayerScore.style.display = "contents";
    congrats.innerHTML = " ";
    congratsOne.innerHTML = " ";

  }

  function twoPlayers() {
    clearBoard();
    clearScore();
    resultDisplay.style.display = "none";
    resultDisplayPlayer1.style.display = "contents";
    resultDisplayPlayer2.style.display = "contents";
    twoPlayersScore.style.display = "contents";
    onePlayerScore.style.display = "none";
    congrats.innerHTML = " ";
    congratsOne.innerHTML = " ";
  }
