import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-math',
  template: `
<div class ="outer">
  <div class="top-bar">
  <div class="correct-count">Correct: {{ numCorrect }}</div>
    <div class="lowestTime">
      <div *ngIf="lowestTime !== null" class="lowest-time"> lowestTime: {{ lowestTime.minutes }}:{{ lowestTime.seconds | number: '2.0' }}</div>
      <div *ngIf="lowestTime == null" class="lowest-time"> lowestTime: </div>
    </div>
    <div class="reset">
      <button (click)="reset()">Reset</button>
    </div>
    <div class="timer"> timer: {{ minutes }}:{{ seconds | number: '2.0' }}</div>
    <div class="return">
      <button (click)="reset()" routerLink="/notifications">Return</button>
    </div>
  </div>
  <div class="question"> Solve: {{ number1 }} + {{ number2 }} </div>
  <div *ngFor="let row of rows" class="row">
    <div *ngFor="let num of row" class="number"
    [ngClass]="{'clickable': num === (number1 + number2), 'incorrect': num === numClicked && num !== (number1 + number2)}" 
    (click)="checkSum(num)">{{ num }} </div>
  </div>
  <!-- [ngClass]="{'clickable': !numClicked && num !== (number1 + number2), 'incorrect': !numClicked && num !== (number1 + number2)}"  -->
  <!-- [ngClass]="{'clickable': num === (number1 + number2)}"  -->

  <!-- [ngClass]="{'clickable': num === (number1 + number2), 'incorrect': num !== (number1 + number2)}"  -->
  <!-- (click)="checkSum(num, $event.target)">{{ num }} </div> -->


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
.lowestTime{
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
.question{
  font-size: 4rem;
  text-align: center;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.number {
  width: 70px;
  height: 70px;
  border: 1px solid black;
  text-align: center;
  margin-right: 15px;
  margin-bottom: 15px;
  cursor: pointer;
}

.incorrect {
  background-color: red;
}
.clickable {
  cursor: pointer;
}
/* .red {
  background-color: red;
} */
.correct-count {
  font-size: 2rem;
  text-align: left;
  /*flex-grow: 1; */
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
    //this.numClicked = true;
    if (clickedNumber === (this.number1 + this.number2)) {
      this.numCorrect++;
      Swal.fire({
        title: 'Congratulations!',
        text: `You clicked ${clickedNumber}, which is the sum of ${this.number1} and ${this.number2}.`,
        icon: 'success'
      });

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
      // const numberElements = document.querySelectorAll('.number');
      // numberElements.forEach((element) => {
      //   const num = parseInt(element.textContent);
      //   if (num === clickedNumber) {
      //     element.classList.add('red');
      //   } else {
      //     element.classList.remove('red');
      //   }
      // });
    } else {
      const clickedElement = event.target as HTMLElement;
      clickedElement.classList.remove('clickable');
      clickedElement.classList.add('incorrect');
    }
  }

  constructor() {
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
    throw new Error('Method not implemented.');
  }

  reset() {
    this.newRecord = false;
    this.stopTimer();
    this.startTimer();
    this.numCorrect = 0;

    // Remove the "incorrect" class from all number elements
    const numberElements = document.querySelectorAll('.number');
    numberElements.forEach((element) => {
    element.classList.remove('incorrect');
  });
  }


  startTimer() {
    //count down from 1 minute
    const startingTime = 60; // Start from 1 minute (60 seconds) (+ a second for loading time)
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
          title: 'Time is up!',
          icon: 'error'
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
