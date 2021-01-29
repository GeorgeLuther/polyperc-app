import React from 'react'

import ReactDOM from 'react-dom'

import renderer from 'react-test-renderer'

import ClickOutsideWrapper from './ClickOutsideWrapper'


it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<ClickOutsideWrapper><div></div></ClickOutsideWrapper>,div)
  ReactDOM.unmountComponentAtNode(div)
})