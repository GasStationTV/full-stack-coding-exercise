import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { RaisedButton  } from 'material-ui';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Routes from './routes';
class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router routes={Routes} />
        <div>
          <RaisedButton label="testing..."/>
        </div>
      </MuiThemeProvider>
    );
  }
}
export default App;
