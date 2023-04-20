import { Component } from '@angular/core';
import { Card } from './card.model';

@Component({
  selector: 'app-card-controller',
  templateUrl: './card-controller.component.html',
  styleUrls: ['./card-controller.component.css']
})
export class CardControllerComponent {
  // Array of cards with random values and initial flipped state
  cards: Card[] = [
    { value: 'A', isFlipped: false },
    { value: 'B', isFlipped: false },
    { value: 'C', isFlipped: false },
    { value: 'D', isFlipped: false },
    { value: 'E', isFlipped: false },
    { value: 'F', isFlipped: false },
    { value: 'G', isFlipped: false },
    { value: 'H', isFlipped: false }
  ];

  // Method to flip a card when clicked
  flipCard(card: Card): void {
    card.isFlipped = !card.isFlipped;
  }
}
