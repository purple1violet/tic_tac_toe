const backAction = ( function (){
    let player1 = {name:"player 1", arr:[]};
    let player2 = {name:"player 2", arr:[]};
    let actionCount = 0;
    const gameBox = document.querySelectorAll(".gameBox");
    const resultContent = document.querySelector("#resultContent");
    const winCombo = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    //show the player action
    const eventAction = () => {
        gameBox.forEach(square => {square.addEventListener('click', displayAction)})
    };

    const displayAction = (e) => {
        if(e.target.textContent != ""){
            //do nothing
        }else{
            e.target.textContent = checkAction();
            e.target.style.color = (checkAction() === "X") ? "steelblue" : "darkgoldenrod";
            actionCount += 1;
            console.log("Round: " + actionCount);
            var parent = e.target.parentNode;
            let index = Array.prototype.indexOf.call(parent.children, e.target);
            let player = (checkAction() === "X") ? player1 : player2;
            playerArray(index,player);
            checkWin(player)
        }
    };
    
    //check which player action
    const checkAction = () => {
        if (actionCount === 0 || actionCount === 2 ||actionCount === 4 || actionCount === 6 || actionCount === 8){
            return "O"
        }else{
            return "X"
        }
    };

    //mark player action
    const playerArray = (index,player) =>{
        player["arr"].push(index)
    };

    //check the player win or not
    const checkWin = (player) => {
        const winnerName = document.querySelector("#winnerName");
        const gameResult = document.querySelector("#gameResult");
        //win
        for (const win of winCombo) {
            const inter = player["arr"].filter(element => win.includes(element));
                
            if (inter.length === 3){
                gameResult.textContent = "Winner:";
                winnerName.textContent = player["name"];
                //showResult;
                resultContent.classList.remove("hidden");
                gameBox.forEach(square => {square.removeEventListener('click', displayAction)})
            }
        };
        //tie
        if (actionCount === 9){
            gameResult.textContent = "It is a tie."
            winnerName.textContent = "";
            resultContent.classList.remove("hidden");
            gameBox.forEach(square => {square.removeEventListener('click', displayAction)})
        };
    }

    //restart
    const reStart = () => {
        player1 = {name:"player 1", arr:[]};
        player2 = {name:"player 2", arr:[]};
        actionCount = 0;
        gameBox.forEach(square => {square.textContent=""});
        gameResult.textContent = "";
        winnerName.textContent = "";
        resultContent.classList.add("hidden");
        eventAction();
    }

   return {eventAction, displayAction, checkAction, playerArray, checkWin, reStart};
})();


backAction.eventAction();
