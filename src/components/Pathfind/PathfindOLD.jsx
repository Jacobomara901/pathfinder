import React, {useEffect, useState} from 'react'
import Node from '../Node/Node';
import './Pathfind.css';
import Astar from '../../Algorithms/astar/astar';

const rows = 15;
const cols = 15;

const NODE_START_ROW = 0
const NODE_START_COL = 0
const NODE_END_ROW = rows - 1;
const NODE_END_COL = cols - 1;


const Pathfind = () => {
  const [Grid, setGrid] = useState([]);
  const [Path, setPath] = useState([]);
  const [VisitedNodes, setVisitedNodes] = useState([])


  useEffect(() => {
    initialiseGrid();
  }, [])
  

  //creates the grid 
  const initialiseGrid = () => {
    const grid = new Array(rows);  
    
    for (let i=0; i < rows; i++){
            grid[i] = new Array(cols);
        }
    createSpot(grid);
    setGrid(grid);
    addNeighbours(grid);
         
    const startNode = grid[NODE_START_ROW][NODE_START_COL];
    const endNode = grid[NODE_END_ROW][NODE_END_COL];
    let path = Astar(startNode, endNode);
    setPath(path.path);
    setVisitedNodes(path.visitedNodes);
    
    }; 
    
//creates the spot 
  const createSpot = (grid) => {
        for (let i=0; i < rows; i++){
            for (let j=0; j < cols; j++){
                grid[i][j] = new Spot(i,j);
            }
        }
    };

    //add Neuighbours
    const addNeighbours = (grid) => {
        for (let i = 0; i<rows; i++)
        {
            for (let j =0; j<cols; j++)
            {
                grid[i][j].addneighbours(grid)
            }
        }
    }
//SPOT COINSTRUCTOR

    function Spot(i,j){
        this.x = i;
        this.y = j;
        this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
        this.isEnd = this.x === NODE_END_ROW && this.y ===NODE_END_COL;
        this.g = 0;
        this.f = 0;
        this.h = 0;
        this.neighbours = [];
        this.previous = undefined;
        this.isWall = false;
        this.addneighbours = function(grid)
        {
            let i = this.x;
            let j = this.y;
            if (i > 0) this.neighbours.push(grid[i-1][j]);
            if (i < rows - 1) this.neighbours.push(grid[i+1][j]);
            if (j > 0) this.neighbours.push(grid[i][j-1]);
            if (j < cols - 1) this.neighbours.push(grid[i][j+1]);
        };
    }

   

//GRID WITH NODE
    const gridWithNode = (
        <div>
            {Grid.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className='rowWrapper'>
                        {row.map((col,colIndex) => {
                            const { isStart, isEnd, isWall } = col;
                            return <Node key= {colIndex} isStart= {isStart} isEnd = {isEnd} row={rowIndex} col={colIndex} isWall={isWall}/>;                   
                        })}
                        
                    </div>
                );
            })}
        </div>
    );    

    const visualiseShortestPath = (shortestPathNodes) => {
        for (let i = 0; i < shortestPathNodes.length; i++){
            setTimeout(() => {
                const node = shortestPathNodes[i];
                document.getElementById(`node-${node.x}-${node.y}`).className =
                "node node-shortest-path";
            }, 10 * i)
        }
    };

    const visualisePath = () => {
        for (let i = 0; i <= VisitedNodes.length; i++){
           if (i === VisitedNodes.length){
            setTimeout(() => {
                visualiseShortestPath(Path);
            }, 20 * i);
           } else {
            setTimeout(() => {
                const node = VisitedNodes[i];
                document.getElementById(`node-${node.x}-${node.y}`).className =
                "node node-visited";
            }, 20 * i);
           }
        } 

    }



    console.log(Path);
  return (
    <div className = 'wrapper'>
     <button onClick={visualisePath}>Visualise Path</button>
     <h1>PATHFIND</h1>
     {gridWithNode}
    </div>
  );
};

export default Pathfind;