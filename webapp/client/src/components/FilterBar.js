import React from 'react';
import { Button, Row, Col, Menu, Space, Divider } from 'antd';

const { SubMenu } = Menu
class FilterBar extends React.Component {

  constructor(props) {
    super(props)

  }

  render() {

    if (!this.props.favorites) {
      return null
    }

    const favoriteButton = (POI) => {
      var color;
      if (POI.category === "trails") {
        color = '#9CDA86'
        // return <Button style={{ background: '#9CDA86' }}>{POI.name}</Button>
      } else if (POI.category === "attractions") {
        color = '#FFC93F'
        // return <Button style={{ background: '#FFC93F' }}>{POI.name}</Button>
      } else {
        color = '#EC7878'
        // return <Button style={{ background: '#EC7878' }}>{POI.name}</Button>
      }
      return <Button onClick={() => { this.props.onClickFavorite(POI) }} shape='round' style={{ background: color, border: 'none', width: '100%', textAlign: 'left' }}>{POI.name}</Button>

    }


    return (
      <div style={{
        paddingTop: '15px',
        width: '200px',
        height: '80vh',
      }}>
        <Row align="top" justify="center" style={{ 'height': '30vh' }}>
          <Col style={{ width: '160px' }}>
            <Space direction='vertical'>
              <div style={{ fontFamily: 'Work Sans', fontSize: 20 }}>Favorites</div>
              {this.props.favorites.map((POI) =>
                <div>
                  {favoriteButton(POI)}
                </div>
              )}
            </Space>
            {/* <Menu
              theme="light"
              onClick={(menuItem) => this.onMenuClick(menuItem)}
              defaultOpenKeys={['NewTrip', 'MyTrips']}
              mode="inline"
              style={{
                paddingTop: '15px',
                width: '200px',
                height: '100vh',
              }}
            >
              <SubMenu key="Favorites" title="Favorites" style={{ fontWeight: "bold", fontSize: 15, }}>
                {this.props.favorites.map((fav) =>
                  <Menu.Item key={fav.pid} style={{ fontWeight: "normal", fontSize: 15, }}>{fav.name}</Menu.Item>
                )}
              </SubMenu>

            </Menu> */}
          </Col>
        </Row>

        <Divider />
        <Row align="top" justify="center" style={{ 'height': '35vh' }}>

          <Col style={{ width: '160px' }}>
            <Space direction='vertical'>
              <div style={{ fontFamily: 'Work Sans', fontSize: 20 }}>Favorites</div>
              {this.props.favorites.map((POI) =>
                <div>
                  {favoriteButton(POI)}
                </div>
              )}
            </Space>
          </Col>
        </Row>
        <Divider />
        <Row align="top" justify="center" style={{ 'height': '10vh', fontFamily: 'Work Sans' }}>
          <Col style={{ width: '160px' }}>
            <Space direction='vertical'>
              <Button onClick={() => { this.props.onSave() }} shape='round' size='large' style={{ border: 'none', background: 'black', color: 'white', width: '180px' }}>Save Trip</Button>
              <Button onClick={() => { this.props.onDelete() }} shape='round' size='large' style={{ border: 'none', background: 'red', color: 'white', width: '180px' }}>Delete Trip</Button>
            </Space>
          </Col>
        </Row>
      </div >
    );
  }
}

export default FilterBar
