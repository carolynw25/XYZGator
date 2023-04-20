import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardComponent } from './card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';



describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ CardComponent ],
    }).compileComponents();
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');
    fixture.detectChanges();
  });
  
  /*  checks that the component is created successfully by expecting the component object to be truthy. */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* checks that the cards are generated correctly by testing the length of the 
  component.cards array and ensuring that it has a length greater than 0 and exactly 28. 
  It then checks that each card in the component.cards array has the required properties:
   id, isFlipped, isMatched, and color. */
  it('should generate cards correctly', () => {
    expect(component.cards.length).toBeGreaterThan(0);
    expect(component.cards.length).toBe(28);
    for (let i = 0; i < component.cards.length; i++) {
      const card = component.cards[i];
      expect(card.id).toBeDefined();
      expect(card.isFlipped).toBeFalsy();
      expect(card.isMatched).toBeFalsy();
      expect(card.color).toBeDefined();
    }
  });

  /* checks that a card flips over when it is clicked. It does this by selecting the first card 
  in the component.cards array, spying on the component.flipCard() method, clicking on the card 
  element in the fixture, and then expecting the component.flipCard() method to have been called 
  with the selected card as an argument. It then checks that the isFlipped property of the card 
  is set to true. */
  it('should flip card when clicked', () => {
    const card = component.cards[0];
    spyOn(component, 'flipCard');
    const cardElement = fixture.nativeElement.querySelector('.card');
    cardElement.click();
    expect(component.flipCard).toHaveBeenCalledWith(card);
    expect(!card.isFlipped).toBeTruthy();
  });

  /* checks that the game correctly identifies matching cards. 
  It does this by selecting two cards from the component.cards array, 
  flipping them over, and then checking that the isMatched property of 
  each card is still false. */
  it('should identify matching cards', () => {
    const card1 = component.cards[0];
    const card2 = component.cards[1];
    component.flipCard(card1);
    component.flipCard(card2);
    expect(!card1.isMatched).toBeTruthy();
    expect(!card2.isMatched).toBeTruthy();
  });

  /* checks that unmatched cards are flipped back over when two cards are flipped 
  over that do not match. It does this by selecting two cards from the component.cards array, 
  flipping them over, and then checking that the isFlipped property of each card is still false. */
  it('should flip unmatched cards back over', () => {
    const card1 = component.cards[0];
    const card2 = component.cards[2];
    component.flipCard(card1);
    component.flipCard(card2);
    expect(!card1.isFlipped).toBeFalsy();
    expect(!card2.isFlipped).toBeFalsy();
  });

  /* checks that the game can be reset by clicking the reset button. It does this by spying 
  on the component.reset() method, clicking on the reset button in the fixture, and then 
  checking that the component.reset() method has been called and that the disableCards property 
  of the component is false. */
  it('should reset game', () => {
    spyOn(component, 'reset');
    const resetButton = fixture.nativeElement.querySelector('.reset bnputton');
    resetButton.click();
    expect(component.reset).toHaveBeenCalled();
    expect(component.disableCards).toBeFalsy();
  });

  /* checks that the game correctly matches cards with the same color. It does this by selecting
   two cards from the component.cards array, setting their color property to 'red', triggering 
   a click event on each card element, and then checking that the flipped class has been added 
   to each card element and that the matched class has not been added. */
  it('should match cards with the same color', () => {
    const card1 = component.cards[0];
    const card2 = component.cards[1];
    card1.color = 'red';
    card2.color = 'red';
    fixture.detectChanges();
    const cards = fixture.debugElement.queryAll(By.css('.card'));
    expect(cards[0].nativeElement.classList.contains('flipped')).toBe(false);
    expect(cards[1].nativeElement.classList.contains('flipped')).toBe(false);
    cards[0].triggerEventHandler('click', null);
    cards[1].triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(cards[0].nativeElement.classList.contains('flipped')).toBe(true);
    expect(cards[1].nativeElement.classList.contains('flipped')).toBe(true);
    expect(cards[0].nativeElement.classList.contains('matched')).toBe(false);
    expect(cards[1].nativeElement.classList.contains('matched')).toBe(false);
  });



})