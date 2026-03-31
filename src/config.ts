import {easeFunc} from "./animation.js";

const GraphEdgeCfg = {
    get arrowLength(){return 15;},
    get arrowAngle(){return Math.PI/5;},
    get curveAngle(){return Math.PI/3;},
    get lineWidth(){return 3;}
};

const GraphNodeCfg = {
    get defaultState(): {x: number, y: number, borderColor: 'black'}{return {x: 0, y: 0, borderColor: 'black'}},
    get radius(){return 20;},
    get borderWidth(){return 5;}
};

const AnimationPropertyCfg = {
    get defaultSetting(){return {tweenFunc: easeFunc, loop: false}}
};

const DrawContextCfg = {
    get defaultSize(){return {minWidth: 2000, minHeight: 1000}}
};

export {GraphEdgeCfg, GraphNodeCfg, AnimationPropertyCfg, DrawContextCfg};