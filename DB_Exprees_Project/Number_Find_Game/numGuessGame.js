const max = prompt("Enter Range of Guess");
const random = Math.floor(Math.random()*max) + 1;
let guess = prompt("Enter Guess number :-");

while(true){
    if(guess == 'quit'){
        console.log(`You quit of game`);
        console.log(`Golden number is @@@${random}@@@`);
        break;
    }else if(guess == random){
        console.log(`You win!!!  Concratulation!!! Golden Number is ***${random}*** `);
        break;
    }else if (guess < random){
        guess = prompt(`Hint :- Golden Number is large,### Tri Again`);
    }else if (guess > random ){
        guess = prompt(`Hint :- Golden Number is small,### Tri Again`);
    }
   
}