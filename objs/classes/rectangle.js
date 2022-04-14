class Rectangle {
    constructor(x, height, width, color) {
        this.xcord = x;
        this.height = height;
        this.width = width
        this.color = color;
    }

    show(col) {
        if (col) {
            fill(0, 255, 0);
        } else {
            fill(255, 0, 0);
        }
        rect(this.xcord, 700 - this.height, this.width, this.height);
    }

    getHeight() {
        return this.height;
    }
    
}