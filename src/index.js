import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './views/home-page';
import ReactNotifications from 'react-notifications-component';

require('./styles.scss');

class App extends React.Component {
  render() {
    return (
      <div>
        <ReactNotifications />
        <HomePage />
      </div>
    )
  }
};

ReactDOM.render(<App />, document.getElementById('root'));