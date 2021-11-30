import React from 'react';
import { Layout, Row, Col } from 'antd';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Quiz';
import Quiz from '../components/Footer';
import { LeftSquareOutlined } from '@ant-design/icons';


const { Content } = Layout;



class QuizPage1 extends React.Component {

  constructor(props) {
    super(props)

  }

  render() {

    return (
      <Layout>
        <SideBar />
        <Layout className='layout' style={{ background: 'white', marginLeft: 200 }}>
          <Header />
          <Content style={{ margin: '24px 24px 0', overflow: 'initial', textAlign: 'center', fontFamily: 'Work Sans', alignItems: 'center' }}>
            <Row align='middle' justify='center'>
              <Col>
                <div style={{ fontSize: '5vw', }}>On this trip, I want to... </div>
                <Quiz />
                <br />
                <a href="./quiz" style={{ color: "black" }}>
                  <LeftSquareOutlined /> Go Back
                </a>
              </Col>
            </Row>
          </Content>
          <Footer />
        </Layout>
      </Layout >
    );
  }
}
export default QuizPage1
