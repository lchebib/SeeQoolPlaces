import React from 'react';
import { Layout, Row, Col, Card, Button, Divider, Cascader } from 'antd';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BuzzFeedQuiz } from "react-buzzfeed-quiz";
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

function onChange(value) {
  console.log(value);
}

// how do we write a function that maps our cities and states into the options variable?
class QuizPageSelectCity extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      options: [],
      selectedCity: ""
    }

    // this.onSurpriseMe = this.onSurpriseMe.bind(this)
  }

  // onSurpriseMe() {
  //   getRandomCity().then(res => {
  //     this.setState({ randomCity: res.results })
  //   })
  // }


  // componentDidMount() {
  //   getRandomCity().then(res => {
  //     this.setState({ randomCity: res.results })
  //   })
  // }


  render() {
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
                  <Cascader options={options} onChange={onChange} placeholder="select city" />
                  <br />
                  <br />
                  <Button href={"/quiz2"} size='large' shape='round' style={{ background: 'white', color: 'black', border: 'none' }}>Done</Button>

                </Card>


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
