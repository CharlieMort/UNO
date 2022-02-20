let me = undefined;

function JoinRoom() {
    let code = prompt("Enter Room Code");
    if (code) code = code.toUpperCase();
    console.log(code);
    socket.emit("joinRoom", code);
}

function CreateRoom() {
    socket.emit("createRoom");
}

let joinGameBtn;
let createGameBtn;
let startGameBtn;
let changeIconBtnRight;
let changeIconBtnLeft;

const maxNickLength = 14;

function SetupLobby() {
    joinGameBtn = new MenuButton(width/2, height/2+100, "Join Room", JoinRoom);
    createGameBtn = new MenuButton(width/2, height/2+20, "Create Room", CreateRoom);
    changeIconBtnLeft = new TriangleButton(0,0,0,0,(id) => {
        let newId = roomInfo.players[id].imgID-1;
        if (newId < 0) newId = ppLength;
        socket.emit("changeProfileIdx", roomInfo.code, me, newId)
    });
    changeIconBtnRight = new TriangleButton(0,0,0,0,(id) => {
        let newId = roomInfo.players[id].imgID+1;
        if (newId >= ppLength) newId = 0;
        socket.emit("changeProfileIdx", roomInfo.code, me, (roomInfo.players[id].imgID+1)%ppLength)
    })
    startGameBtn = new MenuButton(width/2-100, height-100, "Start Game", () => {
        socket.emit("startGame", roomInfo.code);
    })
}

let nick = "";

function Lobby() {
    if (roomInfo) {
        fill([236,212,7])
        textStyle(BOLD);
        strokeWeight(0);
        textSize(30);
        text("CODE:", width/2, 110)
        textSize(50);
        text(roomInfo.code, width/2, 150);
        let iconWidth = width/4;
        let iconHeight = height/3;
        for (let i = 0; i<4; i++) {
            fill([215, 38, 0])
            let x = iconWidth*i
            let y = height/3;
            rect(x+75, y, iconWidth-150, iconHeight, 50);
            if (roomInfo.players[i]) {
                let player = roomInfo.players[i];
                fill(255);
                textSize(35);
                text(player.nick, x+iconWidth/2, y+iconHeight/6)
                image(profilePictures[player.imgID], x+iconWidth/2, y+iconHeight/2, iconWidth/3, iconWidth/3)
            }
            if (i === me) {
                changeIconBtnLeft.setValues(x+iconWidth/4, y+iconHeight/2, -iconWidth/8+10, iconWidth/8);
                changeIconBtnRight.setValues(x+((iconWidth/4)*3), y+iconHeight/2, iconWidth/8-10, iconWidth/8);
                changeIconBtnLeft.show();
                changeIconBtnRight.show();
            }
        }
        if (me === 0 && roomInfo.players.length > 1) {
            startGameBtn.show();
        }
    }
    else {
        if (nick === "") {
            let inp = prompt("Enter Nickname....");
            if (inp) {
                if (inp.length <= maxNickLength) {
                    nick = inp;
                    socket.emit("setNickname", nick);
                    if (nick.toLowerCase().includes("ciaran") || nick.toLowerCase().includes("jett") || nick.toLowerCase().includes("uwu")) {
                        jettMode = true;
                        joinGameBtn.x = 25
                        createGameBtn.x = 25
                        joinGameBtn.c = [4, 46, 39];
                        joinGameBtn.txtc = 255;
                        joinGameBtn.s = [250, 68, 84]
                        joinGameBtn.ss = 2
                        joinGameBtn.cs = 0
                        joinGameBtn.txts = 30;
                        joinGameBtn.b = false; 

                        createGameBtn.c = [4, 46, 39];
                        createGameBtn.txtc = 255;
                        createGameBtn.s = [250, 68, 84]
                        createGameBtn.ss = 2
                        createGameBtn.cs = 0
                        createGameBtn.txts = 30;
                        createGameBtn.b = false;
                        ppLength = profilePictures.length;
                    }
                }
            }
        }
        if (jettMode) {
            image(jettBackground, width/2, height/2, width, height);
            image(logo, width/1.15, height/5, 3664/12, 3248/12);
            
            joinGameBtn.show();
            createGameBtn.show();
        }
        else {
            image(logo, width/2, height/5, 3664/10, 3248/10);
            image(leftEmote, width/5, height/2, width/8, width/8);
            image(rightEmote, (width/5)*4, height/2, width/8, width/8);
            joinGameBtn.show();
            createGameBtn.show();
        }
    }
}

function mouseClicked() {
    if (roomInfo) {
        changeIconBtnLeft.clicked(me);
        changeIconBtnRight.clicked(me);
        startGameBtn.clicked();
    }
    else {
        joinGameBtn.clicked();
        createGameBtn.clicked();
    }
}