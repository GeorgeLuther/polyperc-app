import React from 'react'
import './ControlPanel.css'
import SearchSort from './SearchSort/SearchSort'
import Transport from './Transport/Transport'
import TempoVolume from './TempoVolume/TempoVolume'

export default function ControlPanel() {
    return (
        <div className="control-panel">
            <SearchSort />
            <Transport />
            <TempoVolume />
        </div>
    )
}