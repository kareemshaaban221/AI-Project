function getClickedButton(target, notNeededChildElems = []) {

    if(notNeededChildElems.includes(target.tagName)){ // get btn element
        target = target.parentElement;
    }

    return target;

}

function addClickEvent(elems, handler) {
    for (let i = 0; i < elems.length; i++) {
        elems[i].addEventListener('click', handler);
    }
}

function findEdge(i, j, reverse = false) { // get path html element that link i with j

    let firstNode = nodes[i - 1];
    let secondNode = nodes[j - 1];

    //! testing
    // console.log('first node: ');
    // console.log(firstNode);
    // console.log('second node: ');
    // console.log(secondNode);

    if (firstNode.pathsArr.indexOf(j - 1) != -1) {
        return new Edge([firstNode, secondNode]);
    }

    if (!reverse) return findEdge(j, i, true);

    return new Edge(null);

}