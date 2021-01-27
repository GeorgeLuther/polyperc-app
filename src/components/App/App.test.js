import React from 'react'

import ReactDOM from 'react-dom'

import renderer from 'react-test-renderer'

import App from './App'

//1) smoke tests confirm that a component will render without crashing.
//we'll put a dom element <div> into the component and insure that it works.

it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<App/>,div)
  ReactDOM.unmountComponentAtNode(div)
})