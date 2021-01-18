import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './SortDropdown.css'

export default class SortDropdown extends Component {
    state={
        sortMethod: 'date_ created',
        isDropdownShown: false,
    }
    showDropdown=(e)=>{
        e.preventDefault()
        this.setState({isDropdownShown: !this.state.isDropdownShown})
    }
    setSortMethod=(e)=>{
        e.preventDefault()
        this.setState({sortMethod: e.target.value})
    }
    optionArr = [
        'date_created',
        'date_edited',
        'sound',
        'pattern_length',
        'technique_used',
        'pattern_name'
    ]
    render() {
        return (
            <form className="sort-dropdown">
                <button id="sort-btn" className="panel-btn" onClick={this.showDropdown}><FontAwesomeIcon icon="chevron-down"/></button>
                {this.state.isDropdownShown && <div className="sort-column" onMouseLeave={this.showDropdown}>
                    <button id="sort-selected">{this.state.sortMethod.replace(/_/g, ' ')}</button>
                    <div className="sort-options">
                        {this.optionArr.map(option => <button key={option} value={option} onClick={this.setSortMethod}>{option.replace(/_/g, ' ')}</button>)}
                    </div>
                </div>}
            </form>
        )
    }
}
