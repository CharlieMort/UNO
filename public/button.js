class Button {
    constructor(x, y, w, h, callback, c, txt, txts, txtc) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.txt = txt;
        this.txtc = txtc;
        this.txts = txts;
        this.callback = callback;
    }

    show() {
        fill(this.c);
        rect(this.x, this.y, this.w, this.h);
        fill(this.txtc);
        textSize(this.txts);
        text(this.txt, this.x+this.w/2, this.y+this.h/2);
    }

    clicked() {
        if (collidePointRect(mouseX, mouseY, this.x, this.y, this.w, this.h)) {
            this.callback();
        }
    }
}

class CardButton {
    constructor(x, y, callback) {
        this.x = x
        this.y = y
        this.callback = callback;
        this.enabled = false;
    }

    show() {
        if (this.enabled) tint(255);
        else tint(100);
        image(backImg, this.x, this.y, cardWidth, cardHeight);
    }

    clicked() {
        if (collidePointRect(mouseX, mouseY, this.x-cardWidth/2, this.y-cardHeight/2, cardWidth, cardHeight)) {
            this.callback();
        }
    }
}
class MenuButton extends Button {
    constructor(x, y, txt, callback) {
        super(x, y, Math.max(30*txt.length, 330), 65, callback, [215, 38, 0], txt, 45, [236,212,7]);
        this.x -= this.w/2;
        this.y -= this.h/2;
    }

    show() {
        stroke(this.txtc)
        strokeWeight(5)
        fill(this.c);
        rect(this.x, this.y, this.w, this.h, 50);
        fill(this.txtc);
        textSize(this.txts);
        textStyle(BOLD);
        strokeWeight(0);
        text(this.txt, this.x+this.w/2, this.y+this.h/2);
    }
}

class TriangleButton {
    constructor(x, y, w, h, callback) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vectors = [
            createVector(this.x-this.w/2, this.y-this.h/2),
            createVector(this.x+this.w/2, this.y),
            createVector(this.x-this.w/2, this.y+this.h/2)
        ]
        this.callback = callback;
    }

    setValues(x,y,w,h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vectors = [
            createVector(this.x-this.w/2, this.y-this.h/2),
            createVector(this.x+this.w/2, this.y),
            createVector(this.x-this.w/2, this.y+this.h/2)
        ]
    }

    show() {
        noStroke();
        fill(255);
        beginShape()
        for (let v of this.vectors) {
            vertex(v.x, v.y);
        }
        endShape(CLOSE);
        //rect(this.x-this.w/2,this.y-this.h/2,this.w,this.h);
    }

    clicked(params) {
        if (collidePointPoly(mouseX, mouseY, this.vectors)) {
            this.callback(params);
            console.log("clicked");
        }
    }
}