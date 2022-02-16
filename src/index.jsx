import React from 'react';
import ReactDOM from 'react-dom';

import { MainView } from './components/main-view/main-view';

import Container from 'react-bootstrap/Container';

import './index.scss';

class MyMusicMoviesApplicationv2 extends React.Component {
  render() {
    return (
      <Container className='bg-dark'>
        <MainView />
      </Container>);
  }
}

const container = document.getElementsByClassName('app-container')[0];

// Tells React to render app in root DOM element
ReactDOM.render(React.createElement(MyMusicMoviesApplicationv2), container);