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

    isCompleted() {
        return this.length() == 11;
    }

    index(i) {
        return this.selectedPath[i];
    }
}