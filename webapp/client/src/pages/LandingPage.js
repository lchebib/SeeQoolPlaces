import React from 'react';
import { Layout, Row, Col, Card, Button, Divider, Space } from 'antd';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getRandomCity } from '../fetcher'
import './LandingPage.less';

const { Content } = Layout;

class LandingPage extends React.Component {

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
      <Layout>
        <SideBar />
        <Layout className='layout' style={{ background: 'white', marginLeft: 200 }}>
          <Header />

          <Content style={{ margin: '24px 24px 0', overflow: 'initial' }}>
            <div style={{ textAlign: 'center' }}>
              <Row>
                <Col span={24} style={{ background: 'white' }}>
                  <Card style={{ border: '1px solid #000', margin: '10px' }}>
                    <div style={{ fontFamily: 'Work Sans', fontSize: '4vh' }}>Plan the perfect trip.</div>
                    <img src={(process.env.PUBLIC_URL + "/instructions.png")} alt="" style={{ maxWidth: '60vw', padding: '20px' }} />
                  </Card>
                </Col >
              </Row>
              <Row>
                <Col span={12} >
                  <Card style={{
                    border: '1px solid #000',
                    margin: '10px',
                    backgroundImage: `url(${process.env.PUBLIC_URL + "/travel.jpg"})`,
                    opacity: '0.9',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    height: '50vh',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <div>
                      <div style={{ fontFamily: 'Work Sans', fontSize: '4vh' }}>Choose City</div>
                      <Divider />
                      <Button href={"/createtrip"} size='large' shape='round' style={{ background: 'black', color: 'white', border: 'none' }}>Get Started</Button>
                    </div>
                  </Card>
                </Col>
                <Col span={12} >
                  <Card style={{
                    border: '1px solid #000',
                    margin: '10px',
                    backgroundImage: `url(${this.state.randomCity.photo})`,
                    opacity: '0.9',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    height: '50vh',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <div style={{ opacity: 'reset' }}>
                      <div style={{ fontFamily: 'Work Sans', fontSize: '4vh' }}>{this.state.randomCity.city}</div>
                      <Divider />
                      <Space>
                        <Button onClick={this.onSurpriseMe} size='large' shape='round' style={{ background: 'black', color: 'white', border: 'none' }}>Surprise Me!</Button>
                        <Button href={`/city?id=${this.state.randomCity.id}`} size='large' shape='round' style={{ background: 'black', color: 'white', border: 'none' }}>Visit {this.state.randomCity.city}</Button>
                      </Space>
                    </div>
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

export default LandingPage

