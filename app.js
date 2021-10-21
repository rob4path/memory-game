document.addEventListener("DOMContentLoaded", () => {
  registerState()
  showCardArrayVerses(cardArrayTest)
  // VARIABLES

  // ON CLICK BUTTONS
  $("#signOutBTN").click(signOut)
  $("#login").click(login)
  $("#register").click(register)

  $("#play").click(play)
  $("#onePlayer").click(onePlayer)
  $("#twoPlayers").click(twoPlayers)
  $("#chooseFast").click(chooseFast)
  $("#chooseProverbs").click(chooseProverbs)
  $("#chooseMore").click(chooseMore)
  $("#refreshBtn").click(refresh)
  $("#continueBtn").click(continueGame)
  $("#addVerseBtn").click(function () { addVerse('createInput') })
  $("#pushVerseBtn").click(pushVerses)

  $("#game-info").css("display", "none")
  $("#refreshContinueBtn").css("display", "none");
  $("#home").css("display", "none")
  $("#pushVerseBtn").css("display", "none")
  $("#selectBox").change(changeSet)

  $("#onePlayer").addClass("chooseSetActive")
  // $(".menu").show();

  // HIDE-SHOW TOGGLE MENU


  $("#home").click(home)

  function home() {
    $("#menu").show(200)
    $("#auth").hide(200);
    $("#playersName").hide(200);
    $("#playersModeBtn").hide(200);
    $("#chooseSetBtn").hide(200);
    $("#addVerseDiv").hide(200);
    $("#game-info").hide(200);
    $("#grid").hide(200);
    $("#refreshContinueBtn").hide(200);
    $("#home").hide(200);
    $("#loginBTN").show(200);

    $("#play").show(200);
    $("#settings").show(200)
    $("#addVerseMenu").show(200);

  };

  $("#auth").css("display", "none")
  $("#loginBTN").click(function () {
    $("#auth").toggle(200);

    $("#play").hide(200);
    // $("#playersNameInputMenu").hide(200);
    // $("#playersModeMenu").hide(200);
    // $("#chooseSetMenu").hide(200);
    $("#addVerseMenu").hide(200);

    $("#home").show(1000)
  });

  $("#playersName").css("display", "none")
  $("#playersModeBtn").css("display", "none")
  $("#chooseSetBtn").css("display", "none")

  $("#settings").click(settings)

  function settings() {
    $("#playersName").show(200);
    $("#playersModeBtn").show(200);
    $("#chooseSetBtn").show(200);
    $("#play").hide(200);
    $("#addVerseMenu").hide(200);
    $("#loginBTN").hide(200)
    $("#auth").hide(200);
    $("#settings").hide(200)
    $("#home").show(500)

  };


  $("#playersModeMenu").click(function () {

  });

  $("#chooseSetMenu").click(function () {
  });

  $("#addVerseDiv").css("display", "none")
  $("#addVerseMenu").click(function () {
    $("#addVerseDiv").toggle(200);

  });

  const playersModeBtn = document.getElementById("playersModeBtn");
  playersModeBtn.style.display = "none";
  const chooseSetBtn = document.getElementById("chooseSetBtn");
  chooseSetBtn.style.display = "none";

  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");
  const resultDisplayPlayer1 = document.querySelector("#resultPlayer1");
  const resultDisplayPlayer2 = document.querySelector("#resultPlayer2");
  const congrats = document.getElementById("congrats");
  const congratsOne = document.getElementById("congratsOne");

  let playerTurnH3 = document.getElementById("h3playerTurn");
  let twoPlayersScore = document.getElementById("twoPlayersScore");
  let onePlayerScore = document.getElementById("onePlayerScore")
  twoPlayersScore.style.display = "none";

  // FUNCTIONS

  function clearScore() {
    let clearCards = document.getElementById("grid");
    clearCards.innerHTML = " ";
    cardsFlipped = 0;
    resultDisplay.innerText = " ";
    resultDisplayPlayer1.innerText = " ";
    resultDisplayPlayer2.innerText = " ";
    congrats.innerText = " ";
    cardsWon = [];
    cardsWonPlayer1 = [];
    cardsWonPlayer2 = [];
    playerTurnH3.style.display = "block";
    changeTurnPlayerOne()
    cardsChosen = [];
    cardsChosenId = [];
  }

  function clearBoard() {
    let clearCards = document.getElementById("grid");
    clearCards.innerHTML = " ";
    congrats.innerText = " ";
    cardsFlipped = 0;
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
    $("#onePlayer").addClass("chooseSetActive")
    $("#twoPlayers").removeClass("chooseSetActive")

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
    $("#onePlayer").removeClass("chooseSetActive")
    $("#twoPlayers").addClass("chooseSetActive")
  }
  function continueGame() {
    clearBoard();
    shuffleCards();
    createBoard();
    playerTurnH3.style.display = "block";
    playerTurn = "playerOne";
    congrats.style.display = "none";
    congratsOne.style.display = "none";
    changeTurnPlayerOne()
    cardsFlipped = 0;
    cardsChosen = [];
    cardsChosenId = [];

  }
  function refresh() {
    clearBoard();
    clearScore();
    shuffleCards();
    createBoard();
    congrats.style.display = "block";
    congratsOne.style.display = "block";
    congrats.innerHTML = " ";
    congratsOne.innerHTML = " ";
    $("#refreshContinueBtn").css("display", "none");

  }


  function createBoard() {
    $("#game-info").css("display", "block")
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement("div");
      const image = document.createElement("img");
      const text = document.createElement("p");
      card.className = "card ";
      card.id = "cardID";
      image.className = "back ";
      text.className = "text ";
      image.setAttribute("src", "images/bibleHand.jpg");
      text.innerText = cardArray[i].text;
      card.appendChild(image);
      card.appendChild(text);
      text.style.display = "none";

      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    }

  }

  function checkForMatch() {
    const cards = document.querySelectorAll(".card");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    let matchFound = false;

    // 
    if (optionOneId == optionTwoId) {
      alertify.set({ delay: 3000 });
      alertify.error("You have cliked the same image!");
      // get the img and the p with cards[optionOneId].childNodes[0] and cards[optionOneId].childNodes[1]
      imgOptionOne = cards[optionOneId].childNodes[0];
      pOptionOne = cards[optionOneId].childNodes[1];
      imgOptionTwo = cards[optionTwoId].childNodes[0];
      pOptionTwo = cards[optionTwoId].childNodes[1];
      // set the display properties of the ps and imgs accordingly
      imgOptionOne.style.display = "block";
      pOptionOne.style.display = "none";
      imgOptionTwo.style.display = "block";
      pOptionTwo.style.display = "none";
      // image will be displayed
    } else if (cardsChosen[0] === cardsChosen[1]) {
      // found a match
      matchFound = true;
      cards[optionOneId].className += "matched ";
      cards[optionTwoId].className += "matched ";
      cards[optionOneId].removeEventListener("click", flipCard);
      cards[optionTwoId].removeEventListener("click", flipCard);

      if (playerTurn === "playerOne") {
        cardsWonPlayer1.push(cardsChosen);
      } else {
        cardsWonPlayer2.push(cardsChosen);
      }

      cardsWon.push(cardsChosen);
    } else {

      // alert('Sorry, try again')
    }


    // display score
    // 2 players
    if (playerTurn === "playerOne") {
      resultDisplayPlayer1.textContent = cardsWonPlayer1.length;
    } else {
      resultDisplayPlayer2.textContent = cardsWonPlayer2.length;
    }
    // 1 player
    resultDisplay.textContent = cardsWon.length;

    if ( // finished
      cardsWonPlayer1.length + cardsWonPlayer2.length ===
      cardArray.length / 2
    ) {
      if (cardsWonPlayer1.length > cardsWonPlayer2.length) {
        congrats.textContent = "Congratulations, Player 1!";
      }
      if (cardsWonPlayer1.length < cardsWonPlayer2.length) {
        congrats.textContent = "Congratulations, Player 2!";
      }
      if (cardsWonPlayer1.length === cardsWonPlayer2.length) {
        congrats.innerHTML = "Congratulations, both!";
      }
      // if (cardsWon = cardArray.lenght / 2) {

      //   congratsOne.textContent = "Congratulations, ONE PLAYER";
      // }
      // playerTurnH3.style.display = "none";

      congratsOne.textContent = "Congratulations! You found them all!";

      $("#refreshContinueBtn").css("display", "block");

      // const refresh = document.getElementById("refresh-btn");
      // refresh.className = 'refresh-btn'
      // refresh.style.display = 'block'
      // refresh.addEventListener("click", updateBoard);
      // const fresh = document.getElementsByClassName('main')[0]

      // fresh.appendChild(refresh)
    }
    return matchFound;
  }

  function shuffleCards() {
    cardArray.sort(() => 0.5 - Math.random());
  }

  function updateBoard() {
    shuffleCards();
    const cards = document.getElementsByClassName("card");

    for (let i = 0; i < cardArray.length; i++) {
      cards[i].className = cards[i].className.replace("matched", "");

      const text = cards[i].childNodes[1];
      const img = cards[i].childNodes[0];
      text.innerText = cardArray[i].text;

      img.style.display = "block";
      text.style.display = "none";

      // cardsWon = [];

      cards[i].addEventListener("click", flipCard);

      // document.getElementById('refresh-btn').style.display = 'none'
      // it works but it creates another btn with the same id

      // TODO clear button

      // add options for adding text adn ref to different variables

      // css
      // text too big = ...
      // card over
    }
  }


  function flipCard() {
    cardsFlipped++;
    if (cardsFlipped === 3) {
      const cards = document.querySelectorAll(".card");
      if (cardsChosen[0] !== cardsChosen[1]) {
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        imgOptionOne = cards[optionOneId].childNodes[0];
        pOptionOne = cards[optionOneId].childNodes[1];
        imgOptionTwo = cards[optionTwoId].childNodes[0];
        pOptionTwo = cards[optionTwoId].childNodes[1];
        imgOptionOne.style.display = "block";
        pOptionOne.style.display = "none";
        imgOptionTwo.style.display = "block";
        pOptionTwo.style.display = "none";
      }

      cardsChosen = [];
      cardsChosenId = [];
      cardsFlipped = 1;
    }

    let cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].reference);
    cardsChosenId.push(cardId);
    // this.innerText = cardArray[cardId].text // delete, cause we have the text already
    let image = this.childNodes[0];
    let text = this.childNodes[1];
    image.style.display = "none";
    text.style.display = "block";
    // set the display of the img to none and of the p to block
    if (cardsChosen.length === 2) {
      const matchFound = checkForMatch();
      if (!matchFound) {
        changeTurn();
      }
    }

  }


  function play() {

    if ($("#playerOneNameInput").val() === "") {
      // alert("Enter Name")
      $("#playersName").show(200)
      alertify.set({ delay: 5000 });
      alertify.error("Please enter your name!");
      $("#playerOneNameInput").val("Nobody 1");
      $("#playerTwoNameInput").val("Nobody 2");
    }

    if (cardArray !== cardArrayProverbs &&
      cardArray !== cardArrayTest &&
      cardArray !== cardArrayFAST) {
      // alert("Choose set")
      $("#chooseSetBtn").show(200)
      alertify.set({ delay: 5000 });
      alertify.error("Please choose a set!");


    }
    else {
      console.log(cardArray)
      $("#auth").hide(800);
      $("#playersName").hide(800);
      $("#playersModeBtn").hide(800);
      $("#chooseSetBtn").hide(800);
      $("#addVerseDiv").hide(800);
      $("#menu").hide(1000)
      $("#home").show(1000)

      refresh();
      playersName();
      $("#game-info").show(800);
      $("#grid").show(800);
    }
  };


});
