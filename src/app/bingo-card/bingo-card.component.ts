import { Component } from '@angular/core';

interface Square {
  value: string;
  marked: boolean;
}

@Component({
  selector: 'app-bingo-card',
  templateUrl: './bingo-card.component.html',
  styleUrls: ['./bingo-card.component.css']
})
export class BingoCardComponent {
  bingoRows: Square[][] = [];
  bingoCounter: number = 0;
  bingoPool: string[] = 
  ['1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '49',
  '50',
  '51',
  '52',
  '53',
  '54',
  '55',
  '56',
  '57',
  '58',
  '59',
  '60',
  '61',
  '62',
  '63',
  '64',
  '65',
  '66',
  '67',
  '68',
  '69',
  '70',
  '71',
  '72',
  '73',
  '74',
  '75',
]; 

  constructor() {
    this.generateBingoCard();
  }

  generateBingoCard() {
    // Reset the bingo card rows
    this.bingoRows = [];

    // Randomly select 24 unique strings from the pool (excluding the "Free Space")
    const selectedStrings = this.getRandomUniqueStrings(24);

    // Create a 5x5 grid for the bingo card
    for (let i = 0; i < 5; i++) {
      const row: Square[] = [];
      for (let j = 0; j < 5; j++) {
        // If it's the middle square, add "Skaven Nerf"
        if (i === 2 && j === 2) {
          row.push({ value: 'Skaven Nerf', marked: true });
        } else {
          // Add a randomly selected string from the pool
          row.push({ value: selectedStrings.pop()!, marked: false });
        }
      }
      this.bingoRows.push(row);
    }
  }

  getRandomUniqueStrings(count: number): string[] {
    const shuffledPool = this.shuffleArray(this.bingoPool);
    return shuffledPool.slice(0, count);
  }

  shuffleArray(array: any[]): any[] {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  toggleMark(square: Square) {
    if (square.value !== 'Skaven Nerf') {
      square.marked = !square.marked;
      // Implement logic to check for bingos after each square is marked
      this.checkForBingos();
    }
  }

  checkForBingos() {
    this.bingoCounter = 0;
    // Check for horizontal bingos
    for (let i = 0; i < this.bingoRows.length; i++) {
      let markedCount = 0;
      for (let j = 0; j < this.bingoRows[i].length; j++) {
        if (this.bingoRows[i][j].marked) {
          markedCount++;
        }
      }
      if (markedCount === 5) {
        this.incrementBingoCounter();
      }
    }
  
    // Check for vertical bingos
    for (let j = 0; j < 5; j++) {
      let markedCount = 0;
      for (let i = 0; i < this.bingoRows.length; i++) {
        if (this.bingoRows[i][j].marked) {
          markedCount++;
        }
      }
      if (markedCount === 5) {
        this.incrementBingoCounter();
      }
    }
  
    // Check for diagonal bingos (top-left to bottom-right)
    let markedCount = 0;
    for (let i = 0; i < 5; i++) {
      if (this.bingoRows[i][i].marked) {
        markedCount++;
      }
    }
    if (markedCount === 5) {
      this.incrementBingoCounter();
    }
  
    // Check for diagonal bingos (top-right to bottom-left)
    markedCount = 0;
    for (let i = 0; i < 5; i++) {
      if (this.bingoRows[i][4 - i].marked) {
        markedCount++;
      }
    }
    if (markedCount === 5) {
      this.incrementBingoCounter();
    }
  }

  incrementBingoCounter() {
    this.bingoCounter++;
  }
}