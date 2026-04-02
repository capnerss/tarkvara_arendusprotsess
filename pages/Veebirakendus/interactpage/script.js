const taskInput = document.querySelector('#to_do_item');
const addButton = document.querySelector('#add-btn');
const taskList = document.querySelector('#task-list');
const navBtn1 = document.querySelector('#myBtn');
const navBtn2 = document.querySelector('#myBtn2');
const navBtn3 = document.querySelector('#myBtn3');
const toDoList = document.querySelector('#to_do_list');
const quiz = document.querySelector('#quiz');
const game = document.querySelector('#game');
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
const inputField = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const messageDisplay = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');


function createTask(text) {
    const task = document.createElement('li');
    task.textContent = text;
    const remover = document.createElement('button')
    remover.textContent = 'Remove';
    remover.className = 'remove-btn'; // Добавлен класс для стилизации кнопки
    remover.addEventListener('click', function () {
        task.remove();
    })
    task.appendChild(remover)
    taskList.appendChild(task);
}

function checkQuiz() {
    let score = 0;
    const answers = {
        q1: 'b',
        q2: 'c',
        q3: 'a'
    };

    const resultDiv = document.getElementById('quiz-result');
    resultDiv.innerHTML = '';

    for (let q in answers) {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        if (selected && selected.value === answers[q]) {
            score++;
        }
    }

    resultDiv.innerText = `Sa said ${score} punkti 3-st!`;
    if (score === 3) {
        resultDiv.style.color = '#27ae60';
        resultDiv.style.backgroundColor = '#e8f8f5';
        resultDiv.innerText += " Suurepärane töö!";
    } else {
        resultDiv.style.color = '#e74c3c';
        resultDiv.style.backgroundColor = '#fdf2e9';
        resultDiv.innerText += " Proovi uuesti!";
    }
}

addButton.addEventListener('click', function () {
    const text = taskInput.value.trim();
    if (text === "") {
        alert("Add text!");
        return;
    }
    createTask(text);
    taskInput.value = "";
});

navBtn1.addEventListener('click', function () {
    toDoList.style.display = 'block';
    quiz.style.display = 'none';
    game.style.display = 'none';
})
navBtn2.addEventListener('click', function () {
    toDoList.style.display = 'none';
    quiz.style.display = 'block';
    game.style.display = 'none';
})
navBtn3.addEventListener('click', function () {
    toDoList.style.display = 'none';
    quiz.style.display = 'none';
    game.style.display = 'block';
})


function checkGuess() {
    const guess = parseInt(inputField.value, 10);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        messageDisplay.textContent = 'Palun sisesta sobiv arv vahemikus 1 kuni 100!';
        messageDisplay.style.color = '#e74c3c';
        return;
    }

    attempts++;

    if (guess === secretNumber) {
        messageDisplay.textContent = `🎉 Õige! See oli arv ${secretNumber}. Katseid: ${attempts}`;
        messageDisplay.style.color = '#27ae60';
        endGame();
    } else if (guess < secretNumber) {
        messageDisplay.textContent = 'Liiga väike! Proovi suuremat arvu.';
        messageDisplay.style.color = '#333';
    } else {
        messageDisplay.textContent = 'Liiga suur! Proovi väiksemat arvu.';
        messageDisplay.style.color = '#333';
    }

    inputField.value = '';
    inputField.focus();
}

function endGame() {
    inputField.disabled = true;
    guessBtn.disabled = true;
    restartBtn.style.display = 'inline-block';
}

function resetGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;

    inputField.disabled = false;
    guessBtn.disabled = false;
    inputField.value = '';
    messageDisplay.textContent = '';
    restartBtn.style.display = 'none';

    inputField.focus();
}

guessBtn.addEventListener('click', checkGuess);
restartBtn.addEventListener('click', resetGame);

inputField.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});