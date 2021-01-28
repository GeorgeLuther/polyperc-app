import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './TempoVolume.css'
import * as Tone from 'tone'
import { masterVolume } from '../../../../utils/audioSetup'
export default class TempoVolume extends Component {
    state={
        isVolumeSliderShown: false,
        isTempoSliderShown: false,
        tempo: 135,
        volume: -35,
    }
    showVolumeSlider=()=>{
        this.setState({isVolumeSliderShown: !this.state.isVolumeSliderShown})
    }
    handleVolumeSlider=(e)=>{
        masterVolume.volume.value = (e.target.value)
    }
    showTempoSlider=()=>{
        this.setState({isTempoSliderShown: !this.state.isTempoSliderShown})
    }
    handleSetTempo=(e)=>{
        this.setState({tempo: e.target.value})
        Tone.Transport.bpm.value = e.target.value
    }
    render() {
        
        return (
            <div className="global-tempo-volume">
                <div>
                    {this.state.isVolumeSliderShown && 
                    <input 
                        id="global-volume-slider" 
                        type="range" 
                        min={-60}
                        max={0}
                        defaultValue={this.state.volume}
                        onChange={this.handleVolumeSlider}
                    />}
                    <button 
                        onClick={this.showVolumeSlider} 
                        className="panel-btn" 
                        id="global-volume">
                            <FontAwesomeIcon icon="volume-up"/>
                    </button>
                </div>
                <div>
                    {this.state.isTempoSliderShown &&
                    <input 
                        id="global-tempo-slider" 
                        type="range" 
                        min={30}
                        max={300}
                        value={this.state.tempo}
                        onChange={this.handleSetTempo}
                    />}
                    
                    <label className='bpm-label' onClick={this.showTempoSlider}>
                        <input 
                            className="panel-btn" 
                            id="global-tempo" 
                            value={this.state.tempo}
                            onChange={this.handleSetTempo}
                        ></input>
                    bpm
                    </label>
                </div>
            </div>
        )
    }
}
