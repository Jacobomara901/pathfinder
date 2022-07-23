import React, { Component } from "react";
import Node from '../Node/Node';
import './Pathfind.css';
import Astar from '../../Algorithms/astar/astar'

export default class Pathfind extends Component {
    constructor(){
        super();
        const rowsNumber = 15
        const colsNumber = 15
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

        };
        // this.handleMouseDown = this.handleMouseDown.bind(this);
        // this.handleMouseLeave = this.handleMouseLeave.bind(this);
        // this.toggleIsRunning = this.toggleIsRunning.bind(this);
    };


    componentDidMount() {
        const grid = this.getInitialGrid();
        this.setState({grid});
        setTimeout(() => {
            this.getPath();
        },0)
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
            isWall: Boolean(Math.random() < 0.2),
            previous: undefined,
            addneighbours: function(grid){
               
                let i = this.x;
                let j = this.y;
                if (i > 0) this.neighbours.push(grid[i-1][j]);
                if (i < rows - 1) this.neighbours.push(grid[i+1][j]);
                if (j > 0) this.neighbours.push(grid[i][j-1]);
                if (j < cols - 1) this.neighbours.push(grid[i][j+1]);
            },
        };
    };

    //set the path for aStar visualisation
    getPath = () => {
        this.addNeighbours(this.state.grid);
        const startNode = this.state.grid[this.state.NODE_START_ROW][this.state.NODE_START_COL];
        const endNode = this.state.grid[this.state.NODE_END_ROW][this.state.NODE_END_COL];
        startNode.isWall = false;
        endNode.isWall = false;
        const path = Astar(startNode, endNode);
        this.setState({
            path: path.path,
            visitedNodes: path.visitedNodes,
        });
         //console.log(path);
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
        
        for (let i = 0; i <= this.state.visitedNodes.length; i++){
           if (i === this.state.visitedNodes.length){
            setTimeout(() => {
                this.visualiseShortestPath(this.state.path);
            }, 20 * i);
           } else {
            setTimeout(() => {
                let node = this.state.visitedNodes[i];
                document.getElementById(`node-${node.x}-${node.y}`).className +=
                " node node-visited";
            }, 20 * i);
           }
        } 

    }
    animate = () => {
        this.addNeighbours(this.state.grid);
        const startNode = this.state.grid[this.state.NODE_START_ROW][this.state.NODE_START_COL];
        const endNode = this.state.grid[this.state.NODE_END_ROW][this.state.NODE_END_COL];
        const path = Astar(startNode, endNode);
        this.setState({
            path: path.path,
            visitedNodes: path.visitedNodes,
        });
         //console.log(path);
         //console.log(this.state.grid);
    
        this.visualisePath();
    }

    render() {
        const {grid} =  this.state;
        return (
        <>
        <button onClick={this.animate}>VisualisePath</button>
        
            <div>
            <table>
            <tbody className = 'rowWrapper'>
                {grid.map((row, rowIndx) => {
                    return(
                        <tr key={rowIndx} className='wrapper'>
                            {row.map((node,nodeIndx) => {
                                const {isEnd, isStart, isWall} = node;
                                return (
                                    <Node
                                        key = {nodeIndx}
                                        col = {nodeIndx}
                                        isEnd = {isEnd}
                                        isStart = {isStart}
                                        isWall = {isWall}
                                        row = {rowIndx}
                               ></Node> 
                               );
                            })}
                        </tr>
                    )
                }
                )} 
            
            </tbody>
            </table>
        </div>
    </> );  
    };
}