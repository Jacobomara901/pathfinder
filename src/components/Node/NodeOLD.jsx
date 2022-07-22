import React from 'react'
import './Node.css';
import { useState } from 'react';


const Node = ({ isStart, isEnd, row, col, isWall}) => {

    function wallToggle(e) {
        const newNode = document.getElementById(e.target.id);
        console.log(newNode);
        <Node key= {newNode.colIndex} isStart= {newNode.isStart} isEnd = {newNode.isEnd} row={newNode.rowIndex} col={newNode.colIndex} isWall={newNode.isWall}/>
    return !newNode.isWall;
    }

    const classes = isStart ? 'nodestart' : isEnd ? 'nodeend' : isWall? "wall": "";
    return <div onClick={wallToggle} className={`node ${classes}`} id={`node-${row}-${col}`}></div>
};

export default Node;
