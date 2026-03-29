import * as Config from './config.js';
import * as Utils from './utils.js';
import * as Input from './input.js';
import * as Draw from './draw.js';
import * as Graphic from './graphic.js';
import {AnimationProperty, easeFunc, linearFunc} from './animation.js';

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
let node3 = new Graphic.GraphNode;

node1.state.x = 100;
node1.state.y = 100;
node2.state.x = 100;
node2.state.y = 200;
node3.state.x = 100;
node3.state.y = 300;

let edge12 = new Graphic.GraphEdge(node1, node2);
let edge21 = new Graphic.GraphEdge(node2, node1);
let edge23 = new Graphic.GraphEdge(node2, node3);
let edge32 = new Graphic.GraphEdge(node3, node2);

edge12.curve = true;
edge21.curve = true;
edge23.curve = true;
edge32.curve = true;

let drawingObj: {draw: (drawObj: Draw.DrawContext)=>void}[] = [edge12, edge21, edge23, edge32, node1, node2, node3];
let updateObj: {update: ()=>void}[] = [node1, node2, node3];

let mouse_x = 0,
    mouse_y = 0;

node1.animation = new AnimationProperty(
    {
        x: {begin: 100, end: 1000}
    },
    120
);

node2.animation = new AnimationProperty(
    {
        x: {begin: 100, end: 1000}
    },
    120,
    {
        tweenFunc: linearFunc,
        loop: true
    }
);

node3.animation = new AnimationProperty(
    {
        x: {begin: 100, end: 1000}
    },
    120,
    {
        loop: true
    }
);

setTimeout(()=>{
    node1.animation = null;
}, 1000);

setTimeout(()=>{
    node1.animation = new AnimationProperty(
        {
            x: {begin: 1000, end: 100},
            y: {begin: 100, end: 500}
        },
        120,
        {
            loop: true
        }
    );
}, 4000);

setInterval(()=>{
    DrawObj.fill('white');

    for (let obj of updateObj)
        obj.update();

    for (let obj of drawingObj)
        obj.draw(DrawObj);

}, 1000/60);

window.addEventListener('mousemove', (event)=>{
    const rect = canvas.getBoundingClientRect();
    mouse_x = event.clientX - rect.left;
    mouse_y = event.clientY - rect.top;
});