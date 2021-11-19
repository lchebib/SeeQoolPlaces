import React from 'react';
import { Layout, Row, Col, Card, Button, Cascader } from 'antd';
import { LeftSquareOutlined } from '@ant-design/icons';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllCities } from '../fetcher';
import "react-buzzfeed-quiz/lib/styles.css";

const { Content } = Layout;



const makeOptions = (arr) => {
  if (!Array.isArray(arr)) {
    return [];
  }
  let result = [
    {
      value: 'california',
      label: 'California',
      code: 'CA',
      children: []
    },
    {
      value: 'british columbia',
      label: 'British Columbia',
      code: 'CA',
      children: []
    }];
  arr.forEach(obj => {
    let cityArr = Object.entries(obj);
    let cityObj = { value: cityArr[1][1], label: cityArr[1][1] };
    console.log(cityObj['value']);
    console.log(cityObj['label']);
    if (cityArr[0][1] === "CA") {
      result[0].children.push(cityObj);
    } else {
      result[1].children.push(cityObj);
    }
  });
  return result;
}

function filter(inputValue, path) {
  return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
}


// how do we write a function that maps our cities and states into the options variable?
class QuizSelectCityPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      options: [],
      buttonStatus: false,
      selectedDest: []
    }
    this.onChange = this.onChange.bind(this);
    this.onClickNextPage = this.onClickNextPage.bind(this);

  }
  onClickNextPage() {
    localStorage.setItem('selectedDest', JSON.stringify(this.state.selectedDest));
    window.location = "/quiz2"

  }
  onChange(value) {
    this.setState({ buttonStatus: true });
    this.setState({ selectedDest: value });
    console.log(value);
  }

  componentDidMount() {
    getAllCities().then(res => {
      this.setState({ options: makeOptions(res) })
    })
  }


  render() {

    const enableButton = () => {
      if (this.state.buttonStatus === true) {
        return <Button onClick={this.onClickNextPage} size='large' shape='round' style={{ background: 'white', color: 'black', border: 'none' }}>Done</Button>
      }
      return <Button disabled size='large' shape='round' style={{ background: 'grey', color: 'black', border: 'none' }}>Done</Button>
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
                    <br />
                    <br />
                  </div>
                  <Cascader options={this.state.options} onChange={this.onChange} showSearch={{ filter }} placeholder="Select City" style={{ width: '60%' }} />
                  <br />
                  <br />
                  {enableButton()}
                </Card>
                <a href="./quiz" style={{ color: "black" }}>
                  <LeftSquareOutlined /> Go Back
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
export default QuizSelectCityPage
