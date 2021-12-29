import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
 
import Home from './containers/Home';
import Login from './containers/Login';
import Token   from './containers/Authentication'
import Plants   from './containers/Plants'
import Bedrift from './containers/bedrift/layouts/Bedrift';
function App() {
  return (
    <div className="App">
       <Router>
        <Switch> 
          <Route path="/" exact component={Home} />  
          <Route path="/auth" exact component={Login} />
          <Route path="/redirect" exact component={Token} />  
          <Route path="/plants" exact component={Plants} />  
          <Route path="/bedrift" exact component={Bedrift} />
        </Switch>
      </Router>
    </div>
  ); 
}

export default App;
