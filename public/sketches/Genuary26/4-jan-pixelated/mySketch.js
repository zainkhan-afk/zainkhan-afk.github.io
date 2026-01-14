let img;
let KMeansimg;
let k = 8;
let blockSize = 10;
let quatLevels = 8;
let numItersCompleted = 1;
let totalNumIters = 10;
let centroids = [];
let assignedData = {};
let frameNum = 0;
let cnv;

function QuantizeColor(c){
    c.x = int(c.x / 255 * quatLevels) / quatLevels * 255;
    c.y = int(c.y / 255 * quatLevels) / quatLevels * 255;
    c.z = int(c.z / 255 * quatLevels) / quatLevels * 255;
    return c;
}

function Dist(v1, v2){
    return v1.dist(v2);
}

function FindClosestCentroid(pixelValue){
    let minDist = 100000;
    let minDistIndex = 0;
    for (let i = 0; i < centroids.length; i++){
        let d = Dist(centroids[i], pixelValue);
        if (d < minDist){
            minDist = d;
            minDistIndex = i;
        }
    }
    return minDistIndex;
}

function RecalculateCentroids(assignedData){
    let centroidValueSums = {};
    let centroidValueFrequency = {};
    for (let index in assignedData){
        let centroid = assignedData[index]["centroid"];
        if (!(centroid in centroidValueSums)){
            centroidValueSums[centroid] = createVector(0, 0, 0);   
            centroidValueFrequency[centroid] = 0;
        }

        let y = int(index / img.width);
        let x = int(index % img.width);

        // let c = img.get(x, y);
        centroidValueFrequency[centroid] += 1;

        centroidValueSums[centroid].add(assignedData[index]["data"]);
    }
    for (let centroidIndex in centroidValueSums){
        centroids[centroidIndex] = p5.Vector.mult(centroidValueSums[centroidIndex], 1/centroidValueFrequency[centroidIndex]);
    }
    return centroids;
}

function InitCentroids(){
    let centroidsSampled = [];
    img.loadPixels();
    while (centroids.length < k){
        let centroidIndex = int(random(0, img.width*img.height));
        if (centroidsSampled.includes(centroidIndex)) {continue;}
        let y = int(centroidIndex / img.width);
        let x = int(centroidIndex % img.width);
        
        
        let c = img.get(x, y);
        
        append(centroidsSampled, centroidIndex);
        append(centroids, rgbToHsv(createVector(c[0], c[1], c[2])));
    }
    img.updatePixels();
}

function loadData(){
    img.loadPixels();
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            let index = (img.width * y) + x;
            let c = img.get(x, y);
            assignedData[index] = {"data" : rgbToHsv(createVector(c[0], c[1], c[2])), "centroid" : 0};
        }
    }
    centroids = RecalculateCentroids(assignedData);
    img.updatePixels();
}

function KMeansStep()
{
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            let index = (img.width * y) + x;
            let closestCentroid = FindClosestCentroid(assignedData[index]["data"]);
            assignedData[index]["centroid"] = closestCentroid;
        }
    }
    centroids = RecalculateCentroids(assignedData);
}

function CreateKmeansImage(){
    KMeansimg.loadPixels();
    for (let y = 0; y < KMeansimg.height; y++) {
        for (let x = 0; x < KMeansimg.width; x++) {
            let index = (KMeansimg.width * y) + x;
            let blockColorSum = createVector(0,0,0);
            for (let xBl = 0; xBl < blockSize; xBl++){
                for (let yBl = 0; yBl < blockSize; yBl++){
                    let imgX = x*blockSize + xBl;
                    let imgY = y*blockSize + yBl;
                    // let c = img.get(imgX, imgY);
                    let index = (img.width * imgY) + imgX;
                    blockColorSum.add(assignedData[index]["data"]);
                }
            }
            blockColorSum.mult(1/(blockSize*blockSize));

            let closestCentroid = FindClosestCentroid(blockColorSum);
            let quantizedColorVec = QuantizeColor(hsvToRgb(centroids[closestCentroid]));
            let newC = color(quantizedColorVec.x, quantizedColorVec.y, quantizedColorVec.z, 255);
            KMeansimg.set(x, y, newC);
        }
    }
    KMeansimg.updatePixels();
}


function hsvToRgb(hsv) {
    let h = hsv.x;
    let s = hsv.y;
    let v = hsv.z;
    
    s /= 100;
    v /= 100;

    const c = v * s; // chroma
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;

    let r = 0, g = 0, b = 0;

    if (h >= 0 && h < 60) {
        r = c; g = x; b = 0;
    } else if (h < 120) {
        r = x; g = c; b = 0;
    } else if (h < 180) {
        r = 0; g = c; b = x;
    } else if (h < 240) {
        r = 0; g = x; b = c;
    } else if (h < 300) {
        r = x; g = 0; b = c;
    } else {
        r = c; g = 0; b = x;
    }

    return createVector(Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255));
}


function rgbToHsv(rgb) {
  let r = rgb.x;
  let g = rgb.y;
  let b = rgb.z;
  
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const v = max;

  // Calculate Hue
  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }

    h *= 60;
    if (h < 0) h += 360;
  }

  // Calculate Saturation
  s = max === 0 ? 0 : delta / max;

  return createVector(h, s*100, v*100);
}



function preload(){
    img = loadImage('rice.jpg');
    // img = loadImage('sample_resized.jpg');
}

function setup() 
{
    cnv = createCanvas(img.width, img.height*2);
    KMeansimg = createImage(int(img.width/blockSize), int(img.height/blockSize));
    frameRate(60);
    loadData();
    InitCentroids();
    KMeansStep();
    CreateKmeansImage();
}

function draw()
{
    background(200);
    image(img, 0, 0);
    KMeansimg.loadPixels();
    let renderBlockSize = blockSize;
    for (let y = 0; y < KMeansimg.height; y++) {
        for (let x = 0; x < KMeansimg.width; x++) {
            let c = KMeansimg.get(x, y);
            fill(c);
            rect(x*renderBlockSize, img.height + y*renderBlockSize, renderBlockSize, renderBlockSize);
        }
    }
    KMeansimg.updatePixels();
    if (frameNum % 30 == 0 && numItersCompleted < totalNumIters){
        console.log("Running KMeans Step");
        KMeansStep();
        CreateKmeansImage();
        numItersCompleted += 1;
    }
    if (numItersCompleted == totalNumIters){
        noLoop();
        saveCanvas(cnv, '4-jan-pixelated.jpg');
    }
    frameNum += 1;
}
