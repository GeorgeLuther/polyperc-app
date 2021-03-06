import React from 'react'

import ReactDOM from 'react-dom'

import renderer from 'react-test-renderer'

import { MemoryRouter} from 'react-router-dom'

import App from './App'

import Tone from 'tone'

jest.mock('Tone')

it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<MemoryRouter>
    <App/>
    </MemoryRouter>,div)
  ReactDOM.unmountComponentAtNode(div)
})