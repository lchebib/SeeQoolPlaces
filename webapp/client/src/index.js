import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import QuizPage0 from './pages/QuizPage0';
import QuizPage1 from './pages/QuizPage1';
import QuizPage2 from './pages/QuizPage2';
import CreateTripPage from './pages/CreateTripPage';
import ActivitiesPage from './pages/ActivitiesPage';
import SchedulePage from './pages/SchedulePage';
import 'antd/dist/antd.css';
import './index.less';
import QuizSelectCityPage from './pages/QuizSelectCityPage';

console.warn = console.error = () => { };

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact
          path="/"
          render={() => (
            <Home />
          )} />
        <Route exact
          path="/LandingPage"
          render={() => (
            <LandingPage />
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
          path="/activities"
          render={() => (
            <ActivitiesPage />
          )} />
        <Route exact
          path="/schedule"
          render={() => (
            <SchedulePage />
          )} />
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

