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
  ['Your main army (be honest) buffed',
  'Your main army (be honest) nerfed',
  'Khorne cant bring in any wizards',
  'At least 3 god units decrease points',
  'Nagash points decrease',
  'Shalaxi points decrease',
  'Keeper of Secrets points decrease',
  'Screaming Bells have a functional rule change',
  'Blisterskin clarified',
  'Ushoran doesnt stack',
  'New battle tactic for a Death army',
  'New battle tactic for an Order army',
  'New battle tactic for a Destruction army',
  'New battle tactic for a Chaos army',
  'Nighthaunt had at least 3 point decreases',
  'Stormcast had at least 5 point decreases',
  'Kruleboyz non-tactic rules change',
  'Non-shark IDK point decreases',
  'Chalice nerfed',
  'Main switching',
  'Elves are the best for cities',
  'Your main army Coach chat is losing their shit',
  'Coalesced trait changed from -1 damage',
  'They clearly did not test this',
  'Glutos down somehow',
  'Ardboys down',
  'Blood Knights at least -20',
  'New GHB Tactic',
  'Null Myriad functional change',
  'Kroak functional change',
  'Starborne summoning change',
  'Obscuring Terrain is a thing',
  'Command corps functional change',
  'LoN no teleport in enemy turn',
  'Mannfred to 410',
  'Sharks changing to 6s auto wound',
  'Harridans, bladegheists 2 inch attack',
  'Return fire is only to shooting unit',
  'Big Waaagh tactics locked to general',
  'Sons of Velmourn mentioned anywhere',
  'Get fucked Glottkin',
  'Nurgle anti-pile in gone',
  'New GHB Grand Strat',
  'Bell bodyguard changed',
  'Tanks straight to the bin',
  'Warforger melee only',
  'Battlescroll worth the wait',
  'Soulblight deserves what they got',
  'OBR deserves what they got',
  'KO deserves what they got',
  'Seraphon deserves what they got',
  'TerryWogan got his 30 points',
  'The 4chan leaks were accurate (or close enough)',
  'Ogors unchanged',
  'New rules need an FAQ',
  'Blizzard functional change',
  'Every Magmadroth comes down in points',
  'Points change went the opposite of what you expected',
  'RAT LEAKS posted',
  'Engine of the Gods points or rules change',
  'Endless spell functional change',
  'DoK significant points decreases',
  'You got what you wanted',
  'You did not get what you wanted',
  'Strike three within 2 hours of release',
  'Zombies to 120',
  'Euphoric killers in both phases'
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