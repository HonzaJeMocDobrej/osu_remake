    const gameStartBtn = document.getElementById("gameStartBtn");
    const gameContent = document.getElementById("gameContent");
    const pointsText = document.getElementById("pointsText");
    const coinsText = document.getElementById("coinsText");
    const shop = document.getElementById("shop");
    const closeImg = document.getElementById("closeImg");
    const shopBlock = document.getElementById("shopBlock");
    const skinButton = document.getElementById("skinButton");

    let coins = parseInt(localStorage.getItem('coins')) || 0;
    let points = 0;
    let deathCount = 0;
    let clickCount = 0;
    
    let intervalMultiplier = 1500;
    
    let newSpawnInterval;
    let restartBtn;
    let restartP;
    let block;
    
    let isVisible = false;
    let skinEquipped = false;
    
    let breakAudio = new Audio("./res/sounds/boom.mp3");
    let loseAudio = new Audio("./res/sounds/lose.mp3");
    let robloxAudio = new Audio("./res/sounds/boblox.mp3");
    
    localStorage.setItem('coins', coins);

    coinsText.innerHTML = `Coins: ${coins}`;
    
    openShop();
    closeShop();

    skinButton.onclick = () => {
        if (coins >= 50) {
            coins -= 50;
            coinsText.innerHTML = `Coins: ${coins}`;
    
            skinEquipped = true;
            
            localStorage.setItem('coins', coins);
        }
    }

    
    const spawnBlocks = gameStartBtn.onclick = () => {
        
        gameStartBtn.remove();
        
        
        function newInterval() {
            console.log(intervalMultiplier)
            let randomX = Math.floor(Math.random() * (90 - 5 + 1) + 5);
            let randomY = Math.floor(Math.random() * (85 - 15 + 1) + 15);
            console.log(`x: ${randomX}, y: ${randomY}`);
            instatiateBlocks(randomX, randomY);
            if (deathCount >= 5) {
                console.log("You lost");
                loseAudio.play();
                
                
                while (gameContent.firstChild) {
                    gameContent.removeChild(gameContent.lastChild);
                }
                
                if (clickCount == 0) {
                    deleteInterval(spawnInterval);
                }
                else if (clickCount >= 1) {
                    
                    deleteInterval(newSpawnInterval);
                    
                }
                
                endGameElements();

                restartGame();

                skinEquipped = false;
            }
        }

         let spawnInterval = setInterval(newInterval, intervalMultiplier);
         
         function instatiateBlocks(x, y) {
             block = document.createElement("div");
             gameContent.appendChild(block);
             block.style.width = "4%";
            block.style.height = "8%";
            block.style.position = "absolute";
            
            block.style.left = `${x}%`;
            block.style.top = `${y}%`;
            
            block.onmouseover = () => {
                block.style.cursor = "crosshair";
            }
            
            if (skinEquipped == false) {
                block.style.backgroundColor = "#FF2E00";
            }

            if (skinEquipped == true) {
                block.style.backgroundImage = "url('./res/img/honzaKotakto.png')";
                block.style.backgroundColor = "transparent";
                block.style.backgroundRepeat = "no-repeat";
                block.style.backgroundSize = "contain";
            }
            
            gameLogic(block);
            deathCount++;
            
            
        }
        
        function gameLogic(block) {
            block.onclick = () => {
                if (clickCount == 0) {
                    clearInterval(spawnInterval);
                }
                else if (clickCount >= 1) {
                    clearInterval(newSpawnInterval);
                }
                if (skinEquipped == false) {
                    breakAudio.load();
                    breakAudio.play();
                }
                if (skinEquipped == true) {
                    robloxAudio.load();
                    robloxAudio.play();
                }
                intervalMultiplier = intervalMultiplier / 1.05;
                newSpawnInterval = setInterval(newInterval, intervalMultiplier); 
                clickCount++;           
                coins++;
                points++;
                pointsText.innerHTML = `Points: ${points}`;
                deathCount--;
                console.log(`points: ${points}`);
                block.remove();
                
                localStorage.setItem('coins', coins);
            } 
        }
        
        function deleteInterval(interval) {
            clearInterval(interval);
            console.log("interval cleared");
    }

    function restartGame(){
        restartBtn.onclick = () => {
            intervalMultiplier = 1500;
            clickCount = 0;
            deathCount = 0;
            points = 0;
            
            pointsText.innerHTML = `Points: ${points}`;
            coinsText.innerHTML = `Coins: ${coins}`;
            
            spawnInterval = setInterval(newInterval, intervalMultiplier);
            
            restartBtn.remove();
            restartP.remove();
        }
    }

    function endGameElements(){
        restartBtn = document.createElement("button");
        restartP = document.createElement("p");
        
        let textContentP = document.createTextNode("You lost!");
        let textContent = document.createTextNode("Restart Game");
        
        restartP.appendChild(textContentP);
        restartBtn.appendChild(textContent);
        
        gameContent.appendChild(restartP);
        gameContent.appendChild(restartBtn);

        restartBtn.style.height = "8%";
        restartBtn.style.width = "15%";
        restartBtn.style.fontSize = "15pt";

        restartP.style.color = "#FF2E00";
        restartP.style.fontSize = "20pt";
    }
    
    
}

function openShop() {
    shop.onclick = () => {
        if (isVisible == false) {
            shopBlock.style.display = 'block';

            isVisible = true;
        }
        
    }
    
}

function closeShop() {
    closeImg.onclick = () => {
        shopBlock.style.display = 'none';

        isVisible = false;
    }
}

