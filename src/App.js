import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import { ListUser } from './modules/user/ListUser/ListUser.js'
import { FormUser } from './modules/user/FormUser/FormUser.js'

//import { Button } from 'element-react';

import 'element-theme-default';

class App extends Component {
  render() {
    return (
      <div className="header">
        <Router>
          <div>
            <Route exact path="/" component={ListUser} />
            <Route path="/nuevo-usuario" component={FormUser} />
            <Route path="/editar-usuario/:id" component={FormUser} />;
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
