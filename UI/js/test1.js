let numNodes = 0;
let theBestEvre = { path: [], cost: Infinity };
let graphContainer = document.querySelector('.graph');

let nodesContainer = document.getElementById('nodesContainer');

let s = document.querySelector(".myForm");
let nodes = createNodeBefore(s, numNodes ? numNodes : 6);

canvas.width = 1000;
canvas.height = 400;

// setPathsToNode(nodes);
paths = setAllpaths(nodes);
pathsMap = comfarmPaths(nodes);
drawPaths(nodes);

function createNodeBefore(element, numOfelemnts) { // R
    var nodes = [];
    let w = function() { return (Math.floor(Math.random() * 350) + 25); };
    let h = function() { return (Math.floor(Math.random() * 1000) + 25); };
    for (var i = 0; i < numOfelemnts; i++) {
        var node = {
            index: i,
            item: document.createElement("button"),
            width: w(),
            hight: h(),
            pathsArr: []
        };
        nodes.push(node);
    }
    /**reducing conjction between nodes */
    for (let i = 0; i < nodes.length; i++) {
        for (let y = nodes.length - 1; i < 0; i--) {
            if (nodes[i].item != nodes[y].item) {
                var wdistancen = nodes[i].width - nodes[y].width;
                var hdistancen = nodes[i].hight - nodes[y].hight;
                if (wdistancen < 100) {
                    nodes[i].width += 50;
                    nodes[y].width -= 50;
                }
                if (hdistancen < 100) {
                    nodes[i].hight += 50;
                    nodes[y].hight -= 50;
                }
            }
        }
    }
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].item.setAttribute('class', 'rounded-circle node btn btn-outline-primary border-secondary p-2');
        nodes[i].item.innerText = i + 1;
        nodes[i].item.setAttribute('style', "position: absolute; top: " + (nodes[i].width - 25) + "px;left: " + (nodes[i].hight - 25) + "px");
        nodesContainer.appendChild(nodes[i].item);
    }
    return [...nodes];
}

function createArrayPaths(nodes) { // R
    /**you have to make nodes before useing this function */
    /*creat random num act as allowed number of paths */
    var numOfPaths = Math.floor((Math.random() * nodes.length)) + 2;
    var paths = [];
    for (let i = 0; i < numOfPaths; i++) {
        var targetPath = Math.floor((Math.random() * nodes.length));
        paths.push(targetPath);
    }
    /**make sure ther is no dublicated path for single node */
    paths = paths.filter((values, index, arr) => arr.indexOf(values) == index);
    return paths
}

function setAllpaths(nodes) { // R
    var paths = [];
    for (let i = 0; i < nodes.length; i++) {
        paths.push(i);
    }
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].pathsArr = [...paths]; //deepCopy
    }
    return [...paths]
}

// function setPathsToNode(nodes) {
//     for (let i = 0; i < nodes.length; i++) {
//         var paths = createArrayPaths(nodes);
//         nodes[i].pathsArr = paths;
//     }
// }

function comfarmPaths(nodes) {
    /**used after using setPathsToNode function */
    //*create pathsMap that Consisting of [first node , next node]  */
    var pathsMap = [];
    var temp = [0, 0];
    for (let i = 0; i < nodes.length; i++) {
        for (let y = 0; y < nodes[i].pathsArr.length; y++) {
            temp[0] = i;
            temp[1] = nodes[i].pathsArr[y];
            temp.sort(function(a, b) { return a - b }); //to sort nunmbers more than 2 digits 
            pathsMap.push(temp.slice());
        }

    }
    var dublicatedPaths = showDublicateArray(pathsMap); /////this finally solvid "Let's celebrate🎉"
    var dublicatedPathssame = pathsMap.filter((values, index, arr) => arr[index][0] == arr[index][1]);
    //make function to remove the (dublicatedPaths),(dublicatedPathssame) from nodes array////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    cleneraPaths(nodes, dublicatedPaths);
    cleneraPaths(nodes, dublicatedPathssame);
    pathsMap = cleneraPathsMap(pathsMap, dublicatedPaths);
    pathsMap = cleneraPathsMap(pathsMap, dublicatedPathssame);
    return pathsMap;
}

