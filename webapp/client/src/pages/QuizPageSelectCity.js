import React from 'react';
import { Layout, Row, Col, Card, Button, Divider, Cascader, ArrowLeftOutlined } from 'antd';
import {
  LeftSquareOutlined
} from '@ant-design/icons';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BuzzFeedQuiz } from "react-buzzfeed-quiz";
import { getAllCities } from '../fetcher';
import "react-buzzfeed-quiz/lib/styles.css";

const { Content } = Layout;

const options = [
  {
    value: 'california',
    label: 'California',
    children: [
      {
        value: 'joshua tree',
        label: 'Joshua Tree',
      },
      {
        value: 'big sur',
        label: 'Big Sur',
      },
    ],
  },
  {
    value: 'british columbia',
    label: 'British Columbia',
    children: [
      {
        value: 'vancouver',
        label: 'Vancouver',
      },
    ],
  },
];


// how do we write a function that maps our cities and states into the options variable?
class QuizPageSelectCity extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      options: [],
      selectedCity: "",
      buttonStatus: false,
    }

    // this.onSurpriseMe = this.onSurpriseMe.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  // onSurpriseMe() {
  //   getRandomCity().then(res => {
  //     this.setState({ randomCity: res.results })
  //   })
  // }

  onChange() {
    this.setState({ buttonStatus: true })
  }

  componentDidMount() {
    getAllCities().then(res => {
      this.setState({ options: res.results })
    })
  }


  // function makeOptions(arr) {

  // }


  render() {

    const enableButton = () => {
      if (this.state.buttonStatus === true) {
        return <Button href={"/quiz2"} size='large' shape='round' style={{ background: 'white', color: 'black', border: 'none' }}>Done</Button>
      }
      return <Button disabled href={"/quiz2"} size='large' shape='round' style={{ background: 'grey', color: 'black', border: 'none' }}>Done</Button>
    }



    return (
      <Layout>
        <SideBar />
        <Layout className='layout' style={{ background: 'white', marginLeft: 200 }}>
          <Header />

          <Content align='middle' justify='center' style={{ margin: '24px 24px 0', overflow: 'initial', textAlign: 'center' }}>

            <Row align='middle' justify='center'>

              <Col>

                <div style={{ fontFamily: 'Work Sans', fontSize: '4vh' }}>Find city.</div>
                <Card style={{
                  border: '1px solid #000',
                  margin: '10px',
                  background: 'black',
                  height: '50vh',
                  width: '60vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                }}>
                  <div style={{ fontFamily: 'Work Sans', fontSize: '3vh' }}>
                    Great!
                    <br />
                    <br />
                    Go ahead and tell us which city.
                  </div>
                  <Cascader options={options} onChange={this.onChange} placeholder="Select City" />
                  <br />
                  <br />
                  {/* <Button {...this.state.buttonStatus} href={"/quiz2"} size='large' shape='round' style={{ background: 'white', color: 'black', border: 'none' }}>Done</Button> */}
                  {enableButton()}
                </Card>
                <a href="./quiz" style={{ color: "black" }}>
                  <div className="icons-list">
                    <LeftSquareOutlined /> Go Back
                  </div>
                </a>
                <br />
                <br />




              </Col>
            </Row>
          </Content>

          <Footer />
        </Layout>
      </Layout >
    );
  }
}

export default QuizPageSelectCity
