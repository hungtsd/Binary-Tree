import * as Config from './config.js';
import * as Utils from './utils.js';
import * as Input from './input.js';
import * as Draw from './draw.js';
import * as Graphic from './graphic.js';

const bodyElement = document.getElementById('Body') as HTMLCanvasElement;
const canvas = document.getElementById('MainCanvas') as HTMLCanvasElement;
const displayModeButton= document.getElementById('DisplayModeButton') as HTMLButtonElement;
const displayModeText = document.getElementById('DisplayModeText') as HTMLDivElement;

displayModeButton.onclick = ()=>{
    if (bodyElement.classList.toggle('LightMode'))
        displayModeText.textContent = 'Light Mode';
    else
        displayModeText.textContent = 'Dark Mode';
}


for (let i=0; i<20; i++)
    Input.addOpinput(String(i),null,'Input: ', 'Value: ', 'Somethinglong: ');

const DrawObj = new Draw.DrawContext(canvas);

let node1 = new Graphic.GraphNode;
let node2 = new Graphic.GraphNode;
node1.pos.x = 100;
node1.pos.y = 100;
node2.pos.x = 200;
node2.pos.y = 200;

let edge = new Graphic.GraphEdge(node1, node2);

let drawingObj: {draw: (drawObj: Draw.DrawContext)=>void}[] = [node1, node2, edge];

let mouse_x = 0,
    mouse_y = 0;

setInterval(()=>{
    DrawObj.fill('white');
    
    node2.pos.x = mouse_x;
    node2.pos.y = mouse_y;

    for (let obj of drawingObj)
        obj.draw(DrawObj);

}, 1000/60);

window.addEventListener('mousemove', (event)=>{
    const rect = canvas.getBoundingClientRect();
    mouse_x = event.clientX - rect.left;
    mouse_y = event.clientY - rect.top;
});