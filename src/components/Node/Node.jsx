import React, { Component } from "react";
import './Node.css';


export default class Node extends Component {
    render() {
        const {
            col,
            isEnd,
            isStart,
            isWall,
            row,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
        } = this.props;

        const classes = isStart ? 'nodestart' : isEnd ? 'nodeend' : isWall? "wall": "";

        return (
            <td 
            className={`node ${classes}`} 
            id={`node-${row}-${col}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()}></td>
        )
    }

}