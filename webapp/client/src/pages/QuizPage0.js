import React from 'react';
import { Layout, Row, Col, Card, Button, Divider } from 'antd';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BuzzFeedQuiz } from "react-buzzfeed-quiz";
import "react-buzzfeed-quiz/lib/styles.css";

const { Content } = Layout;


class QuizPage0 extends React.Component {


  render() {
    return (
      <Layout>
        <SideBar />
        <Layout className='layout' style={{ background: 'white', marginLeft: 200 }}>
          <Header />

          <Content align='middle' justify='center' style={{ margin: '24px 24px 0', overflow: 'initial', textAlign: 'center' }}>

            <Row align='middle' justify='center'>

              <Col>

                <div style={{ fontFamily: 'Work Sans', fontSize: '4vh' }}>Choose one.</div>
                <a href="./quiz1">
                  <Card style={{
                    border: '1px solid #000',
                    margin: '10px',
                    background: 'black',
                    height: '20vh',
                    width: '60vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                  }}>
                    <div style={{ fontFamily: 'Work Sans', fontSize: '3vh' }}>
                      Where shall I go?
                      <br />
                      What shall I do when I’m there?
                    </div>
                  </Card>
                </a>

                <a href="./selectcity">
                  <Card style={{
                    border: '1px solid #000',
                    margin: '10px',
                    background: 'black',
                    height: '20vh',
                    width: '60vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                  }}>
                    <div style={{ fontFamily: 'Work Sans', fontSize: '3vh' }}>
                      I know where I'm going,
                      <br />
                      but what shall I do?
                    </div>
                  </Card>
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

export default QuizPage0
