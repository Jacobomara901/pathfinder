function Astar(startNode, endNode){
    let openSet = [];
    let closedSet = [];
    let path = [];
    let visitedNodes = [];

    openSet.push(startNode);
    while (openSet.length > 0) {
        let leastIndex = 0;
        for (let j=0; j < openSet.length; j++) 
        {
            if (openSet[j].f < openSet[leastIndex].f) 
            {
                leastIndex = j;
            }
        }

        let current = openSet[leastIndex];
        visitedNodes.push(current);
        if(current === endNode){
            let temp = current;
            path.push(temp);
            while(temp.previous){
                path.push(temp.previous);
                temp = temp.previous;
            }

            //console.log(path);
            return {path, visitedNodes};
            //console.log("Done, Path Found")
        }

        openSet = openSet.filter((elt) => elt !== current);
        closedSet.push(current);

        let neighbours = current.neighbours;
        for(let j = 0; j < neighbours.length; j++)
        {
            let neighbour = neighbours[j];
            if (!closedSet.includes(neighbour) && !neighbour.isWall){
                let tempG = current.g + 1;
                let newPath = false;
                if(openSet.includes(neighbour)){
                   if (tempG < neighbour.g) {
                    neighbour.g = tempG;
                    newPath = true;
                   }
                } else {
                   neighbour.g = tempG;
                   newPath = true;
                   openSet.push(neighbour);
                }

                if(newPath) {
                    neighbour.h = heuristic(neighbour, endNode);
                    neighbour.f = neighbour.g + neighbour.f;
                    neighbour.previous = current;
                  
                }
            }
        }
    }
    return {path, visitedNodes, error:"No Path Found!"}
}

// function heuristic(a,b) {
//     let d = Math.abs(a.col - a.row) + Math.abs(b.col - b.row);
//     return d;
// }

function heuristic(a,b) {
    let d = Math.abs(a.col - a.row) + Math.abs(b.col - b.row);
    return d;
}

export default Astar;