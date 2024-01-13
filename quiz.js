//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "What are the primitive data types in JavaScript?",
        options: ["a) String, Boolean, Null, Undefined", "b) Integer, Float, Char, Object", "c) Number, Object, Array, Function", "d) True, False, Null, NaN"],
        correct: "a) String, Boolean, Null, Undefined",
    },
    {
        id: "1",
        question: "Which keyword is used to declare a constant variable in JavaScript?",
        options: ["a) let", "b) var", "c) const", "d) constant"],
        correct: "c) const",
    },
    {
        id: "2",
        question: "How do you declare a function expression in JavaScript?",
        options: ["a) function myFunction() {}", "b) const myFunction = function() {}", "c) const function myFunction() {}", "d) function = myFunction() {}"],
        correct: "b) const myFunction = function() {}",
    },
    {
        id: "3",
        question: "What is the key difference between let and const in variable declaration?",
        options: ["a) let is block-scoped, and const is function-scoped.", "b) let is constant, and const is variable.", "c) let allows reassignment, and const does not.", "d) let is for strings, and const is for numbers."],
        correct: "c) let allows reassignment, and const does not.",
    },
    {
        id: "4",
        question: "How do you access the first element of an array named myArray?",
        options: ["a) myArray[0]", "b) myArray.first()", "c) myArray.getFirst()", "d) myArray.element(1)"],
        correct: "a) myArray[0]",
    },
    {
        id: "5",
        question: "What is the primary purpose of the this keyword in JavaScript?",
        options: ["a) Referring to the current instance of an object.", "b) Creating a new variable in the local scope.", "c) Accessing the global scope.", "d) Identifying data types."],
        correct: "a) Referring to the current instance of an object.",
    }, {
        id: "6",
        question: "Which of the following is an example of closure in JavaScript?",
        options: ["a) A loop iterating through an array.", "b) A function accessing variables from its outer scope.", "c) Declaring variables within a function.", "d) An if statement inside a function."],
        correct: "b) A function accessing variables from its outer scope.",
    },
    {
        id: "7",
        question: "What is the purpose of promises in asynchronous JavaScript?",
        options: ["a) To handle synchronous operations.", "b) To replace callbacks in asynchronous code.", "c) To define constant values.", "d) To create loops."],
        correct: "b) To replace callbacks in asynchronous code.",
    },
    {
        id: "8",
        question: "How do you convert a callback-based asynchronous function to use Promises in JavaScript?",
        options: ["a) Wrapping the function in a Promise constructor.", "b) Using await keyword inside the function.", "c) Using the callbackToPromise utility.", "d) Adding a then method after the function call."],
        correct: "a) Wrapping the function in a Promise constructor.",
    },
    {
        id: "9",
        question: "In JavaScript, what is the purpose of the async keyword in a function declaration?",
        options: ["a) To indicate that the function returns a promise.", "b) To make the function execute asynchronously.", "c) To define a new variable in the local scope.", "d) To handle errors in the function."],
        correct: "b) To make the function execute asynchronously.",
    },
];

restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});
//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);
//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};
//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};
//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}
//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");
    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }
    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}
//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}
//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});
//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};
