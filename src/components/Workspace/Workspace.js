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
        PatternsApiService.getAllPatterns()
            .then(data=> {
                this.setState({patterns: data, loading: false})
                console.log(this.state.loading)
            })
            .catch(err => {
                this.setState({loading: 'no patterns'})
                console.log(err)
            })
    }
    render() {
        if (this.state.loading === 'no patterns') {
            return <div><h2>No patterns found!</h2></div>
        }
        else if (this.state.loading) {
            return <div><h2>loading patterns...</h2></div>
        }
        return (
            
            <div className='workspace'>
                {this.renderPatterns()}
            </div>
        )
    }
}
