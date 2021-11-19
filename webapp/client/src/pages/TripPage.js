import React from 'react';
import { Layout, Row, Col } from 'antd';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TabsCard from '../components/TabsCard';
import Scheduler from '../components/Scheduler';
import { getAllPOIs } from '../fetcher';
import { getAllTrips } from '../fetcher'

const { Content } = Layout;


const events = [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: false,
    start: new Date('November 18, 2021 0:00:00'),
    end: new Date("November 18, 2021 0:30:00"),
    resource: { duration: 2 }
  },
  {
    id: 20,
    title: "Dinner",
    allDay: false,
    start: new Date('November 18, 2021 1:00:00'),
    end: new Date('November 18, 2021 3:00:00'),
    resource: { duration: 0.5 }

  },
  {
    id: 21,
    title: "Dinner 2",
    allDay: false,
    start: new Date('November 18, 2021 1:00:00'),
    end: new Date('November 18, 2021 3:00:00'),
    resource: { duration: 0.5 }
  },
]

class TripPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      trip: null,
      // tripID: null,
      POIS: [],
      // tripName: "",
      events: [],
      favoritePOIS: {},
      scheduledPOIS: [],
      // tripStartDate: null,
      // tripEndDate: null
      // newEvent: null
    }

    this.addEvent = this.addEvent.bind(this)
    this.removeEvent = this.removeEvent.bind(this)
    this.addFavorite = this.addFavorite.bind(this)
    this.removeFavorite = this.removeFavorite.bind(this)
    this.updateEvents = this.updateEvents.bind(this)
  }

  componentWillMount() {
    getAllTrips()

    getAllPOIs().then(res => {
      this.setState({ POIS: res })
    })

    var tripID = window.location.href.split('=')[1]

    if (isNaN(tripID)) {
      tripID = 100
    }

    var trip = JSON.parse(localStorage.getItem(tripID))
    this.setState({ trip: trip })
    // this.setState({ tripID: tripID })
    // this.setState({ tripName: trip.name })

    // // this.setState({ trip: trip })

    // // console.log(`tripID: ${trip.id}`)
    // console.log(`tripName: ${trip.name}`)

    // this.setState({ tripID: trip.id })
    // console.log(`tripID: ${trip.id}`)
    // console.log(`tripID: ${this.state.tripID}`)

    // this.setState({ events: trip.events })
    // this.setState({ favoritePOIS: trip.favoritePOIS })
    // this.setState({ tripStartDate: trip.tripDates[0] })
    // this.setState({ tripEndDate: trip.tripDates[1] })
    // console.log(this.state.events)
  }

  updateEvents(events) {
    this.setState({ events: events })
    console.log(this.state.events)
    console.log(events)
  }

  addEvent(POI) {

    // var events = this.state.events
    // var eid = 1
    // if (this.state.events.length > 0) {
    //   eid = this.state.events[0].eid + 1
    // }

    // console.log(this.state.trip.dates[0])
    // var start = this.state.trip.dates[0]
    // // var start = new Date(this.state.trip.dates[0])
    // console.log(start)
    // var duration = POI.durationHigh
    // var end = start
    // // var end = start.setHours(start.getHours() + duration)
    // // var end = new Date(this.state.trip.dates[0])

    // var event = {
    //   title: POI.name,
    //   id: eid,
    //   start: start,
    //   end: end,
    //   allDay: false,
    //   resource: [{ pid: POI.pid, duration: duration }]
    // }

    // events.push(event)
    // this.setState({ events: events })
    var scheduledPOIS = [...this.state.scheduledPOIS]
    scheduledPOIS.push(POI)
    this.setState({ scheduledPOIS: scheduledPOIS })
    // this.setState({ newEvent: POI })
  }

  removeEvent(eid) {
    console.log(eid)
    var events = this.state.events
    delete events[eid]
    this.setState({ events: events })
  }

  addFavorite(POI) {
    console.log(POI)
    var favoritePOIS = this.state.favoritePOIS
    favoritePOIS[POI.id] = POI
    this.setState({ favoritePOIS: favoritePOIS })
  }

  removeFavorite(pid) {
    console.log(pid)
    var favoritePOIS = this.state.favoritePOIS
    delete favoritePOIS[pid]
    this.setState({ favoritePOIS: favoritePOIS })
  }


  render() {
    if (this.state.POIS.length === 0) {
      return null
    }

    if (!this.state.trip) {
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
              {/* <Scheduler trip={this.state.trip} newEvent={this.state.events} /> */}
              <Scheduler trip={this.state.trip} scheduledPOIS={this.state.scheduledPOIS} updateEvents={this.updateEvents} />
            </Row>
            <Row justify='center' >
              <TabsCard trip={this.state.trip} POIS={this.state.POIS} onSchedule={this.addEvent} onFavorite={this.addFavorite} onRemoveFavorite={this.removeFavorite} />
              {/* <TabsCard tripID={this.state.tripID} POIS={this.state.POIS} /> */}
              {/* <TabsCard trip={this.state.trip} onSchedule={this.addEvent} onAddFavorite={this.addFavorite} onRemoveFavorite={this.removeFavorite} /> */}


            </Row>
          </Content>
          <Footer />
        </Layout>
      </Layout >
    );
  }
}
export default TripPage




