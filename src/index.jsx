import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

// Main component (will eventually use all the others)
class MyMusicMoviesApplicationv2 extends React.Component {
  render() {
    return (
      <div className="my-flix">
        <div>Good morning</div>
      </div>
    );
  }
}

const container = document.getElementsByClassName('app-container')[0];

// Tells React to render app in the root DOM element
ReactDOM.render(React.createElement(MyMusicMoviesApplicationv2), container);