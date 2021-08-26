document.addEventListener('DOMContentLoaded', () => {
  //card options
  const cardArray = [
    {
      reference: '1 Ioan 2:6',
      text: '1 Ioan 2: 6'
    },
    {
      reference: '1 Ioan 2:6',
      text: 'Cine zice ca ramane in El...'
    },
    {
      reference: '1 Ioan 1:9',
      text: '1 Ioan 1:9'
    },
    {
      reference: '1 Ioan 1:9',
      text: 'Daca ne marturisim pacatele El este credincios si drept ca sa ne ierte toate pacatele si sa ne ierte de orice nelegiuire'
    },
    {
      reference: '1 Ioan 2:6',
      text: '1 Ioan 2: 6'
    },
    {
      reference: '1 Ioan 2:6',
      text: 'Cine zice ca ramane in El...'
    },
    {
      reference: '1 Ioan 1:9',
      text: '1 Ioan 1:9'
    },
    {
      reference: '1 Ioan 1:9',
      text: 'Daca ne marturisim pacatele El este credincios si drept ca sa ne ierte toate pacatele si sa ne ierte de orice nelegiuire'
    }, {
      reference: '1 Ioan 2:6',
      text: '1 Ioan 2: 6'
    },
    {
      reference: '1 Ioan 2:6',
      text: 'Cine zice ca ramane in El...'
    },
    {
      reference: '1 Ioan 1:9',
      text: '1 Ioan 1:9'
    },
    {
      reference: '1 Ioan 1:9',
      text: 'Daca ne marturisim pacatele El este credincios si drept ca sa ne ierte toate pacatele si sa ne ierte de orice nelegiuire'
    }, {
      reference: '1 Ioan 2:6',
      text: '1 Ioan 2: 6'
    },
    {
      reference: '1 Ioan 2:6',
      text: 'Cine zice ca ramane in El...'
    },
    {
      reference: '1 Ioan 1:9',
      text: '1 Ioan 1:9'
    },
    {
      reference: '1 Ioan 1:9',
      text: 'Daca ne marturisim pacatele El este credincios si drept ca sa ne ierte toate pacatele si sa ne ierte de orice nelegiuire'
    },
  ]

  cardArray.sort(() => 0.5 - Math.random())

  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  let cardsChosen = []
  let cardsChosenId = []
  let cardsWon = []

  //create your board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('div')
      const image = document.createElement('img')
      const text = document.createElement('p')
      card.className = 'card '
      image.className = 'back '
      image.setAttribute('src', "images/ice-cream.png")
      text.innerText = cardArray[i].text
      card.appendChild(image)
      card.appendChild(text)
      text.style.display = 'none'

      // create an HTML element for the image, with class 'back', with (set attrbute) src = '/path/to/image.jpg'
      // create an HTML elem for the text, with class 'front', with innerText = cardArray[i].text
      // append both of them to the card div
      // set the display of the p to none

      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard)
      grid.appendChild(card)
    }
  }

  //check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll('.card')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]

    if (optionOneId == optionTwoId) { // alert('You have clicked the same image!')

      // get the img and the p with cards[optionOneId].childNodes[0] and cards[optionOneId].childNodes[1] 
      imgOptionOne = cards[optionOneId].childNodes[0]
      pOptionOne = cards[optionOneId].childNodes[1]
      imgOptionTwo = cards[optionTwoId].childNodes[0]
      pOptionTwo = cards[optionTwoId].childNodes[1]
      // set the display properties of the ps and imgs accordingly
      imgOptionOne.style.display = 'block'
      pOptionOne.style.display = 'none'
      imgOptionTwo.style.display = 'block'
      pOptionTwo.style.display = 'none'
      // image will be displayed

    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      // alert('You found a match')

      cards[optionOneId].className += 'matched '
      cards[optionTwoId].className += 'matched '
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
    } else {
      imgOptionOne = cards[optionOneId].childNodes[0]
      pOptionOne = cards[optionOneId].childNodes[1]
      imgOptionTwo = cards[optionTwoId].childNodes[0]
      pOptionTwo = cards[optionTwoId].childNodes[1]
      imgOptionOne.style.display = 'block'
      pOptionOne.style.display = 'none'
      imgOptionTwo.style.display = 'block'
      pOptionTwo.style.display = 'none'
      // do the same thing as if clicked the same card twice
      // cards[optionTwoId].setAttribute('src', 'images/blank.png')
      // alert('Sorry, try again')
    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    if (cardsWon.length === cardArray.length / 2) {
      resultDisplay.textContent = 'Congratulations! You found them all!'
      // const refresh = document.createElement('button')
      // refresh.className = 'refresh-btn'
      // refresh.innerText = 'refresh'
      // refresh.addEventListener('click', shuffleCards)
      // const fresh = document.getElementsByClassName('main')[0]

      // fresh.appendChild(refresh)
    }
  }

  function shuffleCards() {
    cardArray.sort(() => 0.5 - Math.random())
    // create function updateBoard()
    // which will get all the p elements, and will update their inner text
    // to be the new one from the shuffled cardArray

    // const cards = get by class name ("card")
    // for (...) {
    // cards[i].className.replace("matched", "")
    // const text = cards[i].childNodes[1]
    // same for img
    // text.innerText = cardsArray[i].text

    // turn over the cards by setting display properties accordingly
    // text.style.display = "none"
    // set display of img to block
    //}


    // remove matched class from all cards

  }

  //flip your card
  function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].reference)
    cardsChosenId.push(cardId)
    // this.innerText = cardArray[cardId].text // delete, cause we have the text already
    let image = this.childNodes[0]
    let text = this.childNodes[1]
    image.style.display = 'none'
    text.style.display = 'block'
    // set the display of the img to none and of the p to block
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500)
    }
  }

  createBoard()
})
