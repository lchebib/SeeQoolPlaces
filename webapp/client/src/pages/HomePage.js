import React from 'react';
import { Layout, Row, Col, Card, Button, Divider, Space } from 'antd';
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
    this.onVisitRandomCity = this.onVisitRandomCity.bind(this)
  }

  onSurpriseMe() {
    console.log("Pressed Surprise Me")
    getRandomCity().then(res => {
      this.setState({ randomCity: res.results[0] })
    })
  }

  onVisitRandomCity() {
    var dest = [this.state.randomCity.state, this.state.randomCity.city]
    localStorage.setItem('selectedDest', JSON.stringify(dest))
  }

  componentDidMount() {
    console.log("Entered Home Page")
    getRandomCity().then(res => {
      this.setState({ randomCity: res.results[0] })
      console.log(res);
    })
  }

  render() {

    return (
      <Layout style={{ background: 'white', minWidth: 1000 }}>
        <Sider
          style={{
            height: '100vh',
            position: 'fixed',
          }}>
          <SideBar style />
        </Sider>
        <Layout style={{ background: 'white', marginLeft: 200 }} >
          <Header />
          <Content style={{ margin: '24px 24px 0' }} >
            <div style={{ textAlign: 'center' }}>
              <Row >
                <Col span={24}>
                  <Card style={{
                    margin: '10px',
                    border: 'none',
                    // boxShadow: '1px 1px 5px #D3D3D3'
                  }}>
                    <div style={{ fontFamily: 'Work Sans', fontSize: '40px', marginBottom: '50px' }}>Plan the perfect trip.</div>
                    <img src={(process.env.PUBLIC_URL + "/instructions.jpg")} alt="" style={{ maxWidth: '90%' }} />
                  </Card>
                </Col >
              </Row>
              <Row >
                <Col span={12} >
                  <Card style={{
                    margin: '10px',
                    backgroundImage: `linear-gradient(rgba(80, 80, 80, 0.3),
                    rgba(80, 80, 80, 0.3)), url(${process.env.PUBLIC_URL + "/travel.jpg"})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    height: '400px',
                    position: 'absolute',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                    border: 'none',
                  }} />
                  <Card style={{
                    margin: '10px',
                    background: 'transparent',
                    height: '400px',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 'none',
                  }}>
                    <div>
                      <div style={{ fontFamily: 'Work Sans', fontSize: '30px', color: 'white' }}>Start planning here.</div>
                      <Divider style={{ border: 'none' }} />
                      <Button href={"/quiz"} size='large' shape='round' style={{ background: 'black', color: 'white', border: 'none' }}>Take Trip Quiz</Button>
                    </div>
                  </Card>
                </Col>
                <Col span={12} >
                  <Card style={{
                    margin: '10px',
                    backgroundImage: `linear-gradient(rgba(80, 80, 80, 0.3),
                    rgba(80, 80, 80, 0.3)), url(${this.state.randomCity.photo})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    height: '400px',
                    position: 'absolute',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                    border: 'none',
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
                    <Divider style={{ border: 'none' }} />
                    <Space>
                      <Button onClick={this.onSurpriseMe} size='large' shape='round' style={{ background: 'black', color: 'white', border: 'none' }}>Surprise Me!</Button>
                      <Button onClick={this.onVisitRandomCity} href={"./quiz2"} size='large' shape='round' style={{ background: 'black', color: 'white', border: 'none' }}>Visit {this.state.randomCity.city}</Button>
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
