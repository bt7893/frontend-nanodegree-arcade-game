// GLOBAL VARIABLES ************************************************************
var initPlayerPos = {
    x: 200,
    y: 400
}; // initial Player position
var gameSpeed = 0.5; // sets the game speed
var totalEnemies = 8 // sets the total number of Enemies
var totalLives = 3; // sets the initial lifes of Player
var totalGems = 0; // sets the initial count of Gem collected by Player
var gameIsOver = "false";
var showGameRulesBanner = "true";

// ENEMIES CLASS ***************************************************************
var Enemy = function(x, y) {
    this.sprite = enemyImage;
    this.x = x;
    this.y = y;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (dt * 100 * this.speed);
    // Position the enemy back into initial "x" position if it goes out of screen
    if (this.x > 700) {
        this.x = getRandomInt(-700, -100);
    }

    // COLLISION DETECTION -----------------------------------------------------
    var rightOfEnemy = this.x + 101; // 101 is the width of sprite
    var rightOfPlayer = player.x + 101;

    if (this.y === player.y - 10 && rightOfEnemy > player.x && this.x < rightOfPlayer) {
        player.x = initPlayerPos.x;
        player.y = initPlayerPos.y;

        // Counts the Player's Lives -------------------------------------------
        totalLives = totalLives - 1;
        // console.log(totalLives);
        switch (totalLives) {
            case 2:
                heart1.x = -100; // 2 lives left
                alertLivesLeft() // alert remaining lives
                break;
            case 1:
                heart2.x = -100; // 1 lives left
                alertLivesLeft() // alert remaining lives
                break;
            case 0:
                heart3.x = -100; // 0 lives left
                playerLoses();
                break;
        }
    }
    // console.log("player.x:",player.x, "player.y:",player.y);
    // console.log("this.x:",this.x,"this.y:",this.y);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var eBug = function(x, y) {
    Enemy.call(this, x, y);
    this.speed = this.speed * getRandomArbitrary(2, 5); // creates a random speed for each enemy instance
};

createBug(eBug);

function createBug(eBug) {
    eBug.prototype = Object.create(Enemy.prototype);
    eBug.prototype.constructor = eBug;
    eBug.prototype.speed = gameSpeed; // sets the game speed
}

// PLAYER CLASS ****************************************************************

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.sprite = playerImage;
    this.x = x; // sets the initial x position
    this.y = y; // sets the initial y position
}

updateAndRender(Player, 101, 171); // scales sprite

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (totalLives === 0) {
                this.x = x;
            }
            this.x = this.x - 101;
            if (this.x < 0) { // keeps Player from going off 'Left' of screen
                this.x = 0;
            }
            break;
        case 'up':
            this.y = this.y - 82;
            if (this.y < -10) { // keeps Player from going off 'Top' of screen
                this.y = -10;
            }
            break;
        case 'right':
            this.x = this.x + 101;
            if (this.x > 400) { // keeps Player from going off 'Right' of screen
                this.x = 400;
            }
            break;
        case 'down':
            this.y = this.y + 82;
            if (this.y > 400) { // keeps Player from going off 'Bottom' of screen
                this.y = 400;
            }
            break;
        case 'space':
            showGameRulesBanner = "false";
        case 'esc':
            resetGame();
            break;
        default:
            break;
    }

    // Collission Detection for Gemstones
    var rightOfGem1 = gem1.x + 51;
    var rightOfGem2 = gem2.x + 51;
    var rightOfGem3 = gem3.x + 51;
    var rightOfPlayer = this.x + 51;

    if (this.y === gem1.y - 48 && rightOfGem1 > player.x && gem1.x < rightOfPlayer) {
        gem1.x = -100;
        totalGems = totalGems + 1;
    }

    if (this.y === gem2.y - 46 && rightOfGem2 > player.x && gem2.x < rightOfPlayer) {
        gem2.x = -100;
        totalGems = totalGems + 1;
    }

    if (this.y === gem3.y - 44 && rightOfGem3 > player.x && gem3.x < rightOfPlayer) {
        gem3.x = -100;
        totalGems = totalGems + 1;
    }

    // Collission Detection for Princess
    var rightOfPrincess = princess.x + 100;

    if (totalGems > 2) { // check to see if player has all 3 gems
        if (this.y === princess.y && rightOfPrincess > player.x && princess.x < rightOfPlayer) {
          playerWins();
        }
    }

    // console.log(princess.x, this.x);
    // Use console.log(this.x, this.y) to return char position on screen
}

// MISC CLASSES *****************************s***********************************

var Princess = function(x, y) {
  this.sprite = princessImage;
  this.x = x;
  this.y = y;
}

var Heart = function(x, y) {
    // Variables applied to each of our instances go here
    this.sprite = heartImage;
    this.x = x;
    this.y = y;
}

var Gem = function(x, y) {
    this.sprite = gemImage;
    this.x = x;
    this.y = y;
}

var GameOver = function(x, y) {
    this.sprite = gameOverImage;
    this.x = x;
    this.y = y;
}

