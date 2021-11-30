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
        {/* <Affix > */}
        <Menu
          theme="light"
          onClick={(menuItem) => this.onMenuClick(menuItem)}
          defaultOpenKeys={['NewTrip', 'MyTrips']}
          mode="inline"
          style={{
            paddingTop: '15px',
            position: 'fixed',
            width: '200px',
            height: '100vh',
            // border: '1px solid #000',
          }}
        >
          <a href="/">
            <img src={`${process.env.PUBLIC_URL + "/logo-header.svg"}`} alt="" style={{ maxWidth: '100%', height: 'auto', padding: '10px', paddingTop: '15px', paddingBottom: '15px' }} />
          </a>
          <SubMenu key="NewTrip" title="New Trip" style={{ fontWeight: "bold", fontSize: 15, }}>
            <Menu.Item key="quiz" style={{ fontWeight: "normal", fontSize: 15, }}>Trip Quiz </Menu.Item>
            <Menu.Item key="createtrip" style={{ fontWeight: "normal", fontSize: 15, }} >Create Trip</Menu.Item>
          </SubMenu>

          <SubMenu key="MyTrips" title="My Trips" style={{ fontWeight: "bold", fontSize: 15, }}>
            {this.state.myTrips.map((trip) =>
              <Menu.Item key={trip.id} style={{ fontWeight: "normal", fontSize: 15, }}>{trip.name}</Menu.Item>
            )}
          </SubMenu>

          <Menu.Item
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
          </Menu.Item>
        </Menu>
        {/* </Affix> */}
      </div>
    );

  }

}

export default SideBar
