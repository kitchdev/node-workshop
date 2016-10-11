var prompt = require('prompt');

var numberToGuess = Math.floor(Math.random() * 100);
var maxGuesses = 0;

function guessing(attempts) {

    prompt.get("Guess a number from 1 to 100", function fortuneTeller(err, userInput) {
        if (err) {
            console.log("An error has occured");
            return;
        }

        else {
            if (maxGuesses === 3) {
                console.log("YOU LOSE");
                return
            }
            else {
                var Input = Number(userInput["Guess a number from 1 to 100"]);

                if (Input === numberToGuess) {
                    console.log("Way to go bud");
                    return;
                }
                else if (Input > numberToGuess) {
                    console.log("hmmm go lower");
                    maxGuesses++;
                    return guessing(maxGuesses);


                }
                else {
                    console.log("nah bruh, GO HIGHER");
                    maxGuesses++;
                    return guessing(maxGuesses);

                }




            }

        }
    });
}

guessing(maxGuesses)