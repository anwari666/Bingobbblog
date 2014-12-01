/* Class Guess
contains email (string)
and angka Guess (array of integers) */

function Guess(email, angka) {
    this.email = email;
    this.angka = angka;

    // returns true when this object contains a number
    this.contains = function (num) {
        return _.contains(this.angka, num);
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

        if (! _.contains(this.angka, num)) { // check if a number already exists in an array. needs to be refactored.
            this.angka.push(num);
            game.cekIsiGuess(this.angka);
        }
        else {
            console.log("That number is already exist. Pick a new one...");
        }
    };

}

/*
Class App
This is the main controller, if you can say so...
*/
function App(){

    var spanResult=$("#result");
    var spanResults=$("#results");
    var guesses = undefined;
    this.result = new Result();

    this.initiate = function(){

        // instantiate some guesses
        var guess_1 = new Guess("first@gmail.com", [3, 9, 11, 14, 17]);
        var guess_2 = new Guess("second@gmail.com", [6, 9, 12, 15, 18]);
        var guess_3 = new Guess("third@gmail.com",   [7, 14, 16, 18, 22]);
        var guess_4 = new Guess("fourth@gmail.com", [4, 6, 15, 17, 23]);

        guesses = new Guesses();
        guesses.addGuess(guess_1);
        guesses.addGuess(guess_2);
        guesses.addGuess(guess_3);
        guesses.addGuess(guess_4);


        this.bindElmts(); // attach event handlers
    };

    // function to bind elements with events...
    this.bindElmts = function(){
        var parent=this;
        
        $('#draw').bind('click', function(e){
            parent.clickDraw(e);
        });
    }

    // function to handle klikdraw
    this.clickDraw = function(event){
        this.drawNumber(10, 120); // n times in with t interval.
        
    };

    // the act of picking a number and updates its corresponding text representation.
    // param: n is the number it is called, interval is the interval the next one will be called.
    this.drawNumber = function(n, interval){
        var parent = this;
        var result = Math.ceil(Math.random() * 25);
        
        spanResult.text(result);

        if (n === 0){
            this.executeResult(result);
            
        } 
        else{ // redraw again
            setTimeout(function(){parent.drawNumber(n-1, interval);}, interval);
        }
    }

    this.executeResult = function(num){
        this.result.addNew(num);

        spanResults.text(this.result.angka.toString());
    }

    this.cekIsiGuess = function(num){
        guesses.cekIsi(num);
    }

}

var game = new App();
// make sure the DOM is ready!
$(function(){
    game.initiate();
});
