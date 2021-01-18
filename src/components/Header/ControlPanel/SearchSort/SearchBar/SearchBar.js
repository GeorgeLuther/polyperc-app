import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './SearchBar.css'
import { faTemperatureHigh } from '@fortawesome/free-solid-svg-icons'

export default class SearchBar extends React.Component {
    state={
        isSearchInputShown: false,
        searchTerm: '',
    }
    showSearchInput=(e)=>{
        e.preventDefault()
        this.setState({isSearchInputShown: !this.state.isSearchInputShown})
    }
    search=(e)=>{
        e.preventDefault()
        this.setState({searchTerm: e.target.value})
    }
    render(){
        return (
            <form id="search">
                <button className="panel-btn" id="search-btn" onClick={this.showSearchInput}><FontAwesomeIcon icon="search"/></button>
                {this.state.isSearchInputShown && <input id="search-input" placeholder={'search'} onChange={this.search}></input>}
            </form>
        )
    }
}
