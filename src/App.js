import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ExplorePage from './components/ExplorePage';
import InfoPage from './components/InfoPage';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/exp">
          <ExplorePage />
        </Route>
        <Route path="/info">
          <InfoPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
