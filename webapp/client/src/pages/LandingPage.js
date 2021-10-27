import React from 'react';
import { Layout, Row, Col, Card, Image } from 'antd';

import SideBar from '../components/SideBar';
// import PageLayout from '../components/Layout';
import { getRandomCity } from '../fetcher'

import { tempGetRandomCity } from '../tempData'

import '../images/RamenInstruction.png'
import './LandingPage.less';

const { Header, Content, Footer, Sider } = Layout;

class LandingPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      randomCity: []
    }

    this.randomCityOnChange = this.randomCityOnChange.bind(this)
    this.goToCreateTrip = this.goToCreateTrip.bind(this)
  }


  goToCreateTrip(cityId) {
    window.location = `/createtrip?cityId=${cityId}`
  }

  // FIXME: Uncomment when data ready
  randomCityOnChange() {
    // getRandomCity().then(res => {
    //   this.setState({ randomCity: res.results})
    // })
    this.setState({ randomCity: tempGetRandomCity()})
    
  }
  // FIXME: Uncomment when data ready
  componentDidMount() {
    // getRandomCity().then(res => {
    //   this.setState({ randomCity: res.results })
    // })
    this.setState({ randomCity: tempGetRandomCity()})
 
  }


  render() {
    return (
      <Layout>
        <Sider className="sider">
          <div className="logo" />
          <SideBar />
        </Sider>
        <Layout className="site-layout">
          <Header className="header">
          </Header>
          <Content className="content">
            <div className="grid">
              <Row >
                <Col span={24}>
                  <Card className="card">
                    <Image width={200} src="../images/RamenInstruction.png" />
                  </Card>
                </Col >
              </Row>
              <Row >
                <Col span={12}>
                  <Card className="card">
                    <h3>Pick a City</h3>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card className="card">
                    <h3>{this.state.randomCity.name}</h3>
                  </Card>
                </Col>
              </Row>
            </div>
          </Content>
          <Footer className="footer">
            <div>SeeQoolPlaces © 2021</div>
            <div>Created by Emily Connor, Joel Lim, Xulei Qin, and Lana Chebib</div>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default LandingPage

