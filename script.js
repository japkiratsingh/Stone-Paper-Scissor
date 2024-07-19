let userScore = 0;
let computerScore = 0;

const userScoreSpan = document.getElementById('user-score');
const computerScoreSpan = document.getElementById('computer-score');
const resultDiv = document.getElementById('result');
const choices = document.querySelectorAll('.choice');
const rulesButton = document.getElementById('rules-button');
const rulesBox = document.getElementById('rules-box');
const closeRulesButton = document.getElementById('close-rules');
const winnerWindowYouPicked = document.getElementById('winnerWindowYouPicked')
const winnerWindowPcPicked = document.getElementById('winnerWindowPcPicked')
const loosingWindowYouPicked = document.getElementById('loosingWindowYouPicked')
const loosingWindowPcPicked = document.getElementById('loosingWindowPcPicked')
const tieWindowYouPicked = document.getElementById('tieWindowYouPicked')
const tieWindowPcPicked = document.getElementById('tieWindowPcPicked')
const ScoreBoard = document.getElementsByClassName('container-name-score')[0]
const replayBtn = document.getElementsByClassName('go-gameContainer')

// Load scores from local storage
const loadScores = () => {
    const storedUserScore = localStorage.getItem('userScore');
    const storedComputerScore = localStorage.getItem('computerScore');

    if (storedUserScore !== null) {
        userScore = parseInt(storedUserScore);
        userScoreSpan.textContent = userScore;
    }

    if (storedComputerScore !== null) {
        computerScore = parseInt(storedComputerScore);
        computerScoreSpan.textContent = computerScore;
    }
};

// Save scores to local storage
const saveScores = () => {
    localStorage.setItem('userScore', userScore);
    localStorage.setItem('computerScore', computerScore);
};

const getComputerChoice = () => {
    const choices = ['rock', 'paper', 'scissors'];
    const randomChoice = (Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER))) % 3;
    return choices[randomChoice];
};

const getResult = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) {
        return 'draw';
    }
    if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'scissors' && computerChoice === 'paper') ||
        (userChoice === 'paper' && computerChoice === 'rock')
    ) {
        return 'win';
    }
    return 'lose';
};


function rippleEffect(img, imageContainer) {
    const rippleContainer = document.createElement('div');
    rippleContainer.classList.add('ripple-container');

    // Create a div for the ripple effect
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');

    // Append the img and ripple elements to the ripple container
    rippleContainer.appendChild(img);
    rippleContainer.appendChild(ripple);
    imageContainer.appendChild(rippleContainer);

}

function deleteDivItems(myDiv) {
    for (var i = myDiv.children.length - 1; i > 0; i--) {
        myDiv.removeChild(myDiv.children[i]);
    }
}

function backToGameConatiner(currentWindow, youPicked, pcPicked) {
    const gameContainerDiv = document.getElementsByClassName('game-container');
    gameContainerDiv[0].style.display = 'block'
    currentWindow[0].style.display = 'none'
    deleteDivItems(youPicked)
    deleteDivItems(pcPicked)

}

function userWinner(userChoice) {
    //const imageDiv = document.getElementsByClassName
    const gameContainerDiv = document.getElementsByClassName('game-container');
    gameContainerDiv[0].style.display = 'none'
    const WinnerWindowDiv = document.getElementsByClassName('winnerWindow');
    WinnerWindowDiv[0].style.display = 'flex'
    let userImg = document.createElement('img')
    let pcImg = document.createElement('img')

    if (userChoice === 'rock') {
        pcImg.src = './img/scissor.png'
        userImg.src = './img/stone.png'
        userImg.className = 'rock';
        pcImg.className = 'scissors'

    }
    else if (userChoice === 'paper') {
        pcImg.src = './img/stone.png'
        userImg.src = './img/paper.png'
        userImg.className = 'paper';
        pcImg.className = 'rock'
    }
    else {
        pcImg.src = './img/paper.png'
        userImg.src = './img/scissor.png'
        userImg.className = 'scissors';
        pcImg.className = 'paper'
    }

    winnerWindowYouPicked.appendChild(userImg)
    winnerWindowPcPicked.appendChild(pcImg)
    rippleEffect(userImg, winnerWindowYouPicked)

    let winBtn = document.getElementById('WinBtn');
    winBtn.addEventListener('click', () => {
        backToGameConatiner(WinnerWindowDiv, winnerWindowYouPicked, winnerWindowPcPicked)
    })

    let nxtBtn = document.getElementById('next-button');
    nxtBtn.addEventListener('click', () => {
        WinnerWindowDiv[0].style.display = 'none'
        ScoreBoard.style.display = 'none'
        const hurrayWindow = document.getElementsByClassName('Hurrah');
        hurrayWindow[0].style.display = 'flex'
        let playAgainBtn = document.getElementById('celebPlayAgainBtn')
        playAgainBtn.addEventListener('click',()=>{
            const gameContainerDiv = document.getElementsByClassName('game-container');
            gameContainerDiv[0].style.display = 'block'
            ScoreBoard.style.display = 'flex'
            hurrayWindow[0].style.display = 'none'
        })
    })
}


