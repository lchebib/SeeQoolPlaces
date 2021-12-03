import React from 'react';
import {
  Layout,
  Row,
  Col,
  Form,
  Input,
  Button,
  Checkbox,
  DatePicker,
} from 'antd';

import { LeftSquareOutlined } from '@ant-design/icons';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DestinationCascader from '../components/DestinationCascader';
import { newTrip } from '../fetcher'

const { Content } = Layout;
const { RangePicker } = DatePicker;
var moment = require('moment'); // require

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

const personalityTooltip = "Let us get to know you so we can recommend some activities you're guaranteed to enjoy. Take the Trip Quiz to find out your travel personality!"

class CreateTripPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      buttonStatus: false,
      options: [],
      selectedDest: [],
      selectedPersonalities: { coolCat: 0, adventurer: 0, entertainer: 0, family: 0, enthusiast: 0, investigator: 0 },
      tripName: "",
      tripNameValidateStatus: { validateStatus: "", errorMsg: "" },
      startDate: null,
      endDate: null
    }

    this.onCheckConfirmDetails = this.onCheckConfirmDetails.bind(this)
    this.clickNextPage = this.clickNextPage.bind(this)
    this.createTrip = this.createTrip.bind(this)
    this.onPersonalitiesChange = this.onPersonalitiesChange.bind(this)
    this.onDestChange = this.onDestChange.bind(this)
    this.onTripNameChange = this.onTripNameChange.bind(this)
    this.storeTrip = this.storeTrip.bind(this)
    this.setDate = this.setDate.bind(this)
  }

  onDestChange(value) {
    this.setState({ selectedDest: value });
  }

  onPersonalitiesChange(checkedValue) {
    checkedValue.forEach(personality => {
      this.state.selectedPersonalities[personality] = 1
    });
  }

  onTripNameChange(e) {
    var name = e.target.value
    this.state.tripName = name
  }

  createTrip() {

    var username = localStorage.getItem("username")
    var tripID

    var numPersonalities = 0;
    Object.values(this.state.selectedPersonalities).forEach(val => {
      if (val == 1) { numPersonalities++; }
    });

    if (numPersonalities == 0) {
      this.state.selectedPersonalities.enthusiast = 1;
    }

    newTrip(
      username,
      this.state.tripName,
      this.state.selectedDest[1],
      this.state.selectedDest[0],
      this.state.startDate,
      this.state.endDate,
      this.state.selectedPersonalities.coolCat,
      this.state.selectedPersonalities.adventurer,
      this.state.selectedPersonalities.entertainer,
      this.state.selectedPersonalities.family,
      this.state.selectedPersonalities.enthusiast,
      this.state.selectedPersonalities.investigator,
    ).then(res => {
      tripID = res.results
      console.log(tripID);
      this.storeTrip(tripID)
      this.clickNextPage(tripID)
    })
  }

  setDate(dateArr) {
    var start = moment(dateArr[0]).format("YYYY-MM-DD");
    var end = moment(dateArr[1]).format("YYYY-MM-DD");
    this.setState({ startDate: start, endDate: end })
  }

  storeTrip(tripID) {
    let tripDetails = {
      tripID: tripID,
      tripName: this.state.tripName,
      city: this.state.selectedDest[1],
      state: this.state.selectedDest[0],
      startDate: this.state.startDate,
      endDate: this.state.endDate
    }

    localStorage.setItem(tripDetails.tripID, JSON.stringify(tripDetails))
  }

  clickNextPage(tripID) {
    console.log(tripID)
    window.location = `/trip?id=${tripID}`;
  }

  componentWillMount() {
    this.setState({ selectedDest: localStorage.getItem('selectedDest') ? JSON.parse(localStorage.getItem('selectedDest')) : [] })
    this.setState({ selectedPersonalities: localStorage.getItem('selectedPersonalities') ? JSON.parse(localStorage.getItem('selectedPersonalities')) : {} })
  }

  onCheckConfirmDetails(e) {
    this.setState({ buttonStatus: e.target.checked });
  }

  render() {

    console.log(this.state.selectedDest)

    const defaultPersonalities = () => {
      if (this.state.selectedPersonalities) {
        var persArray = []
        for (const [key, value] of Object.entries(this.state.selectedPersonalities)) {
          if (value === 1) {
            persArray.push(key)
          }
        }
      }
      return persArray
    }

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
                    onFinish={this.createTrip}
                    initialValues={{
                      destination: this.state.selectedDest,
                      personalities: defaultPersonalities()
                    }}
                  >
                    <Form.Item
                      name="name"
                      label="Trip Name"
                      validateStatus={this.state.tripNameValidateStatus.errorMsg}
                      rules={[
                        {
                          required: true,
                          message: 'Please enter a trip name!',
                        },
                      ]}
                    >
                      <Input onChange={this.onTripNameChange} />
                    </Form.Item>

                    <Form.Item
                      name="destination"
                      label="Destination"
                      rules={[
                        { type: 'array', required: true, message: 'Please select your destination!' },
                      ]}
                    >
                      <DestinationCascader defaultValue={this.state.selectedDest} onChange={this.onDestChange} />
                    </Form.Item>

                    <Form.Item
                      name="dates"
                      label="Trip Dates"
                      rules={[
                        { required: true, message: 'Please select your trip dates!' },
                      ]}
                    >
                      <RangePicker onChange={value => this.setDate(value)} />

                    </Form.Item>

                    <Form.Item
                      name="personalities"
                      label="Travel Personality"
                      tooltip={personalityTooltip}
                    >

                      <Checkbox.Group
                        style={{ width: '100%' }}
                        onChange={this.onPersonalitiesChange}
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

