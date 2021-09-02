document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("addVerseBtn");
  btn.addEventListener("click", addVerse);

  const chooseFastBtn = document.getElementById("chooseFast");
  chooseFastBtn.addEventListener("click", chooseFast);

  const chooseProverbsBtn = document.getElementById("chooseProverbs");
  chooseProverbsBtn.addEventListener("click", chooseProverbs);

  const chooseMoreBtn = document.getElementById("chooseMore");
  chooseMoreBtn.addEventListener("click", chooseMore);

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
  ];

  let cardArray = [];
  //    cardArray = cardArrayFAST
  // console.log(cardArray);
  //card options

  function chooseProverbs() {
    cardArray = cardArrayProverbs;
    cardArray.sort(() => 0.5 - Math.random());
    createBoard();
  }

  function chooseMore() {
    cardArray = cardArrayMore;
    cardArray.sort(() => 0.5 - Math.random());
    createBoard();
  }

  function chooseFast() {
    cardArray = cardArrayFAST;
    cardArray.sort(() => 0.5 - Math.random());
    createBoard();
  }

  function addVerse() {
    const takeReference = document.getElementById("reference").value;
    const takeText = document.getElementById("text").value;

    const newReference = {
      reference: takeReference,
      text: takeReference,
    };
    const newVerse = {
      reference: takeReference,
      text: takeText,
    };
    cardArray.push(newReference);
    cardArray.push(newVerse);
    console.log(addVerse);
    console.log(cardArray);

    createBoard();
  }

  const grid = document.querySelector(".grid");
  // const resultDisplay = document.querySelector("#result");
  const resultDisplayPlayer1 = document.querySelector("#resultPlayer1");
  const resultDisplayPlayer2 = document.querySelector("#resultPlayer2");
  const congrats = document.getElementById("congrats");

  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  let cardsWonPlayer1 = [];
  let cardsWonPlayer2 = [];

  let playerTurn = "playerOne";
  let cardsFlipped = 0;

  //create your board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement("div");
      const image = document.createElement("img");
      const text = document.createElement("p");
      card.className = "card ";
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

  //check for matches
  function checkForMatch() {
    console.log(cardsChosen);
    console.log(cardsChosenId);
    const cards = document.querySelectorAll(".card");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    // alert('You have clicked the same image!')
    if (optionOneId == optionTwoId) {
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

      // cardsWon.push(cardsChosen);
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

    // resultDisplay.textContent = cardsWon.length;

    if (
      cardsWonPlayer1.length + cardsWonPlayer2.length ===
      cardArray.length / 2
    ) {
      if (cardsWonPlayer1.length > cardsWonPlayer2.length) {
        congrats.textContent = "Congratulations, Player 1! You found them all!";
      }
      if (cardsWonPlayer1.length < cardsWonPlayer2.length) {
        congrats.textContent = "Congratulations, Player 2! You found them all!";
      }
      if (cardsWonPlayer1.length === cardsWonPlayer2.length) {
        congrats.textContent = "Congratulations, both!";
      }

      // resultDisplay.textContent = "Congratulations! You found them all!";

      const refresh = document.getElementById("refresh-btn");
      // refresh.className = 'refresh-btn'
      // refresh.style.display = 'block'
      refresh.addEventListener("click", updateBoard);
      // const fresh = document.getElementsByClassName('main')[0]

      // fresh.appendChild(refresh)
    }
  }

  function shuffleCards() {
    cardArray.sort(() => 0.5 - Math.random());
  }

  //   // remove matched class from all cards

  // }
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

      cardsWon = [];

      cards[i].addEventListener("click", flipCard);

      // document.getElementById('refresh-btn').style.display = 'none'
      // it works but it creates another btn with the same id

      // TODO clear button
      // delete congrats
      // add options for adding text adn ref to different variables
      // put congrat in other span

      // css
      // text too big = ...
      // card over

      // let removeClass = document.getElementById('grid')
      // removeClass.classList.remove('matched')
    }
  }

  function changeTurn() {
    if (cardsFlipped === 2) {
      if (playerTurn === "playerOne") {
        playerTurn = "playerTwo";
        document.getElementById("playerTurn").innerText = "Player 2";
      } else {
        playerTurn = "playerOne";
        document.getElementById("playerTurn").innerText = "Player 1";
      }

      cardsFlipped = 0;
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
      }, 900);
    }
  }
  createBoard();

  // prompt('Versetele de la FAST, M2')
});
