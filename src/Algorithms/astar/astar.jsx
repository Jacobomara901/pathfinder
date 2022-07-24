function Astar(start, end){
    var openSet   = [];
    var closedSet = [];
    let path = [];
    let visitedNodes =[];
    openSet.push(start);
    //console.log(grid);



while (openSet.length > 0) {
    //assumption lowest index is the first one to begin with
    let lowestIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) {
        lowestIndex = i;
        
      }
    }
    
    let current = openSet[lowestIndex];
    visitedNodes.push(current);
    

    if (current === end) {
      let temp = current;
      path.push(temp);
      while (temp.parent) {
        path.push(temp.parent);
        temp = temp.parent;
      }
      console.log("DONE!");
      // return the traced path
      return {path, visitedNodes, error:"no path found"}
    }

    //remove current from openSet
    openSet.splice(lowestIndex, 1);
    //add current to closedSet
    closedSet.push(current);
   
    console.log(current.neighbours);


    let neighbours = current.neighbours;
    for (let j = 0; j < neighbours.length; j++) {
      let neighbour = neighbours[j];

      if (!closedSet.includes(neighbour) && !neighbour.isWall) {
        let possibleG = current.g + 1;

        if (!openSet.includes(neighbour) && !neighbour.isWall) {
          openSet.push(neighbour);
        } else if (possibleG >= neighbour.g) {
          continue;
        }

        neighbour.g = possibleG;
        neighbour.h = heuristic(neighbour, end);
        neighbour.f = neighbour.g + neighbour.h;
        neighbour.parent = current;
      }
    }
  }

  //no solution by default
return visitedNodes; 
}

export default Astar;

function heuristic(position0, position1) {
    let d1 = Math.abs(position1.row - position0.row);
    let d2 = Math.abs(position1.col - position0.col);
  
    return d1 + d2;
  }
