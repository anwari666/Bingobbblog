/* Class Guess
contains email (string)
and angka Guess (array of integers) */

function Guess(email, angka) {
    this.email = email;
    this.angka = angka;

    // returns true when this object contains a number
    this.contains = function (num) {
        for (var i = 0; i < this.angka.length; i++) {
            if (this.angka[i] == num) {
                return true; // langsung break
            }
        }
        return false;
    };

    this.getAngka = function(){
        return this.angka;
    }
}

/*
Class Guesses (Guesses)
contains array of Guess / list of guesses
and some methods to add new Guess and add new Guess into the list of guesses
*/
function Guesses() {
    this.Guess = [];
    
    this.addGuess = function (Guess) {
        this.Guess.push(Guess);
    };

    // checking the content of all Guesses against some numbers (array) in Result
    this.cekIsi = function (result) {

        var currGuess = null;
        var unGuessed = [];

        for (var idx in this.Guess) {

            // set initial values
            currGuess = this.Guess[idx];        // current Guess being investigated
            unGuessed = currGuess.getAngka();   // remaining numbers

            var correctGuess = 0;

            // iterate over the result
            for (var i = 0; i < result.length; i++) {
                if (currGuess.contains(result[i])) {
                    correctGuess++;
                
                    unGuessed = unGuessed.filter(function(element){      // update some of the uncalled result...
                        return element !== result[i];
                    }); 
                }
            }

            if (correctGuess == 5) {
                console.log("BINGO!!");
            } else {
                console.log(currGuess.email + " sudah cocok " + correctGuess + " angka. sisanya tinggal " + unGuessed.toString());
            }
        }
    };
}

function Result() {
    this.angka = []; // array of called numbers

    this.addNew = function (num) {
        this.angka.push(num);
        guesses.cekIsi(this.angka);
    };

}

var guess_1 = new Guess("anwari.ilman@gmail.com", [3, 9, 11, 14, 17]);
var guess_2 = new Guess("ujangsilet@gmail.com", [6, 9, 12, 15, 18]);
var guess_3 = new Guess("wari@360looks.com",    [7, 14, 16, 18, 22]);
var guess_4 = new Guess("waribisnis@gmail.com", [4, 6, 15, 17, 23]);

var guesses = new Guesses();
guesses.addGuess(guess_1);
guesses.addGuess(guess_2);
guesses.addGuess(guess_3);
guesses.addGuess(guess_4);

var result = new Result();
result.addNew(16);

console.log(result);