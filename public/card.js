class Card {
    constructor(img, id, color, type) {
        this.x = 0;
        this.y = 0;
        this.id = id;
        this.img = img;
        this.color = color;
        this.type = type;
        this.raised = false;
    }

    show() {
        if (this.type === "wildcard" || this.type === "plus4") {
            switch(this.color) {
                case "red":
                    tint(255,0,0);
                    break;
                case "blue":
                    tint(0,0,255);
                    break;
                case "green":
                    tint(0,255,0);
                    break;
                case "yellow":
                    tint(255,255,0);
                    break;
            }
        }
        image(this.img, this.x, this.y, cardWidth, cardHeight);
    }
    
    isOver(x, y) {
        if (this.raised) if (x > this.x-cardWidth/2 && x < this.x+cardWidth/2 && y > (this.y-cardHeight/4)-cardHeight/2 && y < (this.y+cardHeight/4)+cardHeight/2) return true;
        if (x > this.x-cardWidth/2 && x < this.x+cardWidth/2 && y > this.y-cardHeight/2 && y < this.y+cardHeight/2) return true;
        return false;
    }

    clone() {
        let newCard = new Card(this.img, this.id, this.color, this.type);
        return newCard;
    }
}