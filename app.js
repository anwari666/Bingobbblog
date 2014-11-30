function Tebakan(email, angka) {
    this.email = email;
    this.angka = angka;

    // returns true when this object contains a single number
    this.contains = function (num) {
        for (var i = 0; i < this.angka.length; i++) {
            if (this.angka[i] == num) {
                return true; // langsung break
            }
        }
        return false;
    };
}

function Tebakans() {
    this.tebakan = [];
    
    this.addTebakan = function (tebakan) {
        this.tebakan.push(tebakan);
    };

    this.cekIsi = function (result) {

        for (tebakan in this.tebakan) {

            var bingo = 0;
            for (var i = 0; i < result.length; i++) {
                if (tebakan.contains(result[i])) {
                    bingo++;
                }
            }

            if (bingo == 5) {
                console.log("BINGO!!");
            } else {
                console.log(tebakan.email + " sudah cocok " + bingo + " angka. sisanya tinggal " + tebakan.angka.toString());
            }
        }
    };
}

function Result() {
    this.angka = [];

    this.addNew = function (num) {
        this.angka.push(num);
        guesses.cekIsi(this.angka);
    };

}

var guess_1 = new Tebakan("anwari.ilman@gmail.com", [3, 9, 11, 14, 17]);
var guess_2 = new Tebakan("ujangsilet@gmail.com", [6, 9, 12, 15, 18]);
var guess_3 = new Tebakan("wari@360looks.com",    [7, 14, 16, 18, 22]);
var guess_4 = new Tebakan("waribisnis@gmail.com", [4, 6, 15, 17, 23]);

var guesses = new Tebakans();
guesses.addTebakan(guess_1);
guesses.addTebakan(guess_2);
guesses.addTebakan(guess_3);
guesses.addTebakan(guess_4);

var result = new Result();
result.addNew(16);

console.log(result);