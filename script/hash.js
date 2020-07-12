//создаем хеш для хранения свойств поля
let fieldH = {
    width: 800,
    height: 500,
    color: '#dbdbdb',
};

//создаем хэш для хранения свойств и метода ракетки
let rocketH = {
    height: 120,
    width: 16,
    color: '#787878',
    leftPosX: 0,
    leftPosY: 200,
    rightPosX: 784,
    rightPosY: 200,
    speedY: 10,
};

//создаем хеш для счета
let countH = {
    leftPlayerCount: 0,
    rightPlayerCount: 0,
    positionX: fieldH.width / 2 - 40,
    positionY: fieldH.width / 7,
    fontFamily: '48px serif',
    color: 'grey',
};

//создаем хэш для хранения свойств и метода мяча
let ballH = {
    posX: 400,
    posY: 250,
    radius: 15,
    color: 'red',
    speedX: 6,
    speedY: 4,
    updateBallCoordinates() {
        ball.setAttributeNS(null, 'cx', this.posX);
        ball.setAttributeNS(null, 'cy', this.posY);
    },
};

//создаем хеш для хранения информации о нажатой кнопке
let buttonIsPressed = {
    leftUp: false,
    leftDown: false,
    rightUp: false,
    rightDown: false,
};