function drawPaths(nodes) {
    var indexOfNextNode;
    for (let i = 0; i < nodes.length; i++) {
        for (let y = 0; y < nodes[i].pathsArr.length; y++) {
            indexOfNextNode = nodes[nodes[i].pathsArr[y]];
            //console.log('next node: ' + indexOfNextNode.item.innerHTML);
            ctx.beginPath();
            ctx.moveTo(nodes[i].hight - 25, nodes[i].width);
            ctx.lineTo(indexOfNextNode.hight - 25, indexOfNextNode.width);
            ctx.strokeStyle = 'royalblue';
            ctx.lineWidth = 4;
            ctx.stroke();
        }
    }
}

function showDublicateArray(pathsMap) {
    var dublicatedPaths = [];
    for (let i = 0; i < pathsMap.length; i++) {
        var temp = pathsMap[i];
        for (let y = i; y < pathsMap.length; y++) {
            if ((temp[0] == pathsMap[y][0]) && (temp[1] == pathsMap[y][1]) && (i != y)) {
                dublicatedPaths.push(temp);
            }
        }
    }
    return dublicatedPaths;
}

function cleneraPathsMap(array, removedfirstitemarray) { //remove 2nd operand array from 1th operand //
    for (let i = 0; i < array.length; i++) {
        for (let y = 0; y < removedfirstitemarray.length; y++) {
            if (array[i] === removedfirstitemarray[y]) {
                array[i] = null;
            }
        }
    }
    array = array.filter((item) => {
        return item != null;
    })
    return array;
}

function cleneraPaths(node, paths) { // used as subfunction to remove repeted paths in nodes//
    for (let i = 0; i < paths.length; i++) {
        var indexOfItem = node[paths[i][0]].pathsArr.indexOf(paths[i][1]);
        node[paths[i][0]].pathsArr[indexOfItem] = null;
        node[paths[i][0]].pathsArr = node[paths[i][0]].pathsArr.filter((item) => {
            return item != null;
        })
    }
}
//////////////////////////////Genatic Algorithm/////////////////////////////////////////////////////////////////////////////
function crosOver(pos, path1, path2) { //R general crosover function//
    var temp;
    for (let i = 0; i < path1.path.length; i++) {
        do {
            if (i < pos) {
                path1.path[i] = path1.path[i];
                path2.path[i] = path2.path[i];
            } else {
                temp = path1.path[i];
                path1.path[i] = path2.path[i];
                path2.path[i] = temp;
            }
            pos--;
        }
        while (!((isGoodPath(path1.path)) && (isGoodPath(path2.path))) && pos == 0)
    }
    path1.path = [...path1.path];
    path2.path = [...path2.path];
    path1.cost = calcCostPaths([...path1.path]);
    path2.cost = calcCostPaths([...path2.path]);
    return [path1, path2];
}

function isGoodPath(path) {
    l = path.length;
    path = path.filter((values, index) => path.indexOf(values) == index);
    if (path.length == l) {
        return true;
    } else {
        return false
    }
}

function crosOverUntill(pathsMap, arr1, arr2) { //R make sure every offspring generated is valid in map //
    var t1 = [];
    var t2 = [];
    var pos = arr1.length;
    do {
        pos--;
        t1 = [...arr1];
        t2 = [...arr2];
        crosOver(pos, t1, t2);

    }
    while (!(verfiyPath(pathsMap, arr1) && verfiyPath(pathsMap, arr2)))
    return [t1, t2];

}

