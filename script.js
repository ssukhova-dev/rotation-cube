const COLOR_BG = "white";
const LINE_WIDTH = 5;
const LINE_CAP_ROUND = "round";

const CUBE_CANVAS_CLASS = ".cube_canvas";

let speed = 0.05;
let cubeColor = "green";
let transparency = 0.5;

const scenarioTypes = { rotation: 'rotation', reverse: 'reverse',}
let scenario = scenarioTypes.rotation;


let canvas = document.querySelector(CUBE_CANVAS_CLASS);

let w = canvas.clientWidth;
let h = canvas.clientHeight;
canvas.width = w;
canvas.height = h;

let ctx = canvas.getContext("2d");

ctx.fillStyle = COLOR_BG;
ctx.strokeStyle = cubeColor;
ctx.lineWidth = LINE_WIDTH;
ctx.lineCap = LINE_CAP_ROUND; 
ctx.globalAlpha = transparency;

let cx = w / 2;
let cy = h / 2;
let cz = 0;
let cubeSize = h / 6;


let vertices = getVertices(cubeSize);

function getVertices(size){
  return [
    [cx - size, cy - size, cz - size],
    [cx + size, cy - size, cz - size],
    [cx + size, cy + size, cz - size],
    [cx - size, cy + size, cz - size],
    [cx - size, cy - size, cz + size],
    [cx + size, cy - size, cz + size],
    [cx + size, cy + size, cz + size],
    [cx - size, cy + size, cz + size],
  ];
}
 
let edges = [
  [0, 1], [1, 2], [2, 3], [3, 0], //back 
  [4, 5], [5, 6], [6, 7], [7, 4], //front 
  [0, 4], [1, 5], [2, 6], [3, 7], 
];

let timeDelta = 0;
let timeLast = 0;

let scaleDelta = 0;
let scaleLast = 0;

requestAnimationFrame(animate);

function animate(timeNow){
  timeDelta = timeNow - timeLast;
  timeLast = timeNow;

  clearBackground();

  if (scenario === scenarioTypes.reverse) {
    MoveX(timeDelta * 2 * speed );

  } else {

    let angle = (timeDelta)* 0.001 * speed * Math.PI * 2;
    rotateZ(angle);
    rotateX(angle);
    rotateY(angle);
  }

  for (let edge of edges){
    ctx.beginPath();
    ctx.moveTo(vertices[edge[0]][0], vertices[edge[0]][1]);
    ctx.lineTo(vertices[edge[1]][0], vertices[edge[1]][1]);
    ctx.stroke();
  }

  fillCubeSizes();

  requestAnimationFrame(animate);
}

function clearBackground(){
  ctx.globalAlpha = 1;
  ctx.fillRect(0, 0, w, h);
  ctx.globalAlpha = transparency;
}

function fillCubeSizes(){

  ctx.fillStyle = cubeColor;

  fillCubeSize([0,1,2,3]);
  fillCubeSize([4,5,6,7]);
  fillCubeSize([0,1,5,4]);
  fillCubeSize([1,5,6,2]);
  fillCubeSize([2,6,7,3]);
  fillCubeSize([0,4,7,3]);

  ctx.fillStyle = COLOR_BG;
}

function fillCubeSize(nodeIndexes){

  let region = new Path2D();
  region.moveTo(vertices[nodeIndexes[0]][0], vertices[nodeIndexes[0]][1]);
  region.lineTo(vertices[nodeIndexes[1]][0], vertices[nodeIndexes[1]][1]);
  region.lineTo(vertices[nodeIndexes[2]][0], vertices[nodeIndexes[2]][1]);
  region.lineTo(vertices[nodeIndexes[3]][0], vertices[nodeIndexes[3]][1]);
  region.lineTo(vertices[nodeIndexes[0]][0], vertices[nodeIndexes[0]][1]);
  region.closePath();

  ctx.fill(region);
};

function rotateX(angle){

  for (let v of vertices) {
    let dy = v[1] - cy;
    let dz = v[2] - cz;
    let y = dy * Math.cos(angle) - dz * Math.sin(angle);
    let z = dy * Math.sin(angle) + dz * Math.cos(angle);
    v[1] = y + cy;
    v[2] = z + cz;
  }
}

