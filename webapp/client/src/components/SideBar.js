import React from 'react';
import { Divider, Menu, Space } from 'antd';
import { getAllTrips } from '../fetcher'

const { SubMenu } = Menu;


class SideBar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      myTrips: []
    }

    this.onMenuClick = this.onMenuClick.bind(this)
  }

  onMenuClick(menuItem) {
    if (isNaN(menuItem.key)) {
      window.location = `/${menuItem.key}`
    } else {
      window.location = `/trip?id=${menuItem.key}`
    }
  }

  componentDidMount() {
    getAllTrips().then(res => {
      this.setState({ myTrips: res.results })
    })

  }

  render() {
    return (

      <div>
        <Menu
          theme="light"
          onClick={(menuItem) => this.onMenuClick(menuItem)}
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
          <a href="/">
            <img src={`${process.env.PUBLIC_URL + "/logo-header.svg"}`} alt="" style={{ maxWidth: '100%', height: 'auto', padding: '10px', paddingTop: '15px', paddingBottom: '15px' }} />
          </a>
          <SubMenu key="NewTrip" title="New Trip">
            <Menu.Item key="quiz">Trip Quiz</Menu.Item>
            <Menu.Item key="createtrip">Create Trip</Menu.Item>
          </SubMenu>

          <SubMenu key="MyTrips" title="My Trips">
            {this.state.myTrips.map((trip) =>
              <Menu.Item key={trip.id}>{trip.name}</Menu.Item>
            )}
          </SubMenu>
        </Menu>
      </div>
    );

  }

}

export default SideBar
