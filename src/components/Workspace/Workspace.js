import React, { Component } from 'react'
import './Workspace.css'
import Pattern from './Pattern/Pattern'
import PatternsApiService from '../../services/patterns-api-service'
import patternMethods from '../../utils/patternMethods'

export default class Workspace extends Component {
    state = {
        loading: true,
        patterns: [],
    }
    
    renderPatterns(){
        return this.state.patterns.map(pattern => {
            return <Pattern key={pattern.id} pattern={pattern}/>
            })
    }

    componentDidMount(){
        PatternsApiService.getAllPatterns().then(data=> {
            this.setState({patterns: data, loading: false})
            console.log(this.state.loading)
        })
    }
    render() {
        if (this.state.loading) {
            return <div><h2>loading patterns...</h2></div>
        }
        console.log('print')
        return (

            <div className='workspace'>
                {this.renderPatterns()}
            </div>
        )
    }
}
