import React from 'react';
import { Layout, Row, Col, Spin, Space } from 'antd';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TabsCard from '../components/TabsCard';
import Scheduler from '../components/Scheduler';
import FavoritesBar from '../components/FavoritesBar';
import { authenticateTrip, getTripRestaurants, getTripAttractions, getTripTrails, postDeleteTrip, postSaveTrip, getTripFavorites, getTripEvents } from '../fetcher';
import '../style/style.css'


const { Content, Sider } = Layout;

class TripPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      trip: null,
      POIS: [],
      favorites: null,
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

  componentDidMount() {
    var tripID = window.location.href.split('=').length > 1 ? window.location.href.split('=')[1] : -1
    var username = localStorage.getItem("username")


    if (!username) {
      window.location = '/failed';
    }

    if (tripID < 0) {
      window.location = '/failed?redirect=home';
    }

    authenticateTrip(username, tripID).then(res => {
      if (res.results == false) {
        window.location = '/failed?redirect=home';
      } else {
        var trip = JSON.parse(localStorage.getItem(tripID))
        this.setState({ trip: trip })

        getTripTrails(tripID).then(res => {
          this.setState({ tripTrails: res.results })
          this.setState({ bigPOI: res.results[0] })
          // console.log(res.results)
        }).then(getTripAttractions(tripID).then(res => {
          this.setState({ tripAttractions: res.results })
          if (!this.state.bigPOI) {
            this.setState({ bigPOI: res.results[0] })
          }
          // console.log(res.results)
        })).then(getTripRestaurants(tripID).then(res => {
          this.setState({ tripRestaurants: res.results })
          if (!this.state.bigPOI) {
            this.setState({ bigPOI: res.results[0] })
          }
          // console.log(res.results)
        }))
      }
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
    // console.log(events)
  }

  addEvent() {
    var scheduledPOIS = [...this.state.scheduledPOIS]
    scheduledPOIS.push(this.state.bigPOI)
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

  addFavorite() {
    var favorites = [...this.state.favorites]
    favorites.push(this.state.bigPOI)
    this.setState({ favorites: favorites })
  }

  removeFavorite() {
    var favorites = [...this.state.favorites]
    const index = favorites.indexOf(this.state.bigPOI);
    if (index > -1) {
      favorites.splice(index, 1);
    }
    this.setState({ favorites: favorites })
  }

  changeBigPOI(POI) {
    this.setState({ bigPOI: POI })

  }

  saveTrip() {

    // console.log(this.state.events)
    // console.log(this.state.favorites)

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
    console.log(this.state)

    if (!this.state.trip ||
      !this.state.bigPOI ||
      !this.state.tripTrails ||
      !this.state.tripAttractions ||
      !this.state.tripRestaurants ||
      !this.state.events ||
      !this.state.favorites) {
      return (
        <>
          <Row justify='center' align='middle' style={{ paddingTop: 200, paddingBottom: 100 }}>
            <img class="balloon"
              src={process.env.PUBLIC_URL + '/logo.png'}
              alt='Hot air balloon'
            />
          </Row>
          <Row justify='center' align='middle' style={{ width: '100vw' }}>
            <span style={{ color: '#90A3E8' }}>
              Tiny fairies are manifesting your trip into existence...
            </span>
          </Row>
        </>
      )
    }

    /**
     * @description Renders start and end trip dates as a range: month/day/year-month/day/year
     * @param {String} Date
     * @return {String} date range for trip
     */
    const displayDates = (startDate, endDate) => {

      let dateObj = new Date(startDate);
      let startMonth = dateObj.getUTCMonth();
      let startDay = dateObj.getUTCDate();
      let startYear = dateObj.getUTCFullYear();

      let dateObj2 = new Date(endDate);
      let endMonth = dateObj2.getUTCMonth();
      let endDay = dateObj2.getUTCDate();
      let endYear = dateObj2.getUTCFullYear();

      return startMonth + "/" + startDay + "/" + startYear + " to " + endMonth + "/" + endDay + "/" + endYear;

    }


    return (
      <Layout style={{ background: 'white' }}>
        <SideBar />
        <Layout style={{ background: 'white', marginLeft: 200 }}>
          <Header />
          <Layout style={{ background: 'white' }}>
            <Content style={{ margin: '24px 24px 0', overflow: 'initial' }}>
              <Row justify='center' >
                <Col >
                  <div style={{ fontFamily: 'Work Sans', textAlign: 'center' }}>
                    <div style={{ fontSize: '30px' }}> {this.state.trip.tripName}</div>
                    <br />
                  </div>
                  <div style={{ fontFamily: 'Work Sans', textAlign: 'center' }}>
                    <div style={{ fontSize: '15px' }}> Plan your trip to {this.state.trip.city} from {displayDates(this.state.trip.startDate, this.state.trip.endDate)}!</div>
                    <br />
                  </div>
                </Col >
              </Row>
              <Row justify='center'>
                <Scheduler
                  startDate={this.state.trip.startDate}
                  events={this.state.events}
                  scheduledPOIS={this.state.scheduledPOIS}
                  updateEvents={this.updateEvents} />
              </Row>
              <Row justify='center' >
                <TabsCard
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
                // maxHeight: '100%'
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
      </Layout >
    );
  }
}
export default TripPage



