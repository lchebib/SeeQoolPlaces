import React from 'react';
import { Layout, Row, Col } from 'antd';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TabsCard from '../components/TabsCard';
import Scheduler from '../components/Scheduler';
import FavoritesBar from '../components/FavoritesBar';
import { getTripRestaurants, getTripAttractions, getTripTrails, postDeleteTrip, postSaveTrip } from '../fetcher';

const { Content, Sider } = Layout;


const favorites = [
  {
    pid: 0,
    name: "Coit Tower",
    city: "San Francisco",
    state: "CA",
    category: "attractions",
    subcategory: "Points of Interest & Landmarks",
    tags: "Architectural Buildings,Observation Decks & Towers,Monuments & Statues",
    description: "Monument tower overlooking San Francisco. Tower includes murals from 1934 showing California business, agriculture and home life of the period. 360 Degree viewing platform at top of 212 ft tower.",
    rating: 4,
    numReviews: 4500,
    durationLow: 1,
    durationHigh: 2,
    photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/95/48/3d/coit-tower-from-financial.jpg?w=1100&h=-1&s=1"
  },
  {
    pid: 20,
    name: "Slanted Door",
    city: "San Francisco",
    state: "CA",
    category: "restaurants",
    subcategory: "Restaurant",
    tags: "Asian,Vietnamese,Vegetarian-Friendly",
    rating: 4,
    numReviews: 3500,
    durationLow: 1,
    durationHigh: 2,
    costLow: 2,
    costHigh: 3
  },
  {
    pid: 44,
    name: "Mile Rock View Point",
    city: "San Francisco",
    state: "CA",
    category: "trails",
    description: "The Mile Rock Viewpoint features a stunning overlook of the Golden Gate Bridge, Marin Headlands, and even Point Reyes on a clear day. You can continue on the path down to a small rocky beach and the Pacific ocean. The cliffs are eroding badly here and are very dangerous, but the trail is wide and safe if you take your time.",
    rating: 5,
    numReviews: 6,
    length: 1,
    durationLow: .5,
    durationHigh: 1,
    elevationHigh: 1500,
    elevationLow: 500,
    routeType: "Loop",
    difficulty: "easy",
    photo: "https://cdn2.apstatic.com/photos/hike/7007902_large_1554323814.jpg"
  },
]


// const events = [
//   {
//     id: 0,
//     title: "All Day Event very long title",
//     allDay: false,
//     start: new Date('November 18, 2021 0:00:00'),
//     end: new Date("November 18, 2021 0:30:00"),
//     resource: { duration: 2 }
//   },
//   {
//     id: 20,
//     title: "Dinner",
//     allDay: false,
//     start: new Date('November 18, 2021 1:00:00'),
//     end: new Date('November 18, 2021 3:00:00'),
//     resource: { duration: 0.5 }

//   },
//   {
//     id: 21,
//     title: "Dinner 2",
//     allDay: false,
//     start: new Date('November 18, 2021 1:00:00'),
//     end: new Date('November 18, 2021 3:00:00'),
//     resource: { duration: 0.5 }
//   },
// ]

class TripPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      trip: null,
      POIS: [],
      favorites: favorites,
      scheduledPOIS: [],
      events: [],
      bigPOI: null,
      tripAttractions: [],
      tripRestaurants: [],
      tripTrails: []
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

    // getTripPOIS(tripID, "admin").then(res => {
    //   this.setState({ POIS: res.results })
    //   this.setState({ bigPOI: res.results[0] })
    // })

    var trip = JSON.parse(localStorage.getItem(tripID))
    this.setState({ trip: trip })

    getTripTrails(tripID).then(res => {
      this.setState({ tripTrails: res.results })
      this.setState({ bigPOI: res.results[0] })
      console.log(res.results)
    })

    getTripAttractions(tripID).then(res => {
      this.setState({ tripAttractions: res.results })
      if (!this.state.bigPOI) {
        this.setState({ bigPOI: res.results[0] })
      }
      console.log(res.results)
    })

    getTripRestaurants(tripID).then(res => {
      this.setState({ tripRestaurants: res.results })
      if (!this.state.bigPOI) {
        this.setState({ bigPOI: res.results[0] })
      }
      console.log(res.results)
    })
  }

  updateEvents(events) {
    this.setState({ events: events })
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
    const index = favorites.indexOf(POI);
    if (index > -1) {
      favorites.splice(index, 1);
    }
    this.setState({ favorites: favorites })
  }

  changeBigPOI(POI) {
    this.setState({ bigPOI: POI })
  }

  saveTrip() {
    postSaveTrip(this.state.trip.tripID)
  }

  deleteTrip() {
    postDeleteTrip(this.state.trip.tripID)
    window.location = "/home"
  }

  render() {
    // if (this.state.tripTrails.length === 0 || this.state.tripAttractions.length === 0 || this.state.tripRestaurants.length === 0) {
    //   return null
    // }

    if (!this.state.bigPOI) {
      return null
    }

    if (!this.state.trip) {
      return null
    }

    console.log(this.state.bigPOI)

    return (
      <Layout style={{ minWidth: 1200 }}>
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
            {/* <Sider style={{ background: 'white', border: '1px solid #F0F0F0' }}>
              <FavoritesBar
                favorites={this.state.favorites}
                onClickFavorite={this.changeBigPOI}
              />
            </Sider> */}
          </Layout>
          <Footer />
        </Layout>
        <Sider
          style={{
            background: 'white',
            border: '1px solid #F0F0F0',
            height: '100vh',
            // position: 'fixed',
            zIndex: 100
          }}>
          <FavoritesBar
            favorites={this.state.favorites}
            onClickFavorite={this.changeBigPOI}
          // onSave={this.saveTrip}
          // onDelete={this.deleteTrip}
          />
        </Sider>
      </Layout >
    );
  }
}
export default TripPage



