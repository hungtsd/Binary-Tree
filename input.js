import * as Config from './config.js';
import * as Utils from './utils.js';
import * as Draw from './draw.js';

const OpBarElement = document.getElementById('OpBar');

let inputIDCounter = 0;

//callback accepts input values
export function addOpinput(name, callback, ...inputs){
    let inputValues = [];
    const element = Utils.createHTMLElement('div',null,null,'OpContainer');
    const button = Utils.createHTMLElement('button',element);
    button.textContent = name;
    button.type = 'button';
    button.onclick = ()=>{
        if (!callback) return;
        let argList = inputValues.map((elem)=>{return elem.value;});
        callback.apply(this,argList);
    };

    for (const name of inputs){
        const childElement = Utils.createHTMLElement('div',element,null,'InputDiv');
        const label = Utils.createHTMLElement('label',childElement);
        label.textContent = name;
        label.htmlFor = `OpInput${inputIDCounter}`;
        const input = Utils.createHTMLElement('input', childElement);
        input.type = 'number';
        input.id = `OpInput${inputIDCounter}`;
        inputValues.push(input);
        inputIDCounter++;
    }

    OpBarElement.appendChild(element);
}

export function clearOpInput(){
    while(OpBarElement.firstChild)
        OpBarElement.removeChild(OpBarElement.firstChild);
}