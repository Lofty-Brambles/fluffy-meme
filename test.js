console.log("test"); // Tests for response.

document.querySelector(".dash.main").addEventListener("click", function(e) {
	const main = "main";
	openTab(e, main);
});
document.querySelector(".dash.logs").addEventListener("click", function(e) {
	const logs = "logs";
	openTab(e, logs);
});
document.querySelector(".dash.gallery").addEventListener("click", function(e) {
	const gal = "gallery";
	openTab(e, gal);
});
document.getElementById("default").click();
/* Adds the tab handler switcheroo. */

const moves = document.querySelectorAll(".move"); // Main event controller
let round = 0, pScore = 0, cScore = 0; // Initial variables

/*  A set of rounds consist of the following DOM manipulations:
	> Detects a button tap and updates scores as well as logs results.
	> Runs a score check to view winner popup.  */
moves.forEach( move => {
	move.addEventListener("click", (err) => { checker(err); });
} );

// Function to open a tab and close all others.
function openTab( e, tabOpen ) {
	const dash = document.getElementsByClassName("dash");
	for (let i = 0; i < dash.length; i++) {
		dash[i].className = dash[i].className.replace( " active", "" );
	}

	const tabContent = document.getElementsByClassName("tabcontent");
	for (let i = 0; i < tabContent.length; i++) {
		tabContent[i].style.display = "none";		
	}

	document.getElementById(tabOpen).style.display = "flex";
	e.currentTarget.className += " active";
};

function checker(e) {
	const pMove = e.target.id;

	doRound(pMove, computerPlay());

	if ( pScore === 5 || cScore === 5 ) {
		checkWin();
		moves.forEach( (move) => {
			move.removeEventListener("click", checker(e));
		});
	};	
};

function computerPlay() {
	const array = ["rock", "paper", "scissors"];
	return array[ Math.floor( Math.random() * Array.length ) ];
}

function doRound(pMove, cMove) {
	const playerReply = [];
	const computerReply = [];
	const logTab = document.querySelector("#logs");
	const addLog = document.createElement("p").setAttribute("id", "rec");
	const span = document.createElement("span").setAttribute("id", "emp");
	
	if (pMove === cMove) {
		span.textContent = `Scores || ${pScore} - ${cScore}`;
		addLog.textContent = `[ ⭕ ] || It's a tie, both played ${ emojify( pMove ) }!` +
		addLog.appendChild( span );
		logTab.appendChild( addLog );
	} else if (
		( pMove === "rock" && cMove === "scissors" ) ||
		( pMove === "scissors" && cMove === "paper" ) ||
		( pMove === "paper" && cMove === "rock" )
	) {
		pScore++;
		document.querySelector("#player-score").textContent = pScore;
		const playerMess = playerReply[ Math.floor( Math.random() * playerReply.length ) ];
		span.textContent = `Scores || ${pScore} - ${cScore}`;
		addLog.textContent = `[ ✔ ] || ${ playerMess }, ${ emojify( pMove ) } beats ${ emojify( cMove ) }!` +
		addLog.appendChild( span );
		logTab.appendChild( addLog );
	} else {
		cScore++;
		document.querySelector("#computer-score").textContent = cScore;
		const computerMess = computerReply[ Math.floor( Math.random() * computerReply.length ) ];
		span.textContent = `Scores || ${pScore} - ${cScore}`;
		addLog.textContent = `[ ❌ ] || ${ computerMess }, ${ emojify( cMove ) } beats ${ emojify( pMove ) }!\n`;
		addLog.appendChild( span );
		logTab.appendChild( addLog );
	}
}

function emojify(move) {
	if ( move === "rock" ) {
		return "rock (🥌)";
	} else if ( move === "paper") {
		return "paper (📰)";
	} else {
		return "scissors (✂)";
	}
}

function checkWin() {
	
}