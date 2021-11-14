import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import QuizPage0 from './pages/QuizPage0';
import QuizPage1 from './pages/QuizPage1';
import QuizSelectCityPage from './pages/QuizSelectCityPage';
import QuizPage2 from './pages/QuizPage2';
import CreateTripPage from './pages/CreateTripPage';
import TripPage from './pages/TripPage';
import 'antd/dist/antd.css';
import './index.less';

console.warn = console.error = () => { };

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact
          path="/"
          render={() => (
            <LandingPage />
          )} />
        <Route exact
          path="/home"
          render={() => (
            <HomePage />
          )} />
        <Route exact
          path="/quiz"
          render={() => (
            <QuizPage0 />
          )} />
        <Route exact
          path="/quiz1"
          render={() => (
            <QuizPage1 />
          )} />
        <Route exact
          path="/selectcity"
          render={() => (
            <QuizSelectCityPage />
          )} />
        <Route exact
          path="/quiz2"
          render={() => (
            <QuizPage2 />
          )} />
        <Route exact
          path="/createtrip"
          render={() => (
            <CreateTripPage />
          )} />
        <Route exact
          path="/trip"
          render={() => (
            <TripPage />
          )} />
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

