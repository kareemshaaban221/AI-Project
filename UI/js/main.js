const graph = {
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
};


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
        let nodeNumber = clicked.children[0].innerHTML.trim();

        if( highlightPath(nodeNumber) ) { // if operation success
            cl.add('active-node');
            selectedPath.push(nodeNumber);
        }
    }

    if(selectedPath.length == 10) { // end point of the game
        let pathFromEndToBeginning = getPath( selectedPath[selectedPath.length - 1], selectedPath[0] );
        if( pathFromEndToBeginning ){
            let path = selectedPath.join('-');
            alert("The path you select is " + path);
        } else {
            alert('Invalid path for solving TSP problem!');
            resetGraph();
        }
    } else {
        if(!validPathExists()) {
            alert('There is no valid edges can be selected any more');
            resetGraph();
        }
    }

    // console.log(selectedPath); // for testing
    
}

function highlightPath(currentNode) {

    let nodesCount = selectedPath.length;
    if (!nodesCount) {
        return true;
    }

    let path = getPath(selectedPath[nodesCount - 1], currentNode);
    
    if (path) {
        path.classList.add('active-path');
        return true;
    } else {
        alert('No available paths to this node!');
        return false;
    }
    
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

    selectedPath = [];

}

function getPath (i, j) {

    let firstNode = Math.min(i, j);
    let secondNode = Math.max(i, j);
    return document.getElementById('path-'+firstNode+'-'+secondNode);

}

function measureCost () {

    let len = selectedPath.length;
    if (len == 10) {
        let cost = 0;
        for(let i = 0; i < len - 1; i++) {
            cost += graph[selectedPath[i]][selectedPath[i+1]]; // current node and the next node cost.
        }
        cost += graph[selectedPath[len - 1]][selectedPath[0]]; // cost of returning to first node
        alert('Your selected path cost equals: ' + cost);
    } else {
        alert('Finish the selection process, please!');
    }
    
}

function validPathExists() {

    let currentNode = selectedPath[selectedPath.length - 1] // current selected node
    , node = null, found = false;
    $('.node:not(.active-node)').each((i, elem) => {
        node = elem.children[0].innerHTML.trim();
        if(getPath(currentNode, node)) {
            found = true;
            return false; // break
        }
    });

    return found;

}

//////////////    programming theme btn     //////////////
$('#theme-btn').click((e) => {
    let clicked = e.target;
    if(clicked.tagName == 'I') {
        clicked = clicked.parentElement;
    }

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
});

////////////// paths on click //////////////
$('.path').each((i, elem) => {
    $(elem).click((e) => {
        let clicked = e.target;
        if(clicked.tagName == 'SPAN' || clicked.tagName == 'HR') {
            clicked = clicked.parentElement;
        }

        let path = clicked.id.split('-');
        path.shift();

        let pathCost = graph[path[0]][path[1]];
        alert('The clicked edge connect between ' + path.join('-') + ' and its cost is ' + pathCost);
    });
});