//HURRAY



// PC WINNER
function ComputerWinner(computerChoice) {
    //const imageDiv = document.getElementsByClassName
    const gameContainerDiv = document.getElementsByClassName('game-container');
    gameContainerDiv[0].style.display = 'none'
    const loosingWindowDiv = document.getElementsByClassName('loosingWindow');
    loosingWindowDiv[0].style.display = 'flex'
    let userImg = document.createElement('img')
    let pcImg = document.createElement('img')

    if (computerChoice === 'rock') {
        userImg.src = './img/scissor.png'
        pcImg.src = './img/stone.png'
        pcImg.className = 'rock';
        userImg.className = 'scissors'

    }
    else if (computerChoice === 'paper') {
        userImg.src = './img/stone.png'
        pcImg.src = './img/paper.png'
        pcImg.className = 'paper';
        userImg.className = 'rock'
    }
    else {
        userImg.src = './img/paper.png'
        pcImg.src = './img/scissor.png'
        pcImg.className = 'scissors';
        userImg.className = 'paper'
    }

    loosingWindowYouPicked.appendChild(userImg)
    loosingWindowPcPicked.appendChild(pcImg)
    rippleEffect(pcImg, loosingWindowPcPicked)

    let looseBtn = document.getElementById('LooseBtn');
    looseBtn.addEventListener('click', () => {
        backToGameConatiner(loosingWindowDiv,loosingWindowYouPicked,loosingWindowPcPicked)
    })

}

function tie(userChoice) {
    const gameContainerDiv = document.getElementsByClassName('game-container');
    gameContainerDiv[0].style.display = 'none'
    const tieWindowDiv = document.getElementsByClassName('tieWindow');
    tieWindowDiv[0].style.display = 'flex'
    let userImg = document.createElement('img')
    let pcImg = document.createElement('img')

    if (userChoice === 'rock') {
        pcImg.src = './img/stone.png'
        userImg.src = './img/stone.png'
        userImg.className = 'rock';
        pcImg.className = 'rock'

    }
    else if (userChoice === 'paper') {
        pcImg.src = './img/paper.png'
        userImg.src = './img/paper.png'
        userImg.className = 'paper';
        pcImg.className = 'paper'
    }
    else {
        pcImg.src = './img/scissor.png'
        userImg.src = './img/scissor.png'
        userImg.className = 'scissors';
        pcImg.className = 'scissors'
    }

    tieWindowYouPicked.appendChild(userImg)
    tieWindowPcPicked.appendChild(pcImg)

    let tieBtn = document.getElementById('TieBtn');
    tieBtn.addEventListener('click', () => {
        backToGameConatiner(tieWindowDiv,tieWindowPcPicked, tieWindowYouPicked)
    })
}

const game = (userChoice) => {
    const computerChoice = getComputerChoice();
    const result = getResult(userChoice, computerChoice);

    if (result === 'win') {
        userScore++;
        userScoreSpan.textContent = userScore;
        userWinner(userChoice, computerChoice)
    } else if (result === 'lose') {
        computerScore++;
        computerScoreSpan.textContent = computerScore;
        ComputerWinner(userChoice, computerChoice)
    } else {
        tie(userChoice)
    }

    saveScores();
};

choices.forEach(choice => {
    choice.addEventListener('click', () => game(choice.id));
});

rulesButton.addEventListener('click', () => {
    rulesBox.style.display = 'block';
});

closeRulesButton.addEventListener('click', () => {
    rulesBox.style.display = 'none';
});



// Load scores when the page loads
window.onload = loadScores;

