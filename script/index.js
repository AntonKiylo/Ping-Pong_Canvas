let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let hitSound = new Audio('./asset/hitSound.mp3');

//создаем блок бля обратного отсчета
let countDownBlock = document.createElement('div');
countDownBlock.style.cssText = 'display: none; position: absolute; color: white; font-size: xxx-large; box-sizing: border-box; padding-top: 25%; text-align: center; background-color: rgba(0, 0, 0, 0.5); width: 100%; height: 100vh; top: 0; left: 0';
document.body.appendChild(countDownBlock);

let start = document.createElement('button');
start.style.cssText = 'margin: 20px auto; display: block';
start.innerHTML = 'START';
document.body.append(start);
/**************************************/

drawGame();

function drawGame() {
    //рисуем поле
    ctx.beginPath();
    ctx.rect(0, 0, fieldH.width, fieldH.height);
    ctx.fillStyle = fieldH.color;
    ctx.fill();
    ctx.closePath();

    //рисуем счет
    ctx.beginPath();
    ctx.font = countH.fontFamily;
    ctx.fillStyle = countH.color;
    ctx.fillText(`${countH.leftPlayerCount} : ${countH.rightPlayerCount}`, countH.positionX, countH.positionY);
    ctx.closePath();

    //рисуем левую ракетку
    ctx.beginPath();
    ctx.rect(rocketH.leftPosX, rocketH.leftPosY, rocketH.width, rocketH.height);
    ctx.fillStyle = rocketH.color;
    ctx.fill();
    ctx.closePath();

    //рисуем правую ракетку
    ctx.beginPath();
    ctx.rect(rocketH.rightPosX, rocketH.rightPosY, rocketH.width, rocketH.height);
    ctx.fillStyle = rocketH.color;
    ctx.fill();
    ctx.closePath();

    //рисуем мяч
    ctx.beginPath();
    ctx.arc(ballH.posX, ballH.posY, ballH.radius, 0, 2 * Math.PI);
    ctx.fillStyle = ballH.color;
    ctx.fill();
    ctx.closePath();

    //триггер запуска игры
    start.onclick = function () {
        //запуск запуск ракеток
        moveRocket();

        //запуск мяча при клике
        ballMove();
    };

    requestAnimationFrame(drawGame);
};

//описание управления ракеткой
function moveRocket() {
    //если нажата 'стрелка вверх'
    if (buttonIsPressed.rightUp === true) {
        rocketH.rightPosY -= rocketH.speedY;
        //проверяем выходит ли ракетка за пределы верхней части поля
        if (rocketH.rightPosY < 0) {
            rocketH.rightPosY = 0;
        };
    };

    //если нажата 'стрелка вниз'
    if (buttonIsPressed.rightDown === true) {
        rocketH.rightPosY += rocketH.speedY;
        //проверяем выходит ли ракетка за пределы нижней части поля
        if (rocketH.rightPosY + rocketH.height > fieldH.height) {
            rocketH.rightPosY = fieldH.height - rocketH.height;
        };
    };

    //если нажата 'W'
    if (buttonIsPressed.leftUp === true) {
        rocketH.leftPosY -= rocketH.speedY;
        //проверяем выходит ли ракетка за пределы верхней части поля
        if (rocketH.leftPosY < 0) {
            rocketH.leftPosY = 0;
        };
    };

    //если нажата 'S'
    if (buttonIsPressed.leftDown === true) {
        rocketH.leftPosY += rocketH.speedY;
        //проверяем выходит ли ракетка за пределы нижней части поля
        if (rocketH.leftPosY + rocketH.height > fieldH.height) {
            rocketH.leftPosY = fieldH.height - rocketH.height;
        };
    };

    //устраняем задержку при нажатии на клавишу
    requestAnimationFrame(moveRocket);
};

