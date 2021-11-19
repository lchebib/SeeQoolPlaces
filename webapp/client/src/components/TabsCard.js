import React from 'react';
import { Row, Col, Card, Button, Radio, Rate, Pagination, Space } from 'antd';
import { getAllPOIs } from '../fetcher';

class TabsCard extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      trip: this.props.trip,
      POIS: this.props.POIS,
      bigPOI: this.props.POIS.find(POI => POI.category === 'trails'),
      favorites: [],
      currentTab: "trails",
      minValue: 0,
      currentPage: 1,
      pageSize: 9,
      keyArr: []
    }
    this.onChangePage = this.onChangePage.bind(this)
    this.onChangePOI = this.onChangePOI.bind(this)
    this.onChangeTab = this.onChangeTab.bind(this)
    this.onSchedule = this.onSchedule.bind(this)
    this.onAddFavorite = this.onAddFavorite.bind(this)
    this.onRemoveFavorite = this.onRemoveFavorite.bind(this)

    // this.isFavorited = this.isFavorited.bind(this)
    // this.isScheduled = this.isScheduled.bind(this)
  }

  componentWillMount() {

    // var POIS = []
    // getAllPOIs().then(res => {
    //   POIS = res
    // })
    // this.POIS = POIS
    // this.setSt ate({ POIS: POIS })
    // this.setState({ POIS: this.props.POIS })
    // this.setState({ bigPOI: this.props.POIS.find(POI => POI.category === 'trails') })
    // this.setState({ trip: this.props.trip })
    // this.setState({ currentTab: "trails" })
    this.setKeyArr(this.state.currentTab)


    // var tripID = this.props.tripID
    // this.setState({ tripID: tripID })
    // var trip = JSON.parse(localStorage.getItem(tripID))

    // this.state.POIS = this.props.POIS
    // this.state.bigPOI = this.state.POIS.find(POI => POI.category === 'trails')
    // this.state.currentTab = "trails"
  }

  onSchedule() {
    this.props.onSchedule(this.state.bigPOI)
    // localStorage.setItem("newEvent", JSON.stringify(this.state.bigPOI))
  }

  onAddFavorite() {
    var favs = [...this.state.favorites]
    favs.push(this.state.bigPOI)
    this.props.onFavorite(this.state.bigPOI)
    // var favorites = localStorage.getItem()
  }

  onRemoveFavorite() {
    var favs = [...this.state.favorites]
    let idx = favs.findIndex(this.state.bigPOI)
    this.props.onFavorite(this.state.bigPOI)
    // var favorites = localStorage.getItem()
  }

  setKeyArr(key) {
    let keyArr = this.state.POIS.filter(obj => {
      return obj.category === key;
    })
    this.setState({ keyArr: keyArr })
  };

  onChangeTab(key) {
    this.setState({ currentTab: key })
    this.setState({ currentPage: 1 })
    this.setKeyArr(key)
    this.onChangePage(1, this.state.pageSize)
  }

  onChangePOI(e) {
    var newBigPOI = this.state.POIS.find(POI => (POI.pid === e.target.value))
    this.setState({ bigPOI: newBigPOI })
  }

  onChangePage(page, size) {
    this.setState({ minValue: (page - 1), pageSize: size });
    this.setState({ currentPage: page })
  }


  render() {

    const favoritesButton = () => {
      let pid = this.state.bigPOI.pid
      if (this.state.favorites.includes(pid)) {
        return <Button type='primary' onClick={this.onRemoveFavorite} key={pid} shape='round' size='large' style={{ border: 'none', background: 'black', color: 'white', width: '100%' }}>Remove from Favorites</Button>
      }
      return <Button type='primary' onClick={this.onFavorite} key={pid} shape='round' size='large' style={{ border: 'none', background: 'black', color: 'white', width: '100%' }}>Add to Favorites</Button>
    }

    const renderRadio = (POI, category) => {
      if (category === 'attractions') {
        return (
          <>
            <Col span={7} >
              <Card style={{
                backgroundImage: `url(${POI.photo})`,
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
                <span className="ant-rate-text">{POI.numReviews}</span>
              </Row>
              <Row gutter={[12]} style={{ fontFamily: 'sans-serif', lineHeight: '20px' }}>
                <Col>
                  {POI.durationHigh} hr
                </Col>
              </Row>
            </Col>
          </>
        )
      }
      else if (category === 'trails') {
        return (
          <>
            <Col span={7} style={{ height: '90%' }}>
              <Card style={{
                backgroundImage: `url(${POI.photo})`,
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
                <span className="ant-rate-text">{POI.numReviews}</span>
              </Row>
              <Row gutter={[12]} style={{ fontFamily: 'sans-serif', lineHeight: '20px' }}>
                <Col>
                  {POI.length} km
                </Col>
                •
                <Col>
                  {POI.durationHigh} hr
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
                <span className="ant-rate-text">{POI.numReviews}</span>
              </Row>
              <Row gutter={[12]} style={{ fontFamily: 'sans-serif', lineHeight: '20px' }}>
                <Col>
                  {POI.subcategory}
                </Col>
                •
                <Col>
                  {POI.durationHigh} hr
                </Col>
              </Row>
            </Col>
          </>
        )
      }
    }


    const renderBigPOI = (bigPOI) => {
      if (bigPOI.category === 'attractions') {
        return (
          <Card style={{ maxHeight: '50vh' }}>
            <Space direction='vertical'>
              <Row align='middle'>
                <Col span={14}>
                  <div style={{ fontFamily: 'Work Sans', fontSize: '150%' }}>{
                    bigPOI.name}
                  </div>
                  <div>
                    <Rate disabled defaultValue={bigPOI.rating} style={{ color: '#006400', zoom: '0.75', transform: 'translateY(-1px)' }} /> &nbsp;
                    {bigPOI.numReviews} reviews
                  </div>
                  <div>
                    <span style={{ fontSize: '110%' }}>{bigPOI.subcategory} • {bigPOI.tags.split(',').join(' • ')}</span>
                  </div>
                </Col>
                <Col span={10} >
                  <img src={(bigPOI.photo)}
                    alt="POI"
                    style={{
                      maxWidth: '100%'
                    }} />
                </Col>
              </Row>
              <Row align='middle' >
                <Space wrap='true'>
                  <div >
                    {bigPOI.description}
                  </div>
                  <div >
                    <span style={{ fontWeight: 'bold' }}>Suggested duration: </span>
                    {bigPOI.durationLow}-{bigPOI.durationHigh} hours
                  </div>
                </Space>
              </Row>
              <Row align='middle' justify='center' gutter={[60]} style={{ fontFamily: 'Work Sans', fontSize: '100%', marginTop: '15px' }}>
                {/* <Col span={12}>
                  <Button type='primary' onClick={this.onFavorite} key={bigPOI.pid} shape='round' size='large' style={{ border: 'none', background: 'black', color: 'white', width: '100%' }}>Add to Favorites</Button>
                </Col>
                <Col span={12}>
                  <Button type='primary' onClick={this.onSchedule} key={bigPOI.pid} shape='round' size='large' style={{ border: 'none', background: 'black', color: 'white', width: '100%' }}>Schedule</Button>
                </Col> */}
              </Row>
            </Space>
          </Card >
        )
      } else if (bigPOI.category === 'trails') {
        return (
          <Card style={{ maxHeight: '50vh' }}>
            <Space direction='vertical'>
              <Row align='middle'>
                <Col span={14}>

                  <div style={{ fontFamily: 'Work Sans', fontSize: '150%' }}>{
                    bigPOI.name}
                  </div>
                  <div>
                    <Rate disabled defaultValue={bigPOI.rating} style={{ color: '#006400', zoom: '0.75', transform: 'translateY(-1px)' }} /> &nbsp;
                    {bigPOI.numReviews} reviews
                  </div>
                </Col>
                <Col span={10} >
                  <img src={(bigPOI.photo)}
                    alt="POI"
                    style={{
                      maxWidth: '100%'
                    }} />
                </Col>
              </Row>
              <Row align='middle' >
                <Space wrap='true'>
                  <div >
                    {bigPOI.description}
                  </div>
                  <div >
                    <span style={{ fontWeight: 'bold' }}>Route type: </span>
                    {bigPOI.routeType}
                  </div>
                  <div >
                    <span style={{ fontWeight: 'bold' }}>Difficulty: </span>
                    {bigPOI.difficulty}
                  </div>
                  <div >
                    <span style={{ fontWeight: 'bold' }}>Length: </span>
                    {bigPOI.length} km
                  </div>
                  <div >
                    <span style={{ fontWeight: 'bold' }}>Suggested duration: </span>
                    {bigPOI.durationLow}-{bigPOI.durationHigh} hours
                  </div>
                  <div >
                    <span style={{ fontWeight: 'bold' }}>Elevation gain </span>
                    {bigPOI.elevationHigh - bigPOI.elevationLow} m
                  </div>
                </Space>
              </Row>
              <Row align='middle' justify='center' gutter={[60]} style={{ fontFamily: 'Work Sans', marginTop: '15px' }}>
                <Col span={12}>
                  <Button type='primary' onClick={this.onSchedule} key={bigPOI.pid} shape='round' size='large' style={{ border: 'none', background: 'black', color: 'white', width: '100%' }}>Schedule</Button>
                </Col>
                <Col span={12}>
                  {favoritesButton()}
                </Col>
              </Row>
            </Space>
          </Card >
        )
      } else {
        return (
          <Card>
            <Space direction='vertical'>
              <Row>
                <Space wrap='true'>
                  <div style={{ fontFamily: 'Work Sans', fontSize: '150%' }}>{
                    bigPOI.name}
                  </div>
                  <div>
                    <Rate disabled defaultValue={bigPOI.rating} style={{ color: '#006400', zoom: '0.75', transform: 'translateY(-1px)' }} /> &nbsp;
                    {bigPOI.numReviews} reviews
                  </div>
                  <div>
                    <span style={{ fontSize: '110%' }}>{bigPOI.subcategory} • {bigPOI.tags.split(',').join(' • ')}</span>
                  </div>
                  <div >
                    <span style={{ fontWeight: 'bold' }}>Suggested duration: </span>
                    {bigPOI.durationLow}-{bigPOI.durationHigh} hours
                  </div>
                </Space>
              </Row>
              <Row align='middle' justify='center' gutter={[60]} style={{ fontFamily: 'Work Sans', marginTop: '15px' }}>
                {/* <Col span={12}>
                  <Button type='primary' onClick={this.onFavorite} key={bigPOI.pid} shape='round' size='large' style={{ border: 'none', background: 'black', color: 'white', width: '100%' }}>Add to Favorites</Button>
                </Col>
                <Col span={12}>
                  <Button type='primary' onClick={this.onSchedule} key={bigPOI.pid} shape='round' size='large' style={{ border: 'none', background: 'black', color: 'white', width: '100%' }}>Schedule</Button>
                </Col> */}
              </Row>
            </Space>
          </Card>
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
      <>
        <Col span={14}>
          <Card
            style={{ width: '100%', height: '100%', fontFamily: 'Work Sans' }}
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
                responsive
              />
            </Row>
            <Radio.Group
              buttonStyle="solid"
              onChange={this.onChangePOI}>
              <Row gutter={[10, 16]} style={{ minWidth: '200px' }}>
                {this.state.keyArr.slice(this.state.minValue, this.state.minValue + this.state.pageSize).map((POI) =>
                  <Col span={{ xs: 24, sm: 16, md: 8 }} style={{ height: '65px' }}>
                    <Radio.Button
                      value={POI.pid}
                      style={{ border: 'none', borderRadius: '5px', width: '220px', height: '100%', padding: '2px' }}
                    >
                      <Row align='middle' gutter={[5, 0]} >
                        {renderRadio(POI, POI.category)}
                      </Row>
                    </Radio.Button>
                  </Col>
                )}
              </Row>
            </Radio.Group >
          </Card>
        </Col >
        <Col span={10}>
          {renderBigPOI(this.state.bigPOI)}
        </Col >
      </>
    );
  }
}
export default TabsCard




