import React from 'react'

import ReactDOM from 'react-dom'

import renderer from 'react-test-renderer'

import Table from './Table'


it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<Table/>,div)
  ReactDOM.unmountComponentAtNode(div)
})