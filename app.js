/* Todo:
+ randomly pick from a list of array instead of all 25 
+ read OOP design, MVC design.
+ try to make sense of each method in a class. which method belongs to which class. 
+ look at the code again. if a function is more than 25 lines, try to refactor. 
*/

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
contains array of calledNumbers
and some methods to add new Guess and add new Guess into the list of guesses
*/
function Result() {
    this.calledNumbers = []; // array of called numbers

    this.addNew = function (num) {

        if (! _.contains(this.calledNumbers, num)) { // check if a number already exists in an array. needs to be refactored.
            this.calledNumbers.push(num);
            game.cekIsiGuess(this.calledNumbers);
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

    this.uncalledNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];

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
        this.drawNumber(20, 80); // n times in with t interval.
        
    };

    // the act of picking a number and updates its corresponding text representation.
    // param: n is the number it is called, interval is the interval the next one will be called.
    this.drawNumber = function(n, interval){
        var parent = this;
        var result = this.getNextResult();
        
        spanResult.text(result);

        if (n === 0){
            this.executeResult(result);
            
        } 
        else{ // redraw again
            setTimeout(function(){parent.drawNumber(n-1, interval);}, interval);
        }
    }

    this.getNextResult = function(){
        var index = Math.ceil(Math.random() * this.uncalledNumbers.length) - 1;
        return (this.uncalledNumbers[index]);
    }

    this.executeResult = function(num){

        this.uncalledNumbers = _.without(this.uncalledNumbers, num); // decrement the array of uncalled numbers
        console.log(this.uncalledNumbers.toString());

        this.result.addNew(num);

        spanResults.text(this.result.calledNumbers.toString()); // updates result.
    }

    this.cekIsiGuess = function(num){
        guesses.cekIsi(num);
    }

}

// create a new game
var game = new App();

// execute when the DOM is ready!
$(function(){
    game.initiate();
});
