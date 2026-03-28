const GraphEdgeCfg = {
    get arrowLength(){return 15;},
    get arrowAngle(){return Math.PI/5;},
    get curveAngle(){return Math.PI/6;},
    get lineWidth(){return 3;}
}

const GraphNodeCfg = {
    get radius(){return 20;},
    get borderWidth(){return 5;}
}

export {GraphEdgeCfg, GraphNodeCfg};