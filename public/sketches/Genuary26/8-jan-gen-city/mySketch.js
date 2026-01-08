let vertices1 = [
    [-0.2, -0.1],
    [0.2, -0.1],
    [0.2, 0.1],
    [-0.2, 0.1]
];

let edges1 = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0]
];

let vertices2 = [
    [-0.1, -0.1],
    [0.1, -0.1],
    [0.1, 0.1],
    [-0.1, 0.1]
];

let edges2 = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0]
];

let pos1;
let pos2;

function toScreen(pt){
    // console.log([pt[0]*width, pt[1]*height]);
    return [pt[0]*width, pt[1]*height];
}

function renderShape(pos, vertices, edges){
    push();
    translate(pos.x, pos.y);
    beginShape();
    for (let edge of edges){
        let pt1 = toScreen(vertices[edge[0]]);
        let pt2 = toScreen(vertices[edge[1]]);
        vertex(pt1[0], pt1[1]);
        vertex(pt2[0], pt2[1]);
    }
    endShape();
    pop();
}

function setup()
{
    let minDim = min(windowWidth, windowHeight);
    createCanvas(minDim, minDim);

    pos1 = createVector(width/3, height/2);
    pos2 = createVector(2*width/3, height/2);

    frameRate(30);
}

function draw()
{
    background(250, 213, 178);

    fill(200);
    renderShape(pos1, vertices1, edges1);
    renderShape(pos2, vertices2, edges2);
    noLoop();
}


function keyPressed() {
  if (key === 's') {
    // saveGif('mySketch', 20, { delay: 0 });
  }
}