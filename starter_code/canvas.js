


//----------------------------  Canvas  -------------------------

class DrowCanvas {
  constructor () {

    this.secretWord = secretWord;
    this.windowX = 1000;
    this.windowY = 500;


    this.ctx = document.getElementById('hangman').getContext('2d');
  }

   clearWindow() {
    this.ctx.clearRect(0, 0, this.windowX, this.windowY);
   }

   drawStartGameTemplate () {

    //------- words lins

        for (let i=0, j=50; i < this.secretWord.length; i++, j+=50) {
          hangCanvas.ctx.beginPath();
          hangCanvas.ctx.moveTo(450+j, 450);
          hangCanvas.ctx.lineTo(470+j, 450);
          hangCanvas.ctx.stroke();
        }

  // Reset the current path
  hangCanvas.ctx.beginPath(); 
  
  // Staring point (10%,90%)
  hangCanvas.ctx.moveTo(this.x*0.10,this.y*0.90);

  // End point ()
  hangCanvas.ctx.lineTo(this.x*(0.10+0.05),this.y*(0.90-0.05));
  hangCanvas.ctx.lineTo(this.x*(0.10+0.1),this.y*0.90);
  hangCanvas.ctx.lineTo(this.x*0.10,this.y*0.90);

  hangCanvas.ctx.lineTo(this.x*(0.10+0.05),this.y*(0.90-0.05));
  hangCanvas.ctx.lineTo(this.x*(0.10+0.05),this.y*0.30);
  hangCanvas.ctx.lineTo(this.x*(0.25),this.y*0.30);
  hangCanvas.ctx.lineTo(this.x*(0.25),this.y*(0.30+0.03));

  // Make the line visible
  hangCanvas.ctx.stroke();

} //--------- End drawStartGameTemplate

    drawHangman(errorNum) {

      switch(errorNum) {
        case 1:
        this.drawLine1();
        break;
        case 2:
        this.drawLine2(); 
        break;
      } // end switch case
         
   } // end drawHangman function 

  drawPlayer() {

    ///////////circle 1
    hangCanvas.ctx.beginPath();
    hangCanvas.ctx.arc(this.x * (0.25), this.y * (0.30 + 0.096), 30, 0, 2 * Math.PI);
    hangCanvas.ctx.stroke();
  } // ----- End Draw Player

  drawCorrectLetter(letter,i) {
    let location = 550+(50*(i-1));
    hangCanvas.ctx.font = "15px Arial";
    hangCanvas.ctx.fillText(letter,location,420);
    }

    drawWorngLetter(letter,i) {
      let location = 400+(50*(i-1));
      hangCanvas.ctx.font = "30px Arial";
      hangCanvas.ctx.fillText(letter,location,200);
    }

        gameOver() {

        }
        gameWinner() {

         }

}   //end of DrowCanvas class
