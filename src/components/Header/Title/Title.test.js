import React from 'react'

import ReactDOM from 'react-dom'

import renderer from 'react-test-renderer'

import Title from './Title'

//1) smoke tests confirm that a component will render without crashing.
//we'll put a dom element <div> into the component and insure that it works.
async () => {
  global.TONE_SILENCE_LOGGING = true;
};

it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<Title/>,div)
  ReactDOM.unmountComponentAtNode(div)
})