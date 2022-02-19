let deckId = ""
let computerScore = 0
let myScore = 0
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const header = document.getElementById("header")
const remainingCards = document.getElementById("remaining")
const computerScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("my-score")

async function handleClick() {
    const res = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    const data = await res.json()    
        remainingCards.textContent = `Carte rimanenti: ${data.remaining}`
        deckId = data.deck_id    
    }

newDeckBtn.addEventListener("click", handleClick)

drawCardBtn.addEventListener("click", async () => {
    const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()
        remainingCards.textContent = `Carte rimanenti: ${data.remaining}`
        cardsContainer.children[0].innerHTML = `
            <img src=${data.cards[0].image} class="card" />  `

        cardsContainer.children[1].innerHTML = `
            <img src=${data.cards[1].image} class="card" /> `
            
            const winnerText = cardWinner(data.cards[0], data.cards[1])
            header.textContent = winnerText

            if (data.remaining === 0) {
                drawCardBtn.disabled = true
                if (computerScore > myScore) {
                    header.textContent = "Il Computer ha vinto la partita!"
                } else if (myScore > computerScore) {
                    header.textContent = "Hai vinto la partita!"
                } else {
                    header.textContent ="È un pareggio!"
                }
            }
        })

function cardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", "10", 
    "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)

if (card1ValueIndex > card2ValueIndex) {
    computerScore++
    computerScoreEl.textContent = `Computer punteggio: ${computerScore}`
    return "Computer vince!"
} else if (card1ValueIndex < card2ValueIndex) {
    myScore++
    myScoreEl.textContent = `Mio punteggio: ${myScore}`
    return "Hai vinto!"
} else {
    return "Pari!"
}}



/*const card1Obj = {
    value: "JACK"
}

const card2Obj = {
    value: "2"
}

cardWinner(card1Obj, card2Obj)*/