import React from 'react'
import { Route } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Header.css'
import Nav from './Nav/Nav'
import ControlPanel from './ControlPanel/ControlPanel'

export default class Header extends React.Component {
    state = {
        isNavShown: false
    }

    showNav =()=> {this.setState({isNavShown: !this.state.isNavShown})}
    hideNav =()=> {this.setState({isNavShown: false})}
    
    render(){
        return (
            <>  
                <div className="banner">
                    <Route
                        path={['/workspace','/projects','/users']}
                        render={()=>{
                            return (
                                <button id="new" className="main-btn">+</button>
                            )
                        }}
                    ></Route>
                    <h1>POLYPERC</h1>
                    <button id="hamburger" className="main-btn" 
                        onClick={this.showNav}><FontAwesomeIcon icon="bars" /></button>
                        {this.state.isNavShown && <Nav hideNav={this.hideNav}/>}
                </div>
                <Route 
                    path={['/workspace','/projects','/users']}
                    component={ControlPanel}>
                </Route>
            </>
        )
    
    }
}
