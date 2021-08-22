import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import ExplorePage from './components/ExplorePage/ExplorePage';
import CustomPage from './components/CustomPage/CustomPage';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/custom">
          <CustomPage />
        </Route>
        <Route path="/exp">
          <ExplorePage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
