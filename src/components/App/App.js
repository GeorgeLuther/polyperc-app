import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Header from '../Header/Header'
import Landing from '../Landing/Landing'
import Workspace from '../Workspace/Workspace'
import Table from '../Table/Table'
import * as Tone from 'tone'
// import PatternsApiService from '../../services/patterns-api-service';

class App extends React.Component {
  //move ids here
  //or move all pattern objects in an array
  // and handlers here and put them in 
  // if so how do I avoid the added code of 
  //mapping functions bc of nested state?
  
  state={
    ids: []
  }
  
  // handleAddNew=()=>{
  //   // the add button has different functionality depending on the page
  //   if (window.location.pathname === '/workspace') {
  //       PatternsApiService.newEmptyPattern()
  //   }
  // }

  render(){

    //Web Audio Worker has a security feature (in Chrome):
    // requires user input before starting audio context
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
            component={Workspace}
            // render={()=>{
            //   return (<Workspace addNew={this.state.addNew}/>)}}
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