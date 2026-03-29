import {easeFunc} from "./animation.js";

const GraphEdgeCfg = {
    get arrowLength(){return 15;},
    get arrowAngle(){return Math.PI/5;},
    get curveAngle(){return Math.PI/3;},
    get lineWidth(){return 3;}
};

const GraphNodeCfg = {
    get radius(){return 20;},
    get borderWidth(){return 5;}
};

const AnimationPropertyCfg = {
    get defaultSetting(){return {tweenFunc: easeFunc, loop: false}}
};

export {GraphEdgeCfg, GraphNodeCfg, AnimationPropertyCfg};