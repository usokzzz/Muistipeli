import { createBoard, restartGame } from './board.js';
let currentCardCount;

document.addEventListener('DOMContentLoaded', () => {
    const cardCount = parseInt(prompt("Syötä korttien määrä (parillinen luku):"), 10);

    if (cardCount % 2 !== 0) {
        alert("Korttien määrän täytyy olla parillinen luku.");
        return;
    }

    currentCardCount = cardCount;

    createBoard(cardCount);

    document.getElementById('restart-button')
        .addEventListener('click', () => {
            restartGame(currentCardCount);
        });
});
