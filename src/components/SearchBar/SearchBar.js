import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SearchBar() {
    return (
        <section>
            <div className="filters">
                <button className="panel-btn" id="search"><FontAwesomeIcon icon="search"/></button>
                <button className="panel-btn" id="sort"><FontAwesomeIcon icon="chevron-down"/></button>
            </div>
        </section>
    )
}
