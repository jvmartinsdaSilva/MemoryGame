const cards = document.querySelectorAll('.card')
const moves = document.querySelector('.moves')
const reset = document.querySelector('.reset')
let move = 00

reset.addEventListener('click', resetGame)

cards.forEach(card => card.addEventListener('click', flip))

let hasFlipped = false
let lockCards = false
let card1, card2

function flip(){
    if(lockCards)return
    if(this === card1)return
    this.classList.add('flip')

    if(!hasFlipped){
        hasFlipped = true
        card1 = this
        return
    }

    resetCards()
    card2 = this

    checkPar()
    
}

function checkPar(){
    counterMoves()
    if(card1.dataset.framework === card2.dataset.framework){
        desativeFlip()
    }
    FlipReturn()
}

function FlipReturn(){
    lockCards = true
    setTimeout(() => {
        card1.classList.remove('flip')
        card2.classList.remove('flip')
        resetCards()
    }, 1500)  
}

function resetCards(){
    [hasFlipped, lockCards] = [false, false]
    [card1, card2] = [null, null]
}

function sort(){
    cards.forEach(card => {
        let num =   Math.floor(Math.random() * 12)
        card.style.order = num
    })
}

sort()

function counterMoves(){
    move++
    if(move < 10){
        moves.innerHTML = `0 ${move}` 
    } else{
        moves.innerHTML = move
    }
}

function resetGame() {
    cards.forEach(card => card.classList.remove('flip'))
    resetCards()
    move = -1
    counterMoves()
    sort()
    help()
}

function help(){
    cards.forEach(card => card.classList.add('flip'))
    setTimeout(() => {
        cards.forEach(card => card.classList.remove('flip'))
    }, 1700)

}

function desativeFlip(){
    card1.removeEventListiner('click')
    card2.removeEventListiner('click')
}