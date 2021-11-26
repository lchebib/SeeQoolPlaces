import React from 'react';
import { Button, Row, Col, Menu, Space } from 'antd';

const { SubMenu } = Menu
class FilterBar extends React.Component {

  constructor(props) {
    super(props)

    this.onClickFavorite = this.onClickFavorite.bind(this)
  }

  onClickFavorite(menuItem) {
    // render faovrite in bigPOI
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
      return <Button onClick={() => { this.props.onClick(POI) }} shape='round' style={{ background: color, border: 'none', width: '100%', textAlign: 'left' }}>{POI.name}</Button>

    }


    return (
      <div >
        <Row align="top" justify="center"
          style={{
            paddingTop: '15px',
            // position: 'fixed',
            width: '200px',
            height: '100vh',
            // border: '1px solid #000',
            // zIndex: 1
          }}
        >
          <Col>
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
      </div >
    );
  }
}

export default FilterBar
