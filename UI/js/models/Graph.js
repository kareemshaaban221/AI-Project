class Graph {
    graph = {};

    constructor(graph) {
        this.graph = graph;
    }

    costOf(path) {
        let cost = 0;
        for(let i = 0; i < path.length() - 1; i++) {
            cost += this.graph[path.index(i)][path.index(i+1)]; // current node and the next node cost.
        }

        return cost;
    }

    reset(path, ctx) {
        // reset nodes
        let elems = document.querySelectorAll('.graph .node');
        elems.forEach(elem => {
            (new Node(elem)).removeFromGraph();
        });

        // reset edges
        for(let i = 0; i < path.length() - 1; i++) {
            findEdge(path.index(i), path.index(i+1)).removeFromGraph(ctx);
        }

        path.init();
    }
}