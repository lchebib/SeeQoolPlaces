import React from 'react';
import { Cascader } from 'antd';
import { getAllCities } from '../fetcher'


/**
 * @description Helper function that takes in an array of city/state objects and converts it to an array of city/state arrays
 * @param {Array} arr Array of objects [{state: "state", city: "city"}, ...]
 * @return {Array} Array of state objects, where each state has a children property that contain all the cities within that state
 * [
 *    {
 *      value: "BC",
 *      label: "BC",
 *      childen: [[value: "city", label: "city"], ...]
 *    },
 *    {
 *      value: "CA",
 *      label: "CA",
 *      childen: [[value: "city", label: "city"], ...]
 *    },
 * ]
 */
const makeOptions = (arr) => {

	if (!Array.isArray(arr)) {
		return [];
	}

	let result = [
		{
			value: 'CA',
			label: 'CA',
			children: []
		},
		{
			value: 'BC',
			label: 'BC',
			children: []
		}];


	arr.forEach(obj => {
		let cityArr = Object.entries(obj);
		let cityObj = { value: cityArr[1][1], label: cityArr[1][1] };
		// console.log(cityArr);
		// console.log(cityObj);
		if (cityArr[0][1] === "CA") {
			result[0].children.push(cityObj);
		} else {
			result[1].children.push(cityObj);
		}
	});
	// console.log(result)
	return result;
}


/**
 * @name DestinationCascader
 * @description Dropdown menu of cities
 * 
 * PROPS
 * @name defaultValue (optional)
 * @description Array taken in from props as [state, city] that the cascader sets itself to. 
 * If defaultValue changes then what appears in the cascader changes.
 * 
 * @name onChange
 * @description Callback function when the value [state, city] changes.
 * @param value Array of strings [state, city]
 * 
 * APPEARS IN:
 * QuizSelectCityPage
 * CreateTripPage
 */

class DestinationCascader extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			options: [], // States and cities
		}
	}

	componentDidMount() {

		// Fetch states and cities from database
		getAllCities().then(res => {
			this.setState({ options: makeOptions(res.results) })
			// console.log(this.state.options)
		})
	}

	render() {
		console.log(this.props.value)

		return (
			<Cascader options={this.state.options} onChange={this.props.onChange} value={this.props.defaultValue} placeholder="Select City" />
		);
	}
}

export default DestinationCascader