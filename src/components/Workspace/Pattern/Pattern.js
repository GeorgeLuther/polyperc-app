import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Tone from 'tone'
import './Pattern.css'
import PatternsApiService from '../../../services/patterns-api-service'
import { masterVolume, samples } from '../../../utils/audioSetup'
// import { patternMethods } from '../../../utils/patternMethods'
import Sequencer from './Sequencer/Sequencer'
import createPattern from './createPattern'
import alterPattern from './alterPattern'

export default class Pattern extends Component {
    state={
        isSet: false,
        isLoaded: false,
    }
    componentDidMount(){
        //Get pattern from API, load as state.
        PatternsApiService.getPatternById(this.props.id)
            .then(pattern=> {
                this.setState({
                    id: pattern.id,
                    name: pattern.name,
                    isExpanded: pattern.isExpanded,
                    
                    sound: pattern.sound,
                    isSoloed: pattern.isSoloed,
                    isMuted: pattern.isMuted,
                    volume: pattern.volume,
                    
                    activeBeats: pattern.activeBeats,
                    patternLength: pattern.patternLength,
                    method: pattern.method,
                    rotation: pattern.rotation,
                    isReversed: pattern.isReversed,
                    isOpposite: pattern.isOpposite,
                    
                    pattern: pattern.pattern,
                    originalPattern: pattern.originalPattern,    
                    isSet: true
                }, ()=> this.initializeSampler())
            })
            .catch(err => {
                this.setState({isLoaded: 'Pattern not found.'})
                console.log('Issue loading pattern:',err)
            })
    }

    initializeSampler=()=>{
        this.vol = new Tone.Volume(this.state.volume)
        this.solo = new Tone.Solo()
        this.sampler = new Tone.Sampler({
            urls: { 
                "C-1": samples.kick,
                "C#-1": samples.snare,
                "D-1": samples.hihatC,
                "Eb-1": samples.hihatO,
                "E-1": samples.shaker,
                "F-1": samples.clap,
                "Gb-1": samples.crash,
                "G-1": samples.ride,    
            },
            onload: ()=>{
                this.setState({isLoaded: true}, ()=> this.initializeLooper())
            }
        }).chain(this.vol, this.solo, masterVolume)
    }

    initializeLooper=()=>{
        //This callback reads and performs the pattern array 
        this.index = 0
        this.playhead=(time)=> {
            let step = this.index % this.state.pattern.length;
            for (let i = 0; i < this.state.pattern.length; i++) {          
            if (this.state.pattern[step]) this.sampler.triggerAttackRelease(this.state.sound, 0.2, time);
            }
            this.index++;
        }
        //Listens to transport/context time and triggers callback at interval
        this.loop = new Tone.Loop((time) => {
            this.playhead(time)
        }, `${this.state.pattern.length}n`).start()

        if (this.state.isMuted) this.loop.mute = true
        if (this.state.isSoloed) this.solo.solo = true
    }

    updateAPI=()=>{
        const newObject = {
            id: this.state.id,
            name: this.state.name,
            isExpanded: this.state.isExpanded,        
            sound: this.state.sound,
            isSoloed: this.state.isSoloed,
            isMuted: this.state.isMuted,
            volume: this.state.volume,
            activeBeats: this.state.activeBeats,
            patternLength: this.state.patternLength,
            method: this.state.method,
            rotation: this.state.rotation,
            isReversed: this.state.isReversed,
            isOpposite: this.state.isOpposite,
            pattern: this.state.pattern,
            originalPattern: this.state.originalPattern,
        }
        PatternsApiService.replacePattern(this.props.id, newObject)
    }

    applyPatternFuncs=(newState)=>{
        console.log(newState.pattern)
        this.loop.interval = `${newState.patternLength}n`
        console.log('interval set',newState.patternLength)
        createPattern[newState.method].method(newState)

        if (newState.isReversed) {
            alterPattern.reverse.method(newState)
        }
        if (newState.isOpposite) {
            alterPattern.opposite.method(newState)
        }
        if (newState.rotation) {
            alterPattern.rotation.method(newState)
        }
        this.setState(newState,()=> {
            this.updateAPI()
        })
    }
//EVENT HANDLERS

