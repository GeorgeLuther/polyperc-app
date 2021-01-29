import React from 'react'

import ReactDOM from 'react-dom'

import renderer from 'react-test-renderer'

import SortDropdown from './SortDropdown'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus,
    faBars,
    faSearch,
    faChevronDown,
    faSyncAlt,
    faBackward,
    faPlay,
    faPause,
    faStop,
    faForward,
    faVolumeUp,
    faVolumeMute,
    faTimes,
    faCopy,
    faEllipsisH,
    faEllipsisV } from '@fortawesome/free-solid-svg-icons'
    
it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<SortDropdown/>,div)
  ReactDOM.unmountComponentAtNode(div)
})