import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TripPage from './pages/TripPage';
import ActivitiesPage from './pages/ActivitiesPage';
import SchedulePage from './pages/SchedulePage';
import 'antd/dist/antd.css';
import './index.less';


ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact
							path="/"
							render={() => (
								<LandingPage />
							)}/>
        <Route exact
							path="/createtrip"
							render={() => (
								<TripPage />
							)}/>
        <Route exact
							path="/pickactivities"
							render={() => (
								<ActivitiesPage />
							)}/>
				<Route exact
							path="/makeschedule"
							render={() => (
								<SchedulePage />
							)}/>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

