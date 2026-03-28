import {type Cord, Vector, addVect, subVect} from './math.js';
import { DrawContext } from './draw.js';
import {GraphEdgeCfg, GraphNodeCfg} from './config.js';

class Node{

}

export class BoxNode extends Node{

}

export class GraphNode extends Node{
    edge: GraphEdge | null = null;
    pos: Cord = new Vector;

    draw(drawObj: DrawContext): void{
        drawObj.circle(this.pos, GraphNodeCfg.radius, GraphNodeCfg.borderWidth, 'black', 'white');
    }
}

export class GraphEdge{
    outNode: GraphNode;
    inNode:  GraphNode;
    showArrow: boolean = true;
    curve:     boolean = true;

    outPos: Cord = new Vector;
    inPos:  Cord = new Vector;
    centerPos: Cord = new Vector;

    arrowPosLft: Cord = new Vector;
    arrowPosRht: Cord = new Vector;

    constructor(outNode: GraphNode, inNode: GraphNode){
        this.outNode = outNode;
        this.inNode = inNode;
    }

    setArrow(angle: number): void{
        let arrowVectLft = new Vector,
            arrowVectRht = new Vector;
        arrowVectLft.setAngle(angle + GraphEdgeCfg.arrowAngle);
        arrowVectRht.setAngle(angle - GraphEdgeCfg.arrowAngle);

        arrowVectLft.setLength(GraphEdgeCfg.arrowLength);
        arrowVectRht.setLength(GraphEdgeCfg.arrowLength);

        this.arrowPosLft = addVect(this.inPos, arrowVectLft);
        this.arrowPosRht = addVect(this.inPos, arrowVectRht);
    }

    setPosStraight(): void{
        let outVect = subVect(this.inNode.pos, this.outNode.pos),
            inVect  = subVect(this.outNode.pos, this.inNode.pos);

        outVect.setLength(GraphNodeCfg.radius);
        inVect.setLength( GraphNodeCfg.radius);

        this.outPos = addVect(outVect, this.outNode.pos);
        this.inPos  = addVect(inVect,  this.inNode.pos);

        if (!this.showArrow)
            return;

        this.setArrow(subVect(this.outNode.pos, this.inNode.pos).getRotation());
    }

    setPosCurve(): void{
        let vect = subVect(this.inNode.pos, this.outNode.pos),
            length = vect.getLength(),
            rotation = vect.getRotation(),
            centerVect = new Vector;
        
        centerVect.setAngle(rotation + GraphEdgeCfg.curveAngle);
        centerVect.setLength(length / 2 / Math.cos(GraphEdgeCfg.curveAngle));

        this.centerPos = addVect(centerVect, this.outNode.pos);

        let outVect = subVect(this.centerPos, this.outNode.pos),
            inVect  = subVect(this.centerPos, this.inNode.pos);

        outVect.setAngle(outVect.getRotation() - Math.PI/2);
        inVect.setAngle( inVect.getRotation()  + Math.PI/2);

        outVect.setLength(GraphNodeCfg.radius);
        inVect.setLength( GraphNodeCfg.radius);

        this.outPos = addVect(outVect, this.outNode.pos);
        this.inPos  = addVect(inVect,  this.inNode.pos);

        if (!this.showArrow)
            return;

        this.setArrow(subVect(this.centerPos, this.inPos).getRotation() + Math.PI/2);
    }

    draw(drawObj: DrawContext): void{
        if (subVect(this.outNode.pos, this.inNode.pos).getLength() <= GraphNodeCfg.radius*2)
            return;

        if (this.curve){
            this.setPosCurve();

            drawObj.arc(this.centerPos,
                        subVect(this.outPos, this.centerPos).getLength(),
                        subVect(this.outPos, this.centerPos).getRotation(),
                        subVect(this.inPos,  this.centerPos).getRotation(),
                        GraphEdgeCfg.lineWidth,
                        'black');
        }
        else{
            this.setPosStraight();
            drawObj.line(this.outPos, this.inPos, 'black', GraphEdgeCfg.lineWidth);
        }

        

        
        if (this.showArrow){
            drawObj.line(this.inPos, this.arrowPosLft, 'red', GraphEdgeCfg.lineWidth);
            drawObj.line(this.inPos, this.arrowPosRht, 'green', GraphEdgeCfg.lineWidth);
        }
    }
}