    // handleToggleStart=()=>{
    //     this.setState({isPlaying: !this.state.pattern.isPlaying})
    // }
    handleChangeName=(e)=>{
        this.setState({name: e.target.value}, ()=> this.updateAPI())
    }
    handleToggleSolo=()=>{
        this.solo.solo = !this.solo.solo
        this.setState({isSoloed: !this.state.isSoloed}, ()=>this.updateAPI())
    }
    handleToggleMute=()=>{
        this.loop.mute = !this.loop.mute
        this.setState({isMuted: !this.state.isMuted}, ()=>this.updateAPI())
    }
    handleToggleExpand=()=>{
        this.setState({isExpanded: !this.state.isExpanded}, ()=> this.updateAPI())
    }
    handleEditPattern=(e)=>{
        const newArr = this.state.pattern.map((beat,idx)=>{           
            return (idx===Number(e.target.name)) ? Number(!beat) : beat
        })
        this.setState({pattern: newArr}, ()=> this.updateAPI())
    }
    handleChangeSound=(e)=>{
        //let idxAsNote = Tone.Frequency(e.target.selectedIndex, "midi").toNote()
        this.setState({sound: e.target.value}, ()=> this.updateAPI())
    }
//applies the selected pattern method
    handleChangeMethod=(e)=>{
        let newState = {...this.state}
        newState.method = e.target.value
        this.applyPatternFuncs(newState)
    }
    handleToggleReverse=()=>{
        let newState = {...this.state}
        newState.isReversed = !this.state.isReversed
        alterPattern.reverse.method(newState)
        this.setState(newState,()=> this.updateAPI())
    }
    handleToggleOpposite=()=>{
        let newState = {...this.state}
        newState.isOpposite = !this.state.isOpposite
        alterPattern.opposite.method(newState)
        this.setState(newState,()=>this.updateAPI())
    }
//pattern length
    handleDecrementLength=()=>{
        let newState = {...this.state}
        newState.patternLength = newState.patternLength-1
        this.applyPatternFuncs(newState)
    }
    handleIncrementLength=()=>{
        let newState = {...this.state}
        newState.patternLength = newState.patternLength+1
        this.applyPatternFuncs(newState)
    }
    handleSetLength=(e)=>{
        if (e.target.value < 41) {
            let newState = {...this.state}
            newState.patternLength = e.target.value
            this.applyPatternFuncs(newState)    
        }
    }
//active beat(s)
    handleDecrementActiveBeats=()=>{
        let newState = {...this.state}
        newState.activeBeats = newState.activeBeats-1
        this.applyPatternFuncs(newState)
    }
    handleIncrementActiveBeats=()=>{
        let newState = {...this.state}
        newState.activeBeats = newState.activeBeats+1
        this.applyPatternFuncs(newState)
    }
    handleSetActiveBeats=(e)=>{
        if (e.target.value < 41) {
            let newState = {...this.state}
            newState.activeBeats = e.target.value
            this.applyPatternFuncs(newState)    
        }
    }
//rotation
    handleDecrementRotation=()=>{
        let newState = {...this.state}
        newState.rotation = newState.rotation-1
        this.applyPatternFuncs(newState)
    }
    handleIncrementRotation=()=>{
        let newState = {...this.state}
        newState.rotation = newState.rotation+1
        this.applyPatternFuncs(newState)
    }
    handleSetRotation=(e)=>{
        if (e.target.value) {
            let newState = {...this.state}
            newState.rotation = e.target.value
            this.applyPatternFuncs(newState)    
        }
    }
    handleChangeVolume=(e)=>{
        this.vol.volume.value = e.target.value
        this.setState({volume: e.target.value}, ()=>this.updateAPI())
    }


