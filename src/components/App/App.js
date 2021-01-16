import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Header from '../Header/Header'

class App extends React.Component {
  render(){
    return (
      <>
      <header>
        <Header />
      </header>
      <main className='App'>
      
      </main>
      </>
    );
  }
}

export default App;