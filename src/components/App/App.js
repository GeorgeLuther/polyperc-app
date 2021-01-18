import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Header from '../Header/Header'
import Landing from '../Landing/Landing'
import Workspace from '../Workspace/Workspace'
import Table from '../Table/Table'

class App extends React.Component {
  render(){
    return (
      <>
      <header>
        <Header />
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