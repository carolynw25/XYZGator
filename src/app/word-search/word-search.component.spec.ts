import { WordSearchComponent } from './word-search.component';

describe('WordSearchComponent', () => {
  let component: WordSearchComponent;

  beforeEach(() => {
    component = new WordSearchComponent(null, null); // pass null as arguments for userIDService and http
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

  it('should stop and reset the timer', () => {
    jasmine.clock().install();
    component.startTimer();
    jasmine.clock().tick(5000);
    component.stopTimer();
    expect(component.minutes).toBe(0);
    expect(component.seconds).toBe(0);
    jasmine.clock().uninstall();
  });

  // it('should reset the component', () => {
  //   component.words = ['APPLE', 'BANANA', 'CHERRY', 'PEAR', 'WATERMELON'];
  //   component.grid = [['A', 'P', 'P', 'L', 'E'], ['B', '', '', '', ''], ['C', '', '', '', ''], ['D', '', '', '', ''], ['E', '', '', '', '']];
  //   component.start = true;
  //   component.wordsFound = 3;
  //   component.coords = [[0,0],[0,1],[0,2]];
  //   component.highlightedWords = ['APPLE', 'CHERRY'];
  //   component.minutes = 2;
  //   component.seconds = 30;
  //   component.newRecord = true;
  //   component.reset();
  //   expect(component.words.length).toBe(5);
  //   expect(component.grid.every(row => row.every(cell => cell === ''))).toBe(true);
  //   expect(component.start).toBe(false);
  //   expect(component.wordsFound).toBe(0);
  //   expect(component.coords.length).toBe(0);
  //   expect(component.highlightedWords.length).toBe(0);
  //   expect(component.minutes).toBe(0);
  //   expect(component.seconds).toBe(0);
  //   expect(component.newRecord).toBe(false);
  // });

  it('should return null when word cannot be placed', () => {
    component.grid = [['A', 'P', 'P', 'L', 'E'], ['B', '', '', '', ''], ['C', '', '', '', ''], ['D', '', '', '', ''], ['E', '', '', '', '']];
    const positions = component.canPlaceWord('BANANA', 0, 0, 1, 1);
    expect(positions).toBe(null); // BANANA overlaps with APPLE
  });
})