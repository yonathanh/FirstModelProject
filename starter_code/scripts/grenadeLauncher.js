
//-------------------------------------------------------------------------------------------------



////---------------- function explostion animation


var canv = document.getElementById('canvas');
var ctx = canv.getContext('2d');

var imgExSrc = new Image();
imgExSrc.src = "./images/blood-spriteT.png";
var explosions= [{x:0, y:0, animx:0, animy:0 }];


function animateExplosion(x,y) {

  setInterval(() => {
    //Animation explosions
    for (i in explosions) {
      explosions[i].animx = explosions[i].animx + 0.5;
      if (explosions[i].animx > 7) { explosions[i].animy++; explosions[i].animx = 0 }
      if (explosions[i].animy > 7)
        explosions.splice(i, 1);
        ctx.clearRect(0, 0, canv.width, canv.height);
    }

    if (explosions.length !== 0) {
      for (i of explosions) {

      //-------- audio sound for the explosion
       
        ctx.drawImage(imgExSrc, 128 * Math.floor(i.animx), 128 * Math.floor(i.animy), 128, 128, x, y, 70, 70);
        
      }
    }

  }, 30);
  

}// End function animateExplosion 

//animateExplosion(500, 100);

//----------------- Game sounds functions

function expSound () {

  var sound = new Audio();
  sound.src = "./sounds/Water-explostion.mp3";
  sound.play();

}

function gameSound () {

  var sound = new Audio();
  sound.src = "./sounds/Tribal Ritual.wav";
  sound.play();

}

function powerUpSound () {

  var sound = new Audio();
  sound.src = "./sounds/power-up.mp3";
  sound.play();

}

function AngleSound () {

  var sound = new Audio();
  sound.src = "./sounds/angleAdjust2.mp3";
  sound.play();

}

function shootSound () {

  var sound = new Audio();
  sound.src = "./sounds/Shoot.mp3";
  sound.play();

}

function grenadeExplode () {

  var sound = new Audio();
  sound.src = "./sounds/GrenadeExplosion.mp3";
  sound.play();

}

function droppingSound () {

  var sound = new Audio();
  sound.src = "./sounds/Rocket-thrust.mp3";
  sound.play();

}


//----------------- End Game sounds functions

//-------------------------------------------------------------------------------------------------


//---------------  Global variables 

