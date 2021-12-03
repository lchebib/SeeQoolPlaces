import React from 'react';
import { Layout, Row, Col } from 'antd';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TabsCard from '../components/TabsCard';
import Scheduler from '../components/Scheduler';
import FavoritesBar from '../components/FavoritesBar';
import { getTripRestaurants, getTripAttractions, getTripTrails, postDeleteTrip, postSaveTrip, getTripFavorites, getTripEvents } from '../fetcher';

const { Content, Sider } = Layout;


class TripPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      trip: null,
      POIS: [],
      favorites: [],
      scheduledPOIS: [],
      events: null,
      bigPOI: null,
      tripAttractions: null,
      tripRestaurants: null,
      tripTrails: null
    }

    this.addEvent = this.addEvent.bind(this)
    this.removeEvent = this.removeEvent.bind(this)
    this.addFavorite = this.addFavorite.bind(this)
    this.removeFavorite = this.removeFavorite.bind(this)
    this.updateEvents = this.updateEvents.bind(this)
    this.changeBigPOI = this.changeBigPOI.bind(this)
    this.saveTrip = this.saveTrip.bind(this)
    this.deleteTrip = this.deleteTrip.bind(this)
  }

  componentWillMount() {
    var tripID = window.location.href.split('=')[1]

    if (isNaN(tripID)) {
      tripID = 100
    }

    var trip = JSON.parse(localStorage.getItem(tripID))
    this.setState({ trip: trip })

    getTripTrails(tripID).then(res => {
      this.setState({ tripTrails: res.results })
      this.setState({ bigPOI: res.results[0] })
      // console.log(res.results)
    })

    getTripAttractions(tripID).then(res => {
      this.setState({ tripAttractions: res.results })
      if (!this.state.bigPOI) {
        this.setState({ bigPOI: res.results[0] })
      }
      // console.log(res.results)
    })

    getTripRestaurants(tripID).then(res => {
      this.setState({ tripRestaurants: res.results })
      if (!this.state.bigPOI) {
        this.setState({ bigPOI: res.results[0] })
      }
      // console.log(res.results)
    })

    getTripFavorites(tripID).then(res => {
      this.setState({ favorites: res.results })
      // console.log(res.results)
    })

    getTripEvents(tripID).then(res => {
      var events = res.results
      events.forEach((event) => {
        event.allDay = false
        event.start = new Date(event.start)
        event.end = new Date(event.end)
      })
      this.setState({ events: events })
      // console.log(res.results)
    })
  }



  updateEvents(events) {
    this.setState({ events: events })
    console.log(events)
  }

  addEvent(POI) {
    var scheduledPOIS = [...this.state.scheduledPOIS]
    scheduledPOIS.push(POI)
    this.setState({ scheduledPOIS: scheduledPOIS })
  }

  removeEvent(POI) {
    var events = [...this.state.events]
    const index = events.indexOf(POI);
    if (index > -1) {
      events.splice(index, 1);
    }
    this.setState({ events: events })
  }

  addFavorite(POI) {
    var favorites = [...this.state.favorites]
    favorites.push(POI)
    this.setState({ favorites: favorites })
  }

  removeFavorite(POI) {
    var favorites = [...this.state.favorites]
    console.log(favorites)
    console.log(POI)
    const index = favorites.indexOf(POI);
    if (index > -1) {
      favorites.splice(index, 1);
    }
    this.setState({ favorites: favorites })
  }

  changeBigPOI(POI) {
    // console.log(this.state.bigPOI)
    // console.log(POI)

    this.setState({ bigPOI: POI })
  }

  saveTrip() {

    console.log(this.state.events)
    console.log(this.state.favorites)


    var favs = [...this.state.favorites]
    var favArr = []
    favs.forEach((fav) => {
      favArr.push(fav.pid)
    })
    var strFav = encodeURIComponent(JSON.stringify(favArr))

    var events = [...this.state.events]
    var strEvents = encodeURIComponent(JSON.stringify(events))

    postSaveTrip(this.state.trip.tripID, strFav, strEvents)

  }

  deleteTrip() {
    postDeleteTrip(this.state.trip.tripID)
    localStorage.removeItem(this.state.trip.tripID)
    window.location = "/home"
  }

  render() {

    if (!this.state.tripTrails || !this.state.tripAttractions || !this.state.tripRestaurants) {
      return null
    }

    if (!this.state.bigPOI) {
      return null
    }

    if (!this.state.trip) {
      return null
    }

    if (!this.state.events) {
      return null
    }

    // console.log(this.state.favorites)
    console.log(this.state.events)



    return (
      <Layout style={{ minWidth: 1200, background: 'white' }}>
        <SideBar />
        <Layout style={{ background: 'white', marginLeft: 200 }}>
          <Header />
          <Layout style={{ background: 'white' }}>
            <Content style={{ margin: '24px 24px 0', overflow: 'initial' }}>
              <Row justify='center' >
                <Col >
                  <div style={{ fontFamily: 'Work Sans', textAlign: 'center' }}>
                    <div style={{ fontSize: '30px' }}>{this.state.trip.tripName}</div>
                    <br />
                  </div>
                </Col >
              </Row>
              <Row justify='center'>
                <Scheduler
                  trip={this.state.trip}
                  events={this.state.events}
                  scheduledPOIS={this.state.scheduledPOIS}
                  updateEvents={this.updateEvents} />
              </Row>
              <Row justify='center' >
                <TabsCard
                  trip={this.state.trip}
                  favorites={this.state.favorites}
                  tripAttractions={this.state.tripAttractions}
                  tripRestaurants={this.state.tripRestaurants}
                  tripTrails={this.state.tripTrails}
                  bigPOI={this.state.bigPOI}
                  onSchedule={this.addEvent}
                  onAddFavorite={this.addFavorite}
                  onRemoveFavorite={this.removeFavorite}
                  onClickPOI={this.changeBigPOI}
                />
              </Row>
            </Content>
            <Sider
              style={{
                background: 'white',
                border: '1px solid #F0F0F0',
                height: 920,
                // position: 'fixed',
                // zIndex: 100
              }}>
              <FavoritesBar
                favorites={this.state.favorites}
                onClickFavorite={this.changeBigPOI}
                onSave={this.saveTrip}
                onDelete={this.deleteTrip}
              />
            </Sider>
          </Layout>
          <Footer />
        </Layout>
        {/* <Sider
          style={{
            background: 'white',
            border: '1px solid #F0F0F0',
            height: '100vh',
            // position: 'fixed',
            // zIndex: 100
          }}>
          <FavoritesBar
            favorites={this.state.favorites}
            onClickFavorite={this.changeBigPOI}
            onSave={this.saveTrip}
            onDelete={this.deleteTrip}
          />
        </Sider> */}
      </Layout >
    );
  }
}
export default TripPage



