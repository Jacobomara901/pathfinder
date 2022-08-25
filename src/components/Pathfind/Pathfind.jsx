import React, { Component } from "react";
import Node from '../Node/Node';
import './Pathfind.css';
import Astar from '../../Algorithms/astar/astar';
import { dijkstra, getNodesInShortestPathOrder } from "../../Algorithms/dijkstra/dijkstra";

export default class Pathfind extends Component {
    constructor(){
        super();
        const rowsNumber = 20;
        const colsNumber = 20;
        const thirdOfRows = Math.round(rowsNumber/3);
        const thirdOfCols = Math.round(colsNumber/3);
        this.state = {
            rows: colsNumber,
            cols: rowsNumber,

            grid: [],
            path: [],
            visitedNodes: [],
            
            NODE_START_ROW: thirdOfRows,
            NODE_START_COL: thirdOfCols,
            NODE_END_ROW: thirdOfRows*2,
            NODE_END_COL: thirdOfCols*2, 

            mouseIsPressed: false,
            isRunning: false,
            isStartNode: false,
            isFinishNode: false,
            isWallNode: false, // xxxxxxx
            randomWalls: false,
            currRow: 0,
            currCol: 0,

        };
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.toggleIsRunning = this.toggleIsRunning.bind(this);
    };

    toggleIsRunning(){
        this.setState({isRunning: !this.state.isRunning})
    }

    componentDidMount() {
        const grid = this.getInitialGrid();
        this.setState({grid});
        
       
    }

    getInitialGrid = (
        rows = this.state.rows,
        cols = this.state.cols,
        
       
    ) => {
        const initialGrid = [];
        for (let row = 0; row < rows ; row++)
        {
            const currentRow = [];
            for (let col = 0; col < cols; col++)
            {
                currentRow.push(this.createNode( row, col ));
            }
            initialGrid.push(currentRow);
        }
        return initialGrid;
    };
     //add Neuighbours
    addNeighbours = (grid) => {
        for (let i = 0; i<this.state.rows; i++)
        {
            for (let j =0; j<this.state.cols; j++)
            {
                grid[i][j].addneighbours(grid)
            }
        }
    }

    createNode = ( row, col ) => {
        const rows = this.state.rows;
        const cols = this.state.cols;
        return {
            row,
            col,
            x: row,
            y: col,
            isStart:
                row === this.state.NODE_START_ROW && col === this.state.NODE_START_COL,
            isEnd:
                row === this.state.NODE_END_ROW && col === this.state.NODE_END_COL,
            g: 0,
            h: 0,
            f: 0,
            neighbours: [],
            isVisited: false,
            isWall: false,
            previous: undefined,
            distance: Infinity,
            weight: 0,
            addneighbours: function(grid){
               
                let j = this.y;
                let i = this.x;
                if (i > 0) this.neighbours.push(grid[i-1][j]);
                if (i < cols - 1) this.neighbours.push(grid[i+1][j]);
                if (j > 0) this.neighbours.push(grid[i][j-1]);
                if (j < rows - 1) this.neighbours.push(grid[i][j+1]);
            },
        };
    };

    //set the path for aStar visualisation
     getAstarPath = () => {
        this.setState({isRunning:true});
        this.addNeighbours(this.state.grid);
        const startNode = this.state.grid[this.state.NODE_START_ROW][this.state.NODE_START_COL];
        const endNode = this.state.grid[this.state.NODE_END_ROW][this.state.NODE_END_COL];
        startNode.isWall = false;
        endNode.isWall = false;
        setTimeout(() =>{

          const visitedNodes = dijkstra(this.state.grid, startNode, endNode);
          const path = getNodesInShortestPathOrder(endNode);
          Promise.all(visitedNodes, path);
          this.setState({
            visitedNodes: visitedNodes,
            path:path
            });
          console.log(visitedNodes);
          console.log(endNode);
        }, 100)
         
         //console.log(this.state.grid);
    }

