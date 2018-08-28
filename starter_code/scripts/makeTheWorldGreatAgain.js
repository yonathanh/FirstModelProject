

//---------------  Global variables 

const arrayOfNames = ["Gal Gadot", "Tom Hardy", "Emilia Clarke", "Alexandra Daddario", "Bill Skarsgård", "Pom Klementieff", "Ana de Armas", "Dan Stevens", "Sofia Boutella", "Katherine Langford", "Karen Gillan", "Robbie", "Felicity Jones", "Emma Stone", "Dylan Minnette", "Jennifer Lawrence", "Alicia Vikander", "ritt Robertson", "Brie Larson", "Keanu Reeves", "Sophia Lillis", "James McAvoy"];
const health = 100;
const strength = 80;
const rounds = 4;
const imgSrcPlayer1 = "./images/game-logo-T.png";
const imgSrcPlayer2 = "./images/teroristT.png";
const imgSrcBullet3 = "./images/BulletT.png";
const playerOneLocationX = 130;
const playerOneLocationY = 340;
const playerTwoLocationX = 1020;
const playerTwoLocationY = 380;
var whosTurn = false;


///---------------  Class  BoardGame

class BoardGame {
  constructor(arrayOfNames, healthArg, strengthArg, rounds) {
    this.rounds = rounds;
    this.playerOne = new Player(imgSrcPlayer1, playerOneLocationX, playerOneLocationY, health, strength);
    this.playerTwo = new Player(imgSrcPlayer2, playerTwoLocationX, playerTwoLocationY, health, strength);
    this.getName(arrayOfNames);
    this.setGame(healthArg, strengthArg);
    this.windowX = canvas.width;
    this.windowY = canvas.height;
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
  };

  getName(arrayOfNames) {
    let random1 = Math.floor(Math.random() * arrayOfNames.length);
    let random2 = Math.floor(Math.random() * arrayOfNames.length);
    this.playerOne.name = arrayOfNames[random1];
    this.playerTwo.name = arrayOfNames[random2];
  };

  setGame(healthArg, strengthArg) {
    this.playerOne.health = healthArg;
    this.playerTwo.health = healthArg;
    this.playerOne.strength = strengthArg
    this.playerTwo.strength = strengthArg;
  };// End setGame function


  checkGameWinner() {
    if (this.playerOne.health === 0) {
      setTimeout(() => {
        alert(`Game Over '_' \n Player ${this.playerTwo.name} Wins`);
      }, 200);
      this.drawGameOver()

    } else if (this.playerTwo.health === 0) {
      setTimeout(() => {
        alert(`Game Over '_' \n Player ${this.playerOne.name} Wins`);
      }, 200);
      this.drawGameOver()
    };
  } // End checkGameWinner function


  //------------------------ Drawing functions

  //------------------------ Initial clearing window
  clearWindow() {
    this.ctx.clearRect(0, 0, this.windowX, this.windowY);
   }
   //------------------------ Drawing all the objects in the game
   drawEverything() {
    this.playerOne.drawPlayer();
    this.playerTwo.drawPlayer();
    this.playerOne.bullet.drawBullet(50,-20);
    this.playerTwo.bullet.drawBullet(-30,0);
   } 

   drawStartGameTemplate() {

      // reset players location
      this.playerOne.playerLocation = [playerOneLocationX,playerOneLocationY]; 
      this.playerTwo.playerLocation = [playerTwoLocationX,playerTwoLocationY];
      // reset Bullets location
      this.playerOne.bullet.BulletLocation = [playerOneLocationX,playerOneLocationY];
      this.playerTwo.bullet.BulletLocation = [playerTwoLocationX,playerTwoLocationY];

      //---------- draw the board
      this.drawEverything();


      //------------- draw player name
      document.querySelector(".player-one").innerHTML = this.playerOne.name;
      document.querySelector(".player-two").innerHTML = this.playerTwo.name;

   } //--------- End drawStartGameTemplate


   checkColision() {

    if ( ((this.playerOne.bullet.BulletLocation[0] >= this.playerTwo.playerLocation[0]) && (this.playerOne.bullet.BulletLocation[1] >= this.playerTwo.playerLocation[1]) ) ||
         ((this.playerTwo.bullet.BulletLocation[0] <= this.playerOne.playerLocation[0]) && (this.playerTwo.bullet.BulletLocation[1] >= this.playerOne.playerLocation[1]) ))
            {
              return true;
            }

   } //------------- End checkColision function

     //------------- Animate

     animation(interval) {

      let next = true;

       setTimeout(() =>  { 
    
        console.log("animation");
        
        if ( this.checkColision() )
        {
            if (whosTurn === false) {
            this.playerTwo.health -=10; //(this.playerOne.power/100) * this.playerOne.strength;
            
            } else {
              this.playerOne.health -=10;
            }
            next = false;
        }

        this.ctx.clearRect(0, 0, this.windowX, this.windowY);
        this.drawEverything();  
        if(next){
          this.animation(interval);  
        }

        }, interval ) 

     } //------------- End Animate Function


} // End Class  BoardGame


//-------------------------------------



//----------- Class Player
class Player {

  constructor(imgSrc, playerLocationX, playerLocationY, healthArg, strengthArg) {

    this.health= healthArg;
    this.strength = strengthArg;
    this.imgSrc = imgSrc;
    this.playerLocation = [playerLocationX, playerLocationY];
    this.bullet = new Bullet(imgSrcBullet3, playerLocationX, playerLocationY);
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = 60;
    this.height = 60;
  };

