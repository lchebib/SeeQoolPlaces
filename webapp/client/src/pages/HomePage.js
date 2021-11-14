import React from 'react';
import { Layout, Row, Col, Card, Button, Divider, Space, Affix } from 'antd';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getRandomCity } from '../fetcher'

const { Content, Sider } = Layout;

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      randomCity: []
    }

    this.onSurpriseMe = this.onSurpriseMe.bind(this)
  }

  onSurpriseMe() {
    getRandomCity().then(res => {
      this.setState({ randomCity: res.results })
    })
  }


  componentDidMount() {
    getRandomCity().then(res => {
      this.setState({ randomCity: res.results })
    })
  }


  render() {
    return (
      <Layout style={{
        background: 'white', border: '1px solid #000'
      }}>
        <Affix>
          <Sider
            style={{
              // overflow: 'auto',
              // paddingTop: '15px',
              height: '100vh',
              position: 'fixed',
              // left: 0,
              // width: '200px',
              border: '1px solid #000',
            }}>
            <SideBar />
          </Sider>
        </Affix>
        <Layout className='layout' style={{ background: 'white', marginLeft: 200, minWidth: '750px', position: 'absolute', offset: '0, 0' }} >
          <Header />
          <Content style={{ margin: '24px 24px 0', overflow: 'initial', position: 'relative' }} >
            <div style={{ textAlign: 'center' }}>
              <Row >
                <Col span={24}>
                  <Card style={{ margin: '10px', border: 'none' }}>
                    <h1 style={{ fontFamily: 'Work Sans', fontSize: '40px' }}>Plan the perfect trip.</h1>
                    <img src={(process.env.PUBLIC_URL + "/instructions.jpg")} alt="" style={{ maxWidth: '700px' }} />
                  </Card>
                </Col >
              </Row>
              <Row >
                <Col span={12} >
                  <Card style={{
                    margin: '10px',
                    backgroundImage: `url(${process.env.PUBLIC_URL + "/travel.jpg"})`,
                    opacity: '0.9',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    height: '400px',
                    position: 'absolute',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                    content: '',
                    border: 'none'
                  }} />
                  <Card style={{
                    margin: '10px',
                    background: 'transparent',
                    height: '400px',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 'none'
                  }}>
                    <div>
                      <div style={{ fontFamily: 'Work Sans', fontSize: '30px', color: 'white' }}>Discover</div>
                      <Divider />
                      <Button href={"/quiz"} size='large' shape='round' style={{ background: 'black', color: 'white', border: 'none' }}>Take Trip Quiz</Button>
                    </div>
                  </Card>
                </Col>
                <Col span={12} >
                  <Card style={{
                    margin: '10px',
                    backgroundImage: `url(${this.state.randomCity.photo})`,
                    opacity: '0.9',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    height: '400px',
                    position: 'absolute',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                    content: '',
                    border: 'none'
                  }} />
                  <Card style={{
                    margin: '10px',
                    background: 'transparent',
                    height: '400px',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 'none'
                  }}>
                    <div style={{ fontFamily: 'Work Sans', fontSize: '30px', color: 'white' }}>{this.state.randomCity.city}</div>
                    <Divider />
                    <Space>
                      <Button onClick={this.onSurpriseMe} size='large' shape='round' style={{ background: 'black', color: 'white', border: 'none' }}>Surprise Me!</Button>
                      <Button href={`/activities?city=${this.state.randomCity.city}&state=${this.state.randomCity.state}`} size='large' shape='round' style={{ background: 'black', color: 'white', border: 'none' }}>Visit {this.state.randomCity.city}</Button>
                    </Space>
                  </Card>
                </Col>
              </Row>
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout >
    );
  }
}

export default HomePage

