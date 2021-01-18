import React from 'react'
import {NavLink} from 'react-router-dom'
import TokenService from '../../../services/token-service'
import './Nav.css'
export default function Nav(props) {

    const handleLogoutClick = () => {
    }
  
    const renderLogoutLink=()=> {
      return (
          <NavLink
            onClick={handleLogoutClick}
            to='/'>
            Logout
          </NavLink>
      )
    }
  
    const renderLoginLink=()=> {
      return (
          <NavLink
            to='/login' activeStyle={{display: "none"}}>
            Log in
          </NavLink>
      )
    }


    return (
        <nav onMouseLeave={props.hideNav}>

            
            <NavLink to='/workspace' activeStyle={{display: "none"}}>
                Workspace
            </NavLink>
            
           
            <NavLink to='/projects' activeStyle={{display: "none"}}>
                Projects
            </NavLink>

            <NavLink to='/options'  activeStyle={{display: "none"}}>
                Options
            </NavLink>

            {TokenService.isAdmin() && 
            <NavLink to='/user-management' activeStyle={{display: "none"}}>
                User Management
            </NavLink>}

          
            {TokenService.hasAuthToken()
          ? renderLogoutLink()
          : renderLoginLink()}

        </nav>
    )
}
