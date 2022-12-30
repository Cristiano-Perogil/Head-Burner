// Getting the required containers
const title = document.querySelector("title");
const firstContainer = document.getElementById("first-container");
const introContainer = document.getElementById("intro-container");
const boardContainer = document.getElementById("board-container");
const gameInfoContainer = document.getElementById("game-info-container");
const gettingPlayersNameContainer = document.getElementById("getting-players-name");
const playersContainer = document.getElementById("players-container");

// Elements within the getting players name container  
const inputs = document.querySelectorAll("input");
const inputErrorArea = document.getElementById("area-error-input")
const gameStartBtn = document.getElementById("game-start");

// Elements within the players container
const gameStatusZone = document.getElementById("game-status-zone");
const finishedGameMsg = document.getElementById("finished")
const playing = document.getElementById("current-player-to-play");
const standby = document.getElementById("standby-player");
const msg = document.getElementById("next-matches-default-msg");
const matchesSection = document.getElementById("matches");
const previewsMatches = document.getElementById("previews-matches");

// Elements within the board container
const currentPlayerReport = document.getElementById("accessible-current-player-report");
const addingCelsFeedback = document.getElementById("adding-cells-feedback");
const boardCells = document.querySelectorAll("#board button");

// Setting counter variables to handle the player's turn and match quantity
let currentPlayer = 1;
let match = 0;
let tappingCells = 0
let boardComplete = false;
let nocomplete = false;

// Starting the game and rearranging the containers
gameStartBtn.onclick = () => {
    if (inputs[0].value == '' || inputs[1].value == '') {
        inputErrorArea.textContent = "Informe ambos os nomes";
        inputErrorArea.style.color = 'red';
        setTimeout(() => { clear(inputErrorArea) }, 3000);
    } else {
        enablingShortCuts()
        displayingBoardAndGameInfo()
    }
}

// Displaying the board and the game status section
function displayingBoardAndGameInfo() {
    title.innerText = `Partida ${match + 1} em andamento`
    introContainer.style.display = 'none';
    boardContainer.style.display = 'flex';
    gettingPlayersNameContainer.style.display = 'none';
    playersContainer.style.display = 'block';
    finishedGameMsg.style.display = 'none';
    previewsMatches.style.display = 'none';
    document.querySelector("#board-title").focus()
    currentPlayerReport.textContent = `${inputs[0].value}, sua vez.`
    playing.textContent = inputs[0].value;
    standby.textContent = inputs[1].value;
    handlingBoardFlow()
}

// Setting up the board and managing the player's choices
function handlingBoardFlow() {
    for (let i = 0; i < boardCells.length; i++) {
        boardCells[i].onclick = PressingCells;
    }
}

// Managing The player's pressing the board cells
function PressingCells(event) {
    var cell = event.target;
    if (cell.textContent != '') {
        addingCelsFeedback.textContent = 'Esta célula já está preenchida';
        addingCelsFeedback.style.color = 'red';
        setTimeout(() => { clear(addingCelsFeedback) }, 3000);
    } else {
        if (currentPlayer == 0) {
            currentPlayerReport.textContent = `${inputs[0].value}, sua vez.`;
            playing.textContent = inputs[0].value;
            standby.textContent = inputs[1].value;
            cell.style.backgroundColor = '#31aa4d';
            cell.textContent = 'X';
            cell.ariaLabel = 'X';
            currentPlayer++
            tappingCells++
        } else if (currentPlayer == 1) {
            currentPlayerReport.textContent = `${inputs[1].value}, sua vez.`
            playing.textContent = inputs[1].value;
            standby.textContent = inputs[0].value;
            cell.style.backgroundColor = '#e3a534';
            cell.textContent = 'o';
            cell.ariaLabel = 'Bolinha';
            currentPlayer++
            tappingCells++
        }
    }
    checkingFullfillment();
    if (boardComplete) {
        title.textContent = `Partida ${match} concluída]`
        msg.style.display = 'block';
        gameStatusZone.style.display = 'none';
        finishedGameMsg.style.display = 'block';
        finishedGameMsg.focus();
        previewsMatches.style.display = 'none';
        msg.innerHTML = `<p>Deseja realizar outra partida?</p><button onclick='restart()'>SIM</button><button onclick='finish()'>NÃO</button>`;
        // Unabling the cells from being tapped
        boardCells.forEach(item => {
            item.disabled = true;
        })
    }
    // Resetting the variable that handles which one is playing
    if (currentPlayer >= 2) {
        currentPlayer = 0
    }
}

