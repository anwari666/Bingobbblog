/* Class Guess
contains email (string)
and angka Guess (array of integers) */

function Guess(email, angka) {
    this.email = email;
    this.angka = angka;

    // returns true when this object contains a number
    this.contains = function (num) {
        return containsNum(this.angka, num);
    };

    this.getAngka = function(){
        return this.angka;
    }
}

/*
Class Guesses
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

    // renders a view based on a the shit. ya kan?
    this.renderView = function(){

    }
}

/*
Class Result
contains array of angka (numbers)
and some methods to add new Guess and add new Guess into the list of guesses
*/
function Result() {
    this.angka = []; // array of called numbers

    this.addNew = function (num) {

        if (! containsNum(this.angka, num)) { // check if a number already exists in an array. needs to be refactored.
            this.angka.push(num);
            guesses.cekIsi(this.angka);
        }
        else {
            console.log("That number is already exist. Pick a new one...");
        }
    };

}


// HELPER function for array. where should i put it?
var containsNum = function(arr, num){
    return arr.some(function(elmt){     // Array.prototype.some() returns true when some of the elements matches the description.
        return elmt === num;            // pretty slick. it immediately returns when it matches a number... i'll use this over the for.. loop
    });
}


    // instantiate some guesses
    var guess_1 = new Guess("first@gmail.com", [3, 9, 11, 14, 17]);
    var guess_2 = new Guess("second@gmail.com", [6, 9, 12, 15, 18]);
    var guess_3 = new Guess("third@gmail.com",   [7, 14, 16, 18, 22]);
    var guess_4 = new Guess("fourth@gmail.com", [4, 6, 15, 17, 23]);

    var guesses = new Guesses();
    guesses.addGuess(guess_1);
    guesses.addGuess(guess_2);
    guesses.addGuess(guess_3);
    guesses.addGuess(guess_4);

    var result = new Result();
    result.addNew(16);

    // make sure the DOM is ready!
    $(function(){

        $('#draw').click( function(e){

            var drawResult = Math.ceil(Math.random() * 25);

            $("#result").text(drawResult);
            // console.log(drawResult);
            result.addNew(drawResult);
        });

    });
