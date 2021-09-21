document.addEventListener("DOMContentLoaded", () => {

  $("#login").click(login)
  $("#register").click(register)

  function register(e) {
    // e.preventDefault() doesn t work for registering twice
    e.stopImmediatePropagation() // prevent for registering twice
    console.log($("#email").val())
    console.log($("#password").val())
    if ($("#password").val().length < 6) {
      alert("You pw needs to be between 6 and 32 characters!")
      return;
    }

    $.post('http://localhost:3000/api/auth/register',   // url
      {
        name: $("#username").val(),
        email: $("#email").val(),
        password: $("#password").val(),
      }, // data to be submit
      function (data, status, jqXHR) {  // success callback
        console.log(data)
      },
      "application/json"
    )
    return false;
  }

  function login(e) {
    e.stopImmediatePropagation() // prevent for registering twice

    $.post('http://localhost:3000/api/auth/login',   // url
      {
        name: $("#username").val(),
        email: $("#email").val(),
        password: $("#password").val(),
      }, // data to be submit
      function (data, status, jqXHR) {  // success callback
        console.log({ data })
        console.log({ status })
        console.log({ jqXHR })
        if ($("#email").val() === "bcrrobby@gmail.com") {
          console.log("CONGRATS FOR VLAAAAAD")
        }
      },
      "application/json"
    ).done(function (message) {
      console.log(message)

    }).fail(function (xhr, status, error) {

      // console.log(xhr.responseText)
      // console.log(JSON.parse(xhr.responseText))
      // console.log(JSON.parse(xhr.responseText).message)
      // console.log(xhr.responseText.message)
      // console.log(status)

      let errorP = $("#error")
      let errorVal = JSON.parse(xhr.responseText).message
      errorP.innerText = errorVal

      alert(JSON.parse(xhr.responseText).message) // TODO put erorr in a <p></p>
    })
    return false;
  }

  // VARIABLES

  // ON CLICK BUTTONS
  $("#onePlayer").click(onePlayer)
  $("#twoPlayers").click(twoPlayers)
  $("#chooseFast").click(chooseFast)
  $("#chooseProverbs").click(chooseProverbs)
  $("#chooseMore").click(chooseMore)
  $("#refreshBtn").click(refresh)
  $("#continueBtn").click(continueGame)
  $("#addVerseBtn").click(addVerse)
  $("#createBoard").click(createBoard)


  $("#game-info").css("display", "none")
  $("#refreshContinueBtn").css("display", "none");
  $("#home").css("display", "none")
  // $(".menu").show();

  // HIDE-SHOW TOGGLE MENU
  $("#home").click(function () {
    $("#menu").show(500)
    $(".register").hide(500);
    $("#playersName").hide(500);
    $("#playersModeBtn").hide(500);
    $("#chooseSetBtn").hide(500);
    $("#addVerseDiv").hide(500);
    $("#game-info").hide(500);
    $("#grid").hide(500);
    $("#refreshContinueBtn").hide(500);

  });

  $(".register").css("display", "none")
  $("#loginBTN").click(function () {
    $(".register").toggle(500);
  });

  $("#playersName").css("display", "none")
  $("#playersNameInputMenu").click(function () {
    $("#playersName").toggle(500);
  });

  $("#playersModeBtn").css("display", "none")
  $("#playersModeMenu").click(function () {
    $("#playersModeBtn").toggle(500);
  });

  $("#chooseSetBtn").css("display", "none")
  $("#chooseSetMenu").click(function () {
    $("#chooseSetBtn").toggle(500);
  });

  $("#addVerseDiv").css("display", "none")
  $("#addVerseMenu").click(function () {
    $("#addVerseDiv").toggle(500);
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
  const list = document.getElementById("arrayList");

  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  let cardsWonPlayer1 = [];
  let cardsWonPlayer2 = [];

  let playerTurn = "playerOne";
  let cardsFlipped = 0;
  let playerTurnH3 = document.getElementById("h3playerTurn");
  let twoPlayersScore = document.getElementById("twoPlayersScore");
  let onePlayerScore = document.getElementById("onePlayerScore")
  twoPlayersScore.style.display = "none";

  function playersName() {
    let playerOneNameInput = document.getElementById("playerOneNameInput").value;
    let playerTwoNameInput = document.getElementById("playerTwoNameInput").value;
    let playerOneName = document.getElementById("playerOneName");
    let TwoPlayerOneName = document.getElementById("TwoPlayerOneName");
    let TwoPlayerTwoName = document.getElementById("TwoPlayerTwoName");

    playerOneName.innerHTML = playerOneNameInput;
    TwoPlayerOneName.innerHTML = playerOneNameInput;

    TwoPlayerTwoName.innerHTML = playerTwoNameInput;
    console.log(playerOneNameInput);

  }


  const cardArrayProverbs = [
    {
      reference: "1 Ioan 2:6",
      text: "1 Ioan 2:6",
    },
    {
      reference: "1 Ioan 2:6",
      text: "Cine zice că rămâne în El trebuie să trăiască și el cum a trăit Isus",
    },
    {
      reference: "1 Ioan 1:9",
      text: "1 Ioan 1:9",
    },
    {
      reference: "1 Ioan 1:9",
      text: "Daca ne marturisim pacatele El este credincios si drept ca sa ne ierte toate pacatele si sa ne ierte de orice nelegiuire",
    },
  ];
  const cardArrayMore = [
    {
      reference: "....",
      text: ". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .... ...... ...... ..... ...... ... .... ....... .. ........................",
    },
    {
      reference: "....",
      text: ". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .. ... ..   ..... .... . ..  . ...... ..............................",
    },
    {
      reference: "OOOO",
      text: "O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O OOOO  OOOOO O OOOO  OOOO OOOOOO OOO OOOOOOOOOOOOOOOOOOOOOOOOO",
    },
    {
      reference: "OOOO",
      text: "O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O  OOOOOOOO  OOOOO OO OOO OOO OO OOOOOOOOOOOOOOOOOOOOOOOOO",
    },
  ];
  const cardArrayFAST = [
    {
      reference: "Ps. 143:8",
      text: "Ps. 143:8",
    },
    {
      reference: "Ps. 143:8",
      text: "Fă-mă să aud dis-de-dimineaţă bunătatea Ta, căci mă încred în Tine. Arată-mi calea pe care trebuie să umblu, căci la Tine îmi înalţ sufletul.",
    },
    {
      reference: "Romani 4:20",
      text: "Romani 4:20",
    },
    {
      reference: "Romani 4:20",
      text: "El nu s-a îndoit de făgăduinţa lui Dumnezeu, prin necredinţă, ci, întărit prin credinţa lui, a dat slavă lui Dumnezeu,",
    },
    {
      reference: "Ioan 15:7",
      text: "Ioan 15:7",
    },
    {
      reference: "Ioan 15:7",
      text: "Dacă rămâneţi în Mine şi dacă rămân în voi cuvintele Mele, cereţi orice veţi vrea, şi vi se va da.",
    },
    {
      reference: "1 Timotei 4:15",
      text: "1 Timotei 4:15",
    },
    {
      reference: "1 Timotei 4:15",
      text: "Pune-ţi pe inimă aceste lucruri, îndeletniceşte-te în totul cu ele, pentru ca înaintarea ta să fie văzută de toţi.",
    },
    {
      reference: "Proverbe 13:4",
      text: "Proverbe 13:4",
    },
    {
      reference: "Proverbe 13:4",
      text: "Leneşul doreşte mult, şi totuşi, n-are nimic, dar cei harnici se satură. -",
    },
    {
      reference: "2 Corinteni 8:11",
      text: "Isprăviţi, dar, acum de făcut; pentru ca, după graba voinţei, să fie şi înfăptuirea, potrivit cu mijloacele voastre.",
    },
    {
      reference: "2 Corinteni 8:11",
      text: "2 Corinteni 8:11",
    }
  ];


  let cardArray = [];

  function continueGame() {
    clearBoard();
    shuffleCards();
    createBoard();
    playerTurnH3.style.display = "block";
    playerTurn = "playerOne";
    congrats.style.display = "none";
    congratsOne.style.display = "none";
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

  function chooseProverbs() {
    cardArray = cardArrayProverbs;

  }

  function chooseFast() {
    cardArray = cardArrayFAST;

  }

  function chooseMore() {
    cardArray = cardArrayMore;
    clearBoard();
    clearScore();
    createBoard();
    congrats.style.display = "block";
    congratsOne.style.display = "block";
    congrats.innerHTML = " ";
    congratsOne.innerHTML = " ";
    $("#refreshContinueBtn").css("display", "none");
    playersName()
  }

  function changeTurn() {
    if (cardsFlipped === 2) {
      if (playerTurn === "playerOne") {
        playerTurn = "playerTwo";
        document.getElementById("playerTurn").innerText =
          "Player 2, it's your turn!";
        document.getElementById("playerTurn").style.color = "green";
      } else {
        playerTurn = "playerOne";
        document.getElementById("playerTurn").innerText =
          "Player 1, it's your turn!";
        document.getElementById("playerTurn").style.color = "yellow";
      }

      cardsFlipped = 0;
    }
  }

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
    playerTurn = "playerOne";
    document.getElementById("playerTurn").innerText =
      "Player 1, it's your turn!";
    document.getElementById("playerTurn").style.color = "yellow";
  }

  function clearBoard() {
    let clearCards = document.getElementById("grid");
    clearCards.innerHTML = " ";

    congrats.innerText = " ";

    cardsFlipped = 0;
    // playerTurn = "playerOne";

    // let menu = document.getElementById("menu");
    // while (menu.firstChild) {
    //   menu.removeChild(menu.firstChild);
    // }
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

  function addVerse() {
    let selectBox = document.getElementById("selectBox");
    let selectedValue = selectBox.options[selectBox.selectedIndex].value;
    const inputDiv = document.getElementById("createInput")

    const createDiv = document.createElement("div")
    createDiv.className = "newText"
    inputDiv.appendChild(createDiv)

    const takeReference = document.createElement("INPUT")
    takeReference.setAttribute("type", "text");
    takeReference.placeholder = "Enter reference"
    takeReference.id = "reference"

    const takeText = document.createElement("INPUT")
    takeText.setAttribute("type", "text");
    takeText.placeholder = "Enter text"
    takeText.id = "reference"


    createDiv.appendChild(takeReference)
    createDiv.appendChild(takeText)

    // const takeReference = document.getElementById("reference").value;
    // const takeText = document.getElementById("text").value;

    const newReference = {
      reference: takeReference,
      text: takeReference,
    };
    const newVerse = {
      reference: takeReference,
      text: takeText,
    };

    if (selectedValue === "fast") {
      cardArray = cardArrayFAST;
    }
    if (selectedValue === "proverbs") {
      cardArray = cardArrayProverbs;
    }
    if (selectedValue === "test") {
      cardArray = cardArrayMore;
    }
    if (selectedValue === "mySet1") {
      cardArray = cardArrayMore;
    }
    if (selectedValue === "mySet2") {
      cardArray = cardArrayMore;
    }
    console.log(cardArray);
    cardArray.push(newReference);
    cardArray.push(newVerse);
    arrayList()

  } // TODO make textholders for every verse you add so you can add, modify, delete every text
  // TODO user can create new array

  function arrayList() {
    // cardArray.forEach(function (val, i, text) {
    //   document.write(i + ": " + val + "<br>");
    // });
    list.innerHTML = " ";
    for (let i = 0; i < cardArray.length; i++) {


      const listP = document.createElement("p");
      addVerseDiv.appendChild(list)
      list.appendChild(listP)

      listP.innerHTML = cardArray[i].reference


    }
    console.log(listP);
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

    // 
    if (optionOneId == optionTwoId) {
      alert('You have clicked the same image!')
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
      // alert('You found a match')

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
      imgOptionOne = cards[optionOneId].childNodes[0];
      pOptionOne = cards[optionOneId].childNodes[1];
      imgOptionTwo = cards[optionTwoId].childNodes[0];
      pOptionTwo = cards[optionTwoId].childNodes[1];
      imgOptionOne.style.display = "block";
      pOptionOne.style.display = "none";
      imgOptionTwo.style.display = "block";
      pOptionTwo.style.display = "none";

      // alert('Sorry, try again')
    }
    cardsChosen = [];
    cardsChosenId = [];

    if (playerTurn === "playerOne") {
      resultDisplayPlayer1.textContent = cardsWonPlayer1.length;
    } else {
      resultDisplayPlayer2.textContent = cardsWonPlayer2.length;
    }

    resultDisplay.textContent = cardsWon.length;

    if (
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
    if (cardsChosen.length > 1) {
      return;
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
      setTimeout(function () {
        checkForMatch();
        changeTurn();
      }, 400);
    }
  }


  $("#play").click(function () {

    if ($("#playerOneNameInput").val() === "") {
      // alert("Enter Name")
      $("#playersName").show(500)
    }

    if (cardArray !== cardArrayProverbs &&
      cardArray !== cardArrayMore &&
      cardArray !== cardArrayFAST) {
      // alert("Choose set")
      $("#chooseSetBtn").show(500)
      // $("#chooseSetBtn").css("display", "block")


    }
    else {
      console.log(cardArray)
      $(".register").hide(800);
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
  });

  // prompt('Versetele de la FAST, M2')
});