//описание движения мяча
function ballMove() {
    start.disabled = true;

    //движение мяча по Х
    ballH.posX += ballH.speedX;

    //движение мяча по Y
    ballH.posY -= ballH.speedY;

    // вылетел ли мяч ниже пола?
    if (ballH.posY + ballH.radius > fieldH.height) {
        ballH.speedY = - ballH.speedY;
        ballH.posY = fieldH.height - ballH.radius;
    };

    // вылетел ли мяч выше потолка?
    if (ballH.posY + ballH.radius < 30) {
        ballH.speedY = - ballH.speedY;
        ballH.posY = ballH.radius;
    };

    // дотронулся ли мяч ракетки?
    if (ballH.posX >= fieldH.width - rocketH.width - ballH.radius
        && ballH.posY > rocketH.rightPosY
        && ballH.posY < rocketH.rightPosY + rocketH.height
        || ballH.posX <= rocketH.width + ballH.radius
        && ballH.posY > rocketH.leftPosY
        && ballH.posY < rocketH.leftPosY + rocketH.height) {
        hitSound.play();
        ballH.speedX = - ballH.speedX;
    };

    // дотронулся ли мяч правой стены?
    if (ballH.posX + ballH.radius + 5 > fieldH.width) {
        countH.leftPlayerCount++;
        ballH.speedX = - ballH.speedX;
        if (+countH.leftPlayerCount > 4) {
            checkCount();
            return;
        };
        countDown();
        setTimeout(() => {
            ballH.posX = 400;
            ballH.posY = 250;
        }, 3000);
        return;
    };

    // дотронулся ли мяч левой стены?
    if (ballH.posX + ballH.radius - 5 < 30) {
        countH.rightPlayerCount++;
        ballH.speedX = - ballH.speedX;
        if (+countH.rightPlayerCount > 4) {
            checkCount();
            return;
        };
        countDown();
        setTimeout(() => {
            ballH.posX = 400;
            ballH.posY = 250;
        }, 3000);
        return;
    };
    //обратный отсчет после забитого гола
    requestAnimationFrame(ballMove);
};

function countDown() {
    let counter = 3;
    countDownBlock.innerHTML = counter.toString();
    countDownBlock.style.display = 'block';
    let interval = setInterval(() => {
        counter--;
        countDownBlock.innerHTML = counter.toString();
        if (counter === 0) {
            countDownBlock.style.display = 'none';
            requestAnimationFrame(ballMove);
            clearInterval(interval);
        };
    }, 1000);
};

//вывод уведомления после завершения игры
function alertFunction() {
    countDownBlock.innerHTML = `GAME OVER<br>${countH.leftPlayerCount} : ${countH.rightPlayerCount}`;
    countDownBlock.style.display = 'block';
    setTimeout(() => {
        countDownBlock.style.display = 'none';
    }, 3000);
};

function checkCount() {
    setTimeout(() => {
        start.disabled = false;
        ballH.posX = 400;
        ballH.posY = 250;
        rocketH.rightPosY = 200;
        rocketH.leftPosY = 200;
        countH.leftPlayerCount = 0;
        countH.rightPlayerCount = 0;
    }, 3000);

    alertFunction();
};
/*************************************/

//вешаем событие keydown на document для определения какая клавиша нажата
document.addEventListener('keydown', function (event) {
    //если нажата 'стрелка вверх'
    if (event.key === 'ArrowUp') {
        buttonIsPressed.rightUp = true;
    };

    //если нажата 'стрелка вниз'
    if (event.key === 'ArrowDown') {
        buttonIsPressed.rightDown = true;
    };

    //если нажата 'W'
    if (event.code === 'KeyW') {
        buttonIsPressed.leftUp = true;
    };

    //если нажата 'S'
    if (event.code === 'KeyS') {
        buttonIsPressed.leftDown = true;
    };
});

//вешаем событие keydown на document для определения какая клавиша отжата
document.addEventListener('keyup', function (event) {
    //если отпущена 'стрелка вверх'
    if (event.key === 'ArrowUp') {
        buttonIsPressed.rightUp = false;
    };
    //если отпущена 'стрелка вниз'
    if (event.key === 'ArrowDown') {
        buttonIsPressed.rightDown = false;
    };
    //если отпущена 'W'
    if (event.code === 'KeyW') {
        buttonIsPressed.leftUp = false;
    };
    //если отпущена 'S'
    if (event.code === 'KeyS') {
        buttonIsPressed.leftDown = false;
    };
});