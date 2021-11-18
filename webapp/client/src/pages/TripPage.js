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
      tripID: window.location.href.split('=')[1],
      POIS: []
      // tripID: null,
      // tripName: "",
      // events: {},
      // favoritePOIS: {},
      // tripStartDate: null,
      // tripEndDate: null
    }

    // this.addEvent = this.addEvent.bind(this)
    // this.removeEvent = this.removeEvent.bind(this)
    // this.addFavorite = this.addFavorite.bind(this)
    // this.removeFavorite = this.removeFavorite.bind(this)
  }

  componentDidMount() {
    getAllPOIs().then(res => {
      this.setState({ POIS: res })
      // this.setState({ bigPOI: res[0] })
    })

    // var tripID = window.location.href.split('=')[1]
    // var trip = JSON.parse(localStorage.getItem(tripID))

    // // this.setState({ trip: trip })

    // // console.log(`tripID: ${trip.id}`)
    // // console.log(`tripName: ${trip.name}`)

    // this.setState({ tripID: trip.id })
    // console.log(`tripID: ${trip.id}`)
    // console.log(`tripID: ${this.state.tripID}`)

    // this.setState({ tripName: trip.name })
    // this.setState({ events: trip.events })
    // this.setState({ favoritePOIS: trip.favoritePOIS })
    // this.setState({ tripStartDate: trip.tripDates[0] })
    // this.setState({ tripEndDate: trip.tripDates[1] })
  }

  // addEvent(POI) {
  //   this.setState({ newEvent: POI })
  // console.log(POI)
  // var events = this.state.events
  // var eid = 1
  // if (Object.keys(this.state.events).length > 0) {
  //   eid = this.state.events[0].eid + 1
  // }
  // var start = this.state.tripStartDate
  // var duration = POI.duration


  // var event = {
  //   pid: POI.id,
  //   eid: eid,
  //   title: POI.name,
  //   start: start,
  //   duration: duration,
  // }

  // var event = {
  //   title: POI.name,
  //   start: start,
  //   end: start.getHours() + POI.duration,
  //   allDay: false,
  //   resource: [{ pid: POI.id, eid: eid }]
  // }

  // events[eid] = event
  // this.setState({ events: events })
  // }

  // removeEvent(eid) {
  //   console.log(eid)
  //   var events = this.state.events
  //   delete events[eid]
  //   this.setState({ events: events })
  // }

  // addFavorite(POI) {
  //   console.log(POI)
  //   var favoritePOIS = this.state.favoritePOIS
  //   favoritePOIS[POI.id] = POI
  //   this.setState({ favoritePOIS: favoritePOIS })
  // }

  // removeFavorite(pid) {
  //   console.log(pid)
  //   var favoritePOIS = this.state.favoritePOIS
  //   delete favoritePOIS[pid]
  //   this.setState({ favoritePOIS: favoritePOIS })
  // }


  render() {
    // if (this.state.POIS.length === 0) {
    //   return null
    // }

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
              {/* <Scheduler trip={this.state.trip} newEvent={this.state.events} /> */}
              <Scheduler tripID={this.state.tripID} />
            </Row>
            <Row justify='center' >
              {/* <TabsCard POIS={this.state.POIS} onSchedule={this.addEvent} onFavorite={this.addFavorite} onRemoveFavorite={this.removeFavorite} /> */}
              <TabsCard tripID={this.state.tripID} POIS={this.state.POIS} />

            </Row>
          </Content>
          <Footer />
        </Layout>
      </Layout >
    );
  }
}
export default TripPage




