import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-math',
  template: `
<div class ="outer">
  <div class="top-bar">
  <div class="correct-count">Correct: {{ numCorrect }}</div>
    <div class="highScore"> HighScore: 0 </div>
    <div class="reset">
      <button (click)="reset()">Reset</button>
    </div>
    <div class="timer"> timer: {{ minutes }}:{{ seconds | number: '2.0' }}</div>
    <div class="return">
      <button (click)="stopTimer()" routerLink="/notifications">Return</button>
    </div>
  </div>
  <div class="container">
    <div class="question"> Solve: {{ number1 }} + {{ number2 }} </div>
  </div>
  <div *ngFor="let row of rows" class="row">
    <div *ngFor="let num of row" class="number"
    [ngClass]="{'incorrect': num === numClicked && num !== (number1 + number2), 'correct': num === numClicked && num === (number1 + number2), 'clickable': num === (number1 + number2)}" 
    (click)="checkSum(num)">{{ num }} </div>
  </div>

</div>
`,
styles: [`
.outer {
  padding: 20px;
  min-height: 100vh;
  background-color: lavender;
}
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
}
.highScore{
  font-size: 2rem;
  text-align: left;
  justify-content: flex-start;
}
.timer {
  font-size: 2rem;
  text-align: left;
  justify-content: flex-start;
}
.reset{
  font-size: 2rem;
  margin-right: 20px;
  justify-content: center;
}
.return{
  font-size: 2rem;
  margin-right: 20px;
  justify-content: flex-end;
}
.container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.question{
  background-color: white;
  border: 10px solid rgb(166, 176, 183);
  font-size: 4rem;
  width: 770px;
  text-align: center;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 100%;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 15px;
}
.number {
  background-color: rgb(219, 237, 252);
  width: 70px;
  height: 70px;
  border: 2px solid rgb(166, 176, 183);
  text-align: center;
  margin-right: 15px;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-family: Arial, sans-serif;
}

.incorrect {
  background-color: red;
}
.clickable {
  cursor: pointer;
}
.correct {
  background-color: green;
}

.correct-count {
  font-size: 2rem;
  text-align: left;

}
`]
})

export class MathComponent implements OnInit {
  minutes = 1;
  seconds = 0;
  timer: any;
  lowestTime = null;
  newRecord = false;
  rows: number[][] = [];
  number1: number;
  number2: number;
  //numClicked = false;
  numClicked: number = null;
  numCorrect: number = 0;


  generateNumbers() {
    let currentRow: number[] = [];
    let currentNum = 1;
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 10; j++) {
        currentRow.push(currentNum);
        currentNum++;
      }
      this.rows.push(currentRow);
      currentRow = [];
    }
  }
  checkSum(clickedNumber: number) {
    if (clickedNumber === (this.number1 + this.number2)) {
      this.numCorrect++;
      // Swal.fire({
      //   title: 'Congratulations!',
      //   text: `You clicked ${clickedNumber}, which is the sum of ${this.number1} and ${this.number2}.`,
      //   icon: 'success'
      // });

    // Change the number1 and number2 variables to generate a new problem
    this.number1 = Math.floor(Math.random() * 15) + 1;
    this.number2 = Math.floor(Math.random() * 15) + 1;

    // Reset the numClicked variable to null
    this.numClicked = null;

    // Remove the "incorrect" class from all number elements
    const numberElements = document.querySelectorAll('.number');
    numberElements.forEach((element) => {
      element.classList.remove('incorrect');
    });
    } else {
      const clickedElement = event.target as HTMLElement;
      clickedElement.classList.remove('clickable');
      clickedElement.classList.add('incorrect');
      //clickedElement.classList.add('correct');

    }
  }

  constructor(public router: Router) {
    //the numbers
    this.generateNumbers();
    //start timer
    this.stopTimer();
    this.startTimer();
    //numbers
    this.number1 = Math.floor(Math.random() * 15) + 1;
    this.number2 = Math.floor(Math.random() * 15) + 1;
    
  }
  ngOnInit(): void {
    //removed to fix unit test, don't think it's needed maybe
    //throw new Error('Method not implemented.');
  }

  reset() {
    this.newRecord = false;
    this.stopTimer();
    this.startTimer();
    this.numCorrect = 0;
    //numbers
    this.number1 = Math.floor(Math.random() * 15) + 1;
    this.number2 = Math.floor(Math.random() * 15) + 1;

    // Remove the "incorrect" class from all number elements
    const numberElements = document.querySelectorAll('.number');
    numberElements.forEach((element) => {
    element.classList.remove('incorrect');
  });
  }


  startTimer() {
    //count down from 1 minute
    const startingTime = 6; // Start from 1 minute (60 seconds) (+ a second for loading time)
    this.minutes = Math.floor(startingTime / 60);
    this.seconds = startingTime % 60;
  
    this.timer = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        this.seconds = 59;
        this.minutes--;
      }
      if (this.minutes === 0 && this.seconds === 0) {
        clearInterval(this.timer);
        Swal.fire({
          title: `Congratulations, you won in=!`,
          text: `Lowest Time  ' (newwwww)' : ''}`,
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
          padding: '3em',
          color: '#716add',
          //background: '#fab url("assets/img/cuteGator.png")',
          ...(this.newRecord? {
            backdrop: `
            rgba(0,0,123,0.4)
            url("assets/img/nyan-cat-gif.webp")
            left top
            no-repeat
          `
          } : {})
        });
        //this.lowestTime = { minutes: 1, seconds: 0 };
        return;
      }
    }, 1000);




    //counts up from 0
    // this.timer = setInterval(() => {
    //   if (this.seconds < 59) {
    //     this.seconds++;
    //   } else {
    //     this.minutes++;
    //     this.seconds = 0;
    //   }
    // }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
    this.minutes = 0;
    this.seconds = 0;
  }


}
