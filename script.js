let blackjackgame = {
  you: { scorespan: "#yourscore", div: "#your-box", score: 0 },

  dealer: { scorespan: "#dealerscore", div: "#dealer-box", score: 0 },

  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "Q", "J", "A"],

  cardsmap: {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    K: 10,
    Q: 10,
    J: 10,
    A: [1, 11],
  },

  win: 0,
  lost: 0,
  draw: 0,
  isstand: false,
  turnsover: false,
};



const YOU = blackjackgame["you"];
const DEALER = blackjackgame["dealer"];
const hitsound = new Audio("/swish.m4a");
const winsound = new Audio("/cash.mp3");
const losssound = new Audio("/aww.mp3");

document.querySelector("#hit-button").addEventListener("click", hitbutton);

document.querySelector("#stand-button").addEventListener("click", dealerlogic);
document.querySelector("#deal-button").addEventListener("click", dealbutton);

function hitbutton() {
  if (blackjackgame["isstand"] === false) {
    let cards = randomcards();

    showcard(cards, YOU);
    updatescore(cards, YOU);
    showscore(YOU);
  }
}

function dealerlogic() {
  if (blackjackgame["isstand"] === false) {
    let cards = randomcards();
    showcard(cards, DEALER);
    updatescore(cards, DEALER);
    showscore(DEALER);
  }
}

function showcard(cards, activeplayer) {
  if (activeplayer["score"] <= 21) {
    let cardimage = document.createElement("img");

    cardimage.src = `${cards}.png`;
    document.querySelector(activeplayer["div"]).appendChild(cardimage);
    hitsound.play();
  }
}

function dealbutton() {
  if (blackjackgame["isstand"] === false) {
    showresult(finalresult());

    playagain();

    let yourimages = document
      .querySelector("#your-box")
      .querySelectorAll("img");
    let dealerimages = document
      .querySelector("#dealer-box")
      .querySelectorAll("img");

    for (let i = 0; i < yourimages.length; i++) {
      yourimages[i].remove();
    }

    for (let i = 0; i < dealerimages.length; i++) {
      dealerimages[i].remove();
    }

    YOU["score"] = 0;
    document.getElementById("your-result").textContent = 0;
    document.getElementById("your-result").style.color = "white";

    DEALER["score"] = 0;
    document.getElementById("dealer-result").textContent = 0;
    document.getElementById("dealer-result").style.color = "white";
  }

  blackjackgame["isstand"] = true;
}

function randomcards() {
  var random = Math.floor(Math.random() * 13);
  return blackjackgame["cards"][random];
}

function updatescore(cards, activeplayer) {
  if (cards === "A") {
    if (activeplayer["score"] + blackjackgame["cardsmap"][cards] <= 21) {
      activeplayer["score"] += blackjackgame["cardsmap"][cards][1];
    } else {
      activeplayer["score"] += blackjackgame["cardsmap"][cards][0];
    }
  } else {
    activeplayer["score"] += blackjackgame["cardsmap"][cards];
  }
}

function showscore(activeplayer) {
  if (activeplayer == YOU) {
    if (activeplayer["score"] > 21) {
      document.getElementById("your-result").textContent = "BUST!";
      document.getElementById("your-result").style.color = "red";
    } else {
      document.getElementById("your-result").textContent =
        activeplayer["score"];
    }
  } else {
    if (activeplayer["score"] > 21) {
      document.getElementById("dealer-result").textContent = "BUST!";
      document.getElementById("dealer-result").style.color = "red";
    } else {
      document.getElementById("dealer-result").textContent =
        activeplayer["score"];
    }
  }
}

function finalresult() {
  let winner;
  let DRAW;

  if (YOU["score"] <= 21) {
    if (YOU["score"] > DEALER["score" || DEALER["score"] > 21]) {
      blackjackgame["win"]++;
      winner = YOU;
    } else if (YOU["score"] < DEALER["score"] && DEALER["score"] <= 21) {
      blackjackgame["lost"]++;
      winner = DEALER;
    } else if (YOU["score"] <= 21 && DEALER["score"] > 21) {
      winner = YOU;
      blackjackgame["win"]++;
    }
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    blackjackgame["lost"]++;
    winner = DEALER;
  } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    blackjackgame["draw"]++;
    winner = "DRAW";
  }
  return winner;
}

function showresult(winner) {
  let winnermsg;

  if (winner === YOU) {
    winnermsg = "WIN";
    winsound.play();
    document.getElementById("win").textContent = blackjackgame["win"];
  } else if (winner === DEALER) {
    winnermsg = "LOST";
    losssound.play();
    document.getElementById("lost").textContent = blackjackgame["lost"];
  } else {
    winnermsg = "DRAW!";
    losssound.play();
    document.getElementById("draw").textContent = blackjackgame["draw"];
  }

  var wintext = document.createElement("h3");
  wintext.setAttribute("id", "wintext");
  wintext.appendChild(document.createTextNode("YOU " + winnermsg + "!"));

  var playbutton = document.createElement("button");
  playbutton.setAttribute("id", "playbutton");
  playbutton.appendChild(document.createTextNode("Play Again"));

  document.getElementById("row-1").appendChild(wintext);
  document.getElementById("row-1").appendChild(playbutton);
}

function playagain() {
  playbutton.addEventListener("click", function () {
    var aa = document.getElementById("wintext");
    var bb = document.getElementById("playbutton");
    aa.remove();
    bb.remove();

    blackjackgame["isstand"] = false;
  });
}
