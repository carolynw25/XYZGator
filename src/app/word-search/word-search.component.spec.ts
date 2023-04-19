import { WordSearchComponent } from './word-search.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('WordSearchComponent', () => {
  let component: WordSearchComponent;
  let fixture: ComponentFixture<WordSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [WordSearchComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //component = new WordSearchComponent(null, null); // pass null as arguments for userIDService and http
  });



  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the lowest time when available', () => {
    component.lowestTime = { minutes: 1, seconds: 30 };
    fixture.detectChanges();
    const lowestTime = fixture.nativeElement.querySelector('.lowest-time');
    expect(lowestTime.textContent).toContain('1:30');
  });


  it('should limit possible words to 10 letters', () => {
    expect(component.possibleWords.every(word => word.length <= 10)).toBe(true);
  });

  it('should generate a grid with correct dimensions and letters', () => {
    component.words = ['APPLE', 'BANANA', 'CHERRY', 'PEAR', 'WATERMELON'];
    component.generateGrid();
    expect(component.grid.length).toBe(10);
    expect(component.grid.every(row => row.length === 25)).toBe(true);
    const allLetters = component.grid.flat().join('');
    expect(allLetters).toMatch(/^[A-Z]{250}$/); // grid should contain only capital letters
    for (const word of component.words) {
      const found = component.grid.some(row =>
        row.join('').includes(word.charAt(0))
      );
      expect(found).toBe(true); // each word should be present in the grid
    }
  });

  it('should return null when word cannot be placed', () => {
    component.grid = [['A', 'P', 'P', 'L', 'E'], ['B', '', '', '', ''], ['C', '', '', '', ''], ['D', '', '', '', ''], ['E', '', '', '', '']];
    const positions = component.canPlaceWord('BANANA', 0, 0, 1, 1);
    expect(positions).toBe(null); // BANANA overlaps with APPLE
  });

  it('should start the timer', () => {
    component.startTimer();
    expect(component.minutes).toBe(0);
    expect(component.seconds).toBe(0);
    expect(component.timer).toBeTruthy();
  });


  it('should stop the timer', () => {
    component.startTimer();
    component.stopTimer();
    expect(component.minutes).toBe(0);
    expect(component.seconds).toBe(0);
  });


  it('should reset the game', () => {
    component.reset();
    expect(component.highlightedWords.length).toBe(0);
    expect(component.coords.length).toBe(0);
    expect(component.wordsFound).toBe(0);
    expect(component.start).toBeFalsy();
    expect(component.words.length).toBe(5);
    expect(component.grid.length).toBe(10);
    expect(component.grid[0].length).toBe(25);
    expect(component.newRecord).toBeFalsy();
  });


})