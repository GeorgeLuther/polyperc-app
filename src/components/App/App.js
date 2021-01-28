import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Header from '../Header/Header'
import Landing from '../Landing/Landing'
import Workspace from '../Workspace/Workspace'
import Table from '../Table/Table'
import * as Tone from 'tone'
class App extends React.Component {
  state={
    addNew: false
  }
  
  handleAddNew=()=>{
    this.setState({addNew: true}, this.setState({addNew: false}))
    console.log('tick, tick')
  }

  render(){

    //Web Audio Worker has a security feature (in Chrome) that requires user input before starting audio context
    document.documentElement.addEventListener('mousedown', () => {
      if (Tone.context.state !== 'running') Tone.start();
    });

    return (
      <>
      <header>
        <Header handleAddNew={this.handleAddNew}/>
      </header>
      <main className='App'>
        <Switch>
          <Route 
            exact path={'/'}
            component={Landing}
          />
          <Route 
            path={'/workspace'}
            render={()=>{
              return (<Workspace addNew={this.state.addNew}/>)}}
          />
          <Route 
            path={['/projects','/users']}
            component={Table}
          />
        </Switch>
      </main>
      </>
    );
  }
}

export default App;