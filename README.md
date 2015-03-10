# Basic Gameplay
Navigate the player across the busy road to collect all three gems.
Avoid the enemy bugs. Crashing on them will cause you to lose a life.
Upon collecting all 3 gems, proceed to save the princess.
You have a total of 3 lives.
![Game Rules](http://bt7893.github.io/frontend-nanodegree-arcade-game/images/game_rules.png)

### Starting the game
When the game is started, an simple instruction banner will be presented. Pressing the SPACEBAR will dismiss the banner and starts the game.

### 'You Win' event
When the player successfully collects all 3 gems and saves the princess, then the player will be presented with a "You Win" banner.
Press ESC to restart the game. All elements(bugs, hearts, princess) will be reset and the player will be positioned at the start position.

### 'Game Over' event
If an enemy bug hits the player, an alert will display the player's remaining lives. Click OK will dismiss the overlay.
The Heart icon will display the remaining lives left. Player will be reset at start position.
When the player run out of lives, then the game is over. The "Game Over" overlay will display over the screen. Pressing the ESC key will restart the game.


![Gem](http://bt7893.github.io/frontend-nanodegree-arcade-game/images/Gem%20Orange.png)
### Gem Spawning
Once the game restarts, the gems will spawn again at random location on the lanes.


![Enemy Bug](http://bt7893.github.io/frontend-nanodegree-arcade-game/images/enemy-bug.png)
### Enemies
Set the number of bugs on the 'totalEnemies' variable (under app.js). For example, if you set it to 10 enemies, all 10 enemies will be evenly distributed over three lanes. Each time the enemy leaves the frame, it will be random in speed and start position.


![Princess](http://bt7893.github.io/frontend-nanodegree-arcade-game/images/char-princess-girl.png)
### Princess
Each time the game starts, the princess will spawn at random location on the blue tiles.


![Player](http://bt7893.github.io/frontend-nanodegree-arcade-game/images/char-boy.png)
### Player
The player can navigate up, down, left and right but cannot navigate out of the screen.

### Speed
You can change the speed of the game by changing the 'gameSpeed' variable (under app.js).
