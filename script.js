const cards = document.querySelectorAll('.card')
let hasFlipCard = false
let firstCard, secondCard
let lockBorad = false

function flipCard() {
  if (lockBorad) return
  if (this === firstCard) return

  this.classList.add('flip')
  if (!hasFlipCard) {
    hasFlipCard = true
    firstCard = this
    return
  }

  secondCard = this
  hasFlipCard = false
  checkForMatch()
}

function checkForMatch() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    disableCards()
    return
  }
  unflipCards()
}

function disableCards() {
  firstCard.removeEventListner('click', flipCard)
  secondCard.removeEventListner('click', flipCard)

  resetBoard()
}

function unflipCards() {
  lockBorad = true

  setTimeout(() => {
    firstCard.classList.remove('flip')
    secondCard.classList.remove('flip')

    resetBoard()
  }, 1500)
}

function resetBoard() {
  [hasFlipCard, lockBorad] = [false, false]
  [firstCard, secondCard] = [null,null]
}

;(function shuffle() {
  cards.forEach((card) => {
    let ramdonPosition = Math.floor(Math.random() * 12)
    console.log(ramdonPosition)
    card.style.order = ramdonPosition
  })
})()

cards.forEach((card) => {
  card.addEventListener('click', flipCard)
})