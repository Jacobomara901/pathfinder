import React, { Component } from "react";
import Node from '../Node/Node';
import './Pathfind.css';

export default class Pathfind extends Component {
    constructor(){
        super();
        this.state = {
            rows: 15,
            cols: 15,

            grid: [],
            
            NODE_START_ROW: 0,
            NODE_START_COL: 0,
            NODE_END_ROW: 14,
            NODE_END_COL: 14, 

        };
        // this.handleMouseDown = this.handleMouseDown.bind(this);
        // this.handleMouseLeave = this.handleMouseLeave.bind(this);
        // this.toggleIsRunning = this.toggleIsRunning.bind(this);
    };

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
    createNode = ( row, col ) => {
        return {
            row,
            col,
            isStart:
                row === this.state.NODE_START_ROW && col === this.state.NODE_START_COL,
            isEnd:
                row === this.state.NODE_END_ROW && col === this.state.NODE_END_COL,
            isVisited: false,
            isWall: false,
            previousNode: undefined,
        };
    };
    render() {
        const {grid} =  this.state;
        return (
            <div>
            <table>
            <tbody className = 'rowWrapper'>
                {grid.map((row, rowIndx) => {
                    return(
                        <tr key={rowIndx} className='wrapper'>
                            {row.map((node,nodeIndx) => {
                                const {row, col, isEnd, isStart, isWall} = node;
                                return (
                                    <Node
                                        key = {nodeIndx}
                                        col = {col}
                                        isEnd = {isEnd}
                                        isStart = {isStart}
                                        isWall = {isWall}
                                        row = {row}
                               ></Node> 
                               );
                            })}
                        </tr>
                    )
                }
                )} 
            
            </tbody>
            </table>
        </div>);
       
    };
}