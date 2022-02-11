import Home from './app/screens/Home';
import React from 'react';
import store from './app/store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;