// Checking if the board is complete / there is a winner
function checkingFullfillment() {
    nocomplete = false;
    if (boardCells[0].textContent == 'X' && boardCells[1].textContent == 'X' && boardCells[2].textContent == 'X' || boardCells[0].textContent == 'o' && boardCells[1].textContent == 'o' && boardCells[2].textContent == 'o') {
        match++
        currentPlayerReport.textContent = `${standby.textContent} venceu ao completar a primeira linha do tabuleiro`;
        currentPlayerReport.style.color = 'lightgreen';
        boardComplete = true;
    } else if (boardCells[3].textContent == 'X' && boardCells[4].textContent == 'X' && boardCells[5].textContent == 'X' || boardCells[3].textContent == 'o' && boardCells[4].textContent == 'o' && boardCells[5].textContent == 'o') {
        match++
        currentPlayerReport.textContent = `${standby.textContent} venceu ao completar a segunda linha do tabuleiro`;
        currentPlayerReport.style.color = 'lightgreen';
        boardComplete = true;
    } else if (boardCells[6].textContent == 'X' && boardCells[7].textContent == 'X' && boardCells[8].textContent == 'X' || boardCells[6].textContent == 'o' && boardCells[7].textContent == 'o' && boardCells[8].textContent == 'o') {
        match++
        currentPlayerReport.textContent = `${standby.textContent} venceu ao completar a terceira linha do tabuleiro`;
        currentPlayerReport.style.color = 'lightgreen';
        boardComplete = true;
    } else if (boardCells[0].textContent == 'X' && boardCells[3].textContent == 'X' && boardCells[6].textContent == 'X' || boardCells[0].textContent == 'o' && boardCells[3].textContent == 'o' && boardCells[6].textContent == 'o') {
        match++
        currentPlayerReport.textContent = `${standby.textContent} venceu ao completar a primeira coluna do tabuleiro`;
        currentPlayerReport.style.color = 'lightgreen';
        boardComplete = true;
    } else if (boardCells[1].textContent == 'X' && boardCells[4].textContent == 'X' && boardCells[7].textContent == 'X' || boardCells[1].textContent == 'o' && boardCells[4].textContent == 'o' && boardCells[7].textContent == 'o') {
        match++
        currentPlayerReport.textContent = `${standby.textContent} venceu ao completar a segunda coluna do tabuleiro`;
        currentPlayerReport.style.color = 'lightgreen';
        boardComplete = true;
    } else if (boardCells[2].textContent == 'X' && boardCells[5].textContent == 'X' && boardCells[8].textContent == 'X' || boardCells[2].textContent == 'o' && boardCells[5].textContent == 'o' && boardCells[8].textContent == 'o') {
        match++
        currentPlayerReport.textContent = `${standby.textContent} venceu ao completar a terceira coluna do tabuleiro`;
        currentPlayerReport.style.color = 'lightgreen';
        boardComplete = true;
    } else if (boardCells[0].textContent == 'X' && boardCells[4].textContent == 'X' && boardCells[8].textContent == 'X' || boardCells[0].textContent == 'o' && boardCells[4].textContent == 'o' && boardCells[8].textContent == 'o') {
        match++
        currentPlayerReport.textContent = `${standby.textContent} venceu ao completar o tabuleiro diagonalmente a partir da primeira célula.`;
        currentPlayerReport.style.color = 'lightgreen';
        boardComplete = true;
    } else if (boardCells[2].textContent == 'X' && boardCells[4].textContent == 'X' && boardCells[6].textContent == 'X' || boardCells[2].textContent == 'o' && boardCells[4].textContent == 'o' && boardCells[6].textContent == 'o') {
        match++
        currentPlayerReport.textContent = `${standby.textContent} venceu ao completar o tabuleiro diagonalmente a partir da terceira célula.`;
        currentPlayerReport.style.color = 'lightgreen';
        boardComplete = true;
        // Case none of the players get to complete the board properly
    } else {
        for (cell of boardCells) {
            if (cell != '' && tappingCells == 9) {
                currentPlayerReport.textContent = `Eita, ninguém completou adequadamente o tabuleiro!`;
                currentPlayerReport.style.color = 'red';
                nocomplete = true;
                boardComplete = true;
            }
        }
    }
}

// Function to clear temporary messages from the screen
function clear(area) {
    area.textContent = ''
}


// Restarting 
function restart() {
    title.textContent = `Partida ${match + 1} em andamento]`;
    boardComplete = false
    tappingCells = 0;
    msg.style.display = 'none';
    previewsMatches.style.display = 'block';
    gameStatusZone.style.display = 'block';
    finishedGameMsg.style.display = 'none';
    cleaningBoard();
    document.querySelector("#board-title").focus();
    if (nocomplete) {
        match++
        matchHistory = `<p><strong>Partida ${match}</strong><br>Não Houve vencedores (tabuleiro não adequadamente completo)</p>`;
    } else { matchHistory = `<p><strong>Partida ${match}</strong><br><span>Vencedor(a): ${standby.textContent}</p>`; }
    matchesSection.innerHTML += matchHistory;
}

// Finishing the section and rearranging the containers
function finish() {
    boardComplete = false;
    match = 0;
    tappingCells = 0;
    boardContainer.style.display = 'none';
    introContainer.style.display = 'block';
    playersContainer.style.display = 'none';
    gameStatusZone.style.display = 'block';
    gettingPlayersNameContainer.style.display = 'block';
    msg.style.display = 'block';
    msg.innerHTML = "<h3>Partidas Anteriores</h3><p>Conforme partidas são terminadas, as mesmas aparecem aqui.</p>"
    inputs.forEach(field => { field.value = '' });
    previewsMatches.innerHTML = '';
    cleaningBoard();
    document.querySelector("h1").focus();
    setTimeout(() => { document.getElementById("modal__show").click(); }, 1000);
}

// Cleaning the board
function cleaningBoard() {
    var label = 1;
    currentPlayerReport.style.color = 'transparent';
    for (let j of boardCells) {
        j.textContent = '';
        j.style.backgroundColor = 'white';
        j.ariaLabel = label++;
        j.disabled = false;
    }
}

// Enabling keyboard shortcuts
function enablingShortCuts() {
    document.addEventListener("keydown", (e) => {
        if (e.key == 1 && e.altKey) {
            boardCells[0].focus()
        } else if (e.key == 2 && e.altKey) {
            boardCells[1].focus();
        } else if (e.key == 3 && e.altKey) {
            boardCells[2].focus();
        } else if (e.key == 4 && e.altKey) {
            boardCells[3].focus();
        } else if (e.key == 5 && e.altKey) {
            boardCells[4].focus();
        } else if (e.key == 6 && e.altKey) {
            boardCells[5].focus();
        } else if (e.key == 7 && e.altKey) {
            boardCells[6].focus();
        } else if (e.key == 8 && e.altKey) {
            boardCells[7].focus();
        } else if (e.key == 9 && e.altKey) {
            boardCells[8].focus();
        }
    })
}

