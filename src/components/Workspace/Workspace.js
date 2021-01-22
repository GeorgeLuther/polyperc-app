
import React, { Component } from 'react'

import './Workspace.css'

import Pattern from './Pattern/Pattern'
import PatternNew from './Pattern/PatternNew'

export default class Workspace extends Component {


    render() {
        
        return (
            <div className='workspace'>
                <Pattern />

            </div>
        )
    }
}
