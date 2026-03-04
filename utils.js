import * as Config from './config.js';

export function createHTMLElement(type, parent=null, id=null, ...className){
    let element = document.createElement(type);
    if (parent)
        parent.appendChild(element);
    if (id)
        element.id = id;
    if (className.length)
        element.classList.add(...className);
    return element;
}

export function debounce(func, time){
    let timer = null;
    return (...args)=>{
        clearTimeout(timer);
        timer = setTimeout(()=>{
            func.apply(this,args);
        },time);
    }
}

export function throttle(func, time){
    let timer = null;
    return (...args)=>{
        if (timer) return;
        func.apply(this,args);
        timer = setTimeout(()=>{
            timer = null;
        },time);
    }
}