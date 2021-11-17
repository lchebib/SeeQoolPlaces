import React from 'react';
import { Layout, Row, Col } from 'antd';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TabsCard from '../components/TabsCard';
import Scheduler from '../components/Scheduler';
import { getAllPOIs } from '../fetcher';

const { Content } = Layout;

class TripPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      POIS: [],
      minValue: 0,
      maxValue: 16,
      poiIsFavorite: true,
      tripID: 0,
      tripName: "",
      scheduledPOIS: [],
      favoritePOIS: []
    }

    this.onSchedule = this.onSchedule.bind(this)
    this.onFavorite = this.onFavorite.bind(this)
  }

  async componentDidMount() {
    getAllPOIs().then(res => {
      this.setState({ POIS: res })
      this.setState({ bigPOI: res[0] })
    })

    var tripID = window.location.href.split('=')[1]
    this.state.tripID = tripID
    var trip = JSON.parse(localStorage.getItem(tripID))

    console.log(`tripID: ${trip.id}`)
    console.log(`tripName: ${trip.name}`)

    this.setState({ tripID: trip.id })
    this.setState({ tripName: trip.name })
    this.setState({ scheduledPOIS: trip.scheduledPOIS })
    this.setState({ favoritePOIS: trip.favoritePOIS })
  }


  onSchedule(POI) {
    var scheduledPOIS = this.state.scheduledPOIS
    scheduledPOIS.push(POI)
    this.setState({ scheduledPOIS: scheduledPOIS })
  }

  onFavorite(POI) {
    var favoritePOIS = this.state.favoritePOIS
    favoritePOIS.push(POI)
    this.setState({ favoritePOIS: favoritePOIS })
  }


  render() {
    if (this.state.POIS.length === 0) {
      return null
    }

    return (
      <Layout>
        <SideBar />
        <Layout className='layout' style={{ background: 'white', marginLeft: 200 }}>
          <Header />
          <Content style={{ margin: '24px 24px 0', overflow: 'initial' }}>
            <Row justify='center' >
              <Col >
                <div style={{ fontFamily: 'Work Sans', textAlign: 'center' }}>
                  <div style={{ fontSize: '3vw' }}>{this.state.tripName}</div>
                  <br />
                </div>
              </Col >
            </Row>
            <Row justify='center'>
              <Scheduler />
            </Row>
            <Row justify='center' >
              <TabsCard POIS={this.state.POIS} onSchedule={this.onSchedule} onFavorite={this.onFavorite} />
            </Row>
          </Content>
          <Footer />
        </Layout>
      </Layout >
    );
  }
}
export default TripPage




