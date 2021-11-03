import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import QuizPage0 from './pages/QuizPage0';
import QuizPage1 from './pages/QuizPage1';
import QuizPage2 from './pages/QuizPage2';
import CreateTripPage from './pages/CreateTripPage';
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