    visualiseShortestPath = (shortestPathNodes) => {
        for (let i = 0; i < shortestPathNodes.length; i++){
            setTimeout(() => {
                const node = shortestPathNodes[i];
                //console.log(shortestPathNodes[i])
                document.getElementById(`node-${node.x}-${node.y}`).className +=
                " node node-shortest-path";
            }, 10 * i)
        }
    };

    visualisePath = () => {
        const check = (Boolean(this.state.path.length));
        console.log(check);
        if (check)
        {
            for (let i = 0; i <= this.state.visitedNodes.length; i++){
                if (i === this.state.visitedNodes.length){
                    setTimeout(() => {
                        this.visualiseShortestPath(this.state.path);
                    }, 20 * i);
                } else {
                    setTimeout(() => {
                        let node = this.state.visitedNodes[i];
                        document.getElementById(`node-${node.row}-${node.col}`).className +=
                        " node node-visited";
                    }, 20 * i);
                    };
                };
        } else { 

        alert('please pick an algorithm!');
        }
    }

    //button Methods
    toggleRandomWalls = () => {
        const grid = this.state.grid;
    
        if (!this.state.randomWalls){
        const newGrid = randomWalls(grid);
        this.setState({
            grid: newGrid,
            randomWalls: !this.state.randomWalls,
        })
        } else {
        const newGrid = clearWalls(grid);
        this.setState({
            grid: newGrid,
            randomWalls: !this.state.randomWalls,
        })
        }
       
    }

    //Handle Mouse Events
    handleMouseDown(row, col) {
        //console.log({row, col})
        if (!this.state.isRunning) {
          if (this.isGridClear()) {
            if (
              document.getElementById(`node-${row}-${col}`).className ===
              'node nodestart'
            ) {
              this.setState({
                mouseIsPressed: true,
                isStartNode: true,
                currRow: row,
                currCol: col,
              });
            } else if (
              document.getElementById(`node-${row}-${col}`).className ===
              'node nodeend'
            ) {
              this.setState({
                mouseIsPressed: true,
                isFinishNode: true,
                currRow: row,
                currCol: col,
              });
            } else {
              const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
              this.setState({
                grid: newGrid,
                mouseIsPressed: true,
                isWallNode: true,
                currRow: row,
                currCol: col,
              });
            }
          } else {
            this.clearGrid();
          }
        }
      }

      
    
      isGridClear() {
        for (const row of this.state.grid) {
          for (const node of row) {
            const nodeClassName = document.getElementById(
              `node-${node.row}-${node.col}`,
            ).className;
            
            if (
              nodeClassName === 'node node-visited' ||
              nodeClassName === 'node node-shortest-path'
            ) {
              return false;
            } 
          }

        }
        return true;
      }
    
      handleMouseEnter(row, col) {
        if (!this.state.isRunning) {
          if (this.state.mouseIsPressed) {
            const nodeClassName = document.getElementById(`node-${row}-${col}`)
              .className;
            if (this.state.isStartNode) {
              if (nodeClassName !== 'node wall') {
                const prevStartNode = this.state.grid[this.state.currRow][
                  this.state.currCol
                ];
                prevStartNode.isStart = false;
                document.getElementById(
                  `node-${this.state.currRow}-${this.state.currCol}`,
                ).className = 'node';
    
                this.setState({currRow: row, currCol: col});
                const currStartNode = this.state.grid[row][col];
                currStartNode.isStart = true;
                document.getElementById(`node-${row}-${col}`).className =
                  'node nodestart';
              }
              this.setState({NODE_START_ROW: row, NODE_START_COL: col});
            } else if (this.state.isFinishNode) {
              if (nodeClassName !== 'node wall') {
                const prevFinishNode = this.state.grid[this.state.currRow][
                  this.state.currCol
                ];
                prevFinishNode.isFinish = false;
                document.getElementById(
                  `node-${this.state.currRow}-${this.state.currCol}`,
                ).className = 'node';
    
                this.setState({currRow: row, currCol: col});
                const currFinishNode = this.state.grid[row][col];
                currFinishNode.isFinish = true;
                document.getElementById(`node-${row}-${col}`).className =
                  'node nodeend';
              }
              this.setState({NODE_END_ROW: row, NODE_END_COL: col});
            } else if (this.state.isWallNode) {
              const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
              this.setState({grid: newGrid});
            }
          }
        }
      }
    
