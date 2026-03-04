import * as Config from './config.js';

export function createHTMLElement(type : string, parent : HTMLElement | null = null, id: string | null = null, ...className : string[]) : HTMLElement{
    let element = document.createElement(type) as HTMLElement;
    if (parent)
        parent.appendChild(element);
    if (id)
        element.id = id;
    if (className.length)
        element.classList.add(...className);
    return element;
}

export function debounce(this: any, func : Function, time : number){
    let timer : number | undefined = undefined;
    return (...args : any) =>{
        clearTimeout(timer);
        timer = setTimeout(() =>{
            func.apply(this,args);
        },time);
    }
}

export function throttle(this: any, func : Function, time : number){
    let timer : number | null = null;
    return (...args : any)=>{
        if (timer) return;
        func.apply(this,args);
        timer = setTimeout(()=>{
            timer = null;
        },time);
    }
}