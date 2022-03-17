let graph = new Graph(
    {
        1 : {2: 5, 8: 20, 7: 2},
        2 : {1: 5, 9: 5, 5: 2, 3: 5},
        3 : {2: 5, 7: 4, 4: 3, 6: 2},
        4 : {3: 3, 6: 5, 7: 2},
        5 : {2: 2, 7: 15, 10: 8, 8: 10},
        6 : {3: 2, 4: 5, 10: 12, 8: 5},
        7 : {1: 2, 5: 15, 3: 4, 4: 2},
        8 : {10: 2, 5: 10, 1: 20, 6: 5},
        9 : {2: 5, 10: 2},
        10: {5: 8, 6: 12, 8: 2, 9: 2}
    }
);


let allNodes = document.getElementsByClassName('node');

addClickEvent(allNodes, nodeClick); // helper function

let selectedPath = new Path();

function nodeClick (e) {

    let clicked = getClickedButton(e.target, ['SPAN']); // helper function
    
    if( clicked.isSelected() ) {
        alert('This node is already selected');
    } else {
        highlightPath(clicked) ? clicked.addTo(selectedPath) : alert('No available paths to this node!');
    }

    if(selectedPath.length() == 10) { // end point of the game

        let pathFromEndToBeginning = findEdge( selectedPath.lastNode(), selectedPath.firstNode() );

        if( pathFromEndToBeginning ){
            pathFromEndToBeginning.classList.add('active-path'); // hightlight the end path
            selectedPath.addNode(selectedPath.firstNode());
            let path = selectedPath.pathToString('-');
            alert("The path you select is " + path);
        } else {
            alert('Invalid path for solving TSP problem!');
            resetGraph();
        }

    } else {
        if(!validNodeExists() && selectedPath.length() < 11) {
            alert('There is no valid nodes can be selected any more');
            resetGraph();
        }
    }

    // console.log(selectedPath); // for testing
    
}

function highlightPath(currentNode) {
    
    if (!selectedPath.length()) {
        return true;
    }

    let path = findEdge(selectedPath.lastNode(), currentNode.label());
    
    if (path) {
        path.classList.add('active-path');
        return true;
    } else {
        return false;
    }
    
}

function resetGraph () {

    // reset nodes
    let elems = $('.graph .node');
    let len = elems.length;
    for (let i = 0; i < len; i++) {
        let elem = elems[i];
        $(elem).removeClass('active-node active-first-node');
    }

    // reset edges
    elems = $('.graph .path');
    len = elems.length;
    for (let i = 0; i < len; i++) {
        let elem = elems[i];
        $(elem).removeClass('active-path');
    }

    return selectedPath.init();

}

function findEdge (i, j) { // get path html element that link i with j

    let firstNode = Math.min(i, j);
    let secondNode = Math.max(i, j);
    return document.getElementById('path-'+firstNode+'-'+secondNode);

}

function measureCost () { // measure cost of the selected path

    if (selectedPath.isCompleted()) {
        let cost = graph.costOf(selectedPath);
        alert('Your selected path cost equals: ' + cost);
    } else {
        alert('Finish the selection process, please!');
    }
    
}

function validNodeExists() { // check if there is a valid node can be selected or not

    let currentNode = selectedPath.lastNode() // current selected node
    , node = null, found = false;
    $('.node:not(.active-node):not(.active-first-node)').each((i, elem) => {
        node = elem.children[0].innerHTML.trim();
        if(findEdge(currentNode, node)) {
            found = true;
            return false; // break
        }
    });

    return found;

}

//////////////    programming theme btn     //////////////
$('#theme-btn').click(changeTheme);

function changeTheme(e) {
    let clicked = getClickedButton(e.target, ['I']);

    clicked = $(clicked);
    if(clicked.hasClass('btn-dark')){ // if the current theme is the default
        clicked.removeClass('btn-dark').addClass('btn-light');
        $(document.body).css('background-color', '#222');
        $('.graph:first').addClass('bg-dark').removeClass('bg-aliceblue');
        $('.node').each( (i, elem) => {
            $(elem).removeClass('border-secondary').addClass('border-light text-light');
        } );
        $('#reset-btn').removeClass('btn-outline-dark').addClass('btn-outline-light');
        $('#heading').addClass('text-light');
    } else { // if the current theme is dark
        clicked.removeClass('btn-light').addClass('btn-dark');
        $(document.body).css('background-color', 'white');
        $('.graph:first').addClass('bg-aliceblue').removeClass('bg-dark');
        $('.node').each( (i, elem) => {
            $(elem).removeClass('border-light text-light').addClass('border-secondary');
        } );
        $('#reset-btn').removeClass('btn-outline-light').addClass('btn-outline-dark');
        $('#heading').removeClass('text-light');
    }
}

////////////// paths on click //////////////
$('.path').each((i, elem) => {
    $(elem).click((e) => {
        let clicked = getClickedButton(e.target, ['SPAN', 'I']);

        let path = clicked.id.split('-');
        path.shift();

        let pathCost = graph[path[0]][path[1]];
        alert('The clicked edge connect between ' + path.join('-') + ' and its cost is ' + pathCost);
    });
});