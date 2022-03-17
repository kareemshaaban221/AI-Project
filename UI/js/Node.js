class Node {
    node;

    constructor(node) {
        this.node = node;
    }

    isSelected() {
        return $(this.node).hasClass('active-node') || $(this.node).hasClass('active-first-node');
    }

    label() {
        return this.node.children[0].innerHTML.trim();
    }

    addTo(path) {
        let isTheFirstNode = !path.length();
        isTheFirstNode ? $(this.node).addClass('active-first-node') : $(this.node).addClass('active-node');

        path.addNode( this.label() );
    }
}