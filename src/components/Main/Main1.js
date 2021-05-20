import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from '../Login-form';
import RegistrationForm from '../Registation-form';
import Map from '../Map';
import AddNewTreeForm from '../AddNewTreeForm';
import Home from '../Home';
import MyTrees from '../MyTrees';

export default class Main extends Component {
  render() {
    const url = "https://ekb-trees-help.ru/api/tree-map-info/get-in-region?x1=56&y1=60&x2=57&y2=61"
    return (
      <main>
        <Switch>
          <Route exact path='/' component={LoginForm} />
          <Route exact path='/registration' component={RegistrationForm} />
          <Route exact path='/map'
            render={props => <Map url={url} {...props} />}
          />
          <Route exact path='/addtree' component={AddNewTreeForm} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/myTrees' component={MyTrees} />
        </Switch>
      </main>
    )
  }
}