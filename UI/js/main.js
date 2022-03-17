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

    let clicked = new Node(getClickedButton(e.target, ['SPAN'])); // helper function

    if( clicked.isSelected() ) {
        alert('This node is already selected');
    } else {
        highlightPath(clicked) ? clicked.addTo(selectedPath) : alert('No available paths to this node!');
    }

    if(selectedPath.length() == 10) { // end point of the game

        let edgeFromEndToBeginning = findEdge( selectedPath.lastNode(), selectedPath.firstNode() );

        if( edgeFromEndToBeginning.addToGraph() ){

            selectedPath.addNode(selectedPath.firstNode());
            let path = selectedPath.pathToString('-');
            alert("The path you select is " + path);

        } else {
            alert('Invalid path for solving TSP problem!');
            graph.reset(selectedPath);
        }

    } else {
        if(!validNodeExists() && selectedPath.length() < 11) {
            alert('There is no valid nodes can be selected any more');
            graph.reset(selectedPath);
        }
    }

    // console.log(selectedPath); // for testing
    
}

function highlightPath(currentNode) {
    
    if (!selectedPath.length()) {
        return true;
    }

    let edge = findEdge(selectedPath.lastNode(), currentNode.label());
    
    return edge.addToGraph();
    
}

function findEdge (i, j) { // get path html element that link i with j

    let firstNode = Math.min(i, j);
    let secondNode = Math.max(i, j);
    return new Edge( document.getElementById('path-'+firstNode+'-'+secondNode) );

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
        let node = new Node(elem);
        if( findEdge(currentNode, node.label()).isExists() ) {
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
        $('.heading').each( (i, e) => {
            $(e).addClass('text-light');
        });
    } else { // if the current theme is dark
        clicked.removeClass('btn-light').addClass('btn-dark');
        $(document.body).css('background-color', 'white');
        $('.graph:first').addClass('bg-aliceblue').removeClass('bg-dark');
        $('.node').each( (i, elem) => {
            $(elem).removeClass('border-light text-light').addClass('border-secondary');
        } );
        $('#reset-btn').removeClass('btn-outline-light').addClass('btn-outline-dark');
        $('.heading').each( (i, e) => {
            $(e).removeClass('text-light');
        });
    }
}

////////////// paths on click //////////////
$('.path').each((i, elem) => {
    $(elem).click((e) => {
        let clicked = getClickedButton(e.target, ['SPAN', 'I']);

        let path = clicked.id.split('-');
        path.shift();

        let pathCost = graph.costOf(new Path([path[0], path[1]]));
        alert('The clicked edge connect between ' + path.join('-') + ' and its cost is ' + pathCost);
    });
});