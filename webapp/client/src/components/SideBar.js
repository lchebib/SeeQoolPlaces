import React from 'react';
import { Menu } from 'antd';
import { getAllTrips } from '../fetcher'

const { SubMenu } = Menu;


class SideBar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      myTrips: []
    }

    this.onClick = this.onClick.bind(this)
  }

  onClick(menuItem) {
    console.log(menuItem.key)

    if (isNaN(menuItem.key)) {
      window.location = `/${menuItem.key}`
    } else {
      window.location = `/trip?id=${menuItem.key}`
    }
  }

  componentDidMount() {
    getAllTrips().then(res => {
      console.log(res.results)
      this.setState({ myTrips: res.results })
    })

  }

  render() {
    return (

      <Menu
        theme="light"
        onClick={(menuItem, e) => this.onClick(menuItem, e)}
        defaultOpenKeys={['NewTrip', 'MyTrips']}
        mode="inline"
        style={{
          paddingTop: '15px',
          overflow: 'auto',
          position: 'fixed',
          width: '200px',
          height: '100vh',
          borderRight: '1px solid #000',
        }}
      >
        <div>
          <img src={`${process.env.PUBLIC_URL + "/logo-header.svg"}`} style={{ maxWidth: '100%', height: 'auto', padding: '10px', paddingTop: '15px', paddingBottom: '15px' }} />
        </div>
        <SubMenu key="NewTrip" title="New Trip">
          <Menu.Item key="CreateTrip">Choose City</Menu.Item>
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
