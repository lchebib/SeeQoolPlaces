import React from 'react';
import { Cascader } from 'antd';
import { getAllCities } from '../fetcher'

// const makeAutoFill = (str) => {
//   // if ()
//   let arr = str.split(',');
//   let state;
//   let city = arr[1].toLowerCase();
//   if (arr[0] == 'california') {
//     state = 'california';
//   } else {
//     state = 'british columbia';
//   }
//   arr = [state, city];
//   return arr;
// }

// const options2 = makeOptions(getAllCities());

// function filter(inputValue, path) {
//   return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
// }



const makeOptions = (arr) => {
  var arr = arr.results

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
    // console.log(cityArr);
    // let cityObj = { value: cityArr[1][1], label: cityArr[1][1], population: cityArr[2][1] };
    let cityObj = { value: cityArr[1][1], label: cityArr[1][1] };
    // console.log(cityArr);
    // console.log(cityObj);
    if (cityArr[0][1] === "CA") {
      result[0].children.push(cityObj);
    } else {
      result[1].children.push(cityObj);
    }
  });
  console.log(result)
  return result;
}

class DestinationCascader extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      options: [],
    }
  }

  componentDidMount() {
    getAllCities().then(res => {
      this.setState({ options: makeOptions(res) })
      // console.log(this.state.options)
    })
  }

  render() {

    return (
      <Cascader options={this.state.options} onChange={this.props.onChange} defaultValue={this.props.defaultValue} placeholder="Select City" />
    );
  }
}

export default DestinationCascader