

//---------------  Global variables 

const arrayOfNames = ["Gal Gadot", "Tom Hardy", "Emilia Clarke", "Alexandra Daddario", "Bill Skarsgård", "Pom Klementieff", "Ana de Armas", "Dan Stevens", "Sofia Boutella", "Katherine Langford", "Karen Gillan", "Robbie", "Felicity Jones", "Emma Stone", "Dylan Minnette", "Jennifer Lawrence", "Alicia Vikander", "ritt Robertson", "Brie Larson", "Keanu Reeves", "Sophia Lillis", "James McAvoy"];
const health = 100;
const strength = 40;
const rounds = 4;
const imgSrcPlayer1 = "./images/game-logo-T.png";
const imgSrcPlayer2 = "./images/teroristT.png";
const imgSrcBullet3 = "./images/BulletT.png";
const playerOneLocationX = 130;
const playerOneLocationY = 340;
const playerTwoLocationX = 1020;
const playerTwoLocationY = 380;


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
    this.playerOne.bullet.drawBullet();
    this.playerTwo.bullet.drawBullet();
   } 

   drawStartGameTemplate() {

      // reset players location
      this.playerOne.playerLocation = [playerOneLocationX,playerOneLocationY]; 
      this.playerTwo.playerLocation = [playerTwoLocationX,playerTwoLocationY];
      // reset Bullets location
      this.playerOne.bullet.BulletLocation = [playerOneLocationX,playerOneLocationY-100];
      this.playerTwo.bullet.BulletLocation = [playerOneLocationX,playerOneLocationY-100];

      //---------- draw the board
      this.drawEverything();


      //------------- draw player name
      document.querySelector(".player-one").innerHTML = this.playerOne.name;
      document.querySelector(".player-two").innerHTML = this.playerTwo.name;

   } //--------- End drawStartGameTemplate

     //------------- Animate

     animation(interval) {

      setTimeout(() =>  { 
    
        console.log("animation");
        console.log(this.width);

        this.ctx.clearRect(0, 0, this.windowX, this.windowY);
        this.drawEverything();  
        this.animation(interval);        
        }, interval ) 

     } //------------- End Animate Function


} // End Class  BoardGame


//-------------------------------------



//----------- Class Player
class Player {

  constructor(imgSrc, playerLocationX, playerLocationY, healthArg, strengthArg, nameArg) {

    this.health= healthArg;
    this.strengthArg = strengthArg;
    this.name = nameArg;
    this.imgSrc = imgSrc;
    this.playerLocation = [playerLocationX, playerLocationY];
    this.bullet = new Bullet(imgSrcBullet3, playerOneLocationX, playerOneLocationY);
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
    this.width = 30;
    this.height = 30;
  };

    drawBullet(dx, dy, dp) {

      console.log('Bullet drawen');
      console.log (this.imgSrc);
  
        //getting the src to display as img JS code
        var theImage = new Image();
        theImage.src = this.imgSrc;
        
        // drawing the img of the Bullet
        theImage.onload = ()=>{
        this.ctx.drawImage(theImage, this.BulletLocation[0]+dx, this.BulletLocation[1]+dy, this.width, this.height)
       
          // drawing the power level above the bullet
          this.ctx.font = "15px Arial";
          this.ctx.fillStyle="#FF0000";
          this.ctx.fillText(this.strengthArg, this.BulletLocation[0],this.BulletLocation[1])
      
        }

      }; // end of draw bulet function


  // -------- shooting bulet

  shoot(dx, dy, dp, direction, i) {

      console.log('Shoot');

      this.dx = dx; //starting point of bulet from player
      this.dy = dy; //starting point of bulet from highet of player
      this.dp = dp; //langth of bulet

      setTimeout(() =>  { 
      
      this.drawBullet(this.dx, this.dy, this.dp);

      this.dx += (10 * direction); // if negative number will go the other direction
      this.dp += (10 * direction); //langth of bulet
      this.dy -= 10; //use for bullet going diagonally
      this.ex = 100; //for exelaration
                
     // 80 is the amount until reacher the other player, temporary value
        if (i < 40) {  
          i++;

          if(i > 20) {
            this.dy += 20;
            //this.ex += 5;
          }       
          
          
          this.shoot(this.dx, this.dy, this.dp, direction, i);    
        }   else {this.ctx.clearRect(this.BulletLocation[0] + (this.dx - 11), this.BulletLocation[1], this.width, this.height);} // deletes the reminder bullet         
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

  switch(e.key){
    case 'Shift':
    boardGame.playerTwo.bullet.shoot(60, 20, 70, -1, 0); // (starting point of bulet from player, starting point of bulet from highet of player, langth of bulet, direction, startting loop point)
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
    case 'Shift':
    boardGame.playerOne.bullet.shoot(60, 20, 70, 1, 0); // (starting point of bulet from player, starting point of bulet from highet of player, langth of bulet, direction, startting loop point)
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
