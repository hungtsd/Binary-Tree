export type Cord = {
    x: number,
    y: number
}

export type AngleRadiant = number;

export class Vector implements Cord{
    x: number;
    y: number;

    constructor(cord: Cord){
        this.x = cord.x;
        this.y = cord.y
    }

    setCord(point: Cord): void{
        this.x = point.x;
        this.y = point.y;
    }

    setAngle(angle: AngleRadiant): void{
        this.x = Math.cos(angle);
        this.y = Math.sin(angle);
    }

    setLength(length: number): void{
        let factor = length / this.getLength();
        this.x*= factor;
        this.y*= factor;
    }

    getLength(): number{
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    //range: [0; 2PI)
    getRotation(): AngleRadiant{
        let length = this.getLength();
        let angle = Math.acos(this.x/length);
        if (Math.asin(this.y/length)<0)
            angle = 2*Math.PI-angle;
        return angle;
    }

    scale(length: number): Vector{
        let factor = length/this.getLength();
        return new Vector({
            x: this.x*factor,
            y: this.y*factor
        });
    }

    static add<T1 extends Cord, T2 extends Cord>(vect1: T1, vect2: T2): Vector{
        return new Vector({
            x: vect1.x + vect2.x,
            y: vect1.y + vect2.y
        });
    }

    static sub<T1 extends Cord, T2 extends Cord>(vect1: T1, vect2: T2): Vector{
        return new Vector({
            x: vect1.x - vect2.x,
            y: vect1.y - vect2.y
        });
    }

    static polar(angle: AngleRadiant, length: number): Vector{
        return new Vector({
            x: length*Math.cos(angle),
            y: length*Math.sin(angle)
        });
    }
}

export function round<T extends Cord>(vect: T): void{
    vect.x = Math.round(vect.x);
    vect.y = Math.round(vect.y);
}