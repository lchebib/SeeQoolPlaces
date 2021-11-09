import React, { useState } from 'react';
import {
  Layout,
  Row,
  Col,
  ArrowLeftOutlined,
  Form,
  Input,
  Button,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  AutoComplete,
  Tooltip
} from 'antd';
import {
  LeftSquareOutlined
} from '@ant-design/icons';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllCities } from '../fetcher';

const { Content } = Layout;


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};


const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 8,
    },
  },
};

const personalities = [
  { label: 'coolCat', value: 'coolCat' },
  { label: 'adventurer', value: 'Adventurer' },
  { label: 'entertainer', value: 'Entertainer' },
  { label: 'family', value: 'Family' },
  { label: 'enthusiast', value: 'Enthusiast' },
  { label: 'investigator', value: 'Investigator' },
];

// const personalityTooltip = `
// Cool Cat: Your ideal night involves seeing your favorite band perform live or hitting up some local breweries. Also, you've probably worked as a barista at some point in life.\n
// Adventurer: You have an adventurous spirit, and love to get lost and explore whether its a bustling city or the middle of the woods.n
// Entertainer: You enjoy the finer things in life and your bucket-list includes a 3 Michelin star restaurant.\n
// Family: You enjoy seeing others happy. What more is there than spending quality time with loved ones.\n
// Enthusiast: You tend to go with the flow and you're up for anything that sounds fun.\n 
// Investigator: You get to know a city by the stories of it's past. You're just happy when you're learning.\n
// `

const personalityTooltip = "Let us get to know you so we can recommend some activities you're guaranteed to enjoy. Take the Trip Quiz to find out your travel personality!"

const descriptions =
{
  coolCat: "Your ideal night involves seeing your favorite band perform live or hitting up some local breweries. Also, you've probably worked as a barista at some point in life.",
  adventurer: "You have an adventurous spirit, and love to get lost and explore whether its a bustling city or the middle of the woods. ",
  entertainer: "You enjoy the finer things in life and your bucket-list includes a 3 Michelin star restaurant.",
  family: "You want to spend quality time with loved ones. ",
  enthusiast: "You tend to go with the flow and you're up for anything that sounds fun.",
  investigator: "You get to know a city by the stories of it's past. You're just happy when you're learning. "
}


const makeAutoFill = (str) => {
  // if ()
  let arr = str.split(',');
  let state;
  let city = arr[1].toLowerCase();
  if (arr[0] == 'california') {
    state = 'california';
  } else {
    state = 'british columbia';
  }
  arr = [state, city];
  return arr;
}

const makeOptions = (arr) => {
  if (!Array.isArray(arr)) {
    return [];
  }
  let result = [
    {
      value: 'california',
      label: 'California',
      children: []
    },
    {
      value: 'british columbia',
      label: 'British Columbia',
      children: []
    }];
  arr.forEach(obj => {
    let cityArr = Object.entries(obj);
    let cityObj = { value: cityArr[1][1].toLowerCase(), label: cityArr[1][1] };
    // console.log(cityObj['value']);
    // console.log(cityObj['label']);
    if (cityArr[0][1] === "CA") {
      result[0].children.push(cityObj);
    } else {
      result[1].children.push(cityObj);
    }
  });
  return result;
}

// const options2 = makeOptions(getAllCities());

function filter(inputValue, path) {
  return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
}






class CreateTripPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      buttonStatus: false,
      options: [],
      selectedDest: localStorage.getItem('selectedDest') ? JSON.parse(localStorage.getItem('selectedDest')) : [],
      defaultDest: localStorage.getItem('selectedDest') ? JSON.parse((localStorage.getItem('selectedDest')).toLowerCase()) : [],
      selectedPersonalities: {},
      //   coolCat: localStorage.getItem('coolCat') === 'true',
      //   adventurer: localStorage.getItem('adventurer') === 'true',
      //   entertainer: localStorage.getItem('entertainer') === 'true',
      //   family: localStorage.getItem('family') === 'true',
      //   enthusiast: localStorage.getItem('enthusiast') === 'true',
      //   investigator: localStorage.getItem('investigator') === 'true',
      // },
      defaultPersonalities: [],
    }

    this.onCheckConfirmDetails = this.onCheckConfirmDetails.bind(this)
    this.clickNextPage = this.clickNextPage.bind(this)



  }

  clickNextPage() {
    window.location = '/activities';
  }


  componentDidMount() {
    console.log(this.state.defaultDest);
    getAllCities().then(res => {
      this.setState({ options: makeOptions(res) })
      // console.log(this.state.selectedDest);
      // console.log(this.state.autoFill);

    })


    if (localStorage.getItem('selectedPersonalities')) {
      this.setState({ selectedPersonalities: JSON.parse(localStorage.getItem('selectedPersonalities')) })
      var persArray = []
      for (const [key, value] of Object.entries(this.state.selectedPersonalities)) {
        if (value === true) {
          persArray.push(key)
        }
      }
      this.setState({ defaultPersonalities: persArray })
    }


    console.log(this.state.selectedDest)
    console.log(this.state.defaultDest)
    // console.log(this.state.selectedPersonalities)
    // console.log(this.state.defaultPersonalities)

  }

  onCheckConfirmDetails = e => {
    this.setState({
      buttonStatus: e.target.checked,
    });
  };



  render() {

    const enableButton = () => {
      if (this.state.buttonStatus === true) {
        return <Button type='primary' htmlType="submit" shape='round' size='large' style={{ border: 'none', background: 'black', color: 'white' }}>Create Trip</Button>
      }
      return <Button disabled type='primary' shape='round' size='large' style={{ border: 'none', }}>Create Trip</Button>
    }


    return (
      <Layout>
        <SideBar />
        <Layout className='layout' style={{ background: 'white', marginLeft: 200 }}>
          <Header />

          <Content style={{ margin: '24px 24px 0', overflow: 'initial' }}>

            <Row justify='center'>

              <Col>

                <div style={{ fontFamily: 'Work Sans', textAlign: 'center' }}>
                  <div style={{ fontSize: '4vw' }}>Create trip.</div>
                  <br />
                  <div style={{ fontSize: '2vw' }}>Enter in details below to describe your trip.</div>
                </div>


                <div style={{ marginTop: '50px' }}>
                  <Form
                    {...formItemLayout}
                    onFinish={this.clickNextPage}
                    initialValues={{
                      destination: this.state.defaultDest,
                      // destination: ['california', 'big sur'],
                      personalities: this.state.defaultPersonalities
                    }}
                  >
                    <Form.Item
                      name="name"
                      label="Trip Name"
                      rules={[
                        // {
                        //   type: 'nameAlreadyExists',
                        //   message: 'Trip name already exists!',
                        // },
                        {
                          required: true,
                          message: 'Please enter a trip name!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="destination"
                      label="Destination"
                      rules={[
                        { type: 'array', required: true, message: 'Please select your destination!' },
                      ]}
                    >
                      <Cascader options={this.state.options} onChange={this.onChange} showSearch={{ filter }} placeholder="Select City" />
                    </Form.Item>

                    <Form.Item
                      name="personalities"
                      label="Travel Personality"
                      tooltip={personalityTooltip}
                    >

                      <Checkbox.Group
                        // onChange={this.onCheck}
                        style={{ width: '100%' }}
                      >
                        <Row>
                          <Col span={8}>
                            <Checkbox value="coolCat">Cool Cat</Checkbox>
                          </Col>
                          <Col span={8}>
                            <Checkbox value="entertainer">Entertainer</Checkbox>
                          </Col>
                          <Col span={8}>
                            <Checkbox value="enthusiast">Enthusiast</Checkbox>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={8}>
                            <Checkbox value="adventurer">Adventurer</Checkbox>
                          </Col>
                          <Col span={8}>
                            <Checkbox value="family">Family</Checkbox>
                          </Col>
                          <Col span={8}>
                            <Checkbox value="investigator">Investigator</Checkbox>
                          </Col>
                        </Row>
                      </Checkbox.Group>


                    </Form.Item>

                    <Row justify="space-around" align="middle" style={{ textAlign: 'center' }}>
                      <Col>
                        <Form.Item
                          name="confirm"
                          valuePropName="checked"
                          rules={[
                            {
                              validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Check me to confirm your trip details!')),
                            },
                          ]}
                        >
                          <Checkbox onChange={this.onCheckConfirmDetails} >
                            I love these details! Save this trip under My Trips.
                          </Checkbox>
                        </Form.Item>

                        <Form.Item
                        >
                          {enableButton()}

                        </Form.Item>
                        <Form.Item
                        >
                          <a href="./quiz" style={{ color: "black", marginTop: '50 px', marginBottom: '50 px' }}>
                            <LeftSquareOutlined /> Go Back
                          </a>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>


                </div>


              </Col>
            </Row>
          </Content>

          <Footer />
        </Layout>
      </Layout >
    );
  }
}

export default CreateTripPage

