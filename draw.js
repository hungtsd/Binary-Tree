import * as Config from './config.js';
import * as Utils from './utils.js';

let drawObjs = [];

window.addEventListener('resize', Utils.throttle(()=>{
    for (const obj of drawObjs)
        obj.resize();
}, 50));

export class DrawContext{
    constructor(canvas){
        this.canvas= canvas;
        this.ctx= canvas.getContext('2d');

        drawObjs.push(this);
        this.resize();
    }

    circle(cord, r, border_width, border_col, inner_col){
        this.ctx.beginPath();
        this.ctx.arc(cord.x, cord.y, r, 0, 2*Math.PI);
        this.ctx.closePath();
        this.ctx.strokeStyle = border_col;
        this.ctx.lineWidth = border_width;
        this.ctx.stroke();
        this.ctx.fillStyle = inner_col;
        this.ctx.fill();
    }

    line(cord1, cord2, col, width){
        this.ctx.strokeStyle= col;
        this.ctx.lineWidth= width;
        this.ctx.beginPath();
        this.ctx.moveTo(cord1.x, cord1.y);
        this.ctx.lineTo(cord2.x, cord2.y);
        this.ctx.stroke();
    }

    text(cord, text, size){
        this.ctx.font= `${size}px Arial`;
        this.ctx.fillStyle=`black`;
        this.ctx.fillText(text, cord.x, cord.y);
    }

    fill(color){
        this.ctx.fillStyle=color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    resize(){
        this.canvas.width= this.canvas.clientWidth;
        this.canvas.height=this.canvas.clientHeight;
    }
}