import React from 'react'
import './SearchSort.css'
import SearchBar from './SearchBar/SearchBar'
import SortDropdown from './SortDropdown/SortDropdown'

export default function SearchSort() {
    return (
            <div className="search-sort">
                <SearchBar/>
                <SortDropdown/>
            </div>
    )
}
