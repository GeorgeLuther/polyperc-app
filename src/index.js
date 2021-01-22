import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

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

import App from './components/App/App';
import './index.css';

library.add(
    faPlus,
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
    faEllipsisV,
)

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
document.getElementById('root'));