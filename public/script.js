// TODO
// - have deck shuffled on start then queue system for card looping so repeats less random

let profilePictures = [];
let ppLength = 0;
let backImg, deckImg;
let cardWidth, cardHeight;
let deck = [];
let socket;
let hand;
let otherHands = [];
let state = "lobby";
let roomInfo = undefined;
let newCardBtn;
let topCard;
let chooseColor = false;
let holdCard = "";
let logo, leftEmote, rightEmote;
let jettMode = false;
let jettBackground;

function preload()
{
	logo = loadImage("images/logo.png");
	leftEmote = loadImage("images/reverse.gif");
	rightEmote = loadImage("images/dance.gif");
	backImg = loadImage("images/cardback.png")
	deckImg = loadImage("images/uno deck.png")
	jettBackground = loadImage("images/background.gif");
	profilePictures.push(loadImage("images/ProfilePics/360-wave.png"));
	profilePictures.push(loadImage("images/ProfilePics/Blue-head-gamerpic.png"));
	profilePictures.push(loadImage("images/ProfilePics/Dog-gamerpic.jpg"));
	profilePictures.push(loadImage("images/ProfilePics/Dragon-gamerpic.jpg"));
	profilePictures.push(loadImage("images/ProfilePics/Monkey-gamerpic.png"));
	profilePictures.push(loadImage("images/ProfilePics/Orange-black-skull.jpg"));
	profilePictures.push(loadImage("images/ProfilePics/Panda-gamerpic.png"));
	profilePictures.push(loadImage("images/ProfilePics/Pink-hair-girl-gamerpic.png"));
	profilePictures.push(loadImage("images/ProfilePics/Pirate-gamerpic.png"));
	profilePictures.push(loadImage("images/ProfilePics/Smiley-face-gamerpic.png"));
	profilePictures.push(loadImage("images/ProfilePics/Soccer-ball-gamerpic.png"));
	ppLength = profilePictures.length;
	profilePictures.push(loadImage("images/ProfilePics/jett1.png"));
	profilePictures.push(loadImage("images/ProfilePics/jett2.jpg"));
	profilePictures.push(loadImage("images/ProfilePics/jett3.jpg"));
	profilePictures.push(loadImage("images/ProfilePics/jett4.jpg"));
	profilePictures.push(loadImage("images/ProfilePics/jett5.jpg"));
	profilePictures.push(loadImage("images/ProfilePics/jett6.jpg"));
	profilePictures.push(loadImage("images/ProfilePics/jett7.jpg"));
	profilePictures.push(loadImage("images/ProfilePics/jett8.jpg"));
	profilePictures.push(loadImage("images/ProfilePics/jett9.jpg"));
	profilePictures.push(loadImage("images/ProfilePics/jett10.jpg"));
}

function splitSprites() {
	let rows = 8;
	let cols = 14;

	cardWidth = deckImg.width/cols;
	cardHeight = deckImg.height/rows;
	let cardNum = 0;

	for (let i = 0; i<rows; i++) {
		for (let j = 0; j<cols; j++) {
			if ((i*cols) >= 56 && j===0) {
				continue;
			}
			let cardColor;
			let cardType;
			if (cardNum <= 12 || (cardNum >= 56 && cardNum <= 67)) { // is red
				cardColor = "red";
			} 
			else if ((cardNum >= 14 && cardNum <= 26) || (cardNum >= 69 && cardNum <= 80)) { // is yellow
				cardColor = "yellow";
			}
			else if ((cardNum >= 28 && cardNum <= 40) || (cardNum >= 82 && cardNum <= 93)) {
				cardColor = "green"; 
			}
			else if ((cardNum >= 42 && cardNum <= 54) || (cardNum >= 95 && cardNum <= 106)) {
				cardColor = "blue";
			}
			
			if (j <= 9) {
				cardType = j;
			}
			else if (j === 10) cardType = "skip";
			else if (j === 11) cardType = "reverse";
			else if (j === 12) cardType = "plus2";
			else if (j === 13) {
				if (i <= 3) cardType = "wildcard";
				else cardType = "plus4"
			}
			deck.push(new Card(deckImg.get(j*cardWidth, i*cardHeight, cardWidth, cardHeight), cardNum, cardColor, cardType));
			cardNum++;
		}
	}
	cardWidth /= 2.5;
	cardHeight /= 2.5;
}

function ConvertCards(cards) {
	hand.cards = [];
	cards.map((card) => {
		hand.addCard(deck[card.idx].clone());
	})
	console.log(hand);
}

