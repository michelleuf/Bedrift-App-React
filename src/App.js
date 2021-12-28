import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
 
import Home from './containers/Home';
import Login from './containers/Login';
import Auth   from './containers/Authentication'
import Plants   from './containers/Plants'

function App() {
  return (
    <div className="App">
       <Router>
        <Switch> 
          <Route path="/" exact component={Home} />  
          <Route path="/auth" exact component={Login} />
          <Route path="/redirect" exact component={Auth} />  
          <Route path="/plants" exact component={Plants} />  
        </Switch>
      </Router>
    </div>
  ); 
}

export default App;
