import React, { Component } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Tone from 'tone'
import './Pattern.css'
import PatternsApiService from '../../../../services/patterns-api-service'
import { masterVolume, samples } from '../../../../utils/audioSetup'
// import { patternMethods } from '../../../utils/patternMethods'
// import Sequencer from './Sequencer/Sequencer'

export default class Pattern extends Component {
    constructor(props){
        super(props)
        //connect a new tone instance
        const {vol, solo, sampler, loop, inst} = toneInstance(this)
        this.vol = vol
        this.solo = solo
        this.sampler = sampler
        this.loop = loop
        this.inst = inst

    }
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
                
                {!this.state.isLoaded && <h2>Loading pattern...</h2>}
            </div>
        )
    }

    componentWillUnmount(){
        console.log('unmount')
        if (this.loop) this.loop.dispose()
    }
}
