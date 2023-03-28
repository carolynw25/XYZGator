import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-math',
  template: `
<div class ="outer">
  <div class="top-bar">
    <div class="lowestTime">
      <div *ngIf="lowestTime !== null" class="lowest-time"> lowestTime: {{ lowestTime.minutes }}:{{ lowestTime.seconds | number: '2.0' }}</div>
      <div *ngIf="lowestTime == null" class="lowest-time"> lowestTime: </div>
    </div>
    <div class="reset">
      <button (click)="reset()">Reset</button>
    </div>
    <div class="timer"> timer: {{ minutes }}:{{ seconds | number: '2.0' }}</div>
    <div class="return">
      <button routerLink="/notifications">Return</button>
    </div>
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

`]
})

export class MathComponent implements OnInit {
  minutes = 0;
  seconds = 0;
  timer: any;
  lowestTime = null;
  newRecord = false;

constructor() {
    //start timer
    this.stopTimer();
    this.startTimer();

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  reset() {
    this.newRecord = false;
    this.stopTimer();
    this.startTimer();
  }


  startTimer() {
    this.timer = setInterval(() => {
      if (this.seconds < 59) {
        this.seconds++;
      } else {
        this.minutes++;
        this.seconds = 0;
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
    this.minutes = 0;
    this.seconds = 0;
  }


}
