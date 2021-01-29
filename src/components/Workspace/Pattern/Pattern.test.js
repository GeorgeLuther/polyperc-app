import React from 'react'

import ReactDOM from 'react-dom'

import renderer from 'react-test-renderer'

import Pattern from './Pattern'


it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<Pattern/>,div)
  ReactDOM.unmountComponentAtNode(div)
})