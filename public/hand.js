class Hand {
    constructor(x, y) {
        this.cards = []
        this.x = x;
        this.y = y;
        this.cards.map((card) => card.y = this.y);
        this.enabled = false;
    }

    show() {
        let farLeft = this.x;
        farLeft -= this.cards.length/2*cardWidth;
        farLeft += cardWidth/2
        this.cards.map((card, idx) => {
            let x = farLeft+(cardWidth*idx)
            card.x = x;
            if (canBePlayed(card) && this.enabled) {
                tint(255);
            }
            else tint(100);
            card.show();
        })
        tint(255);
    }

    addCard(card) {
        card.y = this.y
        this.cards.push(card);
    }

    removeCard(index) {
        if (index !== undefined) return this.cards.splice(index,1)[0];
    }

    hoverOver(x, y) {
        this.cards.map((card) => {
            if (card.isOver(x, y)) {
                card.y = this.y-cardHeight/4;
                card.raised = true;
            }
            else {
                card.y = this.y;
                card.raised = false
            }
        })
    }

    clicked() {
        this.cards.map((card, idx) => {
            if (card.isOver(mouseX, mouseY) && canBePlayed(card) && this.enabled) {
                let newCard = this.removeCard(idx);
                playCard(newCard);
            }
        })
    }
}

class DumbyHand{
    constructor(size, pos) {
        this.pos = pos;
        switch(pos) {
            case 1:
                this.x = cardWidth*1.5;
                this.y = height/2;
                this.vertical = true;
                break;
            case 2:
                this.y = 100;
                this.x = width/2;
                this.vertical = false;
                break;
            case 3:
                this.x = width-cardWidth*1.5;
                this.y = height/2;
                this.vertical = true;
                break;
        }
        this.size = size;
    }

    show() {
        if (this.vertical) {
            let top = this.y;
            let seperationY = cardHeight/3;
            let seperationX = cardWidth/14;
            top -= this.size/2*seperationY;
            top += seperationY/2;
            for (let i = 0; i<this.size; i++) {
                let y = top+(seperationY*i)
                let x = 0;
                if (this.pos === 1) {
                    x = this.x-(seperationX*i);
                }
                else if (this.pos === 3) {
                    x = this.x+(seperationX*i);
                }
                image(backImg, x, y, cardWidth, cardHeight);
            }
        }
        else {
            let farLeft = this.x;
            let seperation = cardWidth/2;
            farLeft -= this.size/2*seperation;
            farLeft += seperation/2
            for (let i = 0; i<this.size; i++) {
                let x = farLeft+(seperation*i)
                image(backImg, x, this.y, cardWidth, cardHeight);
            }
        }
    }
}