let sketchCanvas;

function setup() {
    const holder = document.getElementById("sketch-holder");
    sketchCanvas = createCanvas(holder.offsetWidth, holder.offsetHeight);
    sketchCanvas.parent("sketch-holder");
    sketchCanvas.style("display", "block");
    noStroke();
}

function windowResized() {
    const holder = document.getElementById("sketch-holder");
    resizeCanvas(holder.offsetWidth, holder.offsetHeight);
}

function draw() {
    const holder = document.getElementById("sketch-holder");
    background(255 * mouseX / holder.offsetWidth, 255 * mouseY / holder.offsetHeight, 180);
    fill(255, 255, 255, 100);
    ellipse(mouseX, mouseY, 80, 80);
}