function canBePlayed(card) {
	if (card.type === "wildcard" || card.type === "plus4") return true;
	if (card.color === topCard.color) return true;
	if (card.type === topCard.type) return true;
	return false;
}

function playCard(card) {
	if (card.type === "wildcard" || card.type === "plus4") {
		chooseColor = true;
		holdCard = {...card};
	}
	else {
		socket.emit("playCard", roomInfo.code, {
			idx: card.id,
			color: card.color,
			type: card.type
		});
	}
}

function setup()
{
	splitSprites();
	let aspect = 0;
	if (windowWidth > windowHeight) aspect = windowHeight/9;
	else aspect = windowWidth/16;
	createCanvas(aspect*15, aspect*8);
	frameRate(60)
	imageMode(CENTER, CENTER)
	textAlign(CENTER, CENTER);
	socket = io();
	hand = new Hand(width/2, height-cardHeight);
	newCardBtn = new CardButton(width/2-cardWidth*1.5, height/2, () => {
		if (me === roomInfo.turn) {
			socket.emit("getCard", roomInfo.code);
		}
	})
	socket.on("roomInfo", (data) => {
		roomInfo = data;
		ConvertCards(roomInfo.players[me].hand);
		topCard = deck[roomInfo.topCard.idx].clone();
		topCard.color = roomInfo.topCard.color;
		topCard.x = width/2;
		topCard.y = height/2;
		if (otherHands.length === 0) {
			for (let i = 0; i<3; i++) {
				otherHands.push(new DumbyHand(1, i));
			}
		}
		let idx = 0;
		roomInfo.players.map((player, idxx) => {
			if (idxx !== me) {
				otherHands[idx].size = player.hand.length;
				idx ++;
			}
		})
		if (roomInfo.winner !== 5) {
			state = "winner";
		}
		else if (roomInfo.running === true) {
			state = "game";
		}
		else {
			state = "lobby";
		}
		if (roomInfo.turn === me) {
			hand.enabled = true;
			newCardBtn.enabled = true;
		}
		else {
			hand.enabled = false;
			newCardBtn.enabled = false;
			let i = 0;
			roomInfo.players.map((player, idx) => {
				if (idx !== me) {
					i++;
				}
				if (roomInfo.turn === idx) otherHands[i].enabled = true;
				else otherHands[i].enabled = false;
			})
		}
	});
	socket.on("setIndex", (data) => {
		me = data;
	});
	SetupLobby();
}

function draw()
{
	background(100, 0, 0)
	// fill(255);
	// rect(0,height/2, width, 20)
	// rect(width/2, 0, 20, height)
	switch(state) {
		case "lobby":
			Lobby();
			break;
		case "game":
			image(profilePictures[roomInfo.players[me].imgID], width/3, height-cardHeight*1.25, cardWidth/1.5, cardWidth/1.5);
			hand.hoverOver(mouseX, mouseY);
			hand.show();
			otherHands.map((oHand) => oHand.show());
			newCardBtn.show();
			topCard.show();
			if (chooseColor) colorChoice();
			break;
		case "winner":
			winner();
			break;
	}
}

function mousePressed() {
	if (roomInfo !== undefined) {
		if (roomInfo.running) {
			if (chooseColor) {
				if (collidePointCircle(mouseX, mouseY, width/2, height/2, cWidth)) {
					let color;
					if (mouseX < width/2 && mouseY < height/2) color = "red";
					else if (mouseX > width/2 && mouseY < height/2) color = "yellow";
					else if (mouseX < width/2 && mouseY > height/2) color = "green";
					else if (mouseX > width/2 && mouseY > height/2) color = "blue";
					holdCard.color = color;
					socket.emit("playCard", roomInfo.code, {
						idx: holdCard.id,
						color: holdCard.color,
						type: holdCard.type
					});
					chooseColor = false;
				}
			}
			hand.clicked();
			newCardBtn.clicked();
		}
	}
}

let cWidth;
function colorChoice() {
	cWidth = width/5;
	stroke(255);
	strokeWeight(10)
	fill(0,0,255);
	arc(width/2, height/2, cWidth, cWidth, 0, HALF_PI);
	fill(0,255,0);
	arc(width/2, height/2, cWidth, cWidth, HALF_PI, PI);
	fill(255,0,0);
	arc(width/2, height/2, cWidth, cWidth, PI, PI+HALF_PI);
	fill(255,255,0)
	arc(width/2, height/2, cWidth, cWidth, PI+HALF_PI, 2*PI);
}