  receiveDamage(theDamage) {
    this.health -= theDamage;

    if (this.health > 0) {
      return `${this.name} has received ${theDamage} points of damage`;
    } else {
      return `${this.name} has died in act of combat`;
    };

  };

  //----------------- draw charector
  drawPlayer() {

    console.log('player drawen');
    console.log (this.imgSrc);

      //getting the src to display as img JS code
      var theImage = new Image();
      theImage.src = this.imgSrc;
      
      // drawing the img of player
      theImage.onload = ()=>{
      this.ctx.drawImage(theImage, this.playerLocation[0], this.playerLocation[1], this.width, this.height)
     
        // drawing the helth points above the player
        this.ctx.font = "15px Arial";
        this.ctx.fillStyle="#FF0000";
        this.ctx.fillText(this.health, this.playerLocation[0],this.playerLocation[1])
    
      }
      

  }; // end draw charector

 //----------------- Movieng Controls
    moveUp(){
      console.log('moveUp');
      this.playerLocation[1] -= 10;
    }

    moveDown(){
      console.log('moveDown');
      this.playerLocation[1] += 10;
    }

    moveRight(){
      console.log('moveRight');
      this.playerLocation[0] += 10;
    }

    moveLeft(){
      console.log('moveLeft');
      this.playerLocation[0] -= 10;
    }

}  // End of Class Player

//-------------------------------------

//----------- Class bullet
class Bullet { 

  constructor(imgSrc, BulletLocationX, BulletLocationY) {
    this.imgSrc = imgSrc;
    this.BulletLocation = [BulletLocationX, BulletLocationY];
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.power = 50;
    this.width = 30;
    this.height = 30;
  };

    drawBullet(dx, dy) {

      console.log('Bullet drawen');
      console.log (this.imgSrc);
  
        //getting the src to display as img (JS code)
        var theImage = new Image();
        theImage.src = this.imgSrc;
        
        // drawing the img of the Bullet
        theImage.onload = ()=>{
        this.ctx.drawImage(theImage, this.BulletLocation[0]+dx, this.BulletLocation[1]+dy, this.width, this.height)
       
          // drawing the power level above the bullet
          this.ctx.font = "15px Arial";
          this.ctx.fillStyle="#FF0000";
          this.ctx.fillText(`${this.power} power`, this.BulletLocation[0],50)
      
        }

      }; // end of draw bulet function


  // -------- shooting bulet

  shoot(direction, strength) {

    this.ex = 50; //for exelaration
    let directionX = direction;
    let directionY = direction;
    let fource = (this.power/100) * strength;
    console.log(fource);
    
    setInterval(() =>  { 
      console.log('Shoot');
      
      this.BulletLocation[0] += (10 * directionX);
      this.BulletLocation[1] -= (10 * directionY);

      fource--;

      if (fource <= 1) {
        directionY = -1;

      }
   
          
      }, this.ex ) //  negative speed of bullet, increse to decrese speed (increases time wait to draw next)

   } // end of function shoot

}  // End of Class bullet






////-------------------  Start Game

// The Game Start Buttens Has Been Clicked
document.getElementById('start-game-button').onclick = function () { 
  console.log("game started")

  // Genarates a new game
  boardGame = new BoardGame(arrayOfNames, health, strength, rounds); 
  boardGame.clearWindow(); // clear previus games
  boardGame.drawStartGameTemplate(); // start game template drowing
  boardGame.animation(50); // drowing everything in set intervals
};

// needs an if statment to activate and deactivate player one
// key controls for player Two

document.onkeydown = (e) =>{

  console.log(e.key)

    switch(e.key){    case 'q':
    if (boardGame.playerTwo.bullet.power < 100) {
    boardGame.playerTwo.bullet.power++;
    }
    break;
    case 'a':
    if (boardGame.playerTwo.bullet.power > 0) {
    boardGame.playerTwo.bullet.power--;}
    break;
    case 'Shift':
    boardGame.playerTwo.bullet.shoot(1, boardGame.playerTwo.strength);
    break;
    case 'ArrowDown':
    boardGame.playerTwo.moveDown();
    break;
    case 'ArrowLeft':
    boardGame.playerTwo.moveLeft();
    break;
    case 'ArrowRight':
    boardGame.playerTwo.moveRight();
    break;
    case 'ArrowUp':
    boardGame.playerTwo.moveUp();
    break;
  }
} // end player Two Key functions

// key controls for player one
document.onkeydown = (e) =>{

  console.log(e.key)

  switch(e.key){
    case 'q':
    if (boardGame.playerOne.bullet.power < 100) {
    boardGame.playerOne.bullet.power++;
    }
    break;
    case 'a':
    if (boardGame.playerOne.bullet.power > 0) {
    boardGame.playerOne.bullet.power--;}
    break;
    case 'Shift':
    boardGame.playerOne.bullet.shoot(1, boardGame.playerOne.strength);
    break;
    case 'ArrowDown':
    boardGame.playerOne.moveDown();
    break;
    case 'ArrowLeft':
    boardGame.playerOne.moveLeft();
    break;
    case 'ArrowRight':
    boardGame.playerOne.moveRight();
    break;
    case 'ArrowUp':
    boardGame.playerOne.moveUp();
    break;
  }
} // end player one Key functions


////---------------------------------------------------------------------