      handleMouseUp(row, col) {
        if (!this.state.isRunning) {
          this.setState({mouseIsPressed: false});
          if (this.state.isStartNode) {
            const isStartNode = !this.state.isStartNode;
            this.setState({
                isStartNode,
                 NODE_START_ROW: row, 
                 NODE_START_COL: col,
                });
          } else if (this.state.isFinishNode) {
            const isFinishNode = !this.state.isFinishNode;
            this.setState({
              isFinishNode,
              NODE_END_ROW: row,
              NODE_END_COL: col,
            });
          }
          this.getInitialGrid();
        }      
      }
    
      handleMouseLeave() {
        if (this.state.isStartNode) {
          const isStartNode = !this.state.isStartNode;
          this.setState({isStartNode, mouseIsPressed: false});
        } else if (this.state.isFinishNode) {
          const isFinishNode = !this.state.isFinishNode;
          this.setState({isFinishNode, mouseIsPressed: false});
        } else if (this.state.isWallNode) {
          const isWallNode = !this.state.isWallNode;
          this.setState({isWallNode, mouseIsPressed: false});
          this.getInitialGrid();
        }
      }
      

    render() {
        const {grid} =  this.state;
        return (
        <>
        <div>
        <h1>Please make your maze then pick an algorithm!</h1>
        {/* <button onClick={this.toggleRandomWalls} className="button">Toggle Random Walls</button> */}
        <button onClick={this.getAstarPath}> Astar</button> 
        </div>
        <table className='center' >
            <tbody className = 'rowWrapper card'>
                {grid.map((row, rowIndx) => {
                    return(
                        <tr key={rowIndx} className='wrapper'>
                            {row.map((node,nodeIndx) => {
                                const { x, y, isEnd, isStart, isWall} = node;
                                return (
                                    <Node
                                        key = {nodeIndx}
                                        col = {y}
                                        isEnd = {isEnd}
                                        isStart = {isStart}
                                        isWall = {isWall}
                                        row = {x}
                                        mouseIsPressed={this.state.mouseIsPressed}
                                        onMouseDown={(rowIndx, nodeIndx) =>
                                          this.handleMouseDown(rowIndx, nodeIndx)
                                        }
                                        onMouseEnter={(rowIndx, nodeIndx) =>
                                          this.handleMouseEnter(rowIndx, nodeIndx)
                                        }
                                        onMouseUp={() => 
                                            this.handleMouseUp(rowIndx, nodeIndx)
                                        }
                               ></Node> 
                               );
                            })}
                        </tr>
                    )
                }
                )} 
            
            </tbody>
            </table>
            <button onClick={this.visualisePath} className="button" type="button">Visualise Path!</button>
            
    </> );  
    };
}

const getNewGridWithWallToggled = (grid, row, col) => {
    // mouseDown starts to act strange if I don't make newGrid and work off of grid instead.
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if (!node.isStart && !node.isFinish ) {
        const newNode = {
        ...node,
        isWall: !node.isWall,       
        };
        newGrid[row][col] = newNode;
    }
    return newGrid;
};
const randomWalls = (grid) => {

    const newGrid = grid.slice();
      for ( let i = 0; i < grid.rows; i++) {
        for ( let j = 0; j < grid.cols; j++) {
            console.log(grid.cols);
            const node = grid[i][j];
            const newNode  = {
            isWall: !node.isWall,
        };
        
        newNode.push(newGrid);
        }
      }
    
    return newGrid;
}

const clearWalls = (grid) => {
    if (!grid.isRunning) {
      const newGrid = grid.slice();
      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`,
          ).className;
          if (nodeClassName === 'node node-wall') {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node';
            node.isWall = false;
          }
        }
      }
    }
  }
  

