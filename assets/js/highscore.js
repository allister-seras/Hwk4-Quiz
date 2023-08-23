let highScores = document.getElementById("highScores")

function getHighScores () {
    let storedUsers;
    if(JSON.parse(localStorage.getItem("highScores")) === null) {
        storedUsers = [];
    }
    else {
        storedUsers = JSON.parse(localStorage.getItem("highScores"));
    }

    storedUsers.sort((a, b) => b.userScore - a.userScore);

    let topScores = storedUsers.slice(0, 10);

    console.log(topScores);
    console.log(storedUsers);

    for (let i = 0; i < topScores.length; i++) {
        leaderboard = document.createElement("div")
        leaderboard.textContent = storedUsers[i].user + " | " + storedUsers[i].userScore
        highScores.append(leaderboard);
    }
}

returnBtn.addEventListener("click", function () {
    window.location = "index.html"
})


getHighScores();