get();

function get() {
    let round = 0;
    const table = {};
    const results = {
        "Computer": 0,
        "Player": 0,
        "Score-Card": function () { return `${this.Computer} - ${this.Player}`; }
    };
    console.log( "🏆 | Start | 🏆" );
    main: while (true) {
        const playerPick = prompt( `Round ${++round}: Choose! Rock, paper or scissors?` );
        console.log( "🔄 | Processing" );
        const event = decideWinner( playerPick.toLowerCase().trim(), computerPlay() );
        if ( event[1] !== "" ) {
            results[ event[ 1 ] ]++;
        } else if ( event[1] == "skip" ) {
            console.log( "❌ | You made an invalid input! Please try again!" );
            continue main;
        };
        table[ `Round ${round}` ] = results;
        console.log( event[0] );
        console.table( table );
        if ( results[ "Computer" ] == 5 ) {
            console.log( "❎ | Match over! Unfortunately, the computer wins... | ❎" );
            break main;
        } else if ( results[ "Player" ] == 5 ) {
            console.log( "✅ | Match over! You win! | ✅" );
            break main;
        } else {
            console.log( "🔃 | Next Round!" )
        }
    }
}

function computerPlay() {
    const results = [ "rock", "paper", "scissors" ];
    return results[ Math.floor( Math.random() * results.length ) ];
}

function decideWinner( playerSelection, computerSelection ) {
    if (( playerSelection !== "rock" )&&
        ( playerSelection !== "paper" )&&
        ( playerSelection !== "scissors" )) {
        return [ "", "skip" ];
    };
    const event = {
        "rock": {
            "rock": ["You Draw!", ""],
            "paper": ["You Lose! Rock [🗿] loses to Paper [📄]!", "Computer"],
            "scissors": ["You Win! Rock [🗿] defeats Scissors [✂]!", "Player"]
        },
        "scissors": {
            "rock": ["You Lose! Scissors [✂] loses to Rock [🗿]!", "Computer"],
            "paper": ["You Win! Scissors [✂] defeats Paper [📄]!", "Player"],
            "scissors": ["You Draw!", ""]
        },
        "paper": {
            "rock": ["You Win! Paper [📄] defeats Rock [🗿]!", "Player"],
            "paper": ["You Draw!", ""],
            "scissors": ["You Lose! Paper [📄] loses to Scissors [✂]!", "Computer"]
        }
    };
    return event[playerSelection][computerSelection];
}