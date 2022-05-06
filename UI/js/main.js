let allBtns = nodes.map(elem => {
    return elem.item;
});

addClickEvent(allBtns, nodeClick); // helper function

function nodeClick(e) {

    let clicked = new Node(getClickedButton(e.target, ['SPAN'])); // helper function

    if (clicked.isSelected()) {
        alert('This node is already selected');
    } else {
        highlightPath(clicked) ?
            clicked.addTo(selectedPath) : alert('No available paths to this node!');
    }

    if (selectedPath.length() == nodes.length) { // end point of the game

        let edgeFromEndToBeginning = findEdge(selectedPath.lastNode(), selectedPath.firstNode());

        if (edgeFromEndToBeginning.addToGraph(ctx)) {

            selectedPath.addNode(selectedPath.firstNode());
            let path = selectedPath.toString('-');
            alert("The path you select is " + path);

        } else {
            alert('Invalid path for solving TSP problem!');
            graph.reset(selectedPath, ctx);
        }

    } else {
        if (!validNodeExists() && selectedPath.length() < nodes.length + 1) {
            alert('There is no valid nodes can be selected any more');
            graph.reset(selectedPath, ctx);
        }
    }

    // console.log(selectedPath); // for testing

}

function highlightPath(currentNode) {

    if (!selectedPath.length()) {
        return true;
    }

    let edge = findEdge(selectedPath.lastNode(), currentNode.label());

    return edge.addToGraph(ctx);

}

function measureCost() { // measure cost of the selected path

    if (selectedPath.isCompleted()) {
        let cost = calcCostPaths(selectedPath.pathArrayZero());
        alert('Your selected path cost equals: ' + cost);
    } else {
        alert('Finish the selection process, please!');
    }

}

function validNodeExists() { // check if there is a valid node can be selected or not

    let currentNode = selectedPath.lastNode() // current selected node
        ,
        node = null,
        found = false;
    $('.node:not(.active-node):not(.active-first-node)').each((i, elem) => {
        node = new Node(elem);
        if (findEdge(currentNode, node.label()).isExists()) {
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
    if (clicked.hasClass('btn-dark')) { // if the current theme is the default
        clicked.removeClass('btn-dark').addClass('btn-warning');
        $(document.body).css('background-color', '#222');
        $('.graph:first').addClass('bg-dark').removeClass('bg-aliceblue');
        $('.node').each((i, elem) => {
            $(elem).removeClass('border-secondary').addClass('border-light');
        });
        $('#resetBtn').removeClass('btn-outline-dark').addClass('btn-outline-light');
        $('.heading').each((i, e) => {
            $(e).addClass('text-light');
        });
        $('#waitingMsg').addClass('text-light');
        clicked.children().eq(0).addClass('d-none');
        clicked.children().eq(1).removeClass('d-none');
    } else { // if the current theme is dark
        clicked.removeClass('btn-warning').addClass('btn-dark');
        $(document.body).css('background-color', 'white');
        $('.graph:first').addClass('bg-aliceblue').removeClass('bg-dark');
        $('.node').each((i, elem) => {
            $(elem).removeClass('border-light').addClass('border-secondary');
        });
        $('#resetBtn').removeClass('btn-outline-light').addClass('btn-outline-dark');
        $('.heading').each((i, e) => {
            $(e).removeClass('text-light');
        });
        $('#waitingMsg').removeClass('text-light');
        clicked.children().eq(1).addClass('d-none');
        clicked.children().eq(0).removeClass('d-none');
    }
}

$('#resetBtn').click(() => graph.reset(selectedPath, ctx));
$('#resetBtn').tooltip();

$('#clearBtn').click(clear);
$('#clearBtn').tooltip();

$('#solveBtn').click(solve);

$('#measureCostBtn').click(measureCost);

function getInput(e) {
    graph.reset(selectedPath, ctx);
    clear();

    let input = document.getElementById('input');

    numNodes = input.value.trim();

    theBestEvre = { path: [], cost: Infinity };

    nodes = createNodeBefore(s, numNodes && numNodes <= 200 ? numNodes : 6);
    ///this part has changed by <Mohamed diaa>
    //
    paths = setAllpaths(nodes);
    // console.log(paths);
    pathsMap = comfarmPaths(nodes);
    drawPaths(nodes);
    //
    let allBtns = nodes.map(elem => {
        return elem.item;
    });

    addClickEvent(allBtns, nodeClick); // helper function
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach(elem => {
        elem.item.remove()
    });
}

let interval;
let secondsSpan = document.getElementById('secondsLeft');

function solve() {
    let p = createPopulation(paths, numNodes ? numNodes : 6);
    nextGeneration(p, 1000);

    $('#resetBtn').attr('disabled', true);
    $('#solveBtn').attr('disabled', true);
    $('#measureCostBtn').attr('disabled', true);
    $('#input').attr('disabled', true);
    $('#clearBtn').attr('disabled', true);

    $('#waitingMsg').removeClass('d-none');
    
    let timer = 9;
    interval = setInterval(() => {
        if(secondsSpan.innerHTML == 0) {
            stopSolvingProcess();
        } else {
            secondsSpan.innerHTML = timer;
            timer--;
        }
    }, 1000);
}

function stopSolvingProcess() {
    clearInterval(interval);
    $('#waitingMsg').addClass('d-none');

    $('#resetBtn').removeAttr('disabled');
    $('#solveBtn').removeAttr('disabled');
    $('#measureCostBtn').removeAttr('disabled');
    $('#input').removeAttr('disabled');
    $('#clearBtn').removeAttr('disabled');

    secondsSpan.innerHTML = 10;

    // stop the algorithm
    clearInterval(id);
}

$('#stopLink').click(() => {
    stopSolvingProcess();

    alert('The Best Path To Solving TSP Is : ' + selectedPath.toString())
});