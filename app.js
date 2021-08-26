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
      text: 'Daca ne marturisim pacatele El este credincios si drept ca sa ne ierte toate pacatele si sa ne curășească de orice nelegiuire'
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
      const card = document.createElement('p')
      card.className = 'card '
      card.innerText = 'click me'
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard)
      grid.appendChild(card)
    }
  }

  //check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll('p')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]

    if (optionOneId == optionTwoId) {
      // cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionOneId].innerText = 'click me'
      cards[optionTwoId].innerText = 'click me'
      // alert('You have clicked the same image!')
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      // alert('You found a match')
      // cards[optionOneId].innerText = ''
      cards[optionOneId].className += 'matched '
      cards[optionTwoId].className += 'matched '
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
    } else {
      cards[optionOneId].innerText = 'click me'
      cards[optionTwoId].innerText = 'click me'
      // cards[optionTwoId].setAttribute('src', 'images/blank.png')
      // alert('Sorry, try again')
    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    if (cardsWon.length === cardArray.length / 2) {
      resultDisplay.textContent = 'Congratulations! You found them all!'
    }
  }

  //flip your card
  function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].reference)
    cardsChosenId.push(cardId)
    this.innerText = cardArray[cardId].text
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500)
    }
  }

  createBoard()
})
