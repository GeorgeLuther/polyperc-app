import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import './Sequencer.css'
export default function Sequencer({pattern, handleEditPattern, name}) {
    return (
        <div className="sequencer">
            {pattern.map((beat,idx) => (
                <input 
                    key={uuidv4()}
                    name={idx}
                    type={"checkbox"} 
                    onChange={handleEditPattern} 
                    className="beat" defaultChecked={beat === 1}>
                </input>)
            )}
        </div>
    )
}
