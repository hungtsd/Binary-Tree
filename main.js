import * as Config from './config.js';
import * as Utils from './utils.js';
import * as Input from './input.js';
import * as Draw from './draw.js';

const bodyElement = document.getElementById('Body');
const canvas = document.getElementById('MainCanvas');
const displayModeButton = document.getElementById('DisplayModeButton');
const displayModeText = document.getElementById('DisplayModeText');

displayModeButton.onclick = ()=>{
    if (bodyElement.classList.toggle('LightMode'))
        displayModeText.textContent = 'Light Mode';
    else
        displayModeText.textContent = 'Dark Mode';
}


for (let i=0; i<20; i++)
    Input.addOpinput(i,null,'Input: ', 'Value: ', 'Somethinglong: ');

const DrawObj = new Draw.DrawContext(canvas);

DrawObj.circle({x:300,y:300},100,10,'red','white');