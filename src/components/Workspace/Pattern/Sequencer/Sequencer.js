import React from 'react'
import './Sequencer.css'
export default function Sequencer(props) {
    
    const checkboxes = props.pattern.map((beat,idx) => {
        if (beat) {
            return <input 
                        key={idx} 
                        name={idx}
                        type={"checkbox"} 
                        onChange={props.updateIdx} 
                        className="beat" defaultChecked>
                    </input>
        }
        return <input 
                    key={idx}
                    name={idx}
                    type={"checkbox"} 
                    onChange={props.updateIdx} 
                    className="beat">
                </input>
    })
    return (
        <div className="sequencer">
            {checkboxes}
        </div>
    )
}
