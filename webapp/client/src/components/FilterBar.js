import React from 'react';
import { Button, Row, Col } from 'antd';

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
      if (POI.category === "trails") {
        console.log(POI)
        return <Button style={{ background: '#9CDA86' }}>{POI.name}</Button>
      } else if (POI.category === "attractions") {
        console.log(POI)
        return <Button style={{ background: '#FFC93F' }}>{POI.name}</Button>
      } else {
        console.log(POI)
        return <Button style={{ background: '#EC7878' }}>{POI.name}</Button>
      }
    }


    return (

      <div>
        <Row align="middle" justify="center" style={{ marginTop: 20 }}>
          <Col>
            <div style={{ fontFamily: 'Work Sans', fontSize: 20 }}>Favorites</div>
            {this.props.favorites.map((POI) =>
              <div>
                {favoriteButton(POI)}
              </div>
            )}
          </Col>
        </Row>
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
            {this.state.favorites.map((fav) =>
              <Menu.Item key={fav.pid} style={{ fontWeight: "normal", fontSize: 15, }}>{fav.name}</Menu.Item>
            )}
          </SubMenu>

        </Menu> */}

      </div>
    );
  }
}

export default FilterBar
