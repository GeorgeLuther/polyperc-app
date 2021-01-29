import React from 'react'
import { Route } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Header.css'
import Title from './Title/Title'
import Nav from './Nav/Nav'
import ControlPanel from './ControlPanel/ControlPanel'
import PatternsApiService from '../../services/patterns-api-service'

export default class Header extends React.Component {
    state = {
        isNavShown: false
    }
    
    showNav=()=> {this.setState({isNavShown: !this.state.isNavShown})}
    hideNav=()=> {this.setState({isNavShown: false})}

    handleAddNew=()=>{
    // the add button has different functionality depending on the page
        if (window.location.pathname.includes('workspace')) {
            PatternsApiService.newEmptyPattern()
            //temporary stopgap - entire project architecture must change!
            window.location.reload();
        }
    }

    render(){
        return (
            <>  
                <div className="banner">
                    <Route
                        path={['/workspace','/projects','/users']}
                        render={()=>{
                            return (
                                //DEPENDING ON window.location.pathname,
                                //THIS BUTTON TRIGGERS NEW THING IN WORKSPACE
                                <button 
                                    id="new" 
                                    className="main-btn"
                                    onClick={this.handleAddNew}
                                    aria-label="add new pattern"
                                    // onClick={this.props.handleAddNew}
                                >+</button>
                            )
                        }}
                    ></Route>
                    <Route
                        path={'/'}
                        component={Title} >
                    </Route>
                    <button id="hamburger" className="main-btn" aria-label="navigation"
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
