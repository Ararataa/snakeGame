const constants = {
	blockSize: 25,
	rows: 20,
	columns: 20
}

const snake = {
	X: constants.blockSize * 5,
	Y: constants.blockSize * 5,
	velocity: {
		X: 0,
		Y: 0
	},
	body: [

	]
}

const food = {
	X: constants.blockSize * 10,
	Y: constants.blockSize * 10
}

const gameView = {
	board: document.querySelector('#gameView'),
}

let gameOver = false;
let score = 0;

window.onload = () => {
	gameView.board.height = constants.rows * constants.blockSize;
	gameView.board.width = constants.columns * constants.blockSize;
	gameView.context = gameView.board.getContext('2d');

	placeFood();
	document.addEventListener('keyup', changeDirection);
	setInterval(uptade, 1000/10);
}

const changeDirection = (e) => {
	switch (e.code){
		case "ArrowUp":
			snake.velocity.Y = snake.velocity.Y ? 1 : -1;
			snake.velocity.X = 0;
			break;
		case "ArrowDown":
			snake.velocity.Y = snake.velocity.Y == -1 ? -1 : 1;
			snake.velocity.X = 0;
			break;
		case "ArrowLeft":
			snake.velocity.X = snake.velocity.X ? 1 : -1;;
			snake.velocity.Y = 0;
			break;
		case "ArrowRight":
			snake.velocity.X = snake.velocity.X == -1 ? -1 : 1;
			snake.velocity.Y = 0;
			break;
	}
}

const uptade = () => {
	if (gameOver) {
		document.querySelector('#gameOverModal').style.display = 'block';
		return;
	}
	document.querySelector('h3').innerHTML = `Score : ${score}`
	gameView.context.fillStyle = "black";
	gameView.context.fillRect(0, 0, gameView.board.width, gameView.board.height);

	gameView.context.fillStyle = "red";
	gameView.context.fillRect(food.X, food.Y, constants.blockSize, constants.blockSize);

	if (snake.X == food.X && snake.Y == food.Y) {
		snake.body.push([food.X, food.Y]);
		score++;
		placeFood();
	}

	if (snake.X >= gameView.board.width){
		snake.X = 0;
	} else if (snake.X < 0) {
		snake.X = gameView.board.width;
	} else if (snake.Y >= gameView.board.height){
		snake.Y = 0;
	} else if (snake.Y < 0) {
		snake.Y = gameView.board.height;
	}

	for (let i = snake.body.length - 1; i >= 0; i--) {
		snake.body[i] = snake.body[i-1];
	}
	if (snake.body.length){
		snake.body[0] = [snake.X, snake.Y];
	}

	gameView.context.fillStyle = "lime";
	snake.X += snake.velocity.X * constants.blockSize;
	snake.Y += snake.velocity.Y * constants.blockSize;
	for(let i = 0; i<snake.body.length; i++){
		gameView.context.fillRect(snake.body[i][0], snake.body[i][1], constants.blockSize, constants.blockSize);
	}
	gameView.context.fillRect(snake.X, snake.Y, constants.blockSize, constants.blockSize);

	for(let i = 0; i < snake.body.length; i++){
		if(snake.X == snake.body[i][0] && snake.Y == snake.body[i][1]){
			gameOver = true;
		}
	}
}

const placeFood = () => {
	food.X = Math.floor(Math.random() * constants.columns) * constants.blockSize;
	food.Y = Math.floor(Math.random() * constants.rows) * constants.blockSize;
}