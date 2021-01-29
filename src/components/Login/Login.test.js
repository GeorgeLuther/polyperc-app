import React from 'react'

import ReactDOM from 'react-dom'

import renderer from 'react-test-renderer'

import Login from './Login'

//1) smoke tests confirm that a component will render without crashing.
//we'll put a dom element <div> into the component and insure that it works.


it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<Login/>,div)
  ReactDOM.unmountComponentAtNode(div)
})