export type Cord = {
    x: number,
    y: number
}

export class Vector implements Cord{
    x: number = 0;
    y: number = 0

    setCord(point: Cord): void{
        this.x = point.x;
        this.y = point.y;
    }

    setAngle(angle: number): void{
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

    //range: (-PI; PI]
    getRotation(): number{
        let length = this.getLength();
        let angle = Math.acos(this.x/length);
        if (Math.asin(this.y/length)<0)
            angle = -angle;
        return angle;
    }
}

export function addVect<Type extends Cord>(vect1: Type, vect2: Type): Vector{
    let result = new Vector;
    result.x = vect1.x + vect2.x;
    result.y = vect1.y + vect2.y;
    return result;
}

export function subVect<Type extends Cord>(vect1: Type, vect2: Type): Vector{
    let result = new Vector;
    result.x = vect1.x - vect2.x;
    result.y = vect1.y - vect2.y;
    return result;
}