import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './TempoVolume.css'
import * as Tone from 'tone'

export default class TempoVolume extends Component {

   
    gainNode =(e) => {
        const gainNode = new Tone.Gain(0).toDestination()

        Tone.Destination.connect(gainNode)
    }
    
    render() {
        return (
            <div className="global-tempo-volume">
                <div>
                    <input id="global-volume-slider" type="range"/>
                    <button onClick={this.gainNode} className="panel-btn" id="global-volume"><FontAwesomeIcon icon="volume-up"/></button>
                </div>
                <div>
                    <input id="global-volume-slider" type="range" />
                    
                    <label className='bpm-label'>
                    <input className="panel-btn" id="global-tempo" defaultValue="120" min="30" max="400"></input>
                    bpm
                    </label>
                </div>
            </div>
        )
    }
}
