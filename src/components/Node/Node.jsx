import React, { useState } from 'react'
import './Node.css';


const Node = ({ isStart, isEnd, row, col, isWall }) => {

    function idTag() {return(`node-${row}-${col}`);}

    const [wallState, setWallState] = useState({
        objects: [{id: idTag, isWall:false},]
    });

    

    function toggleWall(col){
        let nodeCopy =[...wallState.objects];

        nodeCopy[col].isWall
            ? (nodeCopy[col].isWall = false)
            : (nodeCopy[col].isWall = true);
        setWallState({...wallState, objects: nodeCopy});
        
    }
    const classes = isStart ? 'nodestart' : isEnd ? 'nodeend' : isWall? 'wall': "";
    
    return <div onClick={() => toggleWall(col)} className={`node ${classes}`} id={`node-${row}-${col}`}></div>
};

export default Node;