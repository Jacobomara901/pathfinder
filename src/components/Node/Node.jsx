import React from 'react'
import './Node.css';

const Node = ({ isStart, isEnd, row, col }) => {
    const classes = isStart ? 'nodestart' : isEnd ? 'nodeend' : "";
    return <div className={`node ${classes}`} id={`node-${row}-${col}`}></div>
};

export default Node;