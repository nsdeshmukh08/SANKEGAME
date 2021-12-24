// Game contansts and variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('../music/food.mp3');
const gameOverSound = new Audio('../music/gameover.mp3');
const moveSound = new Audio('../music/move.mp3');
const musicSound = new Audio('../music/music.mp3');
const speed = 5;
let score = 0;
if(!localStorage.score){
    localStorage.score = score;
}

let lastPaintTime = 0;
let snakeArr = [
    {x:13, y:15}
];
let food = {x: 17, y : 17};

// Game function

const main = (ctime) => {
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }

    lastPaintTime = ctime;
    gameEngine();
}

const isCollide = (snArr) => {
   //if you bumb into yourself

   for(i = 1; i< snArr.length; i++){
       if(snArr[0].x === snArr[i].x && snArr[0].y === snArr[i].y){
           return true;
       }
   }

   if(snArr[0].x < 1 || snArr[0].x > 19 || snArr[0].y < 1 || snArr[0].y > 19 ){
       return true;
   }

   return false;
}

const gameEngine = () => {

    // Part 1: Updating the snake array and food;
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over");
        snakeArr = [
            {x:13, y:15}
        ];
        musicSound.play();
        if(localStorage.score < score){
            localStorage.score = score;
        }
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        snakeArr = snakeArr.filter(e => e);
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a) * Math.random())}
        score = score + 1;
       
    }

    //Moving the snake

    for(let i = snakeArr.length-2; i >= 0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake 
    board.innerHTML = "";
    snakeArr.forEach((e , index) => {
        snakeEl = document.createElement('div');
      
        if(index === 0){
            snakeEl.classList.add('head');
        } else {
            snakeEl.classList.add('snake');
        }
        snakeEl.style.gridRowStart = e.y;
        snakeEl.style.gridColumnStart = e.x;
        board.appendChild(snakeEl);
    });

    // Part 3: Display the food
    foodEl = document.createElement('div');
    foodEl.classList.add('food')
    foodEl.style.gridRowStart = food.y;
    foodEl.style.gridColumnStart = food.x;
    board.appendChild(foodEl);

    // Part 4 : Update the score 
    const scoreEl = document.querySelector('.score');
    const bestScoreEl = document.querySelector('.best-score');
    scoreEl.innerHTML = 'Your Score: ' + score;
    bestScoreEl.innerHTML = 'Best Score: ' + localStorage.score;
}

// Main logic starts here
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
    moveSound.play();

     inputDir = {x: 0, y: 0};

    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            console.log("ArrowUp ===>");
        break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            console.log("ArrowDown ===>");
        break;
            
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            console.log("ArrowLeft ===>");
        break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            console.log("ArrowRight ===>");
        break;
    
        default:
            break;
    }
})
