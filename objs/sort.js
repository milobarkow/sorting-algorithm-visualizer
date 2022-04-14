let bg = (0);
let rectangleGroup;
let amountSlider;

function setup() {
    createCanvas(1500, 700);
    amountSlider = createSlider(100, 750, 375, 1);
    amountSlider.position(900, 80);
    rectangleGroup = new Group(amountSlider.value(), "bubbleSort");

    //  creates bubble button
    var bubble = createButton("BUBBLE");
    bubble.position(220, 80);
    bubble.mouseClicked(() => {
        resetSketch("bubbleSort");
        rectangleGroup.done = false;
    });

    //  creates selection button
    var selection = createButton("SELECTION");
    selection.position(300, 80);
    selection.mouseClicked(() => {
        resetSketch("selectionSort");
        rectangleGroup.done = false;
    });

    //  creates insertion button
    var insertion = createButton("INSERTION");
    insertion.position(400, 80);
    insertion.mouseClicked(() => {
        resetSketch("insertionSort");
        rectangleGroup.done = false;
    });

    //  creates cocktail button
    var cocktail = createButton("COCKTAIL");
    cocktail.position(500, 80);
    cocktail.mouseClicked(() => {
        resetSketch("cocktailSort");
        rectangleGroup.done = false;
    });

    //  creates merge button
    var merge = createButton("MERGE");
    merge.position(600, 80);
    merge.mouseClicked(() => {
        resetSketch("mergeSort");
        rectangleGroup.done = false;
    });

    //  creates quick button
    var quick = createButton("QUICK");
    quick.position(680, 80);
    quick.mouseClicked(() => {
        resetSketch("quickSort");
        rectangleGroup.done = false;
    });

    //  creates gnome button
    var gnome = createButton("GNOME");
    gnome.position(780, 80);
    gnome.mouseClicked(() => {
        resetSketch("gnomeSort");
        rectangleGroup.done = false;
    });
}


function draw() {
    textSize(24);
    background(bg);
    fill(255);

    text("Change Amount", 900, 75);
    text(amountSlider.value(), 1100, 75);

    if (!rectangleGroup.checkDone()) {
        rectangleGroup.sort();
    }

    if (amountSlider.value() != rectangleGroup.amount) {
        resetSketch(rectangleGroup.sortType, false);
    }

    rectangleGroup.showRectangles();
}


function resetSketch(sortType) {
    let amount = amountSlider.value();
    rectangleGroup = new Group(amount, sortType);
}