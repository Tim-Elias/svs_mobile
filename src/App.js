import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import { withCookies } from 'react-cookie';
import HomeContainer from './home_container'

class App extends Component {
  render() {
  return (
    <div><HomeContainer cookies={this.props.cookies}/></div>
  );
}
}

export default withCookies(App);
