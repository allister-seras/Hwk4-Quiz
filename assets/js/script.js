let startBtn = document.getElementById("startBtn")
let timer = document.getElementById("timer")
let questions = document.getElementById("questions")
let choices = document.getElementById("choices")
let score = document.getElementById("score")
let quiz = document.getElementById("quiz")
let initials = document.getElementById("initials")
let initialsForm = document.getElementById("initialsForm")

//Create an array of questions
var questionArray = [
    { question: "1. What ability score is commonly associated with melee attacks?",
    choices: ["a) Wisdom", "b) Dexterity", "c) Constitution", "d) Strength"],
    answer: "d) Strength"
    },
    { question: "2. Which die is used to determine a character's hit points at 1st level?",
    choices: ["a) d4", "b) d6", "c) d8", "d) d10"],
    answer: "c) d8"
    },
    { question: "3. Which class is known for its ability to cast spells and heal wounds?",
    choices: ["a) Fighter", "b) Rogue", "c) Cleric", "d) Barbarian"],
    answer: "c) Cleric"
    },
    { question: "4. What is the primary ability score for a Wizard's spellcasting",
    choices: ["a) Strength", "b) Dexterity", "c) Constitution", "d) Intelligence"],
    answer: "d) Intelligence"},
    { question: "5. Which skill is used to decipher ancient texts, languages, and magical effects?",
    choices: ["a) Investigation", "b) Insight", "c) Arcana", "d) Nature"],
    answer: "c) Arcana"},
    { question:  "6. What is the maximum level a character can achieve in D&D 5e?",
    choices: ["a) 10", "b) 20", "c) 30", "d) 50"],
    answer: "b) 20"},
    { question: "7. What does AC stand for in D&D 5e?",
    choices: ["a) Armor Class", "b) Attack and Counter", "c) Ability Check", "d) Arcane Casting"],
    answer: "a) Armor Class"},
    { question: "8. Which class is known for its connection to nature and ability to shape-shift into different creatures?",
    choices: ["a) Ranger", "b) Druid", "c) Sorcerer", "d) Warlock"],
    answer: "b) Druid"},
    { question: "What is the purpose of a saving throw in D&D 5e?",
    choices: ["a) To attack an enemy", "b) To resist an effect or danger", "c) To determine initiative order", "d) To search for hidden objects"],
    answer: "b) To resist an effect or danger"},
    { question: "Which class gains their power through a pact with a powerful entity?",
    choices: ["a) Wizard", "b) Sorcerer", "c) Bard", "d) Warlock"],
    answer: "d) Warlock"},
];

let questionIndex = 0;
let scoreCount = 0;
let timerCount = 15;
let storedUsers;
console.log(questionArray[0].question)


//Create start button to begin the quiz
startBtn.addEventListener("click", function () {
    startBtn.style.display = "none";
    highScoresBtn.style.display = "none";
    startTimer();
    runQuiz();
});

//Create timer once start button is clicked
function startTimer() {
    timer.textContent = "Time:" + timerCount;
    let countdown = setInterval(() => {
        timerCount--;
        timer.textContent = "Time: " + timerCount;
        if(timerCount <= 0) {
            clearInterval(countdown);
            endQuiz();
        }
    }, 1000);
};

//Display first question with 4 possible answers
function runQuiz () {
    score.textContent = "Score: " + scoreCount;
    quiz.style.display = "block"
    questions.textContent = questionArray[questionIndex].question;
    for (let i = 0; i < questionArray[questionIndex].choices.length; i++) {
        let choiceBtn = document.createElement("button")
        choiceBtn.textContent = questionArray[questionIndex].choices[i];
        choiceBtn.addEventListener("click", function () {
            manageUserSelection(choiceBtn.textContent);
            console.log(choiceBtn.textContent);
        });
        choices.append(choiceBtn);
    }
};

//Manage the decsion that user makes (correct or incorrect answers)
function manageUserSelection(userSelection) {
    console.log(userSelection);

    if (userSelection === questionArray[questionIndex].answer) {
        scoreCount += 10;  // Add 10 to the score for a correct answer
        timerCount += 5;   // Add 5 to the timer for a correct answer
    } else {
        timerCount -= 5;   // Deduct 5 from the timer for an incorrect answer
    }
    questionIndex++;
    choices.innerHTML = "";

    if (questionIndex === questionArray.length) {
        return endQuiz();
    }

    runQuiz();
}

function endQuiz() {
    //If placed in HTML together, then all of this could hide with one command
    quiz.style.display = "none";
    timer.style.display = "none";
    score.textContent = "Score: " + scoreCount;
    initialsForm.style.display = "block"
}

//Save the high score on local storage
function onPageLoad () {
    initialsForm.style.display = "none";
    quiz.style.display = "none"
    if(JSON.parse(localStorage.getItem("highScores")) === null) {
        storedUsers = [];
    }
    else {
        storedUsers = JSON.parse(localStorage.getItem("highScores"));
    }
    console.log(storedUsers);
}

onPageLoad();

function saveScore (e) {
    e.preventDefault();
    let newScore = {
        user: initials.value,
        userScore: scoreCount
    }

    storedUsers.push(newScore);
    localStorage.setItem("highScores", JSON.stringify(storedUsers))

    window.location = "highscore.html"
}

initialsForm.addEventListener("submit", saveScore)

//Have option to view high scores
