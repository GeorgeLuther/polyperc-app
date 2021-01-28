import React, { Component } from 'react'
import './Workspace.css'
import Pattern from './Pattern/Pattern'
import PatternsApiService from '../../services/patterns-api-service'

export default class Workspace extends Component {
    state = {
        loading: true,
        ids: [],
    }
    handleDeletePattern=(id)=>{
        PatternsApiService.deletePattern(id)
        this.setState({ids: this.state.ids.filter(pat => pat !== id)})
    }
    getAllIds=()=>{
        PatternsApiService.getAllPatternIds()
            .then(data=> {
                this.setState({ids: data, loading: false})
            })
            .catch(err => {
                this.setState({loading: 'no patterns'})
                console.log('Unable to load patterns',err)
            })
    }

    componentDidMount(){
        this.getAllIds()
    }
    // componentDidUpdate(){
    //     this.getAllIds()
    // }

    render() {
        
        if (this.state.loading === 'no patterns') {
            return <div><h2>No patterns found!</h2></div>
        }
        else if (this.state.loading) {
            return <div><h2>loading patterns...</h2></div>
        }
        return (
            
            <div className='workspace'>
                {this.state.ids.map((id) => (                    
                    <Pattern 
                        key={id} 
                        id={id} 
                        handleDeletePattern={this.handleDeletePattern}
                    />
                ))}
            </div>
        )
    }
}