var GameRules = function(x, y) {
    this.sprite = gameRulesImage;
    this.x = x;
    this.y = y;
}

var YouWin = function(x, y) {
    this.sprite = youWinImage;
    this.x = x;
    this.y = y;
}

updateAndRender(Heart, 51, 86); // scales sprite to 50% size
updateAndRender(GameOver, 455, 140); // 100% size
updateAndRender(GameRules, 494, 524); // 100% size
updateAndRender(YouWin, 455, 140); // 100% size
updateAndRender(Gem, 51, 86); // scales sprite to 50% size
updateAndRender(Princess, 101, 171); // 100% size

// INSTANTIATION of OBJECTS ****************************************************

// ENEMY
var enemyImage = 'images/enemy-bug.png';
var rows = [62, 144, 226]; // define top, middle and bottom row positions
var allEnemies = []; // create an empty Enemy array
var rowCount = 0;

for (var i = 0; i < totalEnemies; i++) {
  allEnemies.push(new eBug(getRandomArbitrary(-700, 700), rows[rowCount]));

  // Evenly distributes total number of enemies on each row
  if (rowCount === 2) { // reset enemy back to first row
    rowCount = 0;
  }
  else // spawn enemy to the next row
    rowCount = rowCount + 1;
}

// PLAYER
var playerImage = 'images/char-boy.png';
var player = new Player(200, 400); // new instance with starting x,y location


// PRINCESS
var princessPosition = [0, 101, 202, 303, 404]; // column positions where Princess stands
var princessImage = 'images/char-princess-girl.png';
var princess = new Princess(princessPosition[getRandomInt(0, 4)],-10); // places Princess at random column location

// LIVES
var heartImage = 'images/Heart.png';
var heartYpos = 460;
var heart1 = new Heart(330, heartYpos); // new instance with starting x,y location
var heart2 = new Heart(380, heartYpos);
var heart3 = new Heart(430, heartYpos);

var allHearts = [heart1, heart2, heart3]; // place all hearts in an array

// GEMS
var gemImage = 'images/Gem Orange.png';
var gemRows = {
    top: 120,
    middle: 200,
    bottom: 280
}; // row location for Gems
var gemPosition = [25, 125, 225, 325, 425]; // column location for Gems

var gem1 = new Gem(gemPosition[getRandomInt(0, 4)], gemRows.top);
var gem2 = new Gem(gemPosition[getRandomInt(0, 4)], gemRows.middle);
var gem3 = new Gem(gemPosition[getRandomInt(0, 4)], gemRows.bottom);

var allGems = [gem1, gem2, gem3]; // place all gems in an array

// OVERLAY - Game Over
var gameOverImage = 'images/game_over.png';
var gameOver = new GameOver(-20, -210, gameOverImage); // new instance with starting x,y location

// OVERLAY - Game Rules
var gameRulesImage = 'images/game_rules.png';
var gameRules = new GameRules(-1000, -1000, gameRulesImage); // new instance with starting x,y location

// OVERLAY - You Win!
var youWinImage = 'images/you_win.png';
var youWin = new YouWin(-20, -210, youWinImage); // new instance with starting x,y location

// DISPLAY Game Rules
showGameRules();

// Game Rules
function showGameRules() {
    gameRules.x = 5; // display game_rules.png sprite at x,y loc
    gameRules.y = 55;
}

// GENERAL FUNCTIONS ***********************************************************

// Reset Game
function resetGame() {
    player.x = initPlayerPos.x;
    player.y = initPlayerPos.y;
    heart1.x = 330;
    heart2.x = 380;
    heart3.x = 430;
    gameOver.y = -210;
    youWin.y = -210;
    gem1.x = gemPosition[getRandomInt(0, 4)];
    gem2.x = gemPosition[getRandomInt(0, 4)];
    gem3.x = gemPosition[getRandomInt(0, 4)];
    var gameSpeed = 0.7; // sets the game speed
    var totalLives = 3; // sets the initial lifes of Player
    var totalGems = 0; // sets the initial count of Gem collected by Player
    gameIsOver = "false";
}

function playerWins() {
    youWin.x = 20; // display YouWin sprite
    youWin.y = 210;
    gameIsOver = "true";
    totalGems = 0;
    totalLives = 3;
}

function playerLoses() {
  // setTimeout(timedFunc, delay);
    gameOver.x = 20; // display GameOver sprite
    gameOver.y = 210;
    gameIsOver = "true";
    totalGems = 0;
    totalLives = 3;
}

//  HELPER FUNCTIONS -----------------------------------------------------------

function updateAndRender(objName, size_x, size_y) {
    objName.prototype.update = function() {}
    objName.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, size_x, size_y);
    }
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function alertLivesLeft() {
  alert('OOPS!!! You have '+(totalLives)+' left...');
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };
    var allowedKeysWhenGameOver = {
        27: 'esc'
    }
    switch (gameIsOver) {
        case "false":
            player.handleInput(allowedKeys[e.keyCode]);
            break;
        case 'true':
            player.handleInput(allowedKeysWhenGameOver[e.keyCode]);
            break;
        default:
            break;
    }
});
