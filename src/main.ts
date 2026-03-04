import * as Config from './config.js';
import * as Utils from './utils.js';
import * as Input from './input.js';
import * as Draw from './draw.js';

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


for (let i : number = 0; i<20; i++)
    Input.addOpinput(String(i),null,'Input: ', 'Value: ', 'Somethinglong: ');

const DrawObj = new Draw.DrawContext(canvas);

DrawObj.circle({x:300,y:300},100,10,'red','white');