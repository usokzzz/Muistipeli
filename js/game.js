import { createBoard, restartGame } from './board.js';

let currentCardCount;

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const cardSelect = document.getElementById('card-count-select');

    startButton.addEventListener('click', () => {
        const cardCount = parseInt(cardSelect.value);

        currentCardCount = cardCount;

        restartGame(cardCount);
    });

    restartButton.addEventListener('click', () => {
        restartGame(currentCardCount);
    });
});
