import React from 'react';
import { Layout, Row, Col, Card, Button, Space, Divider } from 'antd';
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
    this.goToCreateTrip = this.goToCreateTrip.bind(this)
  }


  goToCreateTrip(cityId) {
    window.location = `/createtrip?cityId=${cityId}`
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
                    <img src={(process.env.PUBLIC_URL + "/RamenInstruction.png")} style={{ maxWidth: '60vw', padding: '20px' }} />
                  </Card>
                </Col >
              </Row>
              <Row>
                <Col span={12} >
                  <Card style={{
                    border: '1px solid #000',
                    margin: '10px',
                    backgroundImage: `url(${process.env.PUBLIC_URL + "/travel.jpg"})`,
                    opacity: '0.8',
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
                      <Button size='large' shape='round' style={{ background: 'black', color: 'white', border: 'none' }}>Get Started</Button>
                    </div>
                  </Card>
                </Col>
                <Col span={12} >
                  <Card style={{
                    border: '1px solid #000',
                    margin: '10px',
                    backgroundImage: `url(${this.state.randomCity.photo})`,
                    opacity: '0.8',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    height: '50vh',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <div style={{ opcaity: 'unset' }}>
                      <div style={{ fontFamily: 'Work Sans', fontSize: '4vh' }}>{this.state.randomCity.name}</div>
                      <Divider />
                      <Button size='large' shape='round' style={{ background: 'black', color: 'white', border: 'none' }}>Surprise Me!</Button>
                      <Button size='large' shape='round' style={{ background: 'black', color: 'white', border: 'none' }}>Go To City</Button>
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

