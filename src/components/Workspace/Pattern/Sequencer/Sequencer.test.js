import React from 'react'

import ReactDOM from 'react-dom'

import renderer from 'react-test-renderer'

import Sequencer from './Sequencer'


it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<Sequencer pattern={[1,0,1,0,1]}/>,div)
  ReactDOM.unmountComponentAtNode(div)
})