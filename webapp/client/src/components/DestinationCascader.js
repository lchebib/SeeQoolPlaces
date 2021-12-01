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
  // console.log("got here");

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

  // let result = [
  //   {
  //     value: 'California',
  //     label: 'California',
  //     children: []
  //   },
  //   {
  //     value: 'British Columbia',
  //     label: 'British Columbia',
  //     children: []
  //   }];
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
  return result;
}

// function tempStateChanger(arr) {

//   if (arr[0] === 'CA') {
//     arr[0] = 'California';
//   } else {
//     arr[0] = 'British Columbia';
//   }
//   return arr;
// }

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
    })
  }

  render() {

    return (
      <Cascader options={this.state.options} onChange={this.props.onChange} defaultValue={this.props.defaultValue} placeholder="Select City" />
    );
  }
}

export default DestinationCascader