import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import moviesApp from './reducers/reducers';
import MainView from './components/main-view/main-view';

import Container from 'react-bootstrap/Container';

import './index.scss';

// Create store
const store = createStore(moviesApp, devToolsEnhancer());
const persistor = persistStore(store);

class MyMusicMoviesApplicationv2 extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container className='bg-dark'>
          <PersistGate persistor={persistor}>
            <MainView />
          </PersistGate>
        </Container>
      </Provider>
    );
  }
}

// Finds root of the app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render app in root DOM element
ReactDOM.render(React.createElement(MyMusicMoviesApplicationv2), container);