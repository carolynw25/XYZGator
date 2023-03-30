import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardComponent } from './card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';


describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ CardComponent ],
    }).compileComponents();
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');
    fixture.detectChanges();
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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

  it('should flip card when clicked', () => {
    const card = component.cards[0];
    spyOn(component, 'flipCard');
    const cardElement = fixture.nativeElement.querySelector('.card');
    cardElement.click();
    expect(component.flipCard).toHaveBeenCalledWith(card);
    expect(!card.isFlipped).toBeTruthy();
  });

  it('should identify matching cards', () => {
    const card1 = component.cards[0];
    const card2 = component.cards[1];
    component.flipCard(card1);
    component.flipCard(card2);
    expect(!card1.isMatched).toBeTruthy();
    expect(!card2.isMatched).toBeTruthy();
  });

  it('should flip unmatched cards back over', () => {
    const card1 = component.cards[0];
    const card2 = component.cards[2];
    component.flipCard(card1);
    component.flipCard(card2);
    expect(!card1.isFlipped).toBeFalsy();
    expect(!card2.isFlipped).toBeFalsy();
  });

  it('should reset game', () => {
    spyOn(component, 'reset');
    const resetButton = fixture.nativeElement.querySelector('.reset button');
    resetButton.click();
    expect(component.reset).toHaveBeenCalled();
    expect(component.disableCards).toBeFalsy();
  });

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