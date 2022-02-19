const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const http = require("http");
const CARD_DATA = [
    {
      idx: 0,
      color: "red",
      type: 0,
    },
    {
      idx: 1,
      color: "red",
      type: 1,
    },
    {
      idx: 2,
      color: "red",
      type: 2,
    },
    {
      idx: 3,
      color: "red",
      type: 3,
    },
    {
      idx: 4,
      color: "red",
      type: 4,
    },
    {
      idx: 5,
      color: "red",
      type: 5,
    },
    {
      idx: 6,
      color: "red",
      type: 6,
    },
    {
      idx: 7,
      color: "red",
      type: 7,
    },
    {
      idx: 8,
      color: "red",
      type: 8,
    },
    {
      idx: 9,
      color: "red",
      type: 9,
    },
    {
      idx: 10,
      color: "red",
      type: "skip",
    },
    {
      idx: 11,
      color: "red",
      type: "reverse",
    },
    {
      idx: 12,
      color: "red",
      type: "plus2",
    },
    {
      idx: 13,
      type: "wildcard",
    },
    {
      idx: 14,
      color: "yellow",
      type: 0,
    },
    {
      idx: 15,
      color: "yellow",
      type: 1,
    },
    {
      idx: 16,
      color: "yellow",
      type: 2,
    },
    {
      idx: 17,
      color: "yellow",
      type: 3,
    },
    {
      idx: 18,
      color: "yellow",
      type: 4,
    },
    {
      idx: 19,
      color: "yellow",
      type: 5,
    },
    {
      idx: 20,
      color: "yellow",
      type: 6,
    },
    {
      idx: 21,
      color: "yellow",
      type: 7,
    },
    {
      idx: 22,
      color: "yellow",
      type: 8,
    },
    {
      idx: 23,
      color: "yellow",
      type: 9,
    },
    {
      idx: 24,
      color: "yellow",
      type: "skip",
    },
    {
      idx: 25,
      color: "yellow",
      type: "reverse",
    },
    {
      idx: 26,
      color: "yellow",
      type: "plus2",
    },
    { 
      idx: 27, 
      type: "wildcard", 
    },
    {
      idx: 28,
      color: "green",
      type: 0,
    },
    {
      idx: 29,
      color: "green",
      type: 1,
    },
    {
      idx: 30,
      color: "green",
      type: 2,
    },
    {
      idx: 31,
      color: "green",
      type: 3,
    },
    {
      idx: 32,
      color: "green",
      type: 4,
    },
    {
      idx: 33,
      color: "green",
      type: 5,
    },
    {
      idx: 34,
      color: "green",
      type: 6,
    },
    {
      idx: 35,
      color: "green",
      type: 7,
    },
    {
      idx: 36,
      color: "green",
      type: 8,
    },
    {
      idx: 37,
      color: "green",
      type: 9,
    },
    {
      idx: 38,
      color: "green",
      type: "skip",
    },
    {
      idx: 39,
      color: "green",
      type: "reverse",
    },
    {
      idx: 40,
      color: "green",
      type: "plus2",
    },
    { 
      idx: 41, 
      type: "wildcard", 
    },
    {
      idx: 42,
      color: "blue",
      type: 0,
    },
    {
      idx: 43,
      color: "blue",
      type: 1,
    },
    {
      idx: 44,
      color: "blue",
      type: 2,
    },
    {
      idx: 45,
      color: "blue",
      type: 3,
    },
    {
      idx: 46,
      color: "blue",
      type: 4,
    },
    {
      idx: 47,
      color: "blue",
      type: 5,
    },
    {
      idx: 48,
      color: "blue",
      type: 6,
    },
    {
      idx: 49,
      color: "blue",
      type: 7,
    },
    {
      idx: 50,
      color: "blue",
      type: 8,
    },
    {
      idx: 51,
      color: "blue",
      type: 9,
    },
    {
      idx: 52,
      color: "blue",
      type: "skip",
    },
    {
      idx: 53,
      color: "blue",
      type: "reverse",
    },
    {
      idx: 54,
      color: "blue",
      type: "plus2",
    },
    { 
      idx: 55, 
      type: "wildcard", 
    },
    {
      idx: 56,
      color: "red",
      type: 1,
    },
    {
      idx: 57,
      color: "red",
      type: 2,
    },
    {
      idx: 58,
      color: "red",
      type: 3,
    },
    {
      idx: 59,
      color: "red",
      type: 4,
    },
    {
      idx: 60,
      color: "red",
      type: 5,
    },
    {
      idx: 61,
      color: "red",
      type: 6,
    },
    {
      idx: 62,
      color: "red",
      type: 7,
    },
    {
      idx: 63,
      color: "red",
      type: 8,
    },
    {
      idx: 64,
      color: "red",
      type: 9,
    },
    {
      idx: 65,
      color: "red",
      type: "skip",
    },
    {
      idx: 66,
      color: "red",
      type: "reverse",
    },
    {
      idx: 67,
      color: "red",
      type: "plus2",
    },
    {
      idx: 68,
      type: "plus4",
    },
    {
      idx: 69,
      color: "yellow",
      type: 1,
    },
    {
      idx: 70,
      color: "yellow",
      type: 2,
    },
    {
      idx: 71,
      color: "yellow",
      type: 3,
    },
    {
      idx: 72,
      color: "yellow",
      type: 4,
    },
    {
      idx: 73,
      color: "yellow",
      type: 5,
    },
    {
      idx: 74,
      color: "yellow",
      type: 6,
    },
    {
      idx: 75,
      color: "yellow",
      type: 7,
    },
    {
      idx: 76,
      color: "yellow",
      type: 8,
    },
    {
      idx: 77,
      color: "yellow",
      type: 9,
    },
    {
      idx: 78,
      color: "yellow",
      type: "skip",
    },
    {
      idx: 79,
      color: "yellow",
      type: "reverse",
    },
    {
      idx: 80,
      color: "yellow",
      type: "plus2",
    },
    { 
      idx: 81, 
      type: "plus4", 
    },
    {
      idx: 82,
      color: "green",
      type: 1,
    },
    {
      idx: 83,
      color: "green",
      type: 2,
    },
    {
      idx: 84,
      color: "green",
      type: 3,
    },
    {
      idx: 85,
      color: "green",
      type: 4,
    },
    {
      idx: 86,
      color: "green",
      type: 5,
    },
    {
      idx: 87,
      color: "green",
      type: 6,
    },
    {
      idx: 88,
      color: "green",
      type: 7,
    },
    {
      idx: 89,
      color: "green",
      type: 8,
    },
    {
      idx: 90,
      color: "green",
      type: 9,
    },
    {
      idx: 91,
      color: "green",
      type: "skip",
    },
    {
      idx: 92,
      color: "green",
      type: "reverse",
    },
    {
      idx: 93,
      color: "green",
      type: "plus2",
    },
    { 
      idx: 94, 
      type: "plus4", 
    },
    {
      idx: 95,
      color: "blue",
      type: 1,
    },
    {
      idx: 96,
      color: "blue",
      type: 2,
    },
    {
      idx: 97,
      color: "blue",
      type: 3,
    },
    {
      idx: 98,
      color: "blue",
      type: 4,
    },
    {
      idx: 99,
      color: "blue",
      type: 5,
    },
    {
      idx: 100,
      color: "blue",
      type: 6,
    },
    {
      idx: 101,
      color: "blue",
      type: 7,
    },
    {
      idx: 102,
      color: "blue",
      type: 8,
    },
    {
      idx: 103,
      color: "blue",
      type: 9,
    },
    {
      idx: 104,
      color: "blue",
      type: "skip",
    },
    {
      idx: 105,
      color: "blue",
      type: "reverse",
    },
    {
      idx: 106,
      color: "blue",
      type: "plus2",
    },
    {
      idx: 107,
      type: "plus4",
    },
];  

