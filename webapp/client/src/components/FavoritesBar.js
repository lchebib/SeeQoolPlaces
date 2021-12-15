import React from 'react';
import { Button, Row, Space, Divider, Popconfirm, message } from 'antd';
import '../style/style.css'


/**
 * @name FavoritesBar
 * @description Right sidebar containing all favorite POIs for a trip,
 * save trip button, and delete trip button.
 * 
 * PROPS
 * @name favorites
 * @description Array of POI objects
 * 
 * @name onClickFavorite
 * @description Callback function when a favorite is clicked
 * @param value POI object
 * 
 * @name onSave
 * @description Callback functionwhen save trip button clicked
 * 
 * @name onSave
 * @description Callback function when save trip button clicked
 * 
 * APPEARS IN
 * TripPage
 */
class FavoritesBar extends React.Component {

  render() {

    // Do not render component until favorites props ready
    if (!this.props.favorites) {
      return null
    }

    /**
     * @description Shortens name of favorites and appends "..." in case of overflow past width of button
     * @param {String} name Name of favorite
     * @return {String} Name of favorite, shortened if longer than 18 char
     */
    const handleButtonName = (name) => {
      let shortName;
      if (name) {
        if (name.length > 18) {
          shortName = name.slice(0, 18) + '...';
          return shortName;
        }
      }
      return name;
    }

    /**
     * @description Renders favorite button
     * @param {Object} POI 
     * @return {ReactElement} Button
     */
    const favoriteButton = (POI) => {
      var color;

      if (POI.category === "trails") {
        color = '#9CDA86'
      } else if (POI.category === "attractions") {
        color = '#FFC93F'
      } else {
        color = '#EC7878'
      }
      return (
        <Button
          onClick={() => { this.props.onClickFavorite(POI) }}
          shape='round'
          style={{
            border: 'none',
            width: 170,
            textAlign: 'left',
            background: color,
            overflow: 'hidden'
          }}>
          {handleButtonName(POI.name)}
        </Button>
      )
    }

    /**
     * @description Callback function when trip saved.
     * Renders notification to notify user trip has been saved
     */
    const saveNotification = () => {
      message.success('Trip saved', 3);
    };


    return (
      <>
        <Row align='top' justify='center' >
          <span className="fb-header" >Favorites</span>
        </Row>
        {/* <Row className='fb-container' align='top' justify='center'> */}
        <Row className='fb-container1' align='top' justify='center'>
          <Space direction='vertical' >
            {this.props.favorites.map((POI) =>
              <div>
                {favoriteButton(POI)}
              </div>
            )}
          </Space>
        </Row>
        <Divider />
        <Row className='fb-container2' align='middle' justify='center'>
          <Space direction='vertical'>
            <Button onClick={() => { this.props.onSave(); saveNotification(); }} shape='round' size='large'
              style={{
                border: 'none',
                width: 170,
                background: 'black',
                color: 'white',
              }}>
              Save
            </Button>
            <Popconfirm placement="left" title={'Are you sure to delete this trip?'} onConfirm={this.props.onDelete} okText="Yes" cancelText="No">
              <Button shape='round' size='large'
                style={{
                  border: 'none',
                  width: 170,
                  background: 'red',
                  color: 'white',
                }}
              >
                Delete Trip
              </Button>
            </Popconfirm>
          </Space>
        </Row>
        {/* </Row> */}
      </ >
    );
  }
}

export default FavoritesBar
