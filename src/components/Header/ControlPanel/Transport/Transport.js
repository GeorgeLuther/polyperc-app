import React from 'react'
import * as Tone from 'tone'
import sampler from '../../../../utils/samples'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Transport.css'
export default class Transport extends React.Component {
    state = {
        isReady: false,
        isPlaying: false,
    }
    globalPlay=()=>{
        const startTransport = ()=>{
            console.log('PlayState:', this.state.isPlaying)
            console.log('AudioCtx:', Tone.context.state)
            this.state.isPlaying ? Tone.Transport.start() : Tone.Transport.stop()
            console.log('Transport:',Tone.Transport.position)
        }
        this.setState({isPlaying: !this.state.isPlaying}, startTransport)
    }
    componentDidMount(){
        Tone.loaded().then(() => {
            this.setState({isReady: true})
        });
        const loopA = new Tone.Loop(time => {
            sampler.triggerAttackRelease("C2", "4n", time);
        }, "2n").start(0);
    }
    render(){
        if (this.state.isReady) {
            return (
                <div className="global-transport">
                    <button className="panel-btn" id="loop"><FontAwesomeIcon icon="sync-alt"/></button>
                    <button className="panel-btn" id="back"><FontAwesomeIcon icon="backward"/></button>
                    <button className="panel-btn" id="play" onClick={this.globalPlay}><FontAwesomeIcon icon={this.state.isPlaying ? "pause" : "play"}/></button>
                    <button className="panel-btn" id="forth"><FontAwesomeIcon icon="forward"/></button>
                </div>)
        }
        console.log('load')
        return (
            <div className="global-transport">
                <h2>loading...</h2>
            </div>
        )   
    }
}
