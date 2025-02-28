// Quiz data
const quizData = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language"
        ],
        correctAnswer: 0
    },
    {
        question: "Which of the following is not a JavaScript data type?",
        options: [
            "String",
            "Boolean",
            "Float",
            "Object"
        ],
        correctAnswer: 2
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: [
            "font-color",
            "text-color",
            "color",
            "text-style"
        ],
        correctAnswer: 2
    },
    {
        question: "What symbol is used for comments in JavaScript?",
        options: [
            "// for single line comments",
            "/* */ for multi-line comments",
            "Both A and B",
            "# for single line comments"
        ],
        correctAnswer: 2
    },
    {
        question: "Which operator is used to assign a value to a variable in JavaScript?",
        options: [
            "==",
            "=",
            ":=",
            "==="
        ],
        correctAnswer: 1
    },
    {
        question: "What is the correct way to create a function in JavaScript?",
        options: [
            "function = myFunction()",
            "function:myFunction()",
            "function myFunction()",
            "create myFunction()"
        ],
        correctAnswer: 2
    },
    {
        question: "Which method is used to add an element at the end of an array in JavaScript?",
        options: [
            "push()",
            "append()",
            "add()",
            "addToEnd()"
        ],
        correctAnswer: 0
    },
    {
        question: "Which of the following is a CSS framework?",
        options: [
            "React",
            "Angular",
            "Bootstrap",
            "jQuery"
        ],
        correctAnswer: 2
    },
    {
        question: "What does API stand for?",
        options: [
            "Application Programming Interface",
            "Application Process Integration",
            "Automated Program Interface",
            "Application Protocol Interface"
        ],
        correctAnswer: 0
    },
    {
        question: "Which method is used to remove the last element from an array in JavaScript?",
        options: [
            "pop()",
            "remove()",
            "delete()",
            "splice()"
        ],
        correctAnswer: 0
    }
];

// DOM elements
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const questionCounterElement = document.getElementById('question-counter');
const timerElement = document.getElementById('time');
const progressBarElement = document.getElementById('progress-bar');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const summaryElement = document.getElementById('summary');
const restartButton = document.getElementById('restart-button');

// Quiz state
let currentQuestion = 0;
let score = 0;
let timer;
let timeSpent = 0;
let userAnswers = new Array(quizData.length).fill(null);

// Initialize quiz
function initQuiz() {
    // Reset quiz state
    currentQuestion = 0;
    score = 0;
    timeSpent = 0;
    userAnswers = new Array(quizData.length).fill(null);

    // Display first question
    displayQuestion();

    // Start timer
    startTimer();

    // Show quiz container, hide result container
    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';

    // Update progress bar
    updateProgressBar();
}

// Display current question
function displayQuestion() {
    const question = quizData[currentQuestion];

    // Update question counter
    questionCounterElement.textContent = `Question: ${currentQuestion + 1}/${quizData.length}`;

    // Display question
    questionElement.textContent = question.question;

    // Clear options
    optionsElement.innerHTML = '';

    // Add options
    question.options.forEach((option, index) => {
        const li = document.createElement('li');
        li.className = 'option';
        li.textContent = option;
        li.dataset.index = index;

        // Add selected class if this option was previously selected
        if (userAnswers[currentQuestion] === index) {
            li.classList.add('selected');
        }

        li.addEventListener('click', selectOption);
        optionsElement.appendChild(li);
    });

    // Update button states
    prevButton.disabled = currentQuestion === 0;
    nextButton.disabled = userAnswers[currentQuestion] === null;

    // Update text for next button on last question
    if (currentQuestion === quizData.length - 1) {
        nextButton.textContent = 'Finish';
    } else {
        nextButton.textContent = 'Next';
    }

    // Update progress bar
    updateProgressBar();
}

// Select an option
function selectOption(e) {
    const selectedOption = e.target;
    const selectedIndex = parseInt(selectedOption.dataset.index);

    // Remove selected class from all options
    const options = optionsElement.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));

    // Add selected class to clicked option
    selectedOption.classList.add('selected');

    // Save user's answer
    userAnswers[currentQuestion] = selectedIndex;

    // Enable next button
    nextButton.disabled = false;
}

// Go to next question
function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        // End the quiz
        endQuiz();
    }
}

// Go to previous question
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
}

// End the quiz
function endQuiz() {
    // Stop timer
    clearInterval(timer);

    // Calculate score
    score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizData[index].correctAnswer) {
            score++;
        }
    });

    // Display score
    scoreElement.textContent = `Your Score: ${score} / ${quizData.length}`;

    // Create summary
    let summaryHTML = '<h3>Summary:</h3><ul>';
    quizData.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const correctAnswer = question.correctAnswer;
        const isCorrect = userAnswer === correctAnswer;

        summaryHTML += `
            <li style="margin-bottom: 10px; text-align: left;">
                <strong>Q${index + 1}:</strong> ${question.question}<br>
                <span style="color: ${isCorrect ? 'green' : 'red'};">
                    Your answer: ${userAnswer !== null ? question.options[userAnswer] : 'Not answered'}
                </span><br>
                <span style="color: green;">
                    Correct answer: ${question.options[correctAnswer]}
                </span>
            </li>
        `;
    });
    summaryHTML += '</ul>';

    summaryElement.innerHTML = summaryHTML;

    // Show result container, hide quiz container
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
}

// Start timer
function startTimer() {
    // Reset timer
    timeSpent = 0;
    timerElement.textContent = timeSpent;

    // Start interval
    timer = setInterval(() => {
        timeSpent++;
        timerElement.textContent = timeSpent;
    }, 1000);
}

// Update progress bar
function updateProgressBar() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressBarElement.style.width = `${progress}%`;
}

// Event listeners
prevButton.addEventListener('click', prevQuestion);
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', initQuiz);

// Initialize quiz
initQuiz();