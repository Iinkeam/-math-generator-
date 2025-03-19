let currentDifficulty = "easy";
let correctAnswers = 0;
let wrongAnswers = 0;
let currentTaskType = "";

// Елементи
const mainScreen = document.getElementById("main-screen");
const difficultyScreen = document.getElementById("difficulty-screen");
const menuScreen = document.getElementById("menu-screen");
const taskScreen = document.getElementById("task-screen");
const hintBox = document.getElementById("hint-box");
const hintContent = document.getElementById("hint-content");

// Кнопки
document.getElementById("start-btn").addEventListener("click", () => {
    mainScreen.classList.add("hidden");
    difficultyScreen.classList.remove("hidden");
});

document.querySelectorAll(".difficulty-btn").forEach(button => {
    button.addEventListener("click", function() {
        currentDifficulty = this.dataset.level;
        difficultyScreen.classList.add("hidden");
        menuScreen.classList.remove("hidden");
    });
});

document.querySelectorAll(".task-btn").forEach(button => {
    button.addEventListener("click", function() {
        menuScreen.classList.add("hidden");
        taskScreen.classList.remove("hidden");
        currentTaskType = this.dataset.task;
        startTask();
    });
});

document.getElementById("check-answer").addEventListener("click", checkAnswer);
document.getElementById("next-question").addEventListener("click", startTask);
document.getElementById("prev-question").addEventListener("click", startTask);
document.getElementById("hint-btn").addEventListener("click", showHint);

// Функція генерації завдань
function startTask() {
    let question = "";
    let correctAnswer = "";

    if (currentTaskType === "equations") {
        question = "Розв’яжіть рівняння: 2x + 3 = 7";
        correctAnswer = "2";
    } else if (currentTaskType === "graphs") {
        question = "Введіть формулу графіка, який зображений.";
        correctAnswer = "y=x^2";
    } else if (currentTaskType === "inequalities") {
        question = "Розв’яжіть нерівність: x^2 - 4 > 0";
        correctAnswer = "x < -2 або x > 2";
    }

    document.getElementById("task-title").innerText = currentTaskType;
    document.getElementById("task-question").innerText = question;
    document.getElementById("user-answer").dataset.correct = correctAnswer;
    hintBox.classList.add("hidden"); // Сховати підказку
}

// Функція перевірки відповіді
function checkAnswer() {
    const userAnswer = document.getElementById("user-answer").value.trim();
    const correctAnswer = document.getElementById("user-answer").dataset.correct;
    const resultMessage = document.getElementById("result-message");

    if (userAnswer === correctAnswer) {
        resultMessage.innerText = "✅ Правильно!";
        correctAnswers++;
    } else {
        resultMessage.innerText = "❌ Неправильно! Спробуйте ще раз.";
        wrongAnswers++;
    }
}

// Функція показу підказки
function showHint() {
    let hint = "";

    if (currentTaskType === "equations") {
        hint = "📘 Підказка: Користуйтесь формулами скороченого множення:\n(a + b)^2 = a^2 + 2ab + b^2\n(a - b)^2 = a^2 - 2ab + b^2";
    } else if (currentTaskType === "graphs") {
        hint = "📘 Підказка: Основні формули функцій:\ny = kx + b (лінійна)\ny = ax^2 + bx + c (квадратична)";
    } else if (currentTaskType === "inequalities") {
        hint = "📘 Підказка: Не забувайте про правило зміни знака нерівності при множенні на від’ємне число!";
    }

    hintContent.innerText = hint;
    hintBox.classList.remove("hidden");
}
