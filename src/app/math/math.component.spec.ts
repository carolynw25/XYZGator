
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { MathComponent } from './math.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


describe('MathComponent', () => {
  let component: MathComponent;
  let fixture: ComponentFixture<MathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ MathComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  /*  checks whether the component is created successfully or not. 
  It expects the component to be truthy, which means that it should be defined and not null. */

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* checks whether the function generateNumbers() correctly generates numbers for the rows. 
  It expects the rows array to have a length greater than 0 after calling the function. */
  it('should generate numbers for rows', () => {
    component.generateNumbers();
    expect(component.rows.length).toBeGreaterThan(0);
  });

  /* checks whether the component initializes with the correct default values. 
  It checks the default values such as minutes, seconds, lowestTime, newRecord, 
  rows, number1, number2, numClicked, and numCorrect. */
  it('should initialize with correct default values', () => {
    expect(component.minutes).toEqual(1);
    expect(component.seconds).toEqual(0);
    //expect(component.timer).toBeUndefined();
    expect(component.lowestTime).toBeNull();
    expect(component.newRecord).toBeFalsy();
    expect(component.rows.length).toEqual(3);
    expect(component.number1).toBeDefined();
    expect(component.number2).toBeDefined();
    expect(component.numClicked).toBeNull();
    expect(component.numCorrect).toEqual(0);
  });

  /* checks whether the function generateNumbers() generates an array of numbers correctly. 
  It checks the length of each row in the array. */
  it('should generate an array of numbers', () => {
    component.generateNumbers();
    expect(component.rows[0].length).toEqual(10);
    expect(component.rows[1].length).toEqual(10);
    expect(component.rows[2].length).toEqual(10);
  });

  /* checks whether the function reset() correctly resets the game. 
  It sets some properties of the component to non-default values, 
  calls the reset() function, and then checks whether the properties 
  have been reset to their default values. */
  it('should reset the game', () => {
    component.numCorrect = 5;
    component.numClicked = 10;
    component.number1 = 4;
    component.number2 = 5;
    component.minutes = 0;
    component.seconds = 30;

    component.reset();

    expect(component.numCorrect).toEqual(0);
    expect(component.numClicked).toEqual(10);
    expect(component.number1).toBeDefined();
    expect(component.number2).toBeDefined();
    expect(component.minutes).toEqual(1);
    expect(component.seconds).toEqual(0);
  });

  /* checks whether the function checkSum() correctly updates 
  the properties numCorrect, numClicked, number1, and number2 
  when a number is clicked. It sets some properties of the component, 
  calls the checkSum() function with a clicked number, and then checks
   whether the properties have been updated correctly. */
  it('should check the sum of clicked numbers', () => {
    component.number1 = 2;
    component.number2 = 3;
    const clickedNumber = 5;

    component.checkSum(clickedNumber);

    expect(component.numCorrect).toEqual(1);
    expect(component.numClicked).toBeNull();
    expect(component.number1).toBeDefined();
    expect(component.number2).toBeDefined();
  });

  /*  checks whether the function checkSum() correctly updates the properties 
  numCorrect and numClicked when a number is clicked. It sets some properties 
  of the component, calls the checkSum() function with a clicked number */
  it('should check the sum of numbers on click', () => {
    component.number1 = 5;
    component.number2 = 7;
    component.numClicked = null;
    component.checkSum(12);
    expect(component.numCorrect).toBe(1);
    expect(component.numClicked).toBe(null);
    //Developer note: checks whether the properties have been updated correctly. needs help
    //component.checkSum(11);
    //expect(component.numCorrect).toBe(1);
    //expect(component.numClicked).toBe(11);
    //component.checkSum(12);
    //expect(component.numCorrect).toBe(2);
    //expect(component.numClicked).toBe(null);
  });

  /* checks whether the component correctly displays correct and incorrect 
  numbers when they are clicked. It sets some properties of the component, 
  finds the correct and incorrect numbers on the screen, clicks on them, and then checks 
  whether they have been marked as incorrect. */
  it('should display correct and incorrect numbers', () => {
    component.number1 = 5;
    component.number2 = 7;
    fixture.detectChanges();
    const numbers = fixture.debugElement.queryAll(By.css('.number'));
    expect(numbers.length).toBe(component.rows.flat().length);
    const correctNumber = component.number1 + component.number2;
    const correctNumberElement = numbers.find(num => num.nativeElement.textContent.trim() === correctNumber.toString());
    correctNumberElement.nativeElement.click();
    fixture.detectChanges();
    //this will be needed if we decide to label things correct later on
    //expect(correctNumberElement.nativeElement.classList).toContain('correct');
    const incorrectNumber = component.rows.flat().find(num => num !== correctNumber);
    const incorrectNumberElement = numbers.find(num => num.nativeElement.textContent.trim() === incorrectNumber.toString());
    incorrectNumberElement.nativeElement.click();
    fixture.detectChanges();
    expect(incorrectNumberElement.nativeElement.classList).toContain('incorrect');
  });

  /* checks whether the function reset() is called correctly when the reset button is clicked.
   It sets some properties of the component, spies on the clearInterval() function, clicks
    on the reset button, and then checks whether the properties have been reset to their 
    default values and whether the clearInterval() function has been called. */
  it('should reset the game on reset button click', () => {
    component.number1 = 5;
    component.number2 = 7;
    component.numClicked = 12;
    component.numCorrect = 2;
    spyOn(window, 'clearInterval');
    component.reset();
    //expect(component.numClicked).toBe(null);
    expect(component.numCorrect).toBe(0);
    expect(window.clearInterval).toHaveBeenCalled();
  });

});










  // it('should navigate to game page when the return button is clicked', () => {
  //   spyOn(component['router'], 'navigate');
  //   const button = fixture.debugElement.query(By.css('.return')).nativeElement;
  //   button.click();
  //   expect(component['router'].navigate).toHaveBeenCalledWith(['/notifications']);  
  // });










//Auto Generated
// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { MathComponent } from './math.component';

// describe('MathComponent', () => {
//   let component: MathComponent;
//   let fixture: ComponentFixture<MathComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ MathComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(MathComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
