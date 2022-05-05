class Edge {
    edge = [];

    constructor(edge) {
        if(!edge) edge = [];
        this.edge = edge;
    }

    firstNode() {
        return this.edge.length ? this.edge[0] : false;
    }

    secondNode() {
        return this.edge.length ? this.edge[1] : false;
    }

    addToGraph(ctx) {
        return this.edge.length ? this.draw(ctx, 'red', 2) : false;
    }

    removeFromGraph(ctx) {
        return this.edge.length ? this.draw(ctx, 'royalblue', 5) : false;
    }

    isExists() {
        return this.edge.length != 0;
    }

    draw(ctx, color, lineWidth) {
        if(!this.edge.length) return false; // precondition
        
        ctx.beginPath();
        ctx.moveTo(this.firstNode().hight - 25, this.firstNode().width);
        ctx.lineTo(this.secondNode().hight - 25, this.secondNode().width);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.stroke();

        return true;
    }
}