    render() {
        return (
            <div className="pattern">
                {!this.state.isSet && <h2>Loading pattern...</h2>}
                {!this.state.isLoaded && <h2>Loading sampler...</h2>}
                {this.state.isLoaded && this.state.isSet && 
                <>
                <div className="condensed">
                    <div className="pattern-main">
                        <button 
                            className="delete-btn" 
                            aria-label="delete pattern"
                            name={this.props.id}
                            title="delete this pattern from the workspace"
                            onClick={()=> this.props.handleDeletePattern(this.props.id)}>
                            <FontAwesomeIcon icon={"times"}/>
                        </button>
                        {/* <button className="copy-btn" title="to copy click this, then the add new (+) button. to clone click this and then the fields you'd like to clone. then click the pattern that will inherit them"><FontAwesomeIcon icon={"copy"}/></button> */}
                        <input 
                            className="name-input"
                            aria-label="pattern name"
                            defaultValue={this.state.name}
                            placeholder="pattern name" 
                            title="input a name for this pattern"
                            onChange={this.handleChangeName}
                        ></input>
                        <button 
                            onClick={this.handleToggleSolo} 
                            aria-label="isolate this pattern"
                            className={`solo-btn ${this.state.isSoloed ? "solo-active" : ""}`} 
                            title="solo this pattern (mutes all other patterns)"
                        >S
                        </button>
                        <button 
                            onClick={this.handleToggleMute} 
                            aria-label="mute/unmute pattern"
                            className="volume-btn" 
                            title="mute/unmute pattern">
                            <FontAwesomeIcon icon={this.state.isMuted ? "volume-mute" : "volume-up"} />
                        </button>
                    </div>
                    <div className="pattern-editor">
                        <button
                            aria-label="expand all options" 
                            className="expand-btn"
                            onClick={this.handleToggleExpand}
                            title="show all options..."
                        >
                            <FontAwesomeIcon icon={"ellipsis-v"}/>
                        </button>
                        <Sequencer pattern={this.state.pattern} handleEditPattern={this.handleEditPattern} name={this.state.name}/>
                        {/* <button onClick={this.handleToggleStart}><FontAwesomeIcon icon={this.state.isPlaying ? "pause" : "play"}/></button> */}
                    </div>
                </div>
                {this.state.isExpanded &&
                <div className="expanded">
                    <div>
                        {/* TODO: Create a styled dropdown from the patternMethods module with tooltip for descriptions */}
                        <label>method:
                        <select 
                        className="method-dropdown"
                        defaultValue={this.state.method}
                        onChange={this.handleChangeMethod}
                        title="the method used to generate a pattern"
                        >
                            {Object.keys(createPattern).map(methodName =>{
                                return <option 
                                            key={methodName} 
                                            title={createPattern[methodName].description}
                                        >{methodName}
                                        </option>
                            })}
                        </select>
                        </label>
                        {/* TODO: Future version should autopopulate this based on sample names */}
                        <label>sound: 
                        <select 
                        className="sound-dropdown"
                        defaultValue={this.state.sound}
                        onChange={this.handleChangeSound}
                        >
                            <option value="C-1">kick</option>
                            <option value="C#-1">snare</option>
                            <option value="D-1">hihat-closed</option>
                            <option value="Eb-1">hihat-open</option>
                            <option value="E-1">shaker</option>
                            <option value="F-1">clap</option>
                            <option value="Gb-1">crash</option>
                            <option value="G-1">ride</option>
                        </select>
                        </label>
                        <div>
                        <label htmlFor="reverse"> 
                            reverse
                            <input 
                                id="reverse" 
                                title={alterPattern.reverse.description}
                                type="checkbox" 
                                className="check"
                                defaultChecked={this.state.isReversed}
                                onClick={this.handleToggleReverse}
                            />
                        </label>
                        <label htmlFor="opposite">
                            opposite
                            <input 
                                id="opposite" 
                                title={alterPattern.opposite.description}
                                type="checkbox" 
                                className="check"
                                defaultChecked={this.state.isOpposite}
                                onClick={this.handleToggleOpposite}
                            />
                        </label>
                        </div>
                    </div>
                    <div>
                        <label>total beats
                        <div>
                            <button
                                aria-label="subtract one beat from pattern length" 
                                className="decrement-bar-length-btn"
                                onClick={this.handleDecrementLength}
                            >-</button>
                            <input
                                aria-label="enter pattern length" 
                                placeholder="bar length" 
                                size="9" 
                                className="bar-length-input"
                                value={this.state.patternLength}
                                onChange={this.handleSetLength}
                                max={30}
                                min={-20}
                            />
                            <button 
                                aria-label="add one beat to pattern length"
                                className="increment-bar-length-btn"
                                onClick={this.handleIncrementLength}
                            >+</button>
                        </div>
                        </label>
                        <label>active beats
                        <div>
                            <button 
                                aria-label="subtract one beat active beat"
                                className="decrement-onset-btn"
                                onClick={this.handleDecrementActiveBeats}
                            >-</button>
                            <input 
                                aria-label="enter number of beat active beats"
                                placeholder="onset(s)" 
                                size="6" 
                                className="onsets-input"
                                value={this.state.activeBeats}
                                onChange={this.handleSetActiveBeats}
                                max={40}
                                min={1}
                            />
                            <button
                                aria-label="add one beat active beat" 
                                className="increment-onsets-btn"
                                onClick={this.handleIncrementActiveBeats}
                            >+</button>
                        </div>
                        </label>
                        <label>rotation
                        <div>
                            <button
                                aria-label="rotate pattern left by one"
                                title="rotate pattern left by one" 
                                className="decrement-rotation-btn"
                                onClick={this.handleDecrementRotation}
                            >-</button>
                            <input 
                                aria-label="enter pattern rotation"
                                title="enter pattern rotation"
                                placeholder="rotation" 
                                size="7" 
                                className="rotation-input"
                                value={this.state.rotation}
                                onChange={this.handleSetRotation}
                            />
                            <button 
                                aria-label="rotate pattern right by one"
                                title="rotate pattern right by one" 
                                className="increment-rotation-btn"
                                onClick={this.handleIncrementRotation}
                            >+</button>
                        </div>
                        </label>
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
                                onChange={this.handleChangeVolume}
                            ></input>
 
                            </label>
                        </div>
                    </div> 
                </div>
                }
                </>}
            </div>
        )
    }

    componentWillUnmount(){
        if (this.loop) this.loop.dispose()
    }
}
