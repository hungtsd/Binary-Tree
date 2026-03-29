import {AngleRadiant, type Cord, Vector} from './math.js';
import { DrawContext } from './draw.js';
import {GraphEdgeCfg, GraphNodeCfg} from './config.js';
import {AnimationProperty} from './animation.js';

const DefaultCord = {x: 0, y: 0};

class Node{
    key: number = 0;

    draw(drawObj: DrawContext): void {}
    
}

export class BoxNode extends Node{

}

type GraphNodeState = {
    x: number,
    y: number,
    scale: number
}

export class GraphNode extends Node{
    edge: GraphEdge | null = null;
    state: GraphNodeState = {x: 0, y: 0, scale: 0};
    animObj: AnimationProperty<Partial<GraphNodeState>> | null = null;

    set animation(anim: AnimationProperty<Partial<GraphNodeState>> | null){
        if (this.animObj){
            this.animObj.finish();
            this.animObj.set(this.state);
        }
        this.animObj = anim;
    }

    update(): void{
        if (!this.animObj)
            return;
        this.animObj.set(this.state);

        if (!this.animObj.nextFrame())
            this.animObj = null;
    }

    draw(drawObj: DrawContext): void{
        drawObj.circle(this.state, GraphNodeCfg.radius, GraphNodeCfg.borderWidth, 'black', 'white');
    }
}

type GraphEdgeState = {
    curve: boolean,
    showArrow: boolean
}

export class GraphEdge{
    outNode: GraphNode;
    inNode:  GraphNode;
    state: GraphEdgeState = {
        showArrow: true,
        curve: false
    };

    outPos: Cord = DefaultCord;
    inPos:  Cord = DefaultCord;
    centerPos: Cord = DefaultCord;

    arrowPosLft: Cord = DefaultCord;
    arrowPosRht: Cord = DefaultCord;

    constructor(outNode: GraphNode, inNode: GraphNode){
        this.outNode = outNode;
        this.inNode = inNode;
    }

    setArrow(angle: AngleRadiant): void{
        this.arrowPosLft = Vector.add(
            Vector.polar(
                angle + GraphEdgeCfg.arrowAngle,
                GraphEdgeCfg.arrowLength
            ),
            this.inPos
        );
        this.arrowPosRht = Vector.add(
            Vector.polar(
                angle - GraphEdgeCfg.arrowAngle,
                GraphEdgeCfg.arrowLength
            ),
            this.inPos
        );
    }

    setPosStraight(): void{
        this.outPos = Vector.add(
            Vector.sub(
                this.inNode.state,
                this.outNode.state
            ).scale(GraphNodeCfg.radius),
            this.outNode.state
        );
        this.inPos  = Vector.add(
            Vector.sub(
                this.outNode.state,
                this.inNode.state
            ).scale(GraphNodeCfg.radius),
            this.inNode.state
        );

        if (!this.state.showArrow)
            return;

        this.setArrow(Vector.sub(
                this.outNode.state,
                this.inNode.state
            ).getRotation()
        );
    }

    setPosCurve(): void{
        let vect = Vector.sub(this.inNode.state, this.outNode.state);

        this.centerPos = Vector.add(
            Vector.polar(
                vect.getRotation() + GraphEdgeCfg.curveAngle,
                vect.getLength() / 2 / Math.cos(GraphEdgeCfg.curveAngle)
            ),
            this.outNode.state
        );

        this.outPos = Vector.add(
            Vector.polar(
                Vector.sub(
                    this.centerPos,
                    this.outNode.state
                ).getRotation() - Math.PI/2,
                GraphNodeCfg.radius
            ),
            this.outNode.state
        );
        this.inPos  = Vector.add(
            Vector.polar(
                Vector.sub(
                    this.centerPos,
                    this.inNode.state
                ).getRotation()  + Math.PI/2,
                GraphNodeCfg.radius
            ),
            this.inNode.state
        );

        if (!this.state.showArrow)
            return;

        this.setArrow(Vector.sub(
                this.centerPos,
                this.inPos
            ).getRotation() + Math.PI/2
        );
    }

    draw(drawObj: DrawContext): void{
        if (this.state.curve){
            this.setPosCurve();

            let angle1 = Vector.sub(this.outPos, this.centerPos).getRotation(),
                angle2 = Vector.sub(this.inPos,  this.centerPos).getRotation();
            
            if ((angle1 < angle2 && angle2 - angle1 < Math.PI) ||
                (angle1 > angle2 && angle1 - angle2 > Math.PI))
                drawObj.arc(this.centerPos,
                            Vector.sub(this.outPos, this.centerPos).getLength(),
                            angle1,
                            angle2,
                            GraphEdgeCfg.lineWidth,
                            'black');
        }
        else{
            this.setPosStraight();
            drawObj.line(this.outPos, this.inPos, 'black', GraphEdgeCfg.lineWidth);
        }
        
        if (this.state.showArrow){
            drawObj.line(this.inPos, this.arrowPosLft, 'red', GraphEdgeCfg.lineWidth);
            drawObj.line(this.inPos, this.arrowPosRht, 'green', GraphEdgeCfg.lineWidth);
        }
    }
}