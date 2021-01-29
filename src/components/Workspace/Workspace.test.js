import React from 'react'

import ReactDOM from 'react-dom'

import renderer from 'react-test-renderer'

import Workspace from './Workspace'


it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<Workspace/>,div)
  ReactDOM.unmountComponentAtNode(div)
})