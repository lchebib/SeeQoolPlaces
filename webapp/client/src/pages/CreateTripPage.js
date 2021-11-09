import React from 'react';
import {
  Layout,
  Row,
  Col,
  Form,
  Input,
  Button,
  Cascader,
  Checkbox,
} from 'antd';
import {
  LeftSquareOutlined
} from '@ant-design/icons';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllCities } from '../fetcher';
import { postCreateTrip } from '../fetcher'


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


const personalities = [
  { label: 'coolCat', value: 'coolCat' },
  { label: 'adventurer', value: 'Adventurer' },
  { label: 'entertainer', value: 'Entertainer' },
  { label: 'family', value: 'Family' },
  { label: 'enthusiast', value: 'Enthusiast' },
  { label: 'investigator', value: 'Investigator' },
];


const personalityTooltip = "Let us get to know you so we can recommend some activities you're guaranteed to enjoy. Take the Trip Quiz to find out your travel personality!"

// const descriptions =
// {
//   coolCat: "Your ideal night involves seeing your favorite band perform live or hitting up some local breweries. Also, you've probably worked as a barista at some point in life.",
//   adventurer: "You have an adventurous spirit, and love to get lost and explore whether its a bustling city or the middle of the woods. ",
//   entertainer: "You enjoy the finer things in life and your bucket-list includes a 3 Michelin star restaurant.",
//   family: "You want to spend quality time with loved ones. ",
//   enthusiast: "You tend to go with the flow and you're up for anything that sounds fun.",
//   investigator: "You get to know a city by the stories of it's past. You're just happy when you're learning. "
// }


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
      selectedPersonalities: localStorage.getItem('selectedPersonalities') ? JSON.parse((localStorage.getItem('selectedPersonalities')).toLowerCase()) : {},
      defaultPersonalities: [],
      tripName: "",
      tripNameValidateStatus: { validateStatus: "", errorMsg: "" }
    }

    this.onCheckConfirmDetails = this.onCheckConfirmDetails.bind(this)
    this.clickNextPage = this.clickNextPage.bind(this)
    this.createTrip = this.createTrip.bind(this)
    this.onPersonalitiesChange = this.onPersonalitiesChange.bind(this)
    this.onDestChange = this.onDestChange.bind(this)
    this.onTripNameChange = this.onTripNameChange.bind(this)

  }

  onDestChange(value) {
    this.setState({ selectedDest: value });
  }


  onPersonalitiesChange(checkedValue) {
    this.setState({ selectedPersonalities: checkedValue });
  }

  onTripNameChange(e) {

    // var storedTrips = localStorage.getItem("trips")
    // console.log(typeof storedTrips)
    // if (typeof storedTrips === "string") {
    //   var trips = JSON.parse(localStorage.getItem("trips"))
    // } else {
    //   var trips = localStorage.getItem("trips")
    // }

    // console.log(trips)

    // var tripsExist = trips ? trips : null
    // console.log(tripsExist)

    // if (trips) {
    //   tripsExist.map((trip) => {
    //     if (trip.name == name) {
    //       this.tripNameValidateStatus = { validateStatus: "Trip name already exists. Please choose a unique name ", errorMsg: "error" }
    //       return
    //     }
    //   })
    // }
    var name = e.target.value
    this.state.tripName = name
  }


  createTrip() {

    var tripDetails = { name: this.state.tripName, selectedDest: this.state.selectedDest, selectedPersonalities: this.state.selectedPersonalities }
    console.log(tripDetails)
    postCreateTrip(tripDetails)

    var trips = JSON.parse(localStorage.getItem("trips"))
    var newTrips = trips ? trips : []
    newTrips.push(tripDetails)
    JSON.stringify(localStorage.setItem("trips", newTrips))

    // this.clickNextPage()
  }


  clickNextPage() {
    window.location = '/activities';
  }


  componentDidMount() {
    getAllCities().then(res => {
      this.setState({ options: makeOptions(res) })

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
                    onFinish={this.createTrip}
                    initialValues={{
                      destination: this.state.defaultDest,
                      personalities: this.state.defaultPersonalities
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
                      <Cascader options={this.state.options} onChange={this.onDestChange} showSearch={{ filter }} placeholder="Select City" />
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

