const questions = [
    {
        question: "Which of the following is the correct syntax to print a page using JavaScript?",
        options: ["window.print()", "browser.print()", "navigator.print()", "document.print()"],
        answer: "window.print()"
    },
    {
        question: "How can you add a comment in JavaScript?",
        options: ["/*This is a comment*/", "// This is a comment", "# This is a comment", "** This is a comment **"],
        answer: "// This is a comment"
    },
    {
        question: "Which built-in method returns the length of the string?",
        options: ["length()", "size()", "index()", "None of the above"],
        answer: "length()"
    },
    {
        question: "Which of the following function of Array object calls a function for each element in the array?",
        options: ["concat()", "every()", "forEach()", "filter()"],
        answer: "forEach()"
    },
    {
        question: "Which of the following is a valid type of function JavaScript supports?",
        options: ["named function", "anonymous function", "both of the above", "none of the above"],
        answer: "both of the above"
    },
    {
        question: "Which of the following is not a reserved word in JavaScript?",
        options: ["interface", "throws", "program", "short"],
        answer: "program"
    },
    {
        question: "How do you create a function in JavaScript?",
        options: ["function:myFunction()", "function = myFunction()", "function myFunction()", "myFunction():function"],
        answer: "function myFunction()"
    },
    {
        question: "How do you call a function named 'myFunction'?",
        options: ["call myFunction()", "call function myFunction()", "myFunction()", "Call.myFunction()"],
        answer: "myFunction()"
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        options: ["onchange", "onclick", "onmouseclick", "onmouseover"],
        answer: "onclick"
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        options: ["var colors = (1:'red', 2:'green', 3:'blue')", "var colors = ['red', 'green', 'blue']", "var colors = 'red', 'green', 'blue'", "var colors = {1:'red', 2:'green', 3:'blue'}"],
        answer: "var colors = ['red', 'green', 'blue']"
    }
];

let ol = document.getElementById("parent-list")
let timerSeconds = 300;
let currentIndex = 0;
let score = 0;
let selectedArr = [];
const nextBtn = document.getElementById("next-btn")
const previousBtn = document.getElementById("previous-btn")
const timerElem = document.getElementById("timer")
const warningText = document.getElementById("warning")
const remainingQuestions = document.getElementById("remain-questions")
const totalMarks = questions.length

// console.log(questions[currentIndex])
const startQuizButton = () => {
    ol.innerHTML = `<div class="start-parent background">
    <button id="start" class="start" onclick="displayQuestion(), timer()">Start Quiz</button>
    </div>`
}

const timer = () => {
    timerSeconds = 300
    const updateTimer = () => {
        const minutes = Math.floor(timerSeconds / 60)
        const seconds = timerSeconds % 60
        timerElem.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
        if (timerSeconds > 0) {
            timerSeconds--
        } else {
            alert("Times Up")
            seeResults()
            clearInterval(timerInterval)
        }
    }
    const timerInterval = setInterval(updateTimer, 1000)
}

const questionsInfo = () => {
    remainingQuestions.innerText = `Questions: ${currentIndex + 1} / ${totalMarks}`
}

const displayQuestion = () => {
    const choicesArr = questions[currentIndex].options
    const question = questions[currentIndex].question
    const answer = questions[currentIndex].answer
    ol.innerHTML = ""
    nextBtn.classList.add("next-visiblity")
    ol.innerHTML += `<h4 class="question-heading background">${currentIndex + 1}) ${question}</h4>`
    choicesArr.forEach((choice, i) => {
        ol.innerHTML += `<div class="parent background" >
            <span class="input-span background">
            <input type="radio" class="main-elem"
            onclick="checkAnswer('${choice}', '${answer}')"
            name="options" value="${choice}">
            </span>
            <label class="choice background">${choice}</label>
            </div> `
    })
    if (currentIndex !== 0) {
        previousBtn.classList.add("vis")
    }
    questionsInfo()
}


const checkInput = () => {
    let isClicked = false
    const inp = document.querySelectorAll(".main-elem");
    inp.forEach((elem) => {
        if (elem.checked) {
            isClicked = true;
            warningText.innerText = ""
            const select = { selected: elem.value}
            selectedArr.push(select)
            localStorage.setItem("selected", JSON.stringify(selectedArr))
        }
    });
    if (!isClicked) {
        warningText.innerText = "Select a field!"
        return false
    }
    // warningText.innerText = ""
    return true
}
const checkAnswer = (selectedChoice, selectedAnswer) => {
    if (selectedChoice === selectedAnswer) {
        score++
        localStorage.setItem("usersScore", JSON.stringify(score))
    }
}

const previous = () => {
    warningText.innerText = ""
    if (currentIndex === 1) {
        currentIndex--
        displayQuestion()
        previousBtn.classList.remove("vis")
    } else {
        currentIndex--
        displayQuestion()
    }
}


const seeResults = () => {
    ol.innerHTML = ""
    let scorePercentile = score / totalMarks * 100
    if (scorePercentile >= 60) {
        ol.innerHTML = `<div class="centering">
        <div class="score-text background">You Passed</div>
        <div class="score-text result-circle passed">${scorePercentile}%</div>
        </div>`
    } else {
        ol.innerHTML = `<div class="centering">
        <div class="score-text background">You Failed</div>
        <div class="score-text result-circle failed">${scorePercentile}%</div>
        </div>`
    }
    previousBtn.classList.remove("vis")
    nextBtn.classList.remove("next-visiblity")
}

const stopTimer = () => {
    timerSeconds = 0
    timerElem.classList.add("timer-hidden")
}

nextBtn.addEventListener("click", () => {
    if (checkInput()) {
        currentIndex++
        if (currentIndex < questions.length) {
            displayQuestion()
        } else {
            seeResults()
        }
        if (questions.length - currentIndex === 1) {
            nextBtn.classList.add("large-width")
            nextBtn.innerText = "Submit"
        }
        if (questions.length - currentIndex === 0) {
            nextBtn.addEventListener("click", stopTimer())
        }
    }
})

previousBtn.addEventListener("click", () => previous())
startQuizButton()
// checkInput()

// const restartQuiz = () => {
//     if (currentIndex - 1 === questions.length) {
//         currentIndex = 0
//         score = 0
//         nextBtn.innerText = "Next"
//         nextBtn.className = " next"
//         timerElem.classList.remove("timer-hidden")
//         timer()
//         displayQuestion()
//     }
// }