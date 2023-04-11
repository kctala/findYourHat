const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor (field) {
        this.field = field;
    }
    print() {
        console.log(this.field.map(r => r.join("")).join("\n"));
    }
    makePath(row, column) {
        this.field[row][column] = pathCharacter;
    }
    isOutOfBounds(row, column) {
        return row < 0 || row >= this.field.length || column < 0 || column >= this.field[row].length;
    }
    isHole(row, column) {
        return this.field[row][column] === 'O';
    }
    isHat(row, column) {
        return this.field[row][column] === '^';
    }
  }

class Controller {
    constructor (field) {
        this.currentColumn = 0;
        this.currentRow = 0;
        this.done = false;
        this.field = field;
    }
    play() {
        prompt("Welcome to the game, Find Your Hat! The goal of this game is to move around the board without falling into a hole (O) or moving off the screen as you look for your hat (^). Each turn you can choose to move left (l), right (r), up (u), or down (d). Hit enter to start.");

        while (!this.done) {
            myField.print();
            let direction = prompt("Which way? Type l, r, u, d to move: ")
            direction = direction.toLowerCase();

            switch (direction) {
                case 'r':
                    this.currentColumn += 1;
                    break;
                case 'l':
                    this.currentColumn -= 1;
                    break;
                case 'u':
                    this.currentRow -= 1;
                    break;
                case 'd':
                    this.currentRow += 1;
                    break;
                default:
                    console.log(`I didn't understand ${direction}. Please enter l, r, u, d.`);
                    break;
            }

            if (myField.isOutOfBounds(this.currentRow, this.currentColumn)) {
                console.log("Out of bounds, game over.");
                this.done = true;
            } else if (myField.isHole(this.currentRow, this.currentColumn)) {
                console.log("Oops! You fell into a hole, game over.");
                this.done = true;
            } else if (myField.isHat(this.currentRow, this.currentColumn)) {
                console.log("You found the hat! You win!");
                this.done = true;
            } else {
                myField.makePath(this.currentRow, this.currentColumn);
            }
        }
      }
};
  
  
  const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);

  const Bubba = new Controller (myField);
  
  Bubba.play();