class Edge {
    edge;

    constructor(edge) {
        this.edge = edge;
    }

    addToGraph() {
        return this.isExists() ? $(this.edge).addClass('active-path') : false;
    }

    removeFromGraph() {
        return $(this.edge).removeClass('active-path');
    }

    isExists() {
        return this.edge != null;
    }
}