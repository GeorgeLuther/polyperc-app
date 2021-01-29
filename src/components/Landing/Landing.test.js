import React from 'react'

import ReactDOM from 'react-dom'

import renderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom';

import Landing from './Landing'


it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<Router><Landing/></Router>,div)
  ReactDOM.unmountComponentAtNode(div)
})