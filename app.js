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
      alertify.set({ delay: 5000 });
      alertify.error("Please enter your name!");
    }

    if (cardArray !== cardArrayProverbs &&
      cardArray !== cardArrayMore &&
      cardArray !== cardArrayFAST) {
      // alert("Choose set")
      $("#chooseSetBtn").show(500)
      alertify.set({ delay: 5000 });
      alertify.error("Please choose a set!");


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














  // $(document).foundation();

  /*global define*/
  (function (global, undefined) {
    "use strict";

    var document = global.document,
      Alertify;

    Alertify = function () {

      var _alertify = {},
        dialogs = {},
        isopen = false,
        keys = { ENTER: 13, ESC: 27, SPACE: 32 },
        queue = [],
        $, btnCancel, btnOK, btnReset, btnResetBack, btnFocus, elCallee, elCover, elDialog, elLog, form, input, getTransitionEvent;

      /**
       * Markup pieces
       * @type {Object}
       */
      dialogs = {
        buttons: {
          holder: "<nav class=\"alertify-buttons\">{{buttons}}</nav>",
          submit: "<button type=\"submit\" class=\"alertify-button alertify-button-ok\" id=\"alertify-ok\">{{ok}}</button>",
          ok: "<button class=\"alertify-button alertify-button-ok\" id=\"alertify-ok\">{{ok}}</button>",
          cancel: "<button class=\"alertify-button alertify-button-cancel\" id=\"alertify-cancel\">{{cancel}}</button>"
        },
        input: "<div class=\"alertify-text-wrapper\"><input type=\"text\" class=\"alertify-text\" id=\"alertify-text\"></div>",
        message: "<p class=\"alertify-message\">{{message}}</p>",
        log: "<article class=\"alertify-log{{class}}\">{{message}}</article>"
      };

      /**
       * Return the proper transitionend event
       * @return {String}    Transition type string
       */
      getTransitionEvent = function () {
        var t,
          type,
          supported = false,
          el = document.createElement("fakeelement"),
          transitions = {
            "WebkitTransition": "webkitTransitionEnd",
            "MozTransition": "transitionend",
            "OTransition": "otransitionend",
            "transition": "transitionend"
          };

        for (t in transitions) {
          if (el.style[t] !== undefined) {
            type = transitions[t];
            supported = true;
            break;
          }
        }

        return {
          type: type,
          supported: supported
        };
      };

      /**
       * Shorthand for document.getElementById()
       *
       * @param  {String} id    A specific element ID
       * @return {Object}       HTML element
       */
      $ = function (id) {
        return document.getElementById(id);
      };

      /**
       * Alertify private object
       * @type {Object}
       */
      _alertify = {

        /**
         * Labels object
         * @type {Object}
         */
        labels: {
          ok: "OK",
          cancel: "Cancel"
        },

        /**
         * Delay number
         * @type {Number}
         */
        delay: 5000,

        /**
         * Whether buttons are reversed (default is secondary/primary)
         * @type {Boolean}
         */
        buttonReverse: false,

        /**
         * Which button should be focused by default
         * @type {String} "ok" (default), "cancel", or "none"
         */
        buttonFocus: "ok",

        /**
         * Set the transition event on load
         * @type {[type]}
         */
        transition: undefined,

        /**
         * Set the proper button click events
         *
         * @param {Function} fn    [Optional] Callback function
         *
         * @return {undefined}
         */
        addListeners: function (fn) {
          var hasOK = (typeof btnOK !== "undefined"),
            hasCancel = (typeof btnCancel !== "undefined"),
            hasInput = (typeof input !== "undefined"),
            val = "",
            self = this,
            ok, cancel, common, key, reset;

          // ok event handler
          ok = function (event) {
            if (typeof event.preventDefault !== "undefined") event.preventDefault();
            common(event);
            if (typeof input !== "undefined") val = input.value;
            if (typeof fn === "function") {
              if (typeof input !== "undefined") {
                fn(true, val);
              }
              else fn(true);
            }
            return false;
          };

          // cancel event handler
          cancel = function (event) {
            if (typeof event.preventDefault !== "undefined") event.preventDefault();
            common(event);
            if (typeof fn === "function") fn(false);
            return false;
          };

          // common event handler (keyup, ok and cancel)
          common = function (event) {
            self.hide();
            self.unbind(document.body, "keyup", key);
            self.unbind(btnReset, "focus", reset);
            if (hasOK) self.unbind(btnOK, "click", ok);
            if (hasCancel) self.unbind(btnCancel, "click", cancel);
          };

          // keyup handler
          key = function (event) {
            var keyCode = event.keyCode;
            if ((keyCode === keys.SPACE && !hasInput) || (hasInput && keyCode === keys.ENTER)) ok(event);
            if (keyCode === keys.ESC && hasCancel) cancel(event);
          };

          // reset focus to first item in the dialog
          reset = function (event) {
            if (hasInput) input.focus();
            else if (!hasCancel || self.buttonReverse) btnOK.focus();
            else btnCancel.focus();
          };

          // handle reset focus link
          // this ensures that the keyboard focus does not
          // ever leave the dialog box until an action has
          // been taken
          this.bind(btnReset, "focus", reset);
          this.bind(btnResetBack, "focus", reset);
          // handle OK click
          if (hasOK) this.bind(btnOK, "click", ok);
          // handle Cancel click
          if (hasCancel) this.bind(btnCancel, "click", cancel);
          // listen for keys, Cancel => ESC
          this.bind(document.body, "keyup", key);
          if (!this.transition.supported) {
            this.setFocus();
          }
        },

        /**
         * Bind events to elements
         *
         * @param  {Object}   el       HTML Object
         * @param  {Event}    event    Event to attach to element
         * @param  {Function} fn       Callback function
         *
         * @return {undefined}
         */
        bind: function (el, event, fn) {
          if (typeof el.addEventListener === "function") {
            el.addEventListener(event, fn, false);
          } else if (el.attachEvent) {
            el.attachEvent("on" + event, fn);
          }
        },

        /**
         * Use alertify as the global error handler (using window.onerror)
         *
         * @return {boolean} success
         */
        handleErrors: function () {
          if (typeof global.onerror !== "undefined") {
            var self = this;
            global.onerror = function (msg, url, line) {
              self.error("[" + msg + " on line " + line + " of " + url + "]", 0);
            };
            return true;
          } else {
            return false;
          }
        },

        /**
         * Append button HTML strings
         *
         * @param {String} secondary    The secondary button HTML string
         * @param {String} primary      The primary button HTML string
         *
         * @return {String}             The appended button HTML strings
         */
        appendButtons: function (secondary, primary) {
          return this.buttonReverse ? primary + secondary : secondary + primary;
        },

        /**
         * Build the proper message box
         *
         * @param  {Object} item    Current object in the queue
         *
         * @return {String}         An HTML string of the message box
         */
        build: function (item) {
          var html = "",
            type = item.type,
            message = item.message,
            css = item.cssClass || "";

          html += "<div class=\"alertify-dialog\">";
          html += "<a id=\"alertify-resetFocusBack\" class=\"alertify-resetFocus\" href=\"#\">Reset Focus</a>";

          if (_alertify.buttonFocus === "none") html += "<a href=\"#\" id=\"alertify-noneFocus\" class=\"alertify-hidden\"></a>";

          // doens't require an actual form
          if (type === "prompt") html += "<div id=\"alertify-form\">";

          html += "<article class=\"alertify-inner\">";
          html += dialogs.message.replace("{{message}}", message);

          if (type === "prompt") html += dialogs.input;

          html += dialogs.buttons.holder;
          html += "</article>";

          if (type === "prompt") html += "</div>";

          html += "<a id=\"alertify-resetFocus\" class=\"alertify-resetFocus\" href=\"#\">Reset Focus</a>";
          html += "</div>";

          switch (type) {
            case "confirm":
              html = html.replace("{{buttons}}", this.appendButtons(dialogs.buttons.cancel, dialogs.buttons.ok));
              html = html.replace("{{ok}}", this.labels.ok).replace("{{cancel}}", this.labels.cancel);
              break;
            case "prompt":
              html = html.replace("{{buttons}}", this.appendButtons(dialogs.buttons.cancel, dialogs.buttons.submit));
              html = html.replace("{{ok}}", this.labels.ok).replace("{{cancel}}", this.labels.cancel);
              break;
            case "alert":
              html = html.replace("{{buttons}}", dialogs.buttons.ok);
              html = html.replace("{{ok}}", this.labels.ok);
              break;
            default:
              break;
          }

          elDialog.className = "alertify alertify-" + type + " " + css;
          elCover.className = "alertify-cover";
          return html;
        },

        /**
         * Close the log messages
         *
         * @param  {Object} elem    HTML Element of log message to close
         * @param  {Number} wait    [optional] Time (in ms) to wait before automatically hiding the message, if 0 never hide
         *
         * @return {undefined}
         */
        close: function (elem, wait) {
          // Unary Plus: +"2" === 2
          var timer = (wait && !isNaN(wait)) ? +wait : this.delay,
            self = this,
            hideElement, transitionDone;

          // set click event on log messages
          this.bind(elem, "click", function () {
            hideElement(elem);
          });
          // Hide the dialog box after transition
          // This ensure it doens't block any element from being clicked
          transitionDone = function (event) {
            event.stopPropagation();
            // unbind event so function only gets called once
            self.unbind(this, self.transition.type, transitionDone);
            // remove log message
            elLog.removeChild(this);
            if (!elLog.hasChildNodes()) elLog.className += " alertify-logs-hidden";
          };
          // this sets the hide class to transition out
          // or removes the child if css transitions aren't supported
          hideElement = function (el) {
            // ensure element exists
            if (typeof el !== "undefined" && el.parentNode === elLog) {
              // whether CSS transition exists
              if (self.transition.supported) {
                self.bind(el, self.transition.type, transitionDone);
                el.className += " alertify-log-hide";
              } else {
                elLog.removeChild(el);
                if (!elLog.hasChildNodes()) elLog.className += " alertify-logs-hidden";
              }
            }
          };
          // never close (until click) if wait is set to 0
          if (wait === 0) return;
          // set timeout to auto close the log message
          setTimeout(function () { hideElement(elem); }, timer);
        },

        /**
         * Create a dialog box
         *
         * @param  {String}   message        The message passed from the callee
         * @param  {String}   type           Type of dialog to create
         * @param  {Function} fn             [Optional] Callback function
         * @param  {String}   placeholder    [Optional] Default value for prompt input field
         * @param  {String}   cssClass       [Optional] Class(es) to append to dialog box
         *
         * @return {Object}
         */
        dialog: function (message, type, fn, placeholder, cssClass) {
          // set the current active element
          // this allows the keyboard focus to be resetted
          // after the dialog box is closed
          elCallee = document.activeElement;
          // check to ensure the alertify dialog element
          // has been successfully created
          var check = function () {
            if ((elLog && elLog.scrollTop !== null) && (elCover && elCover.scrollTop !== null)) return;
            else check();
          };
          // error catching
          if (typeof message !== "string") throw new Error("message must be a string");
          if (typeof type !== "string") throw new Error("type must be a string");
          if (typeof fn !== "undefined" && typeof fn !== "function") throw new Error("fn must be a function");
          // initialize alertify if it hasn't already been done
          this.init();
          check();

          queue.push({ type: type, message: message, callback: fn, placeholder: placeholder, cssClass: cssClass });
          if (!isopen) this.setup();

          return this;
        },

        /**
         * Extend the log method to create custom methods
         *
         * @param  {String} type    Custom method name
         *
         * @return {Function}
         */
        extend: function (type) {
          if (typeof type !== "string") throw new Error("extend method must have exactly one paramter");
          return function (message, wait) {
            this.log(message, type, wait);
            return this;
          };
        },

        /**
         * Hide the dialog and rest to defaults
         *
         * @return {undefined}
         */
        hide: function () {
          var transitionDone,
            self = this;
          // remove reference from queue
          queue.splice(0, 1);
          // if items remaining in the queue
          if (queue.length > 0) this.setup(true);
          else {
            isopen = false;
            // Hide the dialog box after transition
            // This ensure it doens't block any element from being clicked
            transitionDone = function (event) {
              event.stopPropagation();
              // unbind event so function only gets called once
              self.unbind(elDialog, self.transition.type, transitionDone);
            };
            // whether CSS transition exists
            if (this.transition.supported) {
              this.bind(elDialog, this.transition.type, transitionDone);
              elDialog.className = "alertify alertify-hide alertify-hidden";
            } else {
              elDialog.className = "alertify alertify-hide alertify-hidden alertify-isHidden";
            }
            elCover.className = "alertify-cover alertify-cover-hidden";
            // set focus to the last element or body
            // after the dialog is closed
            elCallee.focus();
          }
        },

        /**
         * Initialize Alertify
         * Create the 2 main elements
         *
         * @return {undefined}
         */
        init: function () {
          // ensure legacy browsers support html5 tags
          document.createElement("nav");
          document.createElement("article");
          document.createElement("section");
          // cover
          if ($("alertify-cover") == null) {
            elCover = document.createElement("div");
            elCover.setAttribute("id", "alertify-cover");
            elCover.className = "alertify-cover alertify-cover-hidden";
            document.body.appendChild(elCover);
          }
          // main element
          if ($("alertify") == null) {
            isopen = false;
            queue = [];
            elDialog = document.createElement("section");
            elDialog.setAttribute("id", "alertify");
            elDialog.className = "alertify alertify-hidden";
            document.body.appendChild(elDialog);
          }
          // log element
          if ($("alertify-logs") == null) {
            elLog = document.createElement("section");
            elLog.setAttribute("id", "alertify-logs");
            elLog.className = "alertify-logs alertify-logs-hidden";
            document.body.appendChild(elLog);
          }
          // set tabindex attribute on body element
          // this allows script to give it focus
          // after the dialog is closed
          document.body.setAttribute("tabindex", "0");
          // set transition type
          this.transition = getTransitionEvent();
        },

        /**
         * Show a new log message box
         *
         * @param  {String} message    The message passed from the callee
         * @param  {String} type       [Optional] Optional type of log message
         * @param  {Number} wait       [Optional] Time (in ms) to wait before auto-hiding the log
         *
         * @return {Object}
         */
        log: function (message, type, wait) {
          // check to ensure the alertify dialog element
          // has been successfully created
          var check = function () {
            if (elLog && elLog.scrollTop !== null) return;
            else check();
          };
          // initialize alertify if it hasn't already been done
          this.init();
          check();

          elLog.className = "alertify-logs";
          this.notify(message, type, wait);
          return this;
        },

        /**
         * Add new log message
         * If a type is passed, a class name "alertify-log-{type}" will get added.
         * This allows for custom look and feel for various types of notifications.
         *
         * @param  {String} message    The message passed from the callee
         * @param  {String} type       [Optional] Type of log message
         * @param  {Number} wait       [Optional] Time (in ms) to wait before auto-hiding
         *
         * @return {undefined}
         */
        notify: function (message, type, wait) {
          var log = document.createElement("article");
          log.className = "alertify-log" + ((typeof type === "string" && type !== "") ? " alertify-log-" + type : "");
          log.innerHTML = message;
          // append child
          elLog.appendChild(log);
          // triggers the CSS animation
          setTimeout(function () { log.className = log.className + " alertify-log-show"; }, 50);
          this.close(log, wait);
        },

        /**
         * Set properties
         *
         * @param {Object} args     Passing parameters
         *
         * @return {undefined}
         */
        set: function (args) {
          var k;
          // error catching
          if (typeof args !== "object" && args instanceof Array) throw new Error("args must be an object");
          // set parameters
          for (k in args) {
            if (args.hasOwnProperty(k)) {
              this[k] = args[k];
            }
          }
        },

        /**
         * Common place to set focus to proper element
         *
         * @return {undefined}
         */
        setFocus: function () {
          if (input) {
            input.focus();
            input.select();
          }
          else btnFocus.focus();
        },

        /**
         * Initiate all the required pieces for the dialog box
         *
         * @return {undefined}
         */
        setup: function (fromQueue) {
          var item = queue[0],
            self = this,
            transitionDone;

          // dialog is open
          isopen = true;
          // Set button focus after transition
          transitionDone = function (event) {
            event.stopPropagation();
            self.setFocus();
            // unbind event so function only gets called once
            self.unbind(elDialog, self.transition.type, transitionDone);
          };
          // whether CSS transition exists
          if (this.transition.supported && !fromQueue) {
            this.bind(elDialog, this.transition.type, transitionDone);
          }
          // build the proper dialog HTML
          elDialog.innerHTML = this.build(item);
          // assign all the common elements
          btnReset = $("alertify-resetFocus");
          btnResetBack = $("alertify-resetFocusBack");
          btnOK = $("alertify-ok") || undefined;
          btnCancel = $("alertify-cancel") || undefined;
          btnFocus = (_alertify.buttonFocus === "cancel") ? btnCancel : ((_alertify.buttonFocus === "none") ? $("alertify-noneFocus") : btnOK),
            input = $("alertify-text") || undefined;
          form = $("alertify-form") || undefined;
          // add placeholder value to the input field
          if (typeof item.placeholder === "string" && item.placeholder !== "") input.value = item.placeholder;
          if (fromQueue) this.setFocus();
          this.addListeners(item.callback);
        },

        /**
         * Unbind events to elements
         *
         * @param  {Object}   el       HTML Object
         * @param  {Event}    event    Event to detach to element
         * @param  {Function} fn       Callback function
         *
         * @return {undefined}
         */
        unbind: function (el, event, fn) {
          if (typeof el.removeEventListener === "function") {
            el.removeEventListener(event, fn, false);
          } else if (el.detachEvent) {
            el.detachEvent("on" + event, fn);
          }
        }
      };

      return {
        alert: function (message, fn, cssClass) { _alertify.dialog(message, "alert", fn, "", cssClass); return this; },
        confirm: function (message, fn, cssClass) { _alertify.dialog(message, "confirm", fn, "", cssClass); return this; },
        extend: _alertify.extend,
        init: _alertify.init,
        log: function (message, type, wait) { _alertify.log(message, type, wait); return this; },
        prompt: function (message, fn, placeholder, cssClass) { _alertify.dialog(message, "prompt", fn, placeholder, cssClass); return this; },
        success: function (message, wait) { _alertify.log(message, "success", wait); return this; },
        error: function (message, wait) { _alertify.log(message, "error", wait); return this; },
        set: function (args) { _alertify.set(args); },
        labels: _alertify.labels,
        debug: _alertify.handleErrors
      };
    };

    // AMD and window support
    if (typeof define === "function") {
      define([], function () { return new Alertify(); });
    } else if (typeof global.alertify === "undefined") {
      global.alertify = new Alertify();
    }

  }(this));


  $('button.alert').click(function () {
    alertify.set({ delay: 1700 });
    alertify.success("Success notification");
  });

  $('button.alert').click(function () {
    alertify.set({ delay: 1700 });
    alertify.error("Error notification");
  });




});
