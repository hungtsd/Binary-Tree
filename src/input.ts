import * as Config from './config.js';
import * as Utils from './utils.js';
import * as Draw from './draw.js';

const OpBarElement = document.getElementById('OpBar') as HTMLDivElement;

let inputIDCounter = 0;

//callback accepts input values
export function addOpinput(name : string, callback : Function | null, ...inputs : string[]) : void{
    let inputValues : HTMLInputElement[] = [];
    const element = Utils.createHTMLElement('div',null,null,'OpContainer') as HTMLDivElement;
    const button = Utils.createHTMLElement('button',element) as HTMLButtonElement;
    button.textContent = name;
    button.type = 'button';
    button.onclick = function(){
        if (!callback) return;
        let argList = inputValues.map((elem)=>{return elem.value;});
        callback.apply(this, argList);
    };

    for (const name of inputs){
        const childElement = Utils.createHTMLElement('div',element,null,'InputDiv') as HTMLDivElement;
        const label = Utils.createHTMLElement('label',childElement) as HTMLLabelElement;
        const input = Utils.createHTMLElement('input', childElement) as HTMLInputElement;
        label.textContent = name;
        label.htmlFor = `OpInput${inputIDCounter}`;
        input.type = 'number';
        input.id = `OpInput${inputIDCounter}`;
        inputValues.push(input);
        inputIDCounter++;
    }

    OpBarElement.appendChild(element);
}

export function clearOpInput() : void{
    while(OpBarElement.firstChild)
        OpBarElement.removeChild(OpBarElement.firstChild);
}