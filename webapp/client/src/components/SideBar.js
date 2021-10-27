import React from 'react';
import { Menu } from 'antd';

import { myTrips } from '../tempData.js'

const { SubMenu } = Menu;


class SideBar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      myTrips: []
    }

    this.handleMenuClick = this.handleMenuClick.bind(this)
  }

  handleMenuClick(menuItem) {
    console.log(menuItem.key)

    if (isNaN(menuItem.key)){
      window.location = `/${menuItem.key}`
    } else {
      window.location = `/trip?id=${menuItem.key}`
    }
  }

  // FIXME: Uncomment when data ready
  componentDidMount() {
    // getAllTrips().then(res => {
    //   console.log(res.results)
    //   this.setState({ myTrips: res.results })
    this.setState({ myTrips: myTrips })
    // })

  }

  render() {
    return (
      <Menu
        theme="light"
        onClick={(menuItem, e) => this.handleMenuClick(menuItem, e)}
        defaultOpenKeys={['NewTrip', 'MyTrips']}
        mode="inline"
      >
        <SubMenu key="NewTrip" title="New Trip">
          <Menu.Item key="CreateTrip">Create Trip</Menu.Item>
          <Menu.Item key="PickActivities">Pick Activities</Menu.Item>
          <Menu.Item key="MakeSchedule">Make Schedule</Menu.Item>
        </SubMenu>

        <SubMenu key="MyTrips" title="My Trips">
          {this.state.myTrips.map((trip) =>
            <Menu.Item key={trip.tid}>{trip.name}</Menu.Item>
          )}
        </SubMenu>
      </Menu>
    );

  }

}

export default SideBar
