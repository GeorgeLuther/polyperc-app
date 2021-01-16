import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import Nav from '../Nav/Nav'

export default function Header() {

    const currentPage = useRouteMatch().path
    

    return (
        <header>
            <h1>POLYPERC</h1>
            <Nav />
        </header>
    )
}
