import React from 'react';
import { Button, Row, Col, Space, Divider, Popconfirm, message } from 'antd';

class FavoritesBar extends React.Component {

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
      } else if (POI.category === "attractions") {
        color = '#FFC93F'
      } else {
        color = '#EC7878'
      }
      return <Button onClick={() => { this.props.onClickFavorite(POI) }} shape='round' style={{ background: color, border: 'none', width: 170, textAlign: 'left', overflow: 'hidden', }}>{POI.name}</Button>

    }

    const saveNotification = () => {
      message.success('Trip saved', 3);
    };

    // const deleteNotification = () => {
    //   return (
    //     <Popconfirm placement="left" title={'Are you sure to delete this trip?'} onConfirm={this.props.onDelete} okText="Yes" cancelText="No">
    //       <Button>Left</Button>
    //     </Popconfirm>
    //   )
    // };


    return (
      <div style={{
        paddingTop: '15px',
        width: '200px',
        height: 900,

      }}>
        <Row align="top" justify="center" >
          <div style={{ fontFamily: 'Work Sans', fontSize: 20, paddingBottom: 10 }}>Favorites</div>
          <Col style={{ width: 170, overflow: 'auto', 'height': 700 }}>
            <Space direction='vertical'>
              {this.props.favorites.map((POI) =>
                <div>
                  {favoriteButton(POI)}
                </div>
              )}
            </Space>
          </Col>
        </Row>

        {/* UNCOMMENT TO IMPLEMENT FILTER BAR */}
        {/* <Divider />
        <Row align="top" justify="center" style={{ 'height': 'ADJUST HEIGHT TO LIKING' }}>

          <Col style={{ width: '160px' }}>
            <Space direction='vertical'>
              <div style={{ fontFamily: 'Work Sans', fontSize: 20 }}>Filter</div>
            </Space>
          </Col>
        </Row> */}
        <Divider />
        <Row align="top" justify="center" style={{ fontFamily: 'Work Sans' }}>
          <Col style={{ width: 160 }}>
            <Space direction='vertical'>
              <Button onClick={() => { this.props.onSave(); saveNotification(); }} shape='round' size='large' style={{ border: 'none', background: 'black', color: 'white', width: 160 }}>Save</Button>
              <Popconfirm placement="left" title={'Are you sure to delete this trip?'} onConfirm={this.props.onDelete} okText="Yes" cancelText="No">
                <Button shape='round' size='large' style={{ border: 'none', background: 'red', color: 'white', width: 160 }}>Delete Trip</Button>
              </Popconfirm>
            </Space>
          </Col>
        </Row>
      </div >
    );
  }
}

export default FavoritesBar
