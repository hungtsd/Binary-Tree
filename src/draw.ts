import * as Config from './config.js';
import * as Utils from './utils.js';
import {type Cord, type AngleRadiant, round} from './math.js';

let drawObjs: DrawContext[] = [];

window.addEventListener('resize', Utils.throttle(()=>{
    for (const obj of drawObjs)
        obj.resize();
}, 50));

type Color = 'black' | 'white' | 'red' | 'blue' | 'green';

export class DrawContext{
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        drawObjs.push(this);
        this.resize();
    }

    arc(cord: Cord, r: number, angle1: AngleRadiant, angle2: AngleRadiant, width: number, col: Color): void{
        round(cord);
        this.ctx.beginPath();
        this.ctx.arc(cord.x, cord.y, r, angle1, angle2);
        this.ctx.strokeStyle = col;
        this.ctx.lineWidth = width;
        this.ctx.stroke();
    }

    circle(cord: Cord, r: number, border_width: number, border_col: Color, inner_col: Color): void{
        round(cord);
        this.ctx.beginPath();
        this.ctx.arc(cord.x, cord.y, r, 0, 2*Math.PI);
        this.ctx.closePath();
        this.ctx.strokeStyle = border_col;
        this.ctx.lineWidth = border_width;
        this.ctx.stroke();
        this.ctx.fillStyle = inner_col;
        this.ctx.fill();
    }

    line(cord1: Cord, cord2: Cord, col: Color, width: number): void{
        round(cord1);
        round(cord2);
        this.ctx.strokeStyle = col;
        this.ctx.lineWidth = width;
        this.ctx.beginPath();
        this.ctx.moveTo(cord1.x, cord1.y);
        this.ctx.lineTo(cord2.x, cord2.y);
        this.ctx.stroke();
    }

    text(cord: Cord, text: string, size: number): void{
        round(cord);
        this.ctx.font = `${size}px Arial`;
        this.ctx.fillStyle = `black`;
        this.ctx.fillText(text, cord.x, cord.y);
    }

    fill(color: Color): void{
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    resize(): void{
        this.canvas.width =  this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    }
}