import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
 
import Login from './containers/Login';
import Token   from './containers/Authentication'
import Bedrift from './containers/bedrift/layouts/Bedrift';


function App() {
  return (
    <div className="App">
       <Router>
        <Switch> 
          <Route path="/" exact component={Login} />  
          <Route path="/redirect" exact component={Token} />  
          <Route path="/bedrift" component={Bedrift} />
        </Switch>
      </Router>
    </div>
  ); 
}

export default App;
