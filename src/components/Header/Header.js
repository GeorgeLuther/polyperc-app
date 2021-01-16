import React from 'react'
import { useRouteMatch, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Header.css'
import Nav from '../Nav/Nav'
import SearchBar from '../SearchBar/SearchBar'
import ControlPanel from '../ControlPanel/ControlPanel'

export default function Header() {
    console.log('path',useRouteMatch().url)
    const currentPage = useRouteMatch().path
    console.log(currentPage)
    let isNavShown = !false
    function showNav() {isNavShown = !isNavShown}

    return (
        <header>
            <section>
                <button>+</button>
                <h1>POLYPERC</h1>
                <button onClick={showNav}><FontAwesomeIcon icon="bars" /></button>
                {isNavShown && <Nav />}
            </section>
            <section >
                {currentPage.includes('workspace') && <SearchBar />}
                <ControlPanel />
            </section>
        </header>
    )
}
