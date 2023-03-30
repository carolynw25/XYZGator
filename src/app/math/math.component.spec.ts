
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate numbers for rows', () => {
    component.generateNumbers();
    expect(component.rows.length).toBeGreaterThan(0);
  });

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

  it('should generate an array of numbers', () => {
    component.generateNumbers();
    //rows = 6? look into this
    expect(component.rows.length).toEqual(6);
    expect(component.rows[0].length).toEqual(10);
    expect(component.rows[1].length).toEqual(10);
    expect(component.rows[2].length).toEqual(10);
  });

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

  it('should check the sum of numbers on click', () => {
    component.number1 = 5;
    component.number2 = 7;
    component.numClicked = null;
    component.checkSum(12);
    expect(component.numCorrect).toBe(1);
    expect(component.numClicked).toBe(null);
    //component.checkSum(11);
    //expect(component.numCorrect).toBe(1);
    //expect(component.numClicked).toBe(11);
    //component.checkSum(12);
    //expect(component.numCorrect).toBe(2);
    //expect(component.numClicked).toBe(null);
  });

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

  // it('should navigate to "/notifications" when the return button is clicked', () => {
  //   spyOn(component['router'], 'navigate');
  //   const button = fixture.debugElement.query(By.css('.return')).nativeElement;
  //   button.click();
  //   expect(component['router'].navigate).toHaveBeenCalledWith(['/notifications']);  
  // });




});





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
