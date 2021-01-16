import React from 'react'
import {useRouteMatch, Link} from 'react-router-dom'
import TokenService from '../../services/token-service'

export default function Nav() {
    const currentPage = useRouteMatch().path
    const showWorkspace = () => !currentPage.includes('workspace')
    const showProjects = () => !currentPage.includes('projects')
    const showOptions = () => !currentPage.includes('options')
    const showUsers = () => !currentPage.includes('user-management') && TokenService.isAdmin()
    const handleLogoutClick = () => {
    }
  
    const renderLogoutLink=()=> {
      return (
          <Link
            onClick={handleLogoutClick}
            to='/'>
            Logout
          </Link>
      )
    }
  
    const renderLoginLink=()=> {
      return (
          <Link
            to='/login'>
            Log in
          </Link>
      )
    }


    return (
        <nav>

            {showWorkspace() && 
            <Link to='/workspace'>
                Workspace
            </Link>}
            
            {showProjects() && 
            <Link to='/projects'>
                Projects
            </Link>}

            {showOptions() && 
            <Link to='/options'>
                Options
            </Link>}
            
            {showUsers() && 
            <Link to='/user-management'>
                User Management
            </Link>}
            
            {TokenService.hasAuthToken()
          ? renderLogoutLink()
          : renderLoginLink()}

        </nav>
    )
}
