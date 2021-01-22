import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Tone from 'tone'
import './Pattern.css'
import { masterVolume, samples } from '../../../utils/audio'
import { patternMethods } from '../../../utils/patternMethods'
import Sequencer from './Sequencer/Sequencer'

export default class PatternNew extends Component {
    state={
    
    }
    //get the pattern object via id from the server
    //set the pattern on state change
    //initialize a sampler
    
    //this callback reads and performs the pattern array 
    
    //Listens to transport/context time and triggers callback at interval
    
    //event handlers
    
    render() {
        
        return (
            <div className="pattern">
                <div className="condensed">
                    <div className="pattern-main">
                        <button className="delete-btn" title="delete this pattern from the workspace"><FontAwesomeIcon icon={"times"}/></button>
                        {/* <button className="copy-btn" title="to copy click this, then the add new (+) button. to clone click this and then the fields you'd like to clone. then click the pattern that will inherit them"><FontAwesomeIcon icon={"copy"}/></button> */}
                        <input placeholder="pattern name" title="input a name for this pattern" className="name-input"></input>
                        <button onClick={this.handleToggleSolo} className="solo-btn" className={this.state.isSoloed ? "solo-active" : ""} title="solo this pattern (mutes all other patterns)">S</button>
                        <button onClick={this.handleToggleMute} className="volume-btn" title="mute/unmute pattern"><FontAwesomeIcon icon={this.state.isMuted ? "volume-mute" : "volume-up"} /></button>
                    </div>
                    <div className="pattern-editor">
                        <button className="expand-btn"><FontAwesomeIcon icon={"ellipsis-v"}/></button>
                        <Sequencer patternArr={this.state.patternArr} updateIdx={this.handleEditPattern}/>
                        <button onClick={this.handleToggleStart}><FontAwesomeIcon icon={this.state.isPlaying ? "pause" : "play"}/></button>
                    </div>
                </div>
                <div className="expanded">
                    <div>
                        {/* TODO: Create a styled dropdown from the patternMethods module with tooltip for descriptions */}
                        <select 
                        className="method-dropdown"
                        title="the method used to generate a pattern"
                        >
                            <option>pulse</option>
                            <option>beat</option>
                            <option>random</option>
                            <option>even</option>
                            <option>periodic</option>
                            <option>cyclic</option>
                            <option>subdivision</option>
                            <option>first</option>
                            <option>last</option>
                            <option disabled="">grab</option>
                        </select>
                        <select 
                        className="sound-dropdown"
                        onChange={this.handleSoundChange}
                        >
                            <option>kick</option>
                            <option>snare</option>
                            <option>hihat-closed</option>
                            <option>hihat-open</option>
                            <option>shaker</option>
                            <option>clap</option>
                            <option>crash</option>
                            <option>ride</option>
                        </select>
                        <label htmlFor="reverse"> 
                            reverse
                            <input id="reverse" type="checkbox" className="check"/>
                        </label>
                        <label htmlFor="opposite">
                            opposite
                            <input id="opposite" type="checkbox" className="check"/>
                        </label>
                    </div>
                    <div>
                        <div>
                            <button className="decrement-bar-length-btn">-</button>
                            <input placeholder="bar length" size="9" className="bar-length-input"/>
                            <button className="increment-bar-length-btn">+</button>
                        </div>
                        <div>
                            <button className="decrement-onset-btn">-</button>
                            <input placeholder="onset(s)" size="6" className="onsets-input"/>
                            <button className="increment-onsets-btn">+</button>
                        </div>
                        <div>
                            <button className="decrement-rotation-btn">-</button>
                            <input placeholder="rotation" size="7" className="rotation-input"/>
                            <button className="increment-rotation-btn">+</button>
                        </div>
                        {/* TODO: create tempo / ratio / source controls using loop.playbackRate 
                        and loop.inverval or individual synced tranports for each pattern. */}
                        {/* <div>
                            <button className="decrement-tempo-btn">-</button>
                            <input className="tempo-btn" size="7" placeholder="120 bpm"/>
                            <button className="increment-tempo-btn">+</button>
                        </div> */}
                        <div>
                            <label>
                                volume
                                <input 
                                type={"range"}
                                max={1}
                                min={-70}
                                defaultValue={this.state.volume}
                                onChange={this.handleVolumeChange}
                            ></input>
 
                            </label>
                        </div>
                    </div>  
                </div>
            </div>
        )
    }

    componentWillUnmount(){
        this.loop.dispose()
    }
}
