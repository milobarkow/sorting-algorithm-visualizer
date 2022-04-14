class Group {

    constructor(amount, sort) {
        this.color = color(random(0, 255), random(0, 255), random(0, 255));
        this.sorts = {
            "bubbleSort": [false],
            "selectionSort": [false],
            "insertionSort": [false],
            "cocktailSort": [false],
            "mergeSort": [false],
            "quickSort": [false],
            "gnomeSort": [false],
            "quickSort": [false],
            "gnomeSort": [false],
            "quickSort": [false],
        }
        this.sortType = sort
        this.widths = 2;
        this.init(amount);
        this.started = false;
    }

    bubbleStep() {
        console.log("bubble Step")
        let place = this.step;
        if (place == this.rectangles.length - 1) {
            this.step = 0;
            place = 0;
        }

        if (this.rectangles[place].getHeight() > this.rectangles[place + 1].getHeight()) {
            let tempHeight = this.rectangles[place].getHeight();
            this.rectangles[place].height = this.rectangles[place + 1].getHeight();
            this.rectangles[place + 1].height = tempHeight;
        }
        this.step += 1;
        this.done = this.checkDone();
    }

    selectionStep() {
        console.log("selection Step")
        let min = 501;
        let minRank = 0;
        for (let i = 0; i < this.amount; i++) {
            if (this.unsortedHeights[i] < min) {
                min = this.unsortedHeights[i];
                minRank = i;
            }
        }
        this.unsortedHeights.splice(minRank, 1);
        this.sortedHeights.push(min);

        let all = this.sortedHeights.concat(this.unsortedHeights);
        for (let i = 0; i < this.amount; i++) {
            this.rectangles[i].height = all[i];
        }

        this.done = this.checkDone();
    }

    insertionStep() {
        console.log("insertion Step")
        if (this.step + 1 < this.amount) {
            let i = this.step;
            let checkHeight = this.unsortedHeights[this.step + 1];
            while (i >= 0 && this.unsortedHeights[i] > checkHeight) {
                this.unsortedHeights[i + 1] = this.unsortedHeights[i];
                i -= 1;
            }
            this.unsortedHeights[i + 1] = checkHeight;
            for (let j = 0; j < this.rectangles.length; j++) {
                this.rectangles[j].height = this.unsortedHeights[j];
            }
            this.done = this.checkDone();
            this.step++;
        } else {
            this.done = true;
        }
    }

    cocktailStep() {
        console.log("cocktail Step")
        let place = this.cocktailPlace;
        if (this.forwardPass && place == this.rectangles.length - 1 - this.step) {
            this.forwardPass = false;
        } else if (place == this.step + 1) {
            place = this.step;
            this.forwardPass = true;
        }
        if (this.forwardPass) {
            if (this.rectangles[place].getHeight() > this.rectangles[place + 1].getHeight()) {
                let tempHeight = this.rectangles[place].getHeight();
                this.rectangles[place].height = this.rectangles[place + 1].getHeight();
                this.rectangles[place + 1].height = tempHeight;
            }
            this.cocktailPlace += 1;
        } else {
            if (this.rectangles[place - 1].getHeight() > this.rectangles[place].getHeight()) {
                let tempHeight = this.rectangles[place].getHeight();
                this.rectangles[place].height = this.rectangles[place - 1].getHeight();
                this.rectangles[place - 1].height = tempHeight;
            }
            this.cocktailPlace -= 1;
        }
        this.done = this.checkDone();
    }

    async mergeSort(arr, left, right) {
        if (left < right) {
            let middle = left + parseInt((right - left) / 2);
            await this.mergeSort(arr, left, middle);
            await this.mergeSort(arr, middle + 1, right);
            let n1 = middle - left + 1;
            let n2 = right - middle;

            let L = new Array(n1);
            let R = new Array(n2);

            for (let i = 0; i < n1; i++) {
                L[i] = arr[left + i];
            }
            for (let j = 0; j < n2; j++) {
                R[j] = arr[middle + 1 + j];
            }

            let i = 0;
            let j = 0;
            let k = left;



            while (i < n1 && j < n2) {
                if (L[i] <= R[j]) {
                    arr[k] = L[i];
                    i++;
                } else {
                    arr[k] = R[j];
                    j++;
                }
                k++;
            }

            while (i < n1) {
                arr[k] = L[i];
                i++;
                k++;
            }


            while (j < n2) {
                arr[k] = R[j];
                j++;
                k++;
            }

            await this.sleep(100);
        } else {
            for (let i = 0; i < this.rectangles.length; i++) {
                this.rectangles[i].height = this.unsortedHeights[i];
            }
            return;
        }
    }


    async quickSortPartition(arr, low, high) {
        let pivot = arr[high];
        let i = low - 1;
        let temp = -1;
        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        await this.sleep(10);

        return (i + 1);
    }

    async quickStep(arr, low, high) {
        if (low < high) {
            let part = await this.quickSortPartition(arr, low, high);
            await this.quickStep(arr, low, part - 1);
            await this.quickStep(arr, part + 1, high);
        } else {
            for (let i = 0; i < this.rectangles.length; i++) {
                this.rectangles[i].height = this.unsortedHeights[i];
            }
        }
    }

    gnomeStep() {
        console.log("gnome step");
        let place = this.step;
        if (place == 0) {
            this.step += 1;
        } else if (place < this.amount) {
            this.done = this.checkDone();
            if (this.rectangles[place - 1].getHeight() <= this.rectangles[place].getHeight()) {
                this.step += 1
            } else if (this.rectangles[place].getHeight() < this.rectangles[place - 1].getHeight()) {
                let tempHeight = this.rectangles[place - 1].getHeight();
                this.rectangles[place - 1].height = this.rectangles[place].getHeight();
                this.rectangles[place].height = tempHeight;
                this.step -= 1;
            }
        } else {
            this.done = this.checkDone();
        }
    }

    gnomeStep() {
        console.log("gnome step");
        let place = this.step;
        if (place == 0) {
            this.step += 1;
        } else if (place < this.amount) {
            this.done = this.checkDone();
            if (this.rectangles[place - 1].getHeight() <= this.rectangles[place].getHeight()) {
                this.step += 1
            } else if (this.rectangles[place].getHeight() < this.rectangles[place - 1].getHeight()) {
                let tempHeight = this.rectangles[place - 1].getHeight();
                this.rectangles[place - 1].height = this.rectangles[place].getHeight();
                this.rectangles[place].height = tempHeight;
                this.step -= 1;
            }
        } else {
            this.done = this.checkDone();
        }
    }

    init(amount) {
        this.amount = amount;
        this.rectangles = [];
        this.unsortedHeights = [];
        this.sortedHeights = [];
        this.merging = [];
        this.step = 0;
        this.mergeTracker = 0;
        this.done = true;
        this.cocktailPlace = 0;
        this.forwardPass = true;

        for (let i = 0; i < this.amount; i++) {
            let height = random(50, 500);
            var newRect = new Rectangle(this.widths * i, height, this.widths, this.color);
            this.rectangles.push(newRect);
            this.unsortedHeights.push(height);
        }

        for (let key in this.sorts) {
            this.sorts[key] = false;
        }

        this.sorts[this.sortType] = true;
    }


    async sort() {
        if (!this.done) {
            this.started = true;
            if (this.sorts["bubbleSort"]) {
                this.bubbleStep();
            } else if (this.sorts["selectionSort"]) {
                this.selectionStep();
            } else if (this.sorts["insertionSort"]) {
                this.insertionStep();
            } else if (this.sorts["cocktailSort"]) {
                this.cocktailStep();
            } else if (this.sorts["mergeSort"]) {
                await this.mergeSort(this.unsortedHeights, 0, this.amount - 1);
            } else if (this.sorts["quickSort"]) {
                await this.quickStep(this.unsortedHeights, 0, this.amount - 1);
            } else if (this.sorts["gnomeSort"]) {
                this.gnomeStep();
            } else if (this.sorts["gnomeSort"]) {
                this.gnomeStep();
            }
        }
    }

    checkDone() {
        for (let i = 0; i < this.amount - 1; i++) {
            if (this.rectangles[i].getHeight() > this.rectangles[i + 1].getHeight()) {
                return false;
            }
        }
        return true;
    }

    showRectangles() {
        for (let i = 0; i < this.rectangles.length; i++) {
            this.rectangles[i].show(this.checkDone());
        }
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}