let gameScene = new Phaser.Scene('Game');

// some parameters for our scene (our own customer variables - these are NOT part of the Phaser API)
gameScene.init = function() {
    this.playerSpeed = 1.6;
    this.enemyMaxY = 700;
    this.enemyMinY = 100;
  }
  gameScene.gameOver = function() {
    // restart the scene
    this.scene.restart();
}


gameScene.preload = function() {
  this.load.image('HOUSE', 'assets/HOUSE.png');
   
    this.load.image('background', 'assets/background.jpeg');
    this.load.image('player', 'assets/player.png', );
  this.load.image('dragon', 'assets/dragon.png');
  this.load.image('treasure', 'assets/treasure.png');
  };
  
  gameScene.create = function() {
    alert("this is a GST awareness metaphor game in which you have to dodge all other tax and arrive at gst"); 

    
     
     
     let bg = this.add.sprite(0, 0, 'background');
     bg.setOrigin(0,0);
     bg.setScale(4);
     this.player = this.add.image(90, this.sys.game.config.height / 2.2, 'player');
     
     // scale down
     this.player.setScale(.10);

    
    
    
     this.treasure = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2.1, 'treasure');
     this.treasure.setScale(0.25);
     this.enemies = this.add.group({
        key: 'dragon',
        repeat: 4,
        setXY: {
          x: 210,
          y: 100,
          stepX: 240,
          stepY: 70
        }
        
      
       
      });
     
      

      Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.90, -0.90);
      Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
        enemy.speed = Math.random() * 1.8+ 0.2;
      }, this);this.isPlayerAlive = true;this.cameras.main.resetFX(); 
    
    
     gameScene.update = function() {
        if (!this.isPlayerAlive) {
            return;
          }
        // check for active input
        if (this.input.activePointer.isDown) {
            this.player.x += this.playerSpeed;
        }
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())) {
            alert("you filled your gst");
          this.gameOver();
          }
          let enemies = this.enemies.getChildren();
  let numEnemies = enemies.length;
  for (let i = 0; i < numEnemies; i++) {
    // move enemies
    enemies[i].y += enemies[i].speed;
    // reverse movement if reached the edges
    if (enemies[i].y >= this.enemyMaxY && enemies[i].speed > 0) {
      enemies[i].speed *= -1;
    } else if (enemies[i].y <= this.enemyMinY && enemies[i].speed < 0) {
      enemies[i].speed *= -1;
    } if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemies[i].getBounds())) {
        alert("YOU FILLED OTHER TAXES")
      this.gameOver();
        break;
      }
    }
    
  }
  
  
  }



gameScene.gameOver = function() {
    // flag to set player is dead
    this.isPlayerAlive = false;
    // shake the camera
    this.cameras.main.shake(500);
    // fade camera
    this.time.delayedCall(250, function() {
      this.cameras.main.fade(250);
    }, [], this);
    // restart game
    this.time.delayedCall(500, function() {
      this.scene.restart();
    }, [], this);
    
  };
  let config = {
    type: Phaser.AUTO, 
    width: 1450, 
    height: 700, 
    scene: gameScene };
let game = new Phaser.Game(config);