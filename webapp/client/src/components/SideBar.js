import React from 'react';
import { Menu } from 'antd';
import { authenticateUser, getAllTrips } from '../fetcher'
import '../style/style.css'


const { SubMenu } = Menu;

/**
 * @name SideBar
 * @description Left sidebar the displays website navigation
 * 
 * APPEARS IN:
 * All pages except landing page
 */
class SideBar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      trips: []
    }

    this.onMenuClick = this.onMenuClick.bind(this)
    this.storeTrips = this.storeTrips.bind(this)
    this.authenticate = this.authenticate.bind(this)
  }

  /**
   * @description Since sidebar appears on all pages that user must be logged in to access,
   * this function verifies that the username in localStorage is indeed logged in.
   * Otherwise it redirects them back to the landing page.
   */
  authenticate() {
    var username = localStorage.getItem("username")
    if (!username) {
      window.location = '/failed';
    } else {
      authenticateUser(username).then(res => {
        if (res.results == false) {
          window.location = '/failed';
        }
      })
    }
  }

  /**
   * @description Callback function that redirects user to the page
   * associated with the menu item.
   * @param {ReactElement} menuItem
   */
  onMenuClick(menuItem) {
    if (isNaN(menuItem.key)) {
      window.location = `/${menuItem.key}`
    } else {
      window.location = `/trip?id=${menuItem.key}`
    }
  }

  componentDidMount() {
    this.authenticate()

    var username = localStorage.getItem("username")

    // Fetch user trips from database
    getAllTrips(username).then(res => {
      this.setState({ trips: res.results })
      this.storeTrips(this.state.trips)
    })

  }
  /**
   * @description Store user trips in localStorage to be used throughout site
   */
  storeTrips() {
    this.state.trips.map((trip) => {
      // console.log(trip)
      let tripDetails = {
        tripID: trip.tripID,
        tripName: trip.tripName,
        city: trip.city,
        state: trip.state,
        startDate: new Date(trip.startDate),
        endDate: new Date(trip.endDate),
      }

      localStorage.setItem(tripDetails.tripID, JSON.stringify(tripDetails))
    });
  }


  render() {



    return (

      <div>
        <Menu
          theme="light"
          onClick={this.onMenuClick}
          defaultOpenKeys={['NewTrip', 'MyTrips']}
          mode="inline"
          style={{
            paddingTop: '15px',
            position: 'fixed',
            width: '200px',
            height: '100vh',
            overflow: 'auto',
            zIndex: 100
          }}
        >
          <a href="/home">
            <img className='sb-logo' src={`${process.env.PUBLIC_URL + "/logo-header.svg"}`} alt="" />
          </a>
          <SubMenu className='sb-sm' key="NewTrip" title="New Trip" >
            <Menu.Item className='sb-mi' key="quiz" >Trip Quiz </Menu.Item>
            <Menu.Item className='sb-mi' key="createtrip" >Create Trip</Menu.Item>
          </SubMenu>

          <SubMenu className='sb-sm' key="MyTrips" title="My Trips" >
            {this.state.trips.map((trip) =>
              <Menu.Item className='sb-mi' key={trip.tripID} >{trip.tripName}</Menu.Item>
            )}
          </SubMenu>

          {/* <Menu.Item
            key="about" title="" style={{ fontWeight: "bold", fontSize: 15, position: 'absolute', bottom: 100, zIndex: 1 }}>
            About
          </Menu.Item>
          <Menu.Item
            key="places" title="" style={{ fontWeight: "bold", fontSize: 15, position: 'absolute', bottom: 60, zIndex: 1 }}>
            Places
          </Menu.Item>
          <Menu.Item
            key="careers" title="" style={{ fontWeight: "bold", fontSize: 15, position: 'absolute', bottom: 20, zIndex: 1 }}>
            Careers
          </Menu.Item> */}
        </Menu>
      </div>
    );

  }

}

export default SideBar