const arrayOfNames = ["Gal Gadot", "Tom Hardy", "Emilia Clarke", "Alexandra Daddario", "Bill Skarsgård", "Pom Klementieff", "Ana de Armas", "Dan Stevens", "Sofia Boutella", "Katherine Langford", "Karen Gillan", "Robbie", "Felicity Jones", "Emma Stone", "Dylan Minnette", "Jennifer Lawrence", "Alicia Vikander", "ritt Robertson", "Brie Larson", "Keanu Reeves", "Sophia Lillis", "James McAvoy"];
const health = 16;
const strength = 40;
const rounds = 4;
const imgSrcPlayer1 = "./images/trump.png";
const imgSrcPlayer2 = "./images/teroristT.png";
const imgSrcBullet3 = "./images/552px-Frag_Grenade3.png";
const playerOneLocationX = 130;
const playerOneLocationY = 340;
const playerTwoLocationX = 1050;
const playerTwoLocationY = 380;
var whosTurn = true;


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
    this.anime = true;
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
    if (this.playerOne.health <= 0) {

      this.anime = false;
      expSound();
      animateExplosion(130, 340);

      setTimeout(() => {
        alert(`Game Over '_' \n Player ${this.playerTwo.name} Wins`);
        window.location.reload();
      }, 2000);
      //this.drawGameOver()

    } else if (this.playerTwo.health <= 0) {

      this.anime = false;
      expSound();
      animateExplosion(1050, 380);

      setTimeout(() => {
        alert(`Game Over '_' \n Player ${this.playerOne.name} Wins`);
        window.location.reload();
      }, 2000);
      //this.drawGameOver()
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
    this.playerOne.bullet.drawBullet(50,7);
    this.playerTwo.bullet.drawBullet(-3,32);
    // this.playerOne.animateExplosion(100,100);
    // this.playerTwo.animateExplosion(50,50);
   } 

   drawStartGameTemplate() {

      // reset players location
      this.playerOne.playerLocation = [playerOneLocationX,playerOneLocationY]; 
      this.playerTwo.playerLocation = [playerTwoLocationX,playerTwoLocationY];
      // reset Bullets location
      this.playerOne.bullet.BulletLocation = [playerOneLocationX,playerOneLocationY];
      this.playerTwo.bullet.BulletLocation = [playerTwoLocationX,playerTwoLocationY];

      //---------- draw the board
      this.playerOne.drawPlayer();
      this.playerTwo.drawPlayer();
      this.playerOne.bullet.drawBullet(50,7);
      this.playerTwo.bullet.drawBullet(-3,32);


      //------------- draw player name
      document.querySelector(".player-one").innerHTML = this.playerOne.name;
      document.querySelector(".player-two").innerHTML = this.playerTwo.name;

   } //--------- End drawStartGameTemplate


   checkColision() {

    let checker =0; // the return value for 4 options,

     let object1x = this.playerOne.playerLocation[0];
     let object1y = this.playerOne.playerLocation[1];
     let object1width = this.playerOne.width;
     let object1height = this.playerOne.height;
     let object1Bx = this.playerOne.bullet.BulletLocation[0];
     let object1By = this.playerOne.bullet.BulletLocation[1];
     let object1Bwidth = this.playerOne.bullet.width;
     let object1Bheight = this.playerOne.bullet.height;
     let object2x = this.playerTwo.playerLocation[0];
     let object2y = this.playerTwo.playerLocation[1];
     let object2width = this.playerTwo.width;
     let object2height = this.playerTwo.height;
     let object2Bx = this.playerTwo.bullet.BulletLocation[0];
     let object2By = this.playerTwo.bullet.BulletLocation[1];
     let object2Bwidth = this.playerTwo.bullet.width;
     let object2Bheight = this.playerTwo.bullet.height;

     // The objects are touching

     // bullet from player one hits player two
     if ((object1Bx < (object2x + object2width) && (object1Bx) > object2x) &&
       (object1By < (object2y + object2height) && (object1By) > object2y)) {
       checker = 1;
       // bullet player one hits a wall
     } else if ((object1Bx > this.windowX) || (object1By > this.windowY)) {
       checker = 2;
       // bullet from Two one hits player One
     } else if ((object2Bx < object1x + object1width && object2Bx + object2Bwidth > object1x) &&
       (object2By < object1y + object1height && object2By + object2Bheight > object1y)) {
       checker = 3;
        // bullet player Two hits a wall
     } else if ((object2Bx <= 0) || (object2By > this.windowY )) {
       checker = 4;
     }
     else // bullet is still in motion
     { checker = 0; }

     return checker;

   } //------------- End checkColision function

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

      //getting the src to display as img JS code
      var theImage = new Image();
      theImage.src = this.imgSrc;
      
      // drawing the img of player
      this.ctx.drawImage(theImage, this.playerLocation[0], this.playerLocation[1], this.width, this.height)
     
        // drawing the helth points above the player
        this.ctx.font = "15px Arial";
        this.ctx.fillStyle="#FF0000";
        if (this.health >0) {
          this.ctx.fillText(this.health, this.playerLocation[0], this.playerLocation[1])
        } else {this.ctx.fillText('XX', this.playerLocation[0], this.playerLocation[1])}

        // drawing the power level above the bullet
        this.ctx.font = "15px Arial";
        this.ctx.fillStyle="#FF0000";
        this.ctx.fillText(`${this.bullet.power} power`,this.playerLocation[0], 50)

         // drawing the angle level above the bullet in a line increase format
         this.ctx.beginPath();
         this.ctx.lineWidth=10;
         this.ctx.moveTo(this.playerLocation[0]+20, 150);
         this.ctx.lineTo(this.playerLocation[0]+20, 150-this.bullet.angle);
         this.ctx.closePath();
         this.ctx.strokeStyle="#7700ff";
         this.ctx.stroke();


         // drawing the angle level above the bullet in a number increase format
        //  this.ctx.font = "15px Arial";
        //  this.ctx.fillStyle="#7700ff";
        //  this.ctx.fillText(`${this.bullet.angle} angle`,this.playerLocation[0], 100)
    
      

  }; // end draw charector


