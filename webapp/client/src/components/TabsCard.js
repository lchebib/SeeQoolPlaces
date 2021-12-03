import React from 'react';
import { Row, Col, Card, Button, Radio, Rate, Pagination, Space } from 'antd';

class TabsCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentTab: "trails",
      minValue: 0,
      currentPage: 1,
      pageSize: 12,
      keyArr: []
    };

    this.onChangePage = this.onChangePage.bind(this);
    this.onChangePOI = this.onChangePOI.bind(this);
    this.onChangeTab = this.onChangeTab.bind(this);
    this.onSchedule = this.onSchedule.bind(this);
    this.onAddFavorite = this.onAddFavorite.bind(this);
    this.onRemoveFavorite = this.onRemoveFavorite.bind(this);
  }

  componentWillMount() {
    this.setKeyArr(this.state.currentTab);
  }

  componentWillMount() {
    this.setKeyArr(this.state.currentTab);
  }

  onSchedule() {
    this.props.onSchedule(this.props.bigPOI);
  }

  onAddFavorite() {
    this.props.onAddFavorite(this.props.bigPOI);
  }

  onRemoveFavorite() {
    this.props.onRemoveFavorite(this.props.bigPOI);
  }

  setKeyArr(key) {
    switch (key) {
      case 'trails':
        this.setState({ keyArr: this.props.tripTrails });
        break;
      case 'attractions':
        this.setState({ keyArr: this.props.tripAttractions });
        break;
      case 'restaurants':
        this.setState({ keyArr: this.props.tripRestaurants });
        break;
    }
  };

  getBackgroundImage(POI) {
    if (POI.photo) {
      return POI.photo;
    } else {
      return 'https://i.imgur.com/k4MjFGw.png';
    }
  }

  onChangeTab(key) {
    this.setState({ currentTab: key });
    this.setState({ currentPage: 1 });
    this.setKeyArr(key);
    this.onChangePage(1, this.state.pageSize);
  }

  onChangePOI(e) {
    this.props.onClickPOI(e.target.value);
  }

  onChangePage(page, size) {
    this.setState({ currentPage: page, pageSize: size, minValue: (page - 1) * size });
  }

  render() {

    // if (this.state.keyArr.length === 0) {
    //   return null
    // }


    const renderRadio = (POI) => {
      if (POI.category === 'attractions') {
        return (
          <>
            <Col span={7} >
              <Card style={{
                backgroundImage: `url(${this.getBackgroundImage(POI)})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                border: '0px',
                borderRadius: '5px',
                padding: '0',
                margin: '0'
              }}>
              </Card>
            </Col >
            <Col span={17} >
              <Row style={{ fontFamily: 'Work Sans', fontSize: '110%', lineHeight: '20px' }}>
                {POI.name}
              </Row>
              <Row justify='start' style={{ fontFamily: 'sans-serif', lineHeight: '20px' }}>
                <Rate disabled allowHalf='true' defaultValue={POI.rating} style={{ color: '#006400', zoom: '0.55' }} />
                <span className="ant-rate-text">{POI.num_reviews}</span>
              </Row>
              <Row gutter={[12]} style={{ fontFamily: 'sans-serif', lineHeight: '20px' }}>
                <Col>
                  {POI.duration_high} hr
                </Col>
              </Row>
            </Col>
          </>
        )
      }
      else if (POI.category === 'trails') {
        return (
          <>
            <Col span={7} style={{ height: '90%' }}>
              <Card style={{
                // backgroundImage: `url(${POI.photo})`,
                backgroundImage: `url(${this.getBackgroundImage(POI)})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                border: '0px',
                borderRadius: '5px',
                height: '100%',
              }}>
              </Card>
            </Col >
            <Col span={17} >
              <Row style={{ fontWeight: 'bold', lineHeight: '20px' }}>
                {POI.name}
              </Row>
              <Row justify='start' style={{ fontFamily: 'sans-serif', lineHeight: '20px' }}>
                <Rate disabled allowHalf='true' defaultValue={POI.rating} style={{ color: '#006400', zoom: '0.55' }} />
                <span className="ant-rate-text">{POI.num_reviews}</span>
              </Row>
              <Row gutter={[12]} style={{ fontFamily: 'sans-serif', lineHeight: '20px' }}>
                <Col>
                  {POI.length} km
                </Col>
                •
                <Col>
                  {POI.duration_high} hr
                </Col>
              </Row>
            </Col>
          </>
        )
      }
      else {
        return (
          <>
            <Col >
              <Row style={{ fontFamily: 'Work Sans', fontSize: '110%', lineHeight: '20px' }}>
                {POI.name}
              </Row>
              <Row justify='start' style={{ fontFamily: 'sans-serif', lineHeight: '20px' }}>
                <Rate disabled allowHalf='true' defaultValue={POI.rating} style={{ color: '#006400', zoom: '0.55' }} />
                <span className="ant-rate-text">{POI.num_reviews}</span>
              </Row>
              <Row gutter={[12]} style={{ fontFamily: 'sans-serif', lineHeight: '20px' }}>
                <Col>
                  {POI.subcategory}
                </Col>
                •
                <Col>
                  {POI.duration_high} hr
                </Col>
                •
                <Col>
                  {handleRestaurantCost(POI.costHigh, POI.costLow)}
                </Col>
              </Row>
            </Col>
          </>
        )
      }
    }



    const favoritesButton = (POI) => {
      if (this.props.favorites.some(fav => fav.pid === POI.pid)) {
        /* not compatible with some browsers */
        return <Button type='primary' onClick={this.onRemoveFavorite} key={POI} shape='round' style={{ border: 'none', background: 'black', color: 'white' }}>Remove Favorite</Button>
      }
      return <Button type='primary' onClick={this.onAddFavorite} key={POI} shape='round' style={{ border: 'none', background: 'black', color: 'white', width: 145 }}> Add Favorite</Button>
    }

    const scheduleButton = (POI) => {
      return <Button type='primary' onClick={this.onSchedule} key={POI} shape='round' style={{ border: 'none', background: 'black', color: 'white', width: 145 }}>Add Event</Button>
    }


    const handleTags = (tags) => {
      if (tags) {
        return "• " + tags.split(',').join(' • ')
      }
    }

    const handleSuggestedDuration = (dur_high, dur_low) => {
      if (dur_high == dur_low) {
        return `${dur_high} hours`
      } else {
        return `${dur_low} - ${dur_high} hours`
      }
    }

    const handleRestaurantCost = (costHigh, costLow) => {

      let moneyString = "";
      let costLowStr = "";
      let costHighStr = "";
      for (let i = costLow; i > 0; i--) {
        costLowStr = costLowStr.concat('$');
      }
      for (let i = costHigh; i > 0; i--) {
        costHighStr = costHighStr.concat('$');
      }

      if (costHigh === costLow) {
        return costLowStr;
      }
      moneyString = moneyString.concat(costLowStr, ' - ', costHighStr);
      return moneyString;
    }

    const handleDescription = (description) => {
      if (description) {
        if (description.length > 254) {
          description += "..."
        }
      }

      return description
    }

    const handleDifficulty = (difficulty) => {
      var arr = ['Easy', 'Medium', 'Hard']
      return arr[difficulty - 1]
    }


    const renderBigPOI = (bigPOI) => {
      if (bigPOI.category === 'attractions') {
        return (
          <Card >
            <Space direction='vertical'>
              <Row gutter={0, 5}>
                <Col lg={24} xl={14} >
                  <Space direction='vertical'>
                    <div style={{ fontFamily: 'Work Sans', fontSize: '150%' }}>{
                      bigPOI.name}
                    </div>
                    <div >
                      <Rate disabled defaultValue={bigPOI.rating} style={{ color: '#006400', zoom: '0.75', transform: 'translateY(-1px)' }} /> &nbsp;
                      {bigPOI.num_reviews} reviews
                    </div>
                    <div>
                      <span style={{ fontSize: '110%' }}>{bigPOI.tags.split(',').join(' • ')}</span>
                    </div>
                  </Space>
                </Col>
                <Col lg={24} xl={10} >
                  <img src={(this.getBackgroundImage(bigPOI))} alt="POI" style={{ maxWidth: '100%' }} />
                </Col>
              </Row>
              <Row align='middle' >
                {handleDescription(bigPOI.description)}
              </Row>
              <Row align='middle' >
                <Space wrap='true'>
                  <div >
                    <span style={{ fontWeight: 'bold' }}>Suggested duration: </span>
                    {handleSuggestedDuration(bigPOI.duration_high, bigPOI.duration_low)}
                  </div>
                </Space>
              </Row>
              <Row align='middle' justify='center' gutter={[20, 5]} style={{ fontFamily: 'Work Sans', marginTop: '15px' }}>
                <Col lg={{ flex: 24 }} xl={{ flex: 12 }}>
                  {scheduleButton(bigPOI)}
                </Col>
                <Col lg={{ flex: 24 }} xl={{ flex: 12 }}>
                  {favoritesButton(bigPOI)}
                </Col>
              </Row>
            </Space>
          </Card >
        )
      } else if (bigPOI.category === 'trails') {
        return (
          <Card >
            <Space direction='vertical'>
              <Row gutter={0, 5}>
                <Col lg={24} xl={14} >
                  <Space direction='vertical'>
                    <div style={{ fontFamily: 'Work Sans', fontSize: '150%' }}>
                      {bigPOI.name}
                    </div>
                    <div>
                      <Rate disabled defaultValue={bigPOI.rating} style={{ color: '#006400', zoom: '0.75', transform: 'translateY(-1px)' }} /> &nbsp;
                      {bigPOI.num_reviews} reviews
                    </div>
                  </Space>
                </Col>
                <Col lg={24} xl={10} >
                  <img src={(this.getBackgroundImage(bigPOI))} alt="POI" style={{ maxWidth: '100%' }} />
                </Col>
              </Row>
              <Row align='middle' >
                {handleDescription(bigPOI.description)}
              </Row>
              <Row align='middle' >
                <Space wrap='true'>
                  <div >
                    <span style={{ fontWeight: 'bold' }}>Route type: </span>
                    {bigPOI.route_type}
                  </div>
                  <div >
                    <span style={{ fontWeight: 'bold' }}>Difficulty: </span>
                    {handleDifficulty(bigPOI.difficulty)}
                  </div>
                  <div >
                    <span style={{ fontWeight: 'bold' }}>Length: </span>
                    {bigPOI.length} km
                  </div>
                  <div >
                    <span style={{ fontWeight: 'bold' }}>Suggested duration: </span>
                    {handleSuggestedDuration(bigPOI.duration_high, bigPOI.duration_low)}
                  </div>
                  <div >
                    <span style={{ fontWeight: 'bold' }}>Elevation gain </span>
                    {bigPOI.high - bigPOI.low} m
                  </div>
                </Space>
              </Row>
              <Row align='middle' justify='center' gutter={[20, 5]} style={{ fontFamily: 'Work Sans', marginTop: '15px' }}>
                <Col lg={{ flex: 24 }} xl={{ flex: 12 }}>
                  {scheduleButton(bigPOI)}
                </Col>
                <Col lg={{ flex: 24 }} xl={{ flex: 12 }}>
                  {favoritesButton(bigPOI)}
                </Col>
              </Row>
            </Space>
          </Card >
        )
      } else {
        return (
          <Card >
            <Space direction='vertical'>
              <Row >
                <Space direction='vertical'>
                  <Space wrap='true'>
                    <div style={{ fontFamily: 'Work Sans', fontSize: '150%' }}>{
                      bigPOI.name}
                    </div>
                    <div >
                      <Rate disabled defaultValue={bigPOI.rating} style={{ color: '#006400', zoom: '0.75', transform: 'translateY(-1px)' }} /> &nbsp;
                      {bigPOI.num_reviews} reviews
                    </div>
                  </Space>
                  <Col span={24} >
                    <div style={{ fontSize: '110%' }}>{bigPOI.subcategory} {handleTags(bigPOI.tags)}</div>
                  </Col>
                  <Col span={24} >
                    <span style={{ fontWeight: 'bold' }}>Suggested duration: </span>
                    {handleSuggestedDuration(bigPOI.duration_high, bigPOI.duration_low)}
                  </Col>
                </Space>
                <Col span={24} >
                  <span style={{ fontWeight: 'bold' }}>Cost: </span>
                  {handleRestaurantCost(bigPOI.costHigh, bigPOI.costLow)}
                </Col>
              </Row>
              <Row align='middle' justify='center' gutter={[20, 5]} style={{ fontFamily: 'Work Sans', marginTop: '15px' }}>
                <Col lg={{ flex: 24 }} xl={{ flex: 12 }}>
                  {scheduleButton(bigPOI)}
                </Col>
                <Col lg={{ flex: 24 }} xl={{ flex: 12 }}>
                  {favoritesButton(bigPOI)}
                </Col>
              </Row>
            </Space >
          </Card >
        )
      }
    }


    const tabListNoTitle = [
      {
        key: 'trails',
        tab: 'Hiking Trails',
      },
      {
        key: 'attractions',
        tab: 'Attractions',
      },
      {
        key: 'restaurants',
        tab: 'Restaurants',
      },
    ];


    return (
      <Row >
        <Col span={14} >
          <Card
            style={{ fontFamily: 'Work Sans' }}
            tabList={tabListNoTitle}
            onTabChange={key => {
              this.onChangeTab(key);
            }}>
            <Row style={{ fontFamily: 'Work Sans', marginBottom: '20px' }}>
              <Pagination
                current={this.state.currentPage}
                pageSize={this.state.pageSize}
                showTotal={total => `Total ${total} items`}
                onChange={this.onChangePage}
                total={this.state.keyArr.length}
                pageSizeOptions={[6, 12, 18, 30]}
                showSizeChanger='true'
                responsive
              />
            </Row>
            <Radio.Group
              buttonStyle="solid"
              onChange={this.onChangePOI}>
              <Row gutter={[10, 16]} >
                {this.state.keyArr.slice(this.state.minValue, this.state.minValue + this.state.pageSize).map((POI) =>
                  <Col span={{ xs: 24, sm: 16, md: 12 }} style={{ height: '65px' }}>
                    <Radio.Button
                      value={POI}
                      style={{ border: 'none', borderRadius: '5px', width: '220px', height: '100%', padding: '2px' }}
                    >
                      <Row align='middle' gutter={[5, 0]} >
                        {renderRadio(POI)}
                      </Row>
                    </Radio.Button>
                  </Col>
                )}
              </Row>
            </Radio.Group >
          </Card>
        </Col >
        <Col span={10}>
          {renderBigPOI(this.props.bigPOI)}
        </Col >
      </Row>
    );
  }
}
export default TabsCard



