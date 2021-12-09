import React from 'react'
import { Layout, Row, Col, Card, Button } from 'antd'
import { LeftSquareOutlined } from '@ant-design/icons'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DestinationCascader from '../components/DestinationCascader';
import 'react-buzzfeed-quiz/lib/styles.css'

const { Content } = Layout

class QuizSelectCityPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      buttonStatus: false,
      selectedDest: []
    }
    this.onDestChange = this.onDestChange.bind(this)
    this.onClickNextPage = this.onClickNextPage.bind(this)
  }
  onClickNextPage() {
    localStorage.setItem('selectedDest', JSON.stringify(this.state.selectedDest))
    window.location = '/quiz2'
  }
  onDestChange(value) {
    this.setState({ buttonStatus: true })
    this.setState({ selectedDest: value })
    console.log(value)
  }

  render() {

    const enableButton = () => {
      if (this.state.buttonStatus === true) {
        return (
          <Button
            onClick={this.onClickNextPage}
            size='large'
            shape='round'
            style={{ background: 'white', color: 'black', border: 'none' }}
          >
            Done
          </Button>
        )
      }
      return (
        <Button
          disabled
          size='large'
          shape='round'
          style={{ background: 'grey', color: 'black', border: 'none' }}
        >
          Done
        </Button>
      )
    }

    return (
      <Layout>
        <SideBar />
        <Layout
          className='layout'
          style={{ background: 'white', marginLeft: 200 }}
        >
          <Header />
          <Content
            align='middle'
            justify='center'
            style={{
              margin: '24px 24px 0',
              overflow: 'initial',
              textAlign: 'center'
            }}
          >
            <Row align='middle' justify='center'>
              <Col>
                <div style={{ fontFamily: 'Work Sans', fontSize: '4vh' }}>
                  Find city.
                </div>
                <Card
                  style={{
                    border: '1px solid #000',
                    margin: '10px',
                    background: 'black',
                    height: '50vh',
                    width: '60vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white'
                  }}
                >
                  <div style={{ fontFamily: 'Work Sans', fontSize: '3vh' }}>
                    Great!
                    <br />
                    <br />
                    Go ahead and tell us which city.
                    <br />
                    <br />
                  </div>
                  <DestinationCascader defaultValue={this.state.selectedDest} onChange={this.onDestChange} style={{ width: '60%' }} />

                  <br />
                  <br />
                  {enableButton()}
                </Card>
                <a href='./quiz' style={{ color: 'black' }}>
                  <LeftSquareOutlined /> Go Back
                </a>
                <br />
                <br />
              </Col>
            </Row>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    )
  }
}
export default QuizSelectCityPage
