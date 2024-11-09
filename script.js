const playBoard = document.querySelector(".play-board");
const scoreElement  = document.querySelector(".score");
const highScoreElement  = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");


let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [{ x: snakeX, y: snakeY }];
let velocityX = 0, velocityY = 0;
let setIntervaled;
let score = 0;
let highScroe = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `Heigh Score: ${highScroe}`;


const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () =>{
    clearInterval(setIntervaled)
    alert('Game Over! Press OK to replay.....')
    location.reload();
}

const changeDirection = (e) => {
  if (e.key === "ArrowUp" && velocityY != 1 ) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1  ) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" &&  velocityX != 1 ) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" &&  velocityX != -1 ) {
    velocityX = 1;
    velocityY = 0;
  }
};
controls.forEach(key => {
  key.addEventListener("click", () => changeDirection({key: key.dataset.key}));
});



const iniGame = () => {
    if(gameOver)return handleGameOver();
  snakeX += velocityX;
  snakeY += velocityY;

  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push({ x: foodX, y: foodY });
   score++;
   
   highScroe = score >= highScroe ? score : highScroe ;
   localStorage.setItem("high-score", highScroe );
   scoreElement.innerText = `Score: ${score}`;
   highScoreElement.innerText = `Heigh Score: ${highScroe}`;
  }

  // Move the snake's body
  snakeBody = [{ x: snakeX, y: snakeY }, ...snakeBody.slice(0, -1)];

  if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30 ){
    gameOver = true;
 }
 for (let i = 1; i < snakeBody.length; i++) {
    if (snakeBody[i].x === snakeX && snakeBody[i].y === snakeY) {
        gameOver = true;
        break;
    }
}

if (gameOver) return handleGameOver();

  // Render the food and snake
  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
  snakeBody.forEach((segment, index) => {
      if (index === 0) {
          htmlMarkup += `<div class="head" style="grid-area: ${segment.y} / ${segment.x}"></div>`;
      } else {
          htmlMarkup += `<div class="body" style="grid-area: ${segment.y} / ${segment.x}"></div>`;
      }
  });

  playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();
setIntervaled = setInterval(iniGame, 125);
document.addEventListener("keydown", changeDirection);
