function winner() {
    let iconWidth = width/4;
    let iconHeight = height/3;
    for (let i = 0; i<4; i++) {
        let x = iconWidth*i
        let y = height/3;
        if (i === roomInfo.winner) {
            textSize(50);
            fill(9, 86, 191);
            text("WINNER", x+iconWidth/2, y-50);
            stroke([236,212,7]);
            strokeWeight(5);
        }
        fill([215, 38, 0])
        rect(x+75, y, iconWidth-150, iconHeight, 50);
        noStroke();
        if (roomInfo.players[i]) {
            let player = roomInfo.players[i];
            fill(255);
            textSize(35);
            text(player.nick, x+iconWidth/2, y+iconHeight/6)
            image(profilePictures[player.imgID], x+iconWidth/2, y+iconHeight/2, iconWidth/3, iconWidth/3)
        }
        if (me === 0) {
            startGameBtn.text = "Rematch?";
            startGameBtn.show();
        }
    }
}