let app = express();

app.use(express.static("public"));

app.use(cors());

let server = http.createServer(app);
const PORT = process.env.PORT || 5000;

let io = socketIO(server);

let gamers = {};
let rooms = {};

function makeID(IDLength) {
    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < IDLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function JoinRoom(code, socket) {
    if (rooms.hasOwnProperty(code)) {
        if (rooms[code].players.length < 4) {
            socket.join(code);
            rooms[code].players.push({
                id: socket.id,
                nick: gamers[socket.id],
                hand: GenerateHand(7),
                imgID: Math.floor(Math.random()*11)
            })
            return false;
        } 
        else return "Room Full";
    }
    else return "Room Doesnt Exist";
}

function CreateRoom() {
    let code = makeID(5);
    rooms[code] = {
        code: code,
        players: [],
        turn: 0,
        running: false,
        topCard: GetCard(),
		pickUpAmount: 0,
		direction: 1
    }
    return code;
}

function sendRoomInfo(code) {
    io.to(code).emit("roomInfo", rooms[code]);
}

function GetCard() {
	return {...CARD_DATA[Math.floor(Math.random()*CARD_DATA.length)]};
}

function NextTurn(code) {
    console.log("NEXT TURNING");
    let turnNum = rooms[code].turn + rooms[code].direction;
    if (turnNum < 0) turnNum = rooms[code].players.length-1;
    if (turnNum >= rooms[code].players.length) turnNum = 0;
    return turnNum;
}

function CheckForCard(hand, type) {
	for (let i = 0; i<hand.length; i++) {
		if (hand[i].type === type) return true;
	}
	return false;
}

function RemoveCard(hand, card) {
	for (let i = 0; i<hand.length; i++) {
		if (hand[i].idx === card.idx) {
			hand.splice(i, 1);
			return true;
		}
	}
	return false;
} 

function playCard(code, card) {
	console.log(card);
	RemoveCard(rooms[code].players[rooms[code].turn].hand, card);
    switch (card.type) {
		case "plus4":
			if (CheckForCard(rooms[code].players[NextTurn(code)].hand, "plus4")) {
				rooms[code].pickUpAmount += 4;
			}
			else {
				rooms[code].turn = NextTurn(code);
				for (let i = 0; i<rooms[code].pickUpAmount+4; i++) {
					rooms[code].players[rooms[code].turn].hand.push(GetCard());
				}
				rooms[code].pickUpAmount = 0;
			}
			rooms[code].turn = NextTurn(code);
			break;
		case "plus2":
			if (CheckForCard(rooms[code].players[NextTurn(code)].hand, "plus2")) {
				rooms[code].pickUpAmount += 2;
			}
			else {
				rooms[code].turn = NextTurn(code);
				for (let i = 0; i<rooms[code].pickUpAmount+2; i++) {
					rooms[code].players[rooms[code].turn].hand.push(GetCard());
				}
				rooms[code].pickUpAmount = 0;
			}
			rooms[code].turn = NextTurn(code);
			break;
		case "reverse":
			rooms[code].direction = -rooms[code].direction;
			rooms[code].turn = NextTurn(code);
			break;
		case "skip":
			rooms[code].turn = NextTurn(code);
			rooms[code].turn = NextTurn(code);
			break;
		case "wildcard":
		default:
			rooms[code].turn = NextTurn(code);
			break;
	}
	rooms[code].topCard = {...card};
	sendRoomInfo(code);
}

function GenerateHand(length) {
    let hand = [];
    for (let i = 0; i<length; i++) {
      hand.push({...CARD_DATA[Math.floor(Math.random()*CARD_DATA.length)]});
    }
    console.log(hand);
    return hand;
}

io.on("connection", (socket) => {
    console.log(`${socket.id} Just Connected :)`);
    console.log(`${io.engine.clientsCount} Clients Connected`);
    socket.on("setNickname", (nickname) => {
        gamers[socket.id] = nickname;
    })
    socket.on("createRoom", () => {
        let code = CreateRoom();
        let failure = JoinRoom(code, socket)
        if (!failure) {
            socket.emit("setIndex", 0);
            sendRoomInfo(code);
        }
        else console.log(failure);
    })
    socket.on("joinRoom", (code) => {
        let failure = JoinRoom(code, socket)
        if (!failure) {
            socket.emit("setIndex", rooms[code].players.length-1)
            sendRoomInfo(code);
        }
        else console.log(failure);
    })
    socket.on("changeProfileIdx", (code, playerIdx, idx) => {
        rooms[code].players[playerIdx].imgID = idx;
        sendRoomInfo(code);
    })
    socket.on("startGame", (code) => {
        rooms[code].running = true;
        sendRoomInfo(code);
    })
    socket.on("playCard", (code, card) => {
        playCard(code, card);
    });
	socket.on("getCard", (code) => {
		rooms[code].players[rooms[code].turn].hand.push(GetCard());
		rooms[code].turn = NextTurn(code);
		sendRoomInfo(code);
	})
})

server.listen(PORT, () => console.log(`Server listening on port:${PORT}`));