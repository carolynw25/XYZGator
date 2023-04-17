import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserIdService } from 'app/userIdService';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';


interface Card {
 id: number;
 isFlipped: boolean;
 isMatched: boolean;
 color: string;
}


@Component({
 selector: 'app-card',
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
  <div class="cards">
    <div class="card" [class.flipped]="card.isFlipped" *ngFor="let card of cards" (click)="flipCard(card)" [ngStyle]="{ 'background-color': card.isFlipped ? card.color : ''}">
      <div class="card-content">
        <h2 *ngIf="card.isFlipped">{{ card.color }}</h2>
      </div>
      <div class="card-inner">
        <div class="card-front">
        </div>
        <div class="card-back" >
        </div>
      </div>
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

   .cards {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
     gap: 1px;
     margin: 50px;
     margin-top: 40px;
   }


   .card {
     width: 130px;
     height: 130px;
     position: relative;
     perspective: 1000px;
     cursor: pointer;
     background-color: rgb(243, 242, 239);
   }


   .card-inner {
     position: absolute;
     width: 100%;
     height: 100%;
     transform-style: preserve-3d;
     transition: transform 0.5s;
   }


   .card-front,
   .card-back {
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     backface-visibility: hidden;
     transform-style: preserve-3d;
     transition: all 0.5s ease-in-out;
   }


   .card-front {
     transform: rotateY(0deg);
     z-index: 2;
   }


   .card-back {
     transform: rotateY(180deg);
     z-index: 1;
   }


   .card.flipped .card-inner {
     transform: rotateY(180deg);
   }


   .card.flipped .card-front {
     z-index: 1;
   }


   .card.flipped .card-back {
     transform: rotateY(0deg);
     z-index: 2;
   }


   .card-content {
     padding: 0rem;
     position: relative;
     z-index: 1;
   }

   .card-content h2 {
    background-color: rgb(243, 242, 239);
    color: black;
    text-align: center;
    padding: 0.07rem;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
   }

   /* Shadow effect */
   .card-front::before,
   .card-back::before {
     content: "";
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
     z-index: -1;
     transition: all 0.5s ease-in-out;
   }


   .card-front::before {
     transform: translateZ(-5px);
   }


   .card-back::before {
     transform: translateZ(5px);
   }
 `]
})



export class CardComponent {
  cards: Card[] = [];
  disableCards = false;
  minutes = 0;
  seconds = 0;
  timer: any;
  lowestTime = null;
  newRecord = false;

  userID: number;

constructor(
  private userIDService: UserIdService, 
  private http: HttpClient
) {
  this.newRecord = false;
  const cardColors = ['red', 'green', 'blue', 'yellow', 'orange', 'black', 'purple', 'violet', 'gray', 'lime', 'white', 'teal', 'pink', 'brown'];
    const uniqueCards: Card[] = [];
    //start timer
    this.stopTimer();
    this.startTimer();

    // Generate unique pairs of cards
    for (let i = 1; i <= cardColors.length; i++) {
      const color = cardColors[i - 1];
      const card1: Card = { id: i * 2 - 1, color, isFlipped: false, isMatched: false };
      const card2: Card = { id: i * 2, color, isFlipped: false, isMatched: false };
      uniqueCards.push(card1, card2);
    }

    // Shuffle cards
    this.cards = this.shuffle(uniqueCards);
  }

  flipCard(card: Card) {
    if (!card.isMatched && !this.disableCards) {
      card.isFlipped = !card.isFlipped;
      const flippedCards = this.cards.filter(c => c.isFlipped && !c.isMatched);
      if (flippedCards.length === 2) {
        if (flippedCards[0].color === flippedCards[1].color) {
          flippedCards.forEach(c => c.isMatched = true);
          if (this.cards.every(card => card.isMatched)) {
            // Update lowest time if necessary
            // update lowestTime if current time is lower than previous time
            if (this.lowestTime === null || this.minutes < this.lowestTime.minutes || (this.minutes === this.lowestTime.minutes && this.seconds < this.lowestTime.seconds)) {
              this.lowestTime = { minutes: this.minutes, seconds: this.seconds };
              this.newRecord = true;
              this.setUserScore(this.userID, this.lowestTimeSec()).subscribe(
                () => console.log('Math score updated successfully'),
                (err) => console.error('Error updating math score', err)
              );

            }
            // Show win popup with time here
            clearInterval(this.timer);
            setTimeout(() => {
              Swal.fire({
                title: `Congratulations, you won in ${this.minutes}:${this.seconds < 10 ? '0' : ''}${this.seconds}!`,
                text: `Lowest Time ${this.lowestTime.minutes}:${this.lowestTime.seconds < 10 ? '0' : ''}${this.lowestTime.seconds}${this.newRecord ? ' (newwwww)' : ''}`,
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
            }, 1000);
            }
            //this.newRecord = false;
        } else {
          this.disableCards = true;
          setTimeout(() => {
            flippedCards.forEach(c => c.isFlipped = false);
            this.disableCards = false;
          }, 1000);
        }
      }
    }
  }

  shuffle(array: any[]) {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }


  reset() {
    this.newRecord = false;
    this.cards.forEach(card => {
      card.isFlipped = false;
      card.isMatched = false;
    });
    this.cards = this.shuffle(this.cards);
    this.disableCards = false;
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


  lowestTimeSec(): number{
    let x = this.lowestTime.minutes;
    let y = this.lowestTime.seconds;
    return 60*x+y;
  }
  updateLowestTime(sec: number){
    if (sec >= 60){
      this.lowestTime = { minutes: Math.floor(sec/60), seconds: sec%60 };
    }
    else {
      this.lowestTime = { minutes: 0, seconds: sec };
    }
  }
  ngOnInit(): void {
    //removed to fix unit test, don't think it's needed maybe
    //throw new Error('Method not implemented.');
    this.userID = this.userIDService.getUserId();
    console.log('User ID ohmygoditworked: ', this.userID);

    // Get the user's high score
    this.getUserScore(this.userID).pipe(
      take(1) // take only the first value emitted by the observable
    ).subscribe(score => {
      
      if (score == 999999999999999){
        this.lowestTime = null;
      }
      else{
        this.updateLowestTime(score);
      }

    });
   
  }
  getUserScore(ID: number): Observable<number> {
    const url = 'http://127.0.0.1:8080/api/users/' + ID + '/matchscore'
    return this.http.get<number>(url);
  }

  setUserScore(ID: number, score: number): Observable<number> {
    const url = 'http://127.0.0.1:8080/api/users/' + ID + '/setMatch';
    //const url = `http:/e/127.0.0.1:8080/api/users/${ID}/setMath`;
    console.log('WAH: ', score);
    const body = { matchScore: score };
    //const body = JSON.stringify{score};
    return this.http.put<number>(url, body);
    //return this.http.put<number>(url, {score});
  }

}