import React, { Component } from 'react'
import ClickOutsideWrapper from '../../ClickOutsideWrapper/ClickOutsideWrapper'
import './Title.css'
export default class Title extends Component {
    state={
        isEditing: false,
        title: 'POLYPERC',
    }
    //if workspace page, display project title and allow editing
    handleMouseDown=(e)=>{
        this.setState({isEditing: true})
        e.stopPropagation()
    }
    handleClickOutside=(e)=> {
        this.setState({isEditing: false})
    }
    handleChangeTitle=(e)=>{
        this.setState({title: e.target.value})
    }
    render() {
        if (!this.props.location.pathname.includes('workspace')) {
            <h1>POLYPERC</h1>
        }
        if (!this.state.isEditing) {
            return (
            <h1 onMouseDown={this.handleMouseDown}>
                {this.state.title}
            </h1>)
        }
        return (<ClickOutsideWrapper onCondition={this.handleClickOutside}>
            <input 
                id="title" 
                onChange={this.handleChangeTitle} 
                defaultValue={this.state.title}>
            </input>
        </ClickOutsideWrapper>)
    }
}
