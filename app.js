let enemyAliens = [];
let userShipName;
let player = null;
let stage = 1;
let money = 0;
let score = 0;
let gameKey = true;
let huCost = 50;
let puCost = 50;
let acCost = 50;
let randomMoney = 0;

const nameShip = () => {
    userShipName = prompt("LOOK AT ME, LOOK AT ME. You're the captain now. Your previous captain jumped ship, it's time to take command and let these aliens know who they're dealing with.", 'Enter ship name here - No more than 20 characters');
    while (userShipName === null || userShipName.length > 20) {
        userShipName = prompt("LOOK AT ME, LOOK AT ME. You're the captain now. Your previous captain jumped ship, it's time to take command and let these aliens know who they're dealing with.", 'Enter ship name here - No more than 20 characters');
    };
    document.querySelector('.shipName').innerHTML = userShipName;
};

const alienNames = ['Gruuds', 'Drek', 'Graagzaks', 'Crotteods', 'Amphut', 'Bhunphuh', 'Uddoids', 'Khaega', 'Aute', 'Qhudhens', 'Scraun', 'Voncels', 'Trukzex', 'Vagvols', 'Eezu', 'Addas', 'Bhodot', 'Brudhurs', 'Unqek', 'Bezons'];

class UserShip {
    constructor(name) {
        this.name = name;
        this.maxhull = 20;
        this.hull = this.maxhull;
        this.firepower = 5;
        this.accuracy = 70;
    }
    fireLaser(opponent) {
        opponent = enemyAliens[enemyAliens.length-1];
        if (Math.random()*100 < player.accuracy) {
            opponent.hull -= player.firepower;
            document.querySelector('.enemyshipHealth').innerHTML = `${enemyAliens[enemyAliens.length-1].hull}/${enemyAliens[enemyAliens.length-1].maxhull}`;
            document.querySelector('.playerOutput').innerHTML = `You manage to hit the enemy and deal ${this.firepower} damage!`;
            if (opponent.hull <= 0) {
                randomMoney = Math.floor(Math.random()*(35-20+1) +20)*stage;
                score += 100*stage;
                money += randomMoney;
                document.querySelector('#scoreInsert').innerHTML = score;
                document.querySelector('#moneyInsert').innerHTML = money;
                document.querySelector('.results').innerHTML = `${enemyAliens[enemyAliens.length-1].name} has been defeated! You gain ${100*stage} score and $${randomMoney}.`;
                enemyAliens.pop();
                if (enemyAliens[0] !== undefined) {
                document.querySelector('.enemyShipName').innerHTML = `${enemyAliens[enemyAliens.length-1].name} (${enemyAliens.length} left)`;
                document.querySelector('.enemyshipHealth').innerHTML = `${enemyAliens[enemyAliens.length-1].hull}/${enemyAliens[enemyAliens.length-1].maxhull}`;
                document.querySelector('.enemyshipPower').innerHTML = enemyAliens[enemyAliens.length-1].firepower;
                document.querySelector('.enemyshipAccuracy').innerHTML = `${enemyAliens[enemyAliens.length-1].accuracy}%`;
                } else {
                    document.querySelector('.enemyShipName').innerHTML = 'No Name';
                    document.querySelector('.enemyshipHealth').innerHTML = 'NA';
                    document.querySelector('.enemyshipPower').innerHTML = 'NA';
                    document.querySelector('.enemyshipAccuracy').innerHTML = 'NA';
                }
            } else {
                enemyAliens[enemyAliens.length-1].fireLaser()
                }
        } else {
            document.querySelector('.playerOutput').innerHTML = `You missed ${enemyAliens[enemyAliens.length-1].name}'s ship!`;
        }
    }    
    heal() {
        if (this.maxhull === this.hull) {
            alert('You are currently full health');
        } else if (money > 50*stage) {
            this.hull += this.maxhull - this.hull;
            money -= 50*stage;
            document.querySelector('.shipHealth').innerHTML = `${player.hull}/${player.maxhull}`;
            document.querySelector('#moneyInsert').innerHTML = money;
        } else {
            alert('You do not have enough money.')
        }
    }
    upgradePower() {
        if (money > puCost) {
            this.firepower += 2;
            document.querySelector('.shipPower').innerHTML = player.firepower;
            money -= puCost;
            document.querySelector('#moneyInsert').innerHTML = money;
            puCost *= 2;
            document.querySelector('.cost3').innerHTML = `Cost $${puCost}`;
        } else {
            alert('You do not have enough money.')
        }
    }
    upgradeHealth() {
        if (money > huCost) {
            this.hull += 5;
            this.maxhull += 5;
            document.querySelector('.shipHealth').innerHTML = `${player.hull}/${player.maxhull}`;
            money -= huCost;
            document.querySelector('#moneyInsert').innerHTML = money;
            huCost *= 2;
            document.querySelector('.cost2').innerHTML = `Cost $${huCost}`;
        } else {
            alert('You do not have enough money.')
        }
    }
    upgradeAccuracy() {
        if (money > acCost) {
            if (this.accuracy === 100) {
                alert('You already have 100% accuracy!')
            } else {
            this.accuracy += 1;
            document.querySelector('.shipAccuracy').innerHTML = `${this.accuracy}%`;
            money -= acCost;
            document.querySelector('#moneyInsert').innerHTML = money;
            acCost *= 2;
            document.querySelector('.cost4').innerHTML = `Cost $${acCost}`;
            }
        } else {
            alert('You do not have enough money.')
        }
    }
};  

