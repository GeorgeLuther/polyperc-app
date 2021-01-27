import React, { Component } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Tone from 'tone'
import './Pattern.css'
import PatternsApiService from '../../../services/patterns-api-service'
import { masterVolume, samples } from '../../../utils/audioSetup'
// import { patternMethods } from '../../../utils/patternMethods'
// import Sequencer from './Sequencer/Sequencer'

export default class Pattern extends Component {
    state={
        isSet: false,
        isLoaded: false,
        pattern: {}
    }
    componentDidMount(){
        //Get pattern from API, load as state.
        PatternsApiService.getPatternById(this.props.id)
            .then(data=> {
                this.setState({pattern: data, isSet: true}, ()=> this.initializeSampler())
            })
            .catch(err => {
                this.setState({isLoaded: 'Pattern not found.'})
                console.log('Issue loading pattern:',err)
            })
    }
    //Create a playback instrument
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

    //Function to perform the pattern
    initializeLooper=()=>{
        //This callback reads and performs the pattern array 
        this.index = 0
        this.inst="C-1"
        this.playhead=(time)=> {
            let step = this.index % this.state.pattern.pattern.length;
            for (let i = 0; i < this.state.pattern.pattern.length; i++) {          
            if (this.state.pattern.pattern[step]) this.sampler.triggerAttackRelease(this.inst, 0.2, time);
            }
            this.index++;
        }
        //Listens to transport/context time and triggers callback at interval
        this.loop = new Tone.Loop((time) => {
            this.playhead(time)
        }, `${this.state.pattern.pattern.length}n`).start()
    }

    //event handlers
    handleToggleStart=()=>{
        this.setState({pattern: {isPlaying: !this.state.pattern.isPlaying}})
    }
    handleToggleMute=()=>{
        this.setState({pattern: {isMuted: !this.state.pattern.isMuted}})
        this.loop.mute = !this.loop.mute
    }
    handleToggleSolo=()=>{
        this.setState({isSoloed: !this.state.isSoloed})
        console.log(this.solo)
        this.solo.solo = !this.solo.solo
    }
    handleVolumeChange=(e)=>{
        this.setState({volume: e.target.value})
        this.vol.volume.value = e.target.value
    }
    handleSoundChange=(e)=>{
        let idxAsNote = Tone.Frequency(e.target.selectedIndex, "midi").toNote()
        this.inst = idxAsNote
    }
    handleEditPattern=(e)=>{

        const newArr = this.state.pattern.pattern.map((beat,idx)=>{
           
            return (idx===Number(e.target.name)) ? Number(!beat) : beat
        })
        console.log(newArr)
        this.setState({patternArr: newArr})
        //TODO: trigger an API update.. use put to update who pattern entry? or patch just the array?
    }
    
    render() {
        
        return (
            <div className="pattern">
                {!this.state.isSet && <h2>Loading pattern...</h2>}
                {!this.state.isLoaded && <h2>Loading sampler...</h2>}

            </div>
        )
    }

    componentWillUnmount(){
        console.log('unmount')
        if (this.loop) this.loop.dispose()
    }
}
