import React from 'react'

import ReactDOM from 'react-dom'

import renderer from 'react-test-renderer'

import SearchSort from './SearchSort'


it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<SearchSort/>,div)
  ReactDOM.unmountComponentAtNode(div)
})