//   // End function animateExplosion 

//  animateExplosion(x,y) {


//   console.log("animateExplosion");

//   var imgExSrc = new Image();
//   imgExSrc.src = "./images/blood-spriteT.png";
//   var explosions= [{x:0, y:0, animx:0, animy:0 }];

//   setInterval(() => {
//     //Animation explosions
//     for (i in explosions) {
//       explosions[i].animx = explosions[i].animx + 0.5;
//       if (explosions[i].animx > 7) { explosions[i].animy++; explosions[i].animx = 0 }
//       if (explosions[i].animy > 7)
//         explosions.splice(i, 1);
//         this.ctx.clearRect(0, 0, canv.width, canv.height);
//     }

//     if (explosions.length !== 0) {
//       for (i of explosions) {
//         ctx.drawImage(imgExSrc, 128 * Math.floor(i.animx), 128 * Math.floor(i.animy), 128, 128, x, y, 60, 60);
        
//       }
//     }

//   }, 20);
  

// }// End function animateExplosion 

 //----------------- Movieng Controls
    moveUp(){
      this.playerLocation[1] -= 10;
    }

    moveDown(){
      this.playerLocation[1] += 10;
    }

    moveRight(){
      this.playerLocation[0] += 10;
    }

    moveLeft(){
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
    this.width = 15;
    this.height = 15;
    this.power = 40;
    this.angle = 4 ; // default =4
    this.canShoot = true;

    
    
  };

    drawBullet(dx, dy) {
  
        //getting the src to display as img (JS code)
        var theImage = new Image();
        theImage.src = this.imgSrc;
        
        // drawing the img of the Bullet
        this.ctx.drawImage(theImage, this.BulletLocation[0]+dx, this.BulletLocation[1]+dy, this.width, this.height);

      }; // end of draw bulet function


  // -------- shooting bulet

  shoot(direction, strength ) {

    
if (this.canShoot) {

    this.ex = 80; //bullet speed (the higher, the slower the speed)
    let directionX = direction;
    let directionY = 1;
    let fource = (this.power/50) * strength;
    let dy = 20; // 4
      
    setInterval(() =>  { 
        
        this.BulletLocation[0] += (4 * directionX);
        this.BulletLocation[1] -= (this.angle * directionY);
  
        fource--;
  
        if (fource <= 1) {
          directionY = -1;
        }
     
      }, this.ex ) //  negative speed of bullet, increse to decrese speed (increases time wait to draw next)
      setInterval(() =>  { 
        
        this.BulletLocation[0] += (4 * directionX);
        this.BulletLocation[1] += (this.angle/2 * directionY);
  
  
        if (fource <= 1) {
          directionY = -1;
        }
     
      }, this.ex ) //  negative speed of bullet, increse to decrese speed (increases time wait to draw next)

      this.canShoot = false;
    }

   } // end of function shoot


}  // End of Class bullet


////------------------- End classes and varables ----------------------------////



////-------------------  Start Game

// The Game Start Buttens Has Been Clicked
document.getElementById('start-game-button').onclick = function () { 

  gameSound ();

  // Genarates a new game
  boardGame = new BoardGame(arrayOfNames, health, strength, rounds); 
  boardGame.clearWindow(); // clear previus games
  boardGame.drawStartGameTemplate(); // start game template drowing
  animation(boardGame.anime);
};



