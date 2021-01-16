import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouteMatch } from 'react-router-dom'

export default function ControlPanel() {
    return (
        <section>
            <div className="global-transport">
                <button className="panel-btn" id="loop"><FontAwesomeIcon icon="sync-alt"/></button>
                <button className="panel-btn" id="back"><FontAwesomeIcon icon="backward"/></button>
                <button className="panel-btn" id="play"><FontAwesomeIcon icon="play"/></button>
                <button className="panel-btn" id="forth"><FontAwesomeIcon icon="forward"/></button>
            </div>
            <div className="global-tempo-volume">
                <div>
                    <input id="global-volume-slider" type="range"/>
                    <button className="panel-btn" id="global-volume"><FontAwesomeIcon icon="volume-up"/></button>
                </div>
                <div>
                    <input id="global-volume-slider" type="range"/>
                    <input className="panel-btn" id="global-tempo" placeholder="120 bpm"></input>
                </div>
            </div>
        </section>
    )
}