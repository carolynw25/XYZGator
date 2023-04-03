import { Component, OnInit } from '@angular/core';

interface coord {
  columnIndex: number;
  rowIndex: number;
}

@Component({
 selector: 'app-word-search',
 template: `
<div class ="outer">
 <table>
   <tr *ngFor="let row of grid; let i = index">
    <td 
    *ngFor="let letter of row; let j = index"
    [class.selected]="isSelected(i, j)"
    (click)="selectLetter(i, j)">{{ letter }}</td>
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
  background-color: yellow;
}

 `]
})
export class WordSearchComponent implements OnInit {
  words: string[] = ['HHHHH', 'ZZZZZZZ', 'PPPPPPP'];
  grid: string[][] = [];
  columnNum: number = 20;
  rowNum: number = 10;

  ngOnInit(): void {
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
selectedStartIndex: number | null = null;
selectedEndIndex: number | null = null;


// selectLetter(rowIndex: number, colIndex: number): void {
//   if (this.selectedStartIndex === null) {
//     // Set the start index if it hasn't been set yet
//     this.selectedStartIndex = colIndex + rowIndex * this.columnNum;
//     this.startRow = rowIndex;
//     this.startCol = colIndex;
    
//     // Set the end index to highlight the whole column
//     this.selectedEndIndex = colIndex + (this.rowNum - 1) * this.columnNum;
//     this.endRow = this.rowNum - 1;
//     this.endCol = colIndex;
//   } 
//   else if (this.selectedEndIndex === null) {
//     // Set the end index if it hasn't been set yet
//     this.selectedEndIndex = colIndex + rowIndex * this.columnNum;
//     this.endRow = rowIndex;
//     this.endCol = colIndex;
//   } 
//   else {
//     // Clear the start and end indices if both have been set
//     this.selectedStartIndex = colIndex + rowIndex * this.columnNum;
//     this.startRow = rowIndex;
//     this.startCol = colIndex;
//     this.selectedEndIndex = null;
//     this.endRow = null;
//     this.endCol = null;
//   }
// }

selectLetter(rowIndex: number, colIndex: number): void {
  console.log('row:' + rowIndex);
  console.log('column: ' + colIndex);

  this.length = 5;
  // Set the start index if it hasn't been set yet
  this.selectedStartIndex = colIndex + rowIndex * this.columnNum;
  this.startRow = rowIndex;
  this.startCol = colIndex;
  
  // Set the end index to highlight the whole column
  this.selectedEndIndex = colIndex + (this.rowNum - 1) * this.columnNum;
  this.endRow = this.rowNum - 1;
  this.endCol = colIndex;

}


isSelected(rowIndex: number, colIndex: number): boolean {
  
  if (
    this.startRow !== null &&
    this.startCol !== null &&
    this.endRow !== null &&
    this.endCol !== null
  ) {
    const start = this.startCol + this.startRow * this.columnNum;
    const end = this.endCol + this.endRow * this.columnNum;
    const current = colIndex + rowIndex * this.columnNum;
    const min = Math.min(start, end);
    const max = Math.max(start, end);
    return current >= min && current <= max && colIndex === this.startCol;
  }
  return false;
}




// selectLetter(rowIndex: number, colIndex: number): void {
//   if (this.selectedStartIndex === null) {
//     // Set the start index if it hasn't been set yet
//     this.selectedStartIndex = colIndex + rowIndex * this.columnNum;
//     this.startRow = rowIndex;
//     this.startCol = colIndex;
    
//     // Set the end index to be the same as the start index
//     this.selectedEndIndex = this.selectedStartIndex;
//     this.endRow = this.startRow;
//     this.endCol = this.startCol;
//   } else {
//     // Set the end index
//     this.selectedEndIndex = colIndex + rowIndex * this.columnNum;
//     this.endRow = rowIndex;
//     this.endCol = colIndex;
//   }
// }

// isSelected(rowIndex: number, colIndex: number): boolean {
//   if (this.selectedStartIndex === null || this.selectedEndIndex === null) {
//     return false;
//   }
  
//   const index = colIndex + rowIndex * this.columnNum;
//   if (index < this.selectedStartIndex || index > this.selectedEndIndex) {
//     return false;
//   }
  
//   // Determine the row and column of the start and end positions
//   const startRow = Math.floor(this.selectedStartIndex / this.columnNum);
//   const startCol = this.selectedStartIndex % this.columnNum;
//   const endRow = Math.floor(this.selectedEndIndex / this.columnNum);
//   const endCol = this.selectedEndIndex % this.columnNum;
  
//   // Check if the cell is on the same row or column as the start or end position
//   if (rowIndex === startRow && rowIndex === endRow) {
//     return colIndex >= startCol && colIndex <= endCol;
//   } else if (colIndex === startCol && colIndex === endCol) {
//     return rowIndex >= startRow && rowIndex <= endRow;
//   }
  
//   // Check if the cell is on the diagonal line between the start and end positions
//   const rowDiff = Math.abs(rowIndex - startRow);
//   const colDiff = Math.abs(colIndex - startCol);
//   if (rowDiff === colDiff) {
//     const rowStep = rowIndex < startRow ? -1 : 1;
//     const colStep = colIndex < startCol ? -1 : 1;
//     let row = startRow + rowStep;
//     let col = startCol + colStep;
//     while (row !== endRow && col !== endCol) {
//       if (row === rowIndex && col === colIndex) {
//         return true;
//       }
//       row += rowStep;
//       col += colStep;
//     }
//   }
  
//   return false;
// }










 

}
