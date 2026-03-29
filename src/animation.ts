import {AnimationPropertyCfg} from "./config.js";

type FrameCnt = number;
type Time = number;
type tweenFunction = (t: Time) => Time;

export function easeFunc(t: Time): Time{
    return -2*Math.pow(t, 3) + 3*Math.pow(t, 2);
}

export function linearFunc(t: Time): Time{
    return t;
}

type State = Record<string, number>;

type RangeOf<T> = Record<keyof T, {
    begin: number,
    end: number
}>;

type ValueOf<T> = Record<keyof T, number>;

type AnimationSetting = {
    tweenFunc: tweenFunction,
    loop: boolean
};

export class AnimationProperty<T extends State>{
    ranges: RangeOf<T>;
    progress: FrameCnt = 0;
    duration: FrameCnt;
    frameStep: FrameCnt = 1;

    setting: AnimationSetting = AnimationPropertyCfg.defaultSetting;

    constructor(stateRange: RangeOf<T>, duration: FrameCnt, setting: Partial<AnimationSetting> = {}){
        this.ranges = stateRange;
        this.duration = duration-1;
        
        Object.assign(this.setting, setting);
    }

    get(property: keyof T): number{
        return this.ranges[property].begin +
               this.setting.tweenFunc(this.progress/this.duration)*
              (this.ranges[property].end - this.ranges[property].begin);
    }
    
    set(obj: ValueOf<T>): void{
        for (let property in this.ranges)
            obj[property] = this.get(property);
    }

    nextFrame(): boolean{
        let nextFrameCnt = this.progress + this.frameStep;
        if (nextFrameCnt >= this.duration || nextFrameCnt < 0){
            if (this.setting.loop)
                this.reverse();
            else
                return false;
        }
        this.progress = this.progress + this.frameStep;
        return true;
    }

    reset(): void{
        this.progress = 0;
    }

    finish(): void{
        if (this.frameStep<0)
            this.progress = 0;
        else
            this.progress = this.duration;
    }

    reverse(): void{
        this.frameStep = -this.frameStep;
    }
}