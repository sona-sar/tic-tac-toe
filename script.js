const xMark = 'X';
const oMark = 'O';
let count = 0;

const winningScenarios = [
    //horizontal
    [[0,0], [0,1], [0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],

    //vertical  
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],

    //diagonal
    [[0,0], [1,1], [2,2]],
    [[0,2], [1,1], [2,0]]
]


window.onload = function(){
    
    const box1 = document.getElementById("box1");
    const box2 = document.getElementById("box2");
    const box3 = document.getElementById("box3");
    const box4 = document.getElementById("box4");
    const box5 = document.getElementById("box5");
    const box6 = document.getElementById("box6");
    const box7 = document.getElementById("box7");
    const box8 = document.getElementById("box8");
    const box9 = document.getElementById("box9");

    const boxes = [
        [box1, box2, box3],
        [box4, box5, box6],
        [box7, box8, box9]
    ];

    let markArray = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    let win = false;
    let winO = false;
    let start = true;

    function resetGame(){
        for(let i = 0; i<3; i++){
            for(let j = 0; j<3; j++){
                boxes[i][j].innerHTML = '';
            }
        }
    
        markArray = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        playWithComputer.classList.remove("clicked");
        playWithFriend.classList.remove("clicked");
        
        let youLost = document.getElementById("youlost");
        if (youLost) {
            youLost.parentNode.removeChild(youLost);
        }
        count = 0;
    }
    function computerMove() {
        let emptySpots = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (boxes[i][j].innerHTML === '') {
                    emptySpots.push([i, j]);
                }
            }
        }
    
        if (emptySpots.length > 0) {
            let randomIndex = Math.floor(Math.random() * emptySpots.length);
            let [selectedI, selectedJ] = emptySpots[randomIndex];
    
            boxes[selectedI][selectedJ].innerHTML = oMark;
            markArray[selectedI][selectedJ] = oMark;
            count++;
        }
    }

    function clearEventListeners() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let oldElement = boxes[i][j];
                let newElement = oldElement.cloneNode(true); 
                oldElement.parentNode.replaceChild(newElement, oldElement);
                boxes[i][j] = newElement;  
                newElement.className = oldElement.className; 
            }
        }
    }

    function displayYouLost(){
        let youLost = document.createElement("div");
        youLost.id = "youlost";
        youLost.className = "you_lost";
        youLost.innerHTML = "YOU LOST HAHA &#128514;";
        document.body.appendChild(youLost);
    }
    function showRestartButton(){
        let restartButton = document.createElement("button");
        restartButton.id = "restart";
        restartButton.className = "restart_button";
        restartButton.innerHTML = "RESTART";

        document.body.appendChild(restartButton);
        restartButton.addEventListener("click", ()=>{
            resetGame();
            restartButton.classList.add("not_show");
            start = true;
        })
    }

    const playWithFriend = document.getElementById("playFriend");

    const playWithComputer = document.getElementById("playComputer");

    playWithComputer.addEventListener("click", ()=>{
        resetGame(); 
        clearEventListeners(); 

        playWithComputer.classList.add("clicked");

        start = true;
        for(let i = 0; i<3; i++){
            for(let j = 0; j<3; j++){
                boxes[i][j].addEventListener("click", ()=>{
                    if(!start){
                        return; 
                    }
                    if(boxes[i][j].innerHTML===''){
                        boxes[i][j].innerHTML = xMark;
                        markArray[i][j] = xMark;
                        count++;
                        win = winning(markArray, winningScenarios, xMark);
                        if(win || count === 9){
                            start = false;
                            showRestartButton();
                            return;
                        }
                        setTimeout(() => {
                            computerMove();
                            win = winning(markArray, winningScenarios, oMark);
                            if (win || count === 9) {
                                start = false;
                                showRestartButton();
                                displayYouLost();
                                return;
                            }
                        }, 300);
                        
                    }
                })
            }
        }
    })
        

    playWithFriend.addEventListener("click", ()=>{
        resetGame();
        clearEventListeners();  
        playWithFriend.classList.add("clicked");
        if(start){
            for(let i = 0; i<3; i++){
                for(let j = 0; j<3; j++){
                    boxes[i][j].addEventListener("click", ()=>{
                        if(!start){
                            return;
                        }

                        if(boxes[i][j].innerHTML===''){
                            if(count%2 === 0){
                                boxes[i][j].innerHTML = xMark;
                            }
                            else{
                                boxes[i][j].innerHTML = oMark;
                            }
                            count++;
                            markArray[i][j] = boxes[i][j].innerHTML;
                            win = winning(markArray, winningScenarios, xMark);
                            winO = winning(markArray, winningScenarios, oMark);
                            
                        }
                        if(count === 9 || win || winO){
                            start = false;
                        
                            let restartButton = document.createElement("button");
                            restartButton.id = "restart";
                            restartButton.className = "restart_button";
                            restartButton.innerHTML = "RESTART";
        
                            document.body.appendChild(restartButton);
                            restartButton.addEventListener("click", ()=>{
                                resetGame();
                                restartButton.classList.add("not_show");
                                start = true;
                            })
                            return;
                        }
                    })
                }
                if(!start){
                    return;
                }
            }
        }
    })
}

function winning(array, winningScenarios, mark){
    for(let i = 0; i<winningScenarios.length; i++){
        let win = true;
        for(let j = 0; j<winningScenarios[i].length; j++){
            let [row, col] = winningScenarios[i][j];
            if(array[row][col]!==mark){
                win = false;
                break;
            }
        }
        if(win){
            return true;
        }
    }
    return false;
}