function changeTurn() {

  if ( boardGame.checkColision() != 0 )
  {
    if (boardGame.checkColision() === 1) { // player one bullet hit player two

      grenadeExplode ();
      boardGame.playerTwo.health = boardGame.playerOne.health - (boardGame.playerOne.bullet.power / 100) * boardGame.playerOne.strength;
      whosTurn = false;
      boardGame.playerOne.bullet = new Bullet(imgSrcBullet3, playerOneLocationX, playerOneLocationY);
      setTimeout(() => {
      boardGame.checkGameWinner();
      },200)
    } else if (boardGame.checkColision() === 2) {  // player one bullet hit wall

      grenadeExplode ();
      whosTurn = false;
      boardGame.playerOne.bullet = new Bullet(imgSrcBullet3, playerOneLocationX, playerOneLocationY);
    } else if (boardGame.checkColision() === 3) {  // player Two bullet hit player One

      grenadeExplode ();
      boardGame.playerOne.health = boardGame.playerOne.health - (boardGame.playerOne.bullet.power / 100) * boardGame.playerOne.strength;
      whosTurn = true;
      boardGame.playerTwo.bullet = new Bullet(imgSrcBullet3, playerTwoLocationX, playerTwoLocationY);
      setTimeout(() => {
        boardGame.checkGameWinner();
        },200)
    } else if (boardGame.checkColision() === 4) {  // player Two bullet hit Wall

      grenadeExplode ();
      whosTurn = true;
      boardGame.playerTwo.bullet = new Bullet(imgSrcBullet3, playerTwoLocationX, playerTwoLocationY);
    }

  }// end if statment

} //---- End function check turn


function animation(anime) {

  boardGame.ctx.clearRect(0, 0, boardGame.windowX, boardGame.windowY);
  boardGame.drawEverything(); 
  changeTurn(); 

  anime = boardGame.anime;

  if (anime) {
    window.requestAnimationFrame(animation);
  }

} //------------- End Animate Function

// needs an if statment to activate and deactivate player one

// key controls for players
document.onkeydown = (e) =>{

  // key controls for player one
  if (whosTurn) {
    switch (e.key) {
      case 'q':
        if (boardGame.playerOne.bullet.power < 200) {
          powerUpSound ()
          boardGame.playerOne.bullet.power++;
        }
        break;
      case 'a':
        if (boardGame.playerOne.bullet.power > 0) {
          powerUpSound ()
          boardGame.playerOne.bullet.power--;
        }
        break;
      case 'Shift':
        boardGame.playerOne.bullet.shoot(1, boardGame.playerOne.strength);
        shootSound ();
        setTimeout(() => {
          droppingSound ();
        }, 1000);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (boardGame.playerOne.bullet.angle < 100) {
          AngleSound ();
          boardGame.playerOne.bullet.angle++;
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (boardGame.playerOne.bullet.angle > 0) {
          AngleSound ();
          boardGame.playerOne.bullet.angle--;
        }
        break;
      // case 'ArrowLeft':
      //   e.preventDefault();
      //   boardGame.playerOne.moveLeft();
      //   break;
      // case 'ArrowRight':
      //   e.preventDefault();
      //   boardGame.playerOne.moveRight();
      //   break;
    } // end player one Key functions
  } else {
    // key controls for player one  
    switch (e.key) {
      case 'q':
        if (boardGame.playerTwo.bullet.power < 200) {
          powerUpSound ();
          boardGame.playerTwo.bullet.power++;
        }
        break;
      case 'a':
        if (boardGame.playerTwo.bullet.power > 0) {
          powerUpSound ();
          boardGame.playerTwo.bullet.power--;
        }
        break;
      case 'Shift':
        boardGame.playerTwo.bullet.shoot(-1, boardGame.playerTwo.strength);
        shootSound ();
        setTimeout(() => {
          droppingSound ();
        }, 1000);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (boardGame.playerTwo.bullet.angle < 100) {
          AngleSound ();
          boardGame.playerTwo.bullet.angle++;
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (boardGame.playerTwo.bullet.angle > 0) {
          AngleSound ();
          boardGame.playerTwo.bullet.angle--;
        }
        break;
      // case 'ArrowLeft':
      //   e.preventDefault();
      //   boardGame.playerTwo.moveLeft();
      //   break;
      // case 'ArrowRight':
      //   e.preventDefault();
      //   boardGame.playerTwo.moveRight();
      //   break;
    }
  } // end player Two Key functions

}//End key controls for players


   

////---------------------------------------------------------------------
