import { createCardElement, flipCard } from './card.js';

const allCards = [
    '🍎', '🍐', '🍒', '🍉', '🍇', '🍓', '🍌', '🍍', '🥝', '🥥', '🍑', '🍈', '🍋', '🍊', '🍏', '🍅'
];
let gameBoard;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let attempts = 0;
let attemptCounter;
let timer;
let seconds = 0;
let timerElement;
let totalCards = 0;

let previousAttempts = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function createBoard(cardCount) {
    const gameBoard = document.getElementById('game-board');
    attemptCounter = document.getElementById('attempt-counter');
    timerElement = document.getElementById('timer');

    totalCards = cardCount;

    gameBoard.innerHTML = '';

    const selectedCards = allCards.slice(0, cardCount / 2);
    const cards = [...selectedCards, ...selectedCards];

    shuffle(cards);

    clearInterval(timer);

seconds = 0;
timerElement.textContent = 'Aika: 0s';

timer = setInterval(() => {
    seconds++;
    timerElement.textContent = `Aika: ${seconds}s`;
}, 1000);
    

    cards.forEach(card => {
    const cardElement = createCardElement(card);

    cardElement.addEventListener('click', () => {
        if (lockBoard) return;
        flipCard(cardElement, handleCardFlip);
    });

    gameBoard.appendChild(cardElement);
});
}
export function restartGame(cardCount) {
    const gameBoard = document.getElementById('game-board');
attemptCounter = document.getElementById('attempt-counter');
    
    gameBoard.innerHTML = '';

    firstCard = null;
    secondCard = null;
    lockBoard = false;

    attempts = 0;
    previousAttempts = [];
attemptCounter.textContent = 'Yritykset: 0';

    createBoard(cardCount);
}

function handleCardFlip(cardElement) {
    if (lockBoard) return;
    if (cardElement === firstCard) return;

    if (!firstCard) {
        firstCard = cardElement;
        return;
    }

    secondCard = cardElement;

    lockBoard = true;

    const attemptKey = [firstCard.dataset.card, secondCard.dataset.card]
        .sort()
        .join('-');

    if (!previousAttempts.includes(attemptKey)) {
        previousAttempts.push(attemptKey);

        attempts++;
        attemptCounter.textContent = `Yritykset: ${attempts}`;
    }
    
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    const flippedCards = document.querySelectorAll('.flipped');

if (flippedCards.length === totalCards) {
    clearInterval(timer);
}
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