function rotateY(angle){

  for (let v of vertices) {
    let dx = v[0] - cx;
    let dz = v[2] - cz;
    let x = dx * Math.cos(angle) - dz * Math.sin(angle);
    let z = dx * Math.sin(angle) + dz * Math.cos(angle);
    v[0] = x + cx;
    v[2] = z + cz;
  }
}

function rotateZ(angle){
  
  for (let v of vertices) {
    let dx = v[0] - cx;
    let dy = v[1] - cy;
    let x = dx * Math.cos(angle) - dy * Math.sin(angle);
    let y = dx * Math.sin(angle) + dy * Math.cos(angle);
    v[0] = x + cx;
    v[1] = y + cy;
  }
}

//rotation speed control

let speedSlider = document.getElementById("speed_range_control");
let speedValue = document.getElementById("speed_value");
speedValue.innerHTML = speedSlider.value;

speedSlider.oninput = function() {
  speedValue.innerHTML = this.value;
  speed = Number(this.value) * 0.01;
}

//rotation X control

let fovAngleX = 0;
let prevfovAngleX = 0;

let xAngleSlider = document.getElementById("x_angle_range_control");
let xAngleValue = document.getElementById("x_angle_value");

xAngleSlider.value = 0;
xAngleValue.innerHTML = xAngleSlider.value;

xAngleSlider.oninput = function() {
  prevfovAngleX = fovAngleX;
  fovAngleX = Number(this.value); 
  xAngleValue.innerHTML = fovAngleX;

  let incrX = (fovAngleX - prevfovAngleX) * 0.01;
  rotateX(incrX);
}

//rotation Y control

let fovAngleY = 0;
let prevfovAngleY = 0;

let yAngleSlider = document.getElementById("y_angle_range_control");
let yAngleValue = document.getElementById("y_angle_value");

yAngleSlider.value = 0;
yAngleValue.innerHTML = yAngleSlider.value;

yAngleSlider.oninput = function() {
  prevfovAngleY = fovAngleY;
  fovAngleY = Number(this.value); 
  yAngleValue.innerHTML = fovAngleY;

  let incrY = (fovAngleY - prevfovAngleY) * 0.01;
  rotateY(incrY);
}

//rotation Z control

let fovAngleZ = 0;
let prevfovAngleZ = 0;

let zAngleSlider = document.getElementById("z_angle_range_control");
let zAngleValue = document.getElementById("z_angle_value");

zAngleSlider.value = 0;
zAngleValue.innerHTML = zAngleSlider.value;

zAngleSlider.oninput = function() {
  prevfovAngleZ = fovAngleZ;
  fovAngleZ = Number(this.value);   
  zAngleValue.innerHTML = fovAngleZ;

  let incr = (fovAngleZ - prevfovAngleZ) * 0.01;
  rotateZ(incr);
}

//color control

let colorPicker = document.getElementById("cube_color_picker");
colorPicker.addEventListener("change", watchColorPicker, false);

function watchColorPicker(event) {

  cubeColor = event.target.value;
  ctx.strokeStyle = cubeColor;
}

//transparency control

let transparencySlider = document.getElementById("transparency_range_control");
let transparencyValue = document.getElementById("transparency_value");

transparencySlider.value = transparency * 10;
transparencyValue.innerHTML = transparency;

transparencySlider.oninput = function() {

  transparency = Number(this.value) / 10;   
  transparencyValue.innerHTML = transparency;
  ctx.globalAlpha = transparency;
}

//scenario radio control

let scenario1Radio = document.getElementById("scenario1");
let scenario2Radio = document.getElementById("scenario2");

scenario1Radio.onchange = function() {
  scenario = scenarioTypes.rotation;

  cx = w / 2 ;
  vertices = getVertices(cubeSize);
}

scenario2Radio.onchange = function() {
  scenario = scenarioTypes.reverse;

  cx = w / 4;
  vertices = getVertices(cubeSize);
  
  rotateZ(fovAngleZ * 0.01);
  rotateX(fovAngleX * 0.01);
  rotateY(fovAngleY * 0.01);
}

//reverse scenario move

let direction = 1;

function MoveX(delta){

  cx = cx + (delta * direction);

  updateDirection();
  vertices = getVertices(cubeSize);
  rotateZ(fovAngleZ * 0.01);
  rotateX(fovAngleX * 0.01);
  rotateY(fovAngleY * 0.01);
}

function updateDirection(){

  if (cx <= w / 4){
    direction = 1;
  }

  if (cx >=  3 * w / 4 ){
    direction = -1;
  }
}
