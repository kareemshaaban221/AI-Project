let allNodes = document.getElementsByClassName('node');

for (let i = 0; i < allNodes.length; i++) {
    allNodes[i].addEventListener('click', nodeClick);
}

let selectedPath = [];

function nodeClick (e) {

    let clicked = e.target;
    if(clicked.tagName == 'SPAN'){ // get btn element
        clicked = clicked.parentElement;
    }
    
    let cl = clicked.classList;
    if(cl.contains('active-node')) {
        alert('This node is already selected');
    } else {
        cl.add('active-node');
        selectedPath.push( clicked.children[0].innerHTML.trim() );

        highlightPaths();
    }

    if(selectedPath.length == 10) {
        let path = selectedPath.toString();
        alert("The path you select is " + path);
        resetGraph();
    }

    console.log(selectedPath);
    
}

function highlightPaths () {
    let nodesCount = selectedPath.length;
    if(nodesCount == 1) {
        return;
    }


    let firstNode = Math.min(selectedPath[nodesCount - 1], selectedPath[nodesCount - 2]);
    let secondNode = Math.max(selectedPath[nodesCount - 1], selectedPath[nodesCount - 2]);


    $('#path-'+firstNode+'-'+secondNode).addClass('active-path'); 
}

function resetGraph () {

    // reset nodes
    let elems = $('.graph .node');
    let len = elems.length;
    for (let i = 0; i < len; i++) {
        let elem = elems[i];
        elem.classList.remove('active-node');
    }

    // reset edges
    elems = $('.graph .path');
    len = elems.length;
    for (let i = 0; i < len; i++) {
        let elem = elems[i];
        elem.classList.remove('active-path');
    }

}