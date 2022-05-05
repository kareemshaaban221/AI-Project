class Path {
    selectedPath = [];

    constructor(path = []) {
        this.selectedPath = path;
    }

    init() {
        this.selectedPath = [];
        return true;
    }

    addNode(node) {
        return this.selectedPath.push(node);
    }

    firstNode() {
        return this.selectedPath[0];
    }

    lastNode() {
        return this.selectedPath[this.length() - 1];
    }

    length() {
        return this.selectedPath.length;
    }

    toString(delimiter) {
        return this.selectedPath.join(delimiter);
    }

    pathArray() {
        return this.selectedPath;
    }

    pathArray() {
        return this.selectedPath;
    }

    pathArrayZero() {
        return this.selectedPath.map(elem => elem - 1);
    }

    isCompleted() {
        return this.length() == nodes.length + 1;
    }

    index(i) {
        return this.selectedPath[i];
    }
}