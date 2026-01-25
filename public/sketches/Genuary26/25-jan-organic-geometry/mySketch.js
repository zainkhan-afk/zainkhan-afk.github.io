let cnv;
let moths = [];
let numMoths = 100;
let renderer;
let lightPos;


function setup() 
{
    let minDim = min(windowWidth, windowHeight);
    cnv = createCanvas(minDim, minDim);    

    renderer = new Renderer();

    lightPos = createVector(width/2, height/2);

    for (let i = 0; i < numMoths; i ++){
      append(moths, new Moth(createVector(random(width), random(height/2, height))));
    }
}



function draw()
{
  background(0);
  renderer.Render(moths, lightPos);

  for (let moth of moths){
    moth.Adjust(lightPos);
    moth.Step(deltaTime/300);
  }
}


function keyPressed() {
  if (key === 's') {
    // saveCanvas(cnv, '21-jan.jpg');
    saveGif("Gen25", 10);
  }
}
