
import React, {Component} from 'react';
import {Provider} from 'react-redux'
import store from './src/Redux/Store/index'
import Routes from './src/Routes'

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
)

export default App;