function verfiyPath(pathsMap, z) { // R verfiy if is there path between two nodes
    var b1, b2, c = [];

    for (let i = 0; i < z.length - 1; i++) {
        for (let y = 0; y < pathsMap.length; y++) {
            // for example if pathsmap have array [3,5] then there is path from (3 --> 5) and (5--> 3) 
            b1 = z[i] == pathsMap[y][0] && z[i + 1] == pathsMap[y][1];
            b2 = z[i + 1] == pathsMap[y][0] && z[i] == pathsMap[y][1];
            if (b1 || b2) {
                c.push(true);
                console.log("There is bath :" + z[i] + " --> " + z[i + 1])
            }
        }
    }
    if ((z.length - 1) == c.length) {
        return true
    } else { return false }
}


function createPopulation(paths, numOfPopulation) { //R

    // console.log(numOfPopulation);
    // console.log(paths);
    var genome, shuffledArray, p = [];
    for (let i = 0; i < numOfPopulation; i++) {
        genome = { path: [], cost: 0 };
        shuffledArray = [];
        do {
            shuffledArray = paths.sort((a, b) => 0.5 - Math.random());
            shuffledArray.filter((item, index) => shuffledArray.indexOf(item) !== index);
        }
        while (shuffledArray.length != paths.length);

        genome.path = shuffledArray;
        genome.cost = calcCostPaths(shuffledArray);
        p.push(genome);
    }
    return p;

}

function calcCost2node(node1, node2) { //R
    x = (Math.pow((node1.width - node2.width), 2)) + (Math.pow((node1.hight - node2.hight), 2))
    return Math.sqrt(x);
}

function calcCostPaths(path) { //R
    var sum = 0;
    for (let i = 0; i < path.length - 1; i++) {
        sum += calcCost2node(nodes[path[i]], nodes[path[i + 1]]);
    }

    sum += calcCost2node(nodes[path[0]], nodes[path[path.length - 1]]);

    return Math.floor(sum);
}

function mutatour(path) { //R
    var indexA = Math.floor(path.path.length * Math.random());
    var indexB = Math.floor(path.path.length * Math.random());
    var temp = path.path[indexA];
    path.path[indexA] = path.path[indexB];
    path.path[indexB] = temp;
    path.cost = calcCostPaths(path.path);
    return path
}

function findFitest(p) { //R
    fitest = { path: [], cost: Infinity };
    for (let i = 0; i < p.length; i++) {
        if (p[i].cost < fitest.cost) {
            fitest = p[i];
        }
    }
    return fitest
}

let id;

function nextGeneration(p, numOfGeneration) {

    let i = 0;
    id = setInterval(() => {

        graph.reset(selectedPath, ctx);

        fitest = findFitest(p);
        
        x = mutatour(fitest);
        var temp = p[p.indexOf(fitest)];
        p[p.indexOf(fitest)] = p[0];
        p[0] = temp;

        if (p[0].cost < theBestEvre.cost) {
            theBestEvre.cost = p[0].cost;
            theBestEvre.path = [...p[0].path];
        }

        // console.log(theBestEvre);

        // adding the first node the selectedPath array
        (new Node(nodes[theBestEvre.path[0]].item)).addTo(selectedPath);

        for (y = 0, firstNode = null, secondNode = null; y < theBestEvre.path.length - 1; y++) {

            // get the actual value in the node
            firstNode = nodes[theBestEvre.path[y]].item;
            secondNode = nodes[theBestEvre.path[y + 1]].item;

            firstNode = new Node(getClickedButton(firstNode));
            secondNode = new Node(getClickedButton(secondNode));

            secondNode.addTo(selectedPath);

            let edge = findEdge(firstNode.label(), secondNode.label()); // get edge

            edge.addToGraph(ctx);

        }

        // adding the first node the selectedPath array to close the solution
        findEdge(theBestEvre.path[0] + 1, theBestEvre.path[y] + 1).addToGraph(ctx);
        (new Node(nodes[theBestEvre.path[0]].item)).addTo(selectedPath);

        // console.log(theBestEvre.path + "");

        if(i >= numOfGeneration - 1){
            clearInterval(id);

            alert('The Best Path To Solving TSP Is : ' + selectedPath.toString())
        }

        i++;

        console.log(theBestEvre.cost);

    }, 10);
}