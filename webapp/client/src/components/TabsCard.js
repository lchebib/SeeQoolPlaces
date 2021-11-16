import React from 'react';
import { Layout, Row, Col, Card, Button, Radio, Rate, Tooltip, Pagination, Space } from 'antd';
import { SmileTwoTone, HeartTwoTone, CheckCircleTwoTone, HeartOutlined, SearchOutlined, HeartFilled } from '@ant-design/icons';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllPOIs } from '../fetcher';



const { Content } = Layout;

const likePOI = 0;

class TabsCard extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      POIS: [],
      minValue: 0,
      poiIsFavorite: true,
      bigPOI: {},
      currentTab: "",
      currentPage: 1,
      pageSize: 12,
      keyArr: []
    }
    this.onChangePage = this.onChangePage.bind(this)
    this.onChangePOI = this.onChangePOI.bind(this)
    this.onChangeTab = this.onChangeTab.bind(this)
  }

  async componentDidMount() {
    this.state.POIS = this.props.POIS
    this.state.bigPOI = this.state.POIS.find(POI => POI.category === 'trails')
    this.state.currentTab = "trails"
    this.setKeyArr(this.state.currentTab)
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
    var POIS = this.state.POIS
    var newBigPOI = POIS.find(POI => (POI.pid === e.target.value))
    console.log(newBigPOI)
    this.setState({ bigPOI: newBigPOI })
  }

  onChangePage(page, size) {

    if (page <= 1) {
      this.setState({ minValue: 0, pageSize: size });
    } else {
      this.setState({ minValue: ((page - 1) * size), pageSize: (page * size) });
    }

    this.setState({ currentPage: page })
  }



  render() {
    if (this.state.POIS.length === 0) {
      return null
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
              <Row gutter={[12]} style={{ fontFamily: 'sans-serif', lineHeight: '20px' }}>
                <Col>
                  {POI.rating} stars
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
                padding: '0',
                margin: '0',
                height: '100%',
              }}>
              </Card>
            </Col >
            <Col span={17} >
              <Row style={{ fontFamily: 'Work Sans', fontSize: '110%', lineHeight: '20px' }}>
                {POI.name}
              </Row>
              <Row gutter={[12]} style={{ fontFamily: 'sans-serif', lineHeight: '20px' }}>
                <Col>
                  {POI.rating} stars
                </Col>
                •
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
              <Row gutter={[12]} style={{ fontFamily: 'sans-serif', lineHeight: '20px' }}>
                <Col>
                  {POI.subcategory}
                </Col>
                •
                <Col>
                  {POI.rating} stars
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
      if (bigPOI.category === 'restaurants') {
        return (
          <Card>
            <Row>
              <Col span={16}>
                <Row>
                  <div style={{ fontFamily: 'Work Sans', fontSize: '150%' }}>{bigPOI.name}</div>
                  <div>
                    <Rate disabled defaultValue={bigPOI.rating} style={{ color: '#006400', transform: 'scale(0.81)' }} />
                    {bigPOI.numReviews} reviews
                  </div>
                </Row>
                <Row>
                  <Col span={24}>
                    <div style={{ fontSize: '120%', lineHeight: '15px', marginBottom: '5px' }}>
                      {bigPOI.tags.split(',').join(', ')}
                    </div>
                  </Col>
                  <Col span={24} style={{ lineHeight: '30px', fontWeight: 'bold' }}>
                    Suggested duration: {bigPOI.durationLow}-{bigPOI.durationHigh} hours
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify='center' align='middle' gutter={[0, 20]} style={{ fontFamily: 'Work Sans' }}>
                  <Button type='primary' shape='round' size='medium' style={{ wordWrap: 'break-word', border: 'none', background: 'black', color: 'white', width: '15vh' }}>Add to Favorites</Button>
                  <Button type='primary' shape='round' size='medium' style={{ border: 'none', background: 'black', color: 'white', width: '15vh' }}>Schedule</Button>
                </Row>
              </Col>
            </Row>
          </Card>
        )
      } else {
        return (
          <Card style={{ maxHeight: '50vh' }}>
            <Row align='middle'>
              <Col span={12} >
                <img src={(bigPOI.photo)}
                  alt="POI photo"
                  style={{
                    maxWidth: '100%'
                  }} />
              </Col>
              <Col span={12}>
                <Row justify='center' align='middle' style={{ fontFamily: 'Work Sans' }}>
                  <Button type='primary' shape='round' size='medium' style={{ wordWrap: 'break-word', border: 'none', background: 'black', color: 'white', width: '15vh' }}>Add to Favorites</Button>
                </Row>
                <br />
                <Row justify='center' align='middle' style={{ fontFamily: 'Work Sans' }}>
                  <Button type='primary' shape='round' size='medium' style={{ border: 'none', background: 'black', color: 'white', width: '15vh' }}>Schedule</Button>
                </Row>
              </Col>
            </Row>
            <Row>
              <div style={{ fontFamily: 'Work Sans', fontSize: '150%' }}>{bigPOI.name}</div>
              <div style={{ fontSize: '120%' }}>
                <Rate disabled defaultValue={bigPOI.rating} style={{ color: '#006400', transform: 'scale(0.81)' }} />  {bigPOI.numReviews} reviews
              </div>
              <Col>
                <div>{bigPOI.description}</div>
              </Col>

              <Col span={24} style={{ lineHeight: '30px', fontWeight: 'bold' }}>
                Suggested Duration: {bigPOI.durationLow}-{bigPOI.durationHigh} hours
              </Col>
            </Row>
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
      <>
        <Card style={{ height: '50vh' }}>
          <Row justify='center' >
            {/* <Col flex="600px" span={14}> */}
            <Col span={14} style={{ fontFamily: 'Work Sans', textAlign: 'center' }}>
              <Card
                style={{ width: '100%', height: '100%' }}
                tabList={tabListNoTitle}
                onTabChange={key => {
                  this.onChangeTab(key);
                }}
              >
                <Row align='middle' justify='center' style={{ marginBottom: '10px' }}>
                  <Pagination
                    current={this.state.currentPage}
                    pageSize={this.state.pageSize}
                    showTotal={total => `Total ${total} items`}
                    // simple
                    onChange={this.onChangePage}
                    total={this.state.keyArr.length}
                  />
                </Row>
                <Radio.Group
                  buttonStyle="solid"
                  onChange={this.onChangePOI}
                  style={{}
                  }>
                  <Row gutter={[12, 12]} >
                    {this.state.keyArr.slice(this.state.minValue, this.state.pageSize).map((POI) =>
                      <Col span={8} >
                        <Radio.Button
                          value={POI.pid}
                          style={{ border: 'none', borderRadius: '5px', width: '100%', height: '100%', padding: '2px' }}
                        >
                          <Row align='middle' gutter={[5, 0]} style={{ height: '60px' }} >

                            {renderRadio(POI, POI.category)}
                          </Row>
                        </Radio.Button>
                      </Col>
                    )}
                  </Row>

                </Radio.Group >
              </Card>
            </Col >
            {/* <Col flex="400px" span={10}> */}
            <Col span={10}>
              {/* <Card> */}
              {renderBigPOI(this.state.bigPOI)}
              {/* </Card> */}
            </Col >
          </Row>
        </Card >
      </>
    );
  }
}

export default TabsCard




