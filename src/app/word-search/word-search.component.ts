import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserIdService } from 'app/userIdService';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';

interface coord {
  cIndex: number;
  rIndex: number;
}

@Component({
 selector: 'app-word-search',
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
  <div class="w">Words to find: (fruit category)</div>
  <ul>
    <li *ngFor="let word of words">{{ word }} {{ highlightedWords.includes(word) ? ' (found)' : '' }}</li>
  </ul>
  <div class="w">Word just highlighted: {{ highlightedWords[highlightedWords.length-1] }} / {{ highlightedWords[highlightedWords.length-2] }} </div>
  <table>
    <tr *ngFor="let row of grid; let i = index">
      <td 
      *ngFor="let letter of row; let j = index"
      [class.selected]="isSelected(i, j)"
      (click)="selectLetter(i, j)">
      {{ letter }}
      </td>
    </tr>
  </table>
</div>
`,
 styles: [`
 .outer {
   padding: 20px;
   min-height: 100vh;
   background-color: lavender;
 }
 td {
  border: 1px solid #ccc;
  padding: 5px;
  font-size: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #fff;
  cursor: pointer;
}
td.selected {
  background-color: rgba(30, 30, 255, 0.314);
}
.top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .lowestTime{
      font-size: 1.5rem;
      text-align: left;
      justify-content: flex-start;
    }
    .timer {
      font-size: 1.5rem;
      text-align: left;
      justify-content: flex-start;
    }
    .reset{
      font-size: 1.5rem;
      margin-right: 20px;
      justify-content: center;
    }
    .return{
      font-size: 1.5rem;
      margin-right: 20px;
      justify-content: flex-end;
    }

 `]
})
export class WordSearchComponent implements OnInit {
  //words should be limited to 10 letters
  possibleWords: string[] = ['APPLE', 'APRICOT', 'AVOCADO', 'BANANA', 'BLACKBERRY','BLUEBERRY','CANTALOUPE','CHERRY','COCONUT','CRANBERRY','DATE','ELDERBERRY','FIG','GRAPE','GRAPEFRUIT','GUAVA','HONEYDEW','JACKFRUIT','KIWI','KUMQUAT','LEMON','LIME','LYCHEE','MANGO','MULBERRY','NECTARINE','ORANGE','PAPAYA','PEACH','PEAR','PINEAPPLE','PLUM','QUINCE','RASPBERRY','REDCURRANT','STARFRUIT','STRAWBERRY','TANGERINE','WATERMELON','ACEROLA','APPLEBERRY','CARAMBOLA','CHERIMOYA','CURRANT','DEWBERRY','DURIAN','JAMBUL','LYCHEE','LONGAN','LOQUAT','MANDARIN','MAMEY','MARULA','PAPAW','QUINCE','CHERRY','CUCUMBER']
  words: string[] = [];
  grid: string[][] = [];
  columnNum: number = 25;
  rowNum: number = 10;
  //other stuff
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

  reset() {
    //start timer
    this.stopTimer();
    this.startTimer();
    this.newRecord = false;
    //others
    this.highlightedWords.splice(0,this.highlightedWords.length);
    this.coords.splice(0,this.coords.length);
    this.words.splice(0,this.words.length);
    this.wordsFound = 0;
    this.start = false;
    //random words from possibleWords list
    let added = 0;
    while (added !==5){
      let found = false;
      let x = Math.floor(Math.random() * this.possibleWords.length);
      for (let i = 0; i < this.words.length; i++){
        if (this.words[i] === this.possibleWords[x]){
          found = true;
        }
      }
      if (found === false){
        this.words.push(this.possibleWords[x]);
        added++;
      }
    }
    //generate grid
    this.generateGrid();

  }


  canPlaceWord(word: string, startX: number, startY: number, directionX: number, directionY: number): number[][] | null {
    // Check if the word can be placed in the grid
    const positions: number[][] = [];
    let x = startX;
    let y = startY;
    for (const letter of word) {
      if (x < 0 || x >= 10 || y < 0 || y >= 10 || (this.grid[y][x] !== '' && this.grid[y][x] !== letter)) {
        return null;
      }
      positions.push([y, x]);
      x += directionX;
      y += directionY;
    }
    return positions;
  }


  generateGrid(): void {
    // Generate an empty grid of letters
    for (let i = 0; i < this.rowNum; i++) {
      this.grid.push([]);
      for (let j = 0; j < this.columnNum; j++) {
        this.grid[i].push('');
      }
    }
  
    // Place each word in the grid (if possible)
    let allWordsPlaced = false;
    while (!allWordsPlaced) {
      allWordsPlaced = true;
  
      for (let word of this.words) {
        let wordPlaced = false;
  
        // Try to place the word in the grid in all possible directions
        for (let directionX = -1; directionX <= 1 && !wordPlaced; directionX++) {
          for (let directionY = -1; directionY <= 1 && !wordPlaced; directionY++) {
            if (directionX === 0 && directionY === 0) {
              continue;
            }
  
            // Generate a random starting position for the word in the current direction
            const startX = Math.floor(Math.random() * this.rowNum);
            const startY = Math.floor(Math.random() * this.columnNum);
  
            const positions = this.canPlaceWord(word, startX, startY, directionX, directionY);
  
            // If the word can be placed, place it in the grid
            if (positions) {
              let canPlace = true;
              for (const [y, x] of positions) {
                if (this.grid[y][x] !== '') {
                  canPlace = false;
                  break;
                }
              }
  
              if (canPlace) {
                for (const [y, x] of positions) {
                  this.grid[y][x] = word.charAt(0).toUpperCase();
                  word = word.slice(1);
                }
                wordPlaced = true;
              }
            }
          }
        }
  
        // If the word couldn't be placed, reset the grid and start over
        if (!wordPlaced) {
          allWordsPlaced = false;
          this.grid = [];
          for (let i = 0; i < this.rowNum; i++) {
            this.grid.push([]);
            for (let j = 0; j < this.columnNum; j++) {
              this.grid[i].push('');
            }
          }
          break;
        }
      }
    }
  
    // Fill the remaining empty spaces with random letters
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < this.rowNum; i++) {
      for (let j = 0; j < this.columnNum; j++) {
        if (this.grid[i][j] === '') {
          const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
          this.grid[i][j] = randomLetter;
        }
      }
    }
  }



// Variables to store the starting and ending positions of the highlight
startRow: number | null = null;
startCol: number | null = null;
endRow: number | null = null;
endCol: number | null = null;

direction: number | null = null;
length: number | null = null;

coords: coord[] = [];
start: boolean = false;

highlightedWords: string[] = [];

wordsFound: number = 0;


selectLetter(rowIndex: number, colIndex: number): void {
  // console.log('row:' + rowIndex);
  // console.log('column: ' + colIndex);
  let newWord:string = '';
  this.length = 5;
  this.direction = 0;

  if(this.start === false){ //start point
    this.start = true;
    this.startRow = rowIndex;
    this.startCol = colIndex;
  }
  else{ //end point
    this.start = false;
    this.endRow = rowIndex;
    this.endCol = colIndex;
    //find direction and length
    if(this.startRow !== this.endRow && this.startCol === this.endCol){//vertical
      this.direction = 0;
      this.length = this.endRow - this.startRow;
    }
    else if (this.startRow === this.endRow && this.startCol !== this.endCol){//horizontal
      this.direction = 1;
      this.length = this.endCol - this.startCol;
    }
    else if (this.endCol > this.startCol && this.endRow > this.startRow){ //bottom right so down diagonal
      this.direction = 3;
      this.length = this.endCol - this.startCol;
    }
    else if (this.endCol < this.startCol && this.endRow < this.startRow){ //top left so down diagonal
      this.direction = 3;
      this.length = this.endCol - this.startCol;
    }
    else if (this.endCol < this.startCol && this.endRow > this.startRow){ //bottom left so up diagonal
      this.direction = 2;
      this.length = this.endCol - this.startCol;
    }
    else { //top right so up diagonal
      this.direction = 2;
      this.length = this.endCol - this.startCol;
    }

    if (this.direction === 2 || this.direction === 3){
      if (Math.abs(this.endCol - this.startCol) !== Math.abs(this.endRow - this.startRow)){
        this.highlightedWords.push("Incorrect Input")
        this.highlightedWords.push("Incorrect Input")
        return;
      }
    }

    //got direction and length
    //now we assign coords
    if(this.direction == 0){ //vertical
      if (this.length < 0){ //up
        for (let i = this.length; i <= 0; i++){
          newWord = newWord+this.grid[this.startRow + i][this.startCol];
          this.coords.push({rIndex: this.startRow + i, cIndex: this.startCol});
        }
      }
      if (this.length > 0){ //down
        for (let i = 0; i <= this.length; i++){
          newWord = newWord+this.grid[this.startRow + i][this.startCol];
          this.coords.push({rIndex: this.startRow + i, cIndex: this.startCol});
        }
      }
      
    }
    else if(this.direction == 1){ //horizontal
      if (this.length < 0){ //left
        for (let i = this.length; i <= 0; i++){
          newWord = newWord+this.grid[this.startRow][this.startCol + i];
          this.coords.push({rIndex: this.startRow, cIndex: this.startCol + i});
        }
      }
      if (this.length > 0){ //right
        for (let i = 0; i <= this.length; i++){
          newWord = newWord+this.grid[this.startRow][this.startCol + i];
          this.coords.push({rIndex: this.startRow, cIndex: this.startCol + i});
        }
      }

    }
    else if(this.direction == 2){ //up diagonal
      if (this.length < 0){ //left
        for (let i = this.length; i <= 0; i++){
          newWord = newWord+this.grid[this.startRow - i][this.startCol + i];
          this.coords.push({rIndex: this.startRow - i, cIndex: this.startCol + i});
        }
      }
      if (this.length > 0){ //right
        for (let i = 0; i <= this.length; i++){
          newWord = newWord+this.grid[this.startRow - i][this.startCol + i];
          this.coords.push({rIndex: this.startRow - i, cIndex: this.startCol + i});
        }
      }
    }
    else{//down diagonal
      if (this.length < 0){ //left
        for (let i = this.length; i <= 0; i++){
          newWord = newWord+this.grid[this.startRow + i][this.startCol + i];
          this.coords.push({rIndex: this.startRow + i, cIndex: this.startCol + i});
        }
      }
      if (this.length > 0){ //right
        for (let i = 0; i <= this.length; i++){
          newWord = newWord+this.grid[this.startRow + i][this.startCol + i];
          this.coords.push({rIndex: this.startRow + i, cIndex: this.startCol + i});
        }
      }
    }
    this.highlightedWords.push(newWord);
    this.highlightedWords.push(newWord.split("").reverse().join(""));

    //boolean in for loop
    let found:boolean = false;
    for (let i = 0; i <= this.words.length; i++){
      if (this.words[i] === newWord || this.words[i] === newWord.split("").reverse().join("")){
        found = true;
      }
    }
    if (found === false){
      setTimeout(() => {
          this.coords.splice(this.coords.length - newWord.length, newWord.length);
        }, 1000);
    }
    else{
      //the highlight will stay

      //check for winning condition
      this.wordsFound ++;
      if (this.wordsFound == this.words.length){//winning conditions
        // update lowestTime if current time is lower than previous time
        if (this.lowestTime === null || this.minutes < this.lowestTime.minutes || (this.minutes === this.lowestTime.minutes && this.seconds < this.lowestTime.seconds)) {
          this.lowestTime = { minutes: this.minutes, seconds: this.seconds };
          this.newRecord = true;
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




    }
    
  }
}


isSelected(rowIndex: number, colIndex: number): boolean {
  if (this.coords.length !== 0){
    for (let i = 0; i < this.coords.length; i++){
      if (rowIndex===this.coords[i].rIndex && colIndex===this.coords[i].cIndex){
        return true;
      }
    }
  }
  return false;
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
  this.reset();

  //removed to fix unit test, don't think it's needed maybe
  //throw new Error('Method not implemented.');
  this.userID = this.userIDService.getUserId();
  console.log('User ID ohmygoditworked: ', this.userID);

  // Get the user's high score
  this.getUserScore(this.userID).pipe(
    take(1) // take only the first value emitted by the observable
  ).subscribe(score => {
    
    if (score == 99999999999999999){
      this.lowestTime = null;
    }
    else{
      this.updateLowestTime(score);
    }

  });
}

getUserScore(ID: number): Observable<number> {
  const url = 'http://127.0.0.1:8080/api/users/' + ID + '/wordscore'
  return this.http.get<number>(url);
}

setUserScore(ID: number, score: number): Observable<number> {
  const url = 'http://127.0.0.1:8080/api/users/' + ID + '/setWord';
  //const url = `http:/e/127.0.0.1:8080/api/users/${ID}/setMath`;
  console.log('WAH: ', score);
  const body = { wordScore: score };
  //const body = JSON.stringify{score};
  return this.http.put<number>(url, body);
  //return this.http.put<number>(url, {score});
}



}
