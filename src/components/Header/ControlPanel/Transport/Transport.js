import React from 'react'
import * as Tone from 'tone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Transport.css'

export default class Transport extends React.Component {
    state = {
        isReady: false,
        isPlaying: false,
    }
    globalPlay=()=>{
        Tone.Transport.toggle()
        this.setState({isPlaying: !this.state.isPlaying})
    }
    componentDidMount(){
        Tone.loaded().then(() => {
            this.setState({isReady: true})
        });
    }
    render(){
        if (this.state.isReady) {
            return (
                <div className="global-transport">
                    {/* <button className="panel-btn" id="loop"><FontAwesomeIcon icon="sync-alt"/></button>
                    <button className="panel-btn" id="back"><FontAwesomeIcon icon="backward"/></button> */}
                    <button className="panel-btn" id="play" onClick={this.globalPlay}><FontAwesomeIcon icon={this.state.isPlaying ? "pause" : "play"}/></button>
                    {/* <button className="panel-btn" id="forth"><FontAwesomeIcon icon="forward"/></button> */}
                </div>)
        }
        return (
            <div className="global-transport">
                <h2>loading...</h2>
            </div>
        )   
    }
}