class AlienShip {
    constructor(name) {
        this.name = name;
        this.maxhull = Math.floor(Math.random()*(6 - 3 + 1) + 3)*stage;
        this.hull = this.maxhull;
        this.firepower = Math.floor(Math.random()*(4 - 2 + 1) + 2)*stage;
        this.accuracy = Math.floor(Math.random()*(80 - 60 + 1) + 60);
    }
    static generateAliens(num = 1){
        for(let i=1; i<=num; i++) {
            enemyAliens.push(new AlienShip(alienNames[Math.floor(Math.random()*alienNames.length)]));
            document.querySelector('.enemyShipName').innerHTML = `${enemyAliens[enemyAliens.length-1].name} (${enemyAliens.length} left)`;
            document.querySelector('.enemyshipHealth').innerHTML = `${enemyAliens[enemyAliens.length-1].hull}/${enemyAliens[enemyAliens.length-1].maxhull}`;
            document.querySelector('.enemyshipPower').innerHTML = enemyAliens[enemyAliens.length-1].firepower;
            document.querySelector('.enemyshipAccuracy').innerHTML = `${enemyAliens[enemyAliens.length-1].accuracy}%`;
        }
    }
        fireLaser() {
        if (Math.random()*100 < enemyAliens[enemyAliens.length-1].accuracy) {
            document.querySelector('.enemyOutput').innerHTML = `${enemyAliens[enemyAliens.length-1].name} manages to hit your ship for ${enemyAliens[enemyAliens.length-1].firepower} damage!`;
            player.hull -= enemyAliens[enemyAliens.length-1].firepower;
            document.querySelector('.shipHealth').innerHTML = `${player.hull}/${player.maxhull}`;
            if (player.hull <= 0) {
                alert('PLAYER DESTROYED!');
                alert(`You reached ${score} points! Try again.`);
                reset();
            }
        } else {
            document.querySelector('.enemyOutput').innerHTML = `${enemyAliens[enemyAliens.length-1].name} fires back and misses your ship!`;
        }
    }
};

const startGame = () => {
    if (userShipName === undefined) {
        alert('Please enter a name for your ship!')
    } else if (enemyAliens[0] === undefined && gameKey === true){
        player = new UserShip(userShipName);
        document.querySelector('.shipHealth').innerHTML = `${player.hull}/${player.maxhull}`;
        document.querySelector('.shipPower').innerHTML = player.firepower;
        document.querySelector('.shipAccuracy').innerHTML = `${player.accuracy}%`;
        document.querySelector('#stageInsert').innerHTML = stage;
        AlienShip.generateAliens(5);
        gameKey = false;
    } else {
        alert('Game is currently in progress.')
    }
};

const stageUp = () => {
    if (enemyAliens[0] === undefined && player !== null) {
        stage += 1;
        player.hull += player.maxhull - player.hull;
        document.querySelector('#stageInsert').innerHTML = stage;
        document.querySelector('.shipHealth').innerHTML = `${player.hull}/${player.maxhull}`;
        document.querySelector('.cost1').innerHTML = `Cost $${50*stage}`;
        AlienShip.generateAliens(5);
    } else {
        alert('You are not ready for the next stage.');
    }
};

const stageCurrent = () => {
    if (enemyAliens[0] === undefined && player !== null) {
        player.hull+= player.maxhull - player.hull;
        document.querySelector('.shipHealth').innerHTML = `${player.hull}/${player.maxhull}`;
        AlienShip.generateAliens(5);
    } else {
        alert('You are not ready to repeat stage.')
    }
};

const reset = () => {
    enemyAliens = [];
    userShipName = undefined;
    player = null;
    stage = 1;
    money = 0;
    score = 0;
    gameKey = true;
    huCost = 50;
    puCost = 50;
    acCost = 50;
    randomMoney = 0;
    document.querySelector('.shipName').innerHTML = 'No Name';
    document.querySelector('.shipHealth').innerHTML = 'NA';
    document.querySelector('.shipPower').innerHTML = 'NA';
    document.querySelector('.shipAccuracy').innerHTML = 'NA';
    document.querySelector('.enemyShipName').innerHTML = 'No Name';
    document.querySelector('.enemyshipHealth').innerHTML = 'NA';
    document.querySelector('.enemyshipPower').innerHTML = 'NA';
    document.querySelector('.enemyshipAccuracy').innerHTML = 'NA';
    document.querySelector('#stageInsert').innerHTML = 'NA';
    document.querySelector('#scoreInsert').innerHTML = 'NA';
    document.querySelector('#moneyInsert').innerHTML = 'NA';
    document.querySelector('.playerOutput').innerHTML = 'Your actions';
    document.querySelector('.enemyOutput').innerHTML = 'Enemy actions';
    document.querySelector('.results').innerHTML = 'Results';
    document.querySelector('.cost1').innerHTML = `Cost $50`;
    document.querySelector('.cost2').innerHTML = `Cost $${huCost}`;
    document.querySelector('.cost3').innerHTML = `Cost $${puCost}`;
    document.querySelector('.cost4').innerHTML = `Cost $${acCost}`;   
};