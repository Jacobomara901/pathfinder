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
        } = this.props;

        const classes = isStart ? 'nodestart' : isEnd ? 'nodeend' : isWall? "wall": "";

        return (
            <td className={`node ${classes}`} id={`node-${row}-${col}`}></td>
        )
    }

}