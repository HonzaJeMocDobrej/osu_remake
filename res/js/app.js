    const gameStartBtn = document.getElementById("gameStartBtn");
    const gameContent = document.getElementById("gameContent");

    let points = 0;
    let count = 0;
    
    const spawnBlocks = gameStartBtn.onclick = () => {

        gameStartBtn.remove();

        let spawnInterval = setInterval(() => {
                let randomX = Math.floor(Math.random() * (90 - 5 + 1) + 5);
                let randomY = Math.floor(Math.random() * (90 - 5 + 1) + 5);
                console.log(`x: ${randomX}, y: ${randomY}`);
                instatiateBlocks(randomX, randomY);
                if (count >= 5) {
                    console.log("You lost");
                    document.body.remove();
                    deleteInterval(spawnInterval);
                }
            }, 1500);
            
        }
        
        function instatiateBlocks(x, y) {
            let block = document.createElement("div");
            gameContent.appendChild(block);
            block.style.width = "5%";
            block.style.height = "5%";
            block.style.position = "absolute";
            block.style.backgroundColor = "red";

            block.style.left = `${x}%`;
            block.style.top = `${y}%`;

            count++;

            gameLogic(block);

        }
        
        function gameLogic(block) {
            block.onclick = () => {
                points++;
                count--;
                console.log(`points: ${points}`);
                block.remove();
            } 
    }

    function deleteInterval(interval) {
        clearInterval(interval);
        console.log("interval cleared");
    }
