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
