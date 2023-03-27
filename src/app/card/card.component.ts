import { Component } from '@angular/core';


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
  <div class="cards">
    <div class="card" [class.flipped]="card.isFlipped" *ngFor="let card of cards" (click)="flipCard(card)" [ngStyle]="{ 'background-color': card.isFlipped ? card.color : ''}">
      <div class="card-inner">
        <div class="card-front" [ngStyle]="{ 'background-color': card.isFlipped ? card.color : ''}">
          <div class="card-content">
            <h2>{{ card.content }}</h2>
          </div>
        </div>
        <div class="card-back" [ngStyle]="{ 'background-color': card.isFlipped ? card.color : ''}">
          <div class="card-content">
            <h2>{{ card.content }} </h2>
          </div>
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
   .cards {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
     gap: 5px;
     margin: 20px;
     margin-top: 200px;
   }


   .card {
     width: 150px;
     height: 150px;
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
     padding: 1rem;
     position: relative;
     z-index: 1;
   }


   .card-content h2 {
     font-size: 1.5rem;
     margin-bottom: 0.5rem;
   }


   .card-content p {
     font-size: 1rem;
     line-height: 1.2;
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

constructor() {
  const cardColors = ['red', 'green', 'blue', 'yellow', 'orange', 'black', 'purple', 'violet', 'gray', 'lime', 'white', 'teal', 'pink', 'brown'];
  


    const uniqueCards: Card[] = [];

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
}