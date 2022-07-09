import React from 'react'
import './Node.css';

const Node = ({ isStart, isEnd }) => {
    const classes = isStart ? 'nodestart' : isEnd ? 'nodeend' : "";
    return <div className={`node ${classes}`}></div>
};

export default Node;