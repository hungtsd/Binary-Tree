import {AnimationPropertyCfg} from "./config.js";
import {mergeObj} from './utils.js';

type FrameCnt = number;
type Time = number;
type TweenFunction = (t: Time) => Time;

export function easeFunc(t: Time): Time{
    return -2 * t**3 + 3 * t**2;
}

export function linearFunc(t: Time): Time{
    return t;
}

type StaticRange<T> = {
    default: T,
    during: T
}
type AnimStaticType = {
    [id: string]: any
};
type AnimStaticData<T> = {
    [property in keyof T]: StaticRange<T[property]>
}

type TweenRange = {
    begin: number,
    end: number,
    tweenFunc?: TweenFunction
};
type AnimTweenType = Record<string, number>;
type AnimTweenData<T extends AnimTweenType> = {
    [property in keyof T]: TweenRange
};

type AnimationSetting = {
    tweenFunc: TweenFunction,
    loop: number | boolean
};

export class Animation<
        StaticType extends AnimStaticType,
        TweenType extends AnimTweenType
    >{
    #staticData: AnimStaticData<StaticType>;
    #tweenData: AnimTweenData<TweenType>;
    #progress: FrameCnt = 0;
    readonly #duration: FrameCnt;
    #frameStep: FrameCnt = 1;

    readonly #setting: AnimationSetting;

    constructor(staticData: AnimStaticData<StaticType>,
                tweenData: AnimTweenData<TweenType>,
                duration: FrameCnt,
                setting: Partial<AnimationSetting> = {}){
        this.#staticData = staticData;
        this.#tweenData = tweenData;
        this.#duration = duration;
        
        this.#setting = mergeObj(AnimationPropertyCfg.defaultSetting, setting);
    }

    #getTweeenValue(range: TweenRange): number{
        let tweenFunc = range.tweenFunc? range.tweenFunc : this.#setting.tweenFunc;
        return range.begin +
               (range.end - range.begin) *
               tweenFunc(this.#progress/this.#duration);
    }
    
    get value(): StaticType & TweenType{
        let staticValue = Object.fromEntries(Object.entries(this.#staticData).map(([Key, value])=>[
            Key,
            (value as StaticRange<any>).during
        ])) as StaticType;
        let tweenValue = Object.fromEntries(Object.entries(this.#tweenData).map(([Key, value])=>[
            Key,
            this.#getTweeenValue(value)
        ])) as TweenType;
        return {...staticValue, ...tweenValue};
    }

    get valueEnd(): StaticType & TweenType{
        let staticValue = Object.fromEntries(Object.entries(this.#staticData).map(([Key, value])=>[
            Key,
            (value as StaticRange<any>).default
        ])) as StaticType;

        let property: 'begin'|'end' = this.#frameStep<0 ? 'begin':'end';
        let tweenValue = Object.fromEntries(Object.entries(this.#tweenData).map(([Key, value])=>[
            Key,
            value[property]
        ])) as TweenType;
        return {...staticValue, ...tweenValue};
    }

    nextFrame(): boolean{
        let nextFrameCnt = this.#progress + this.#frameStep;
        if (nextFrameCnt >= this.#duration || nextFrameCnt < 0){
            if (this.#setting.loop === true)
                this.reverse();
            else if (typeof this.#setting.loop === 'number' && this.#setting.loop > 0){
                this.#setting.loop-= 0.5;
                this.reverse();
            }
            else
                return false;
        }
        this.#progress = this.#progress + this.#frameStep;
        return true;
    }

    reset(): void{
        this.#progress = 0;
    }

    finish(): void{
        if (this.#frameStep<0)
            this.#progress = 0;
        else
            this.#progress = this.#duration;
    }

    reverse(): void{
        this.#frameStep = -this.#frameStep;
    }
}