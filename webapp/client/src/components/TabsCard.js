import React, { useState } from 'react';
import { Layout, Row, Col, Card, Button, Radio, Rate, Tooltip, Pagination } from 'antd';
import { SmileTwoTone, HeartTwoTone, CheckCircleTwoTone, HeartOutlined, SearchOutlined, HeartFilled } from '@ant-design/icons';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllPOIs } from '../fetcher';



const { Content } = Layout;

const likePOI = 0;

let bigPOI = {};

class TabsCard extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      POIS: [],
      minValue: 0,
      maxValue: 8,
      poiIsFavorite: true,
      bigPOI: {}
    }
    this.changePage = this.changePage.bind(this)
    this.onChangePOI = this.onChangePOI.bind(this)

  }

  async componentDidMount() {
    this.state.POIS = this.props.POIS
    this.state.bigPOI = this.state.POIS.find(POI => POI.category === 'trails')

  }

  onChangePOI(e) {
    var POIS = this.state.POIS
    var newBigPOI = POIS.find(POI => (POI.pid === e.target.value))
    console.log(newBigPOI)
    this.setState({ bigPOI: newBigPOI })
    // this.state.bigPOI = newBigPOI;
  }

  changePage(page, pageSize) {
    // this.state.maxValue = pageSize

    if (page <= 1) {
      this.setState({ minValue: 0, maxValue: 8 });
    } else {
      this.setState({ minValue: (page - 1) * (pageSize), maxValue: (page) * (pageSize) });
    }
  }

  render() {
    if (this.state.POIS.length === 0) {
      return null
    }

    const renderRadio = (POI, category) => {
      if (category === 'attractions') {
        return (
          <Radio.Button
            value={POI.pid}
            style={{ borderRadius: '3px', width: '100%', height: '100%', padding: '0' }}>
            <Row align='middle'>
              <Col flex={1.5} style={{}}>
                <Card style={{
                  backgroundImage: `url(${POI.photo})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                </Card>
              </Col >
              <Col flex={3.5} style={{}}>
                <div style={{ fontFamily: 'Work Sans', fontSize: '2vh', lineHeight: '15px' }}>{POI.name}</div>
                <div style={{ fontSize: '1.5vh', lineHeight: '20px' }}>
                  {POI.rating} stars &nbsp; &nbsp; {POI.durationHigh} hr
                </div>
              </Col>
            </Row>
          </Radio.Button>)
      }
      else if (category === 'trails') {
        return (
          <Radio.Button
            value={POI.pid}
            style={{ borderRadius: '3px', width: '100%', height: '100%', padding: '0' }}>
            <Row align='middle'>
              <Col flex={1.5} style={{}}>
                <Card style={{
                  backgroundImage: `url(${POI.photo})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                </Card>
              </Col >
              <Col flex={3.5} style={{ justify: 'left' }}>
                <div style={{ fontFamily: 'Work Sans', fontSize: '2vh', lineHeight: '15px' }}>{POI.name}</div>
                <div style={{ fontSize: '1.5vh', lineHeight: '20px' }}>
                  {POI.rating} stars &nbsp; &nbsp; {POI.length} km &nbsp; &nbsp; {POI.durationHigh} hr
                </div>
              </Col>
            </Row>
          </Radio.Button>
        )
      }
      else {
        return (
          <Radio.Button
            value={POI.pid}
            style={{ borderRadius: '3px', width: '100%', height: '100%', padding: '0' }}>
            <Row align='middle'>
              <Col flex={3.5} style={{ justify: 'left' }}>
                <div style={{ fontFamily: 'Work Sans', fontSize: '2.5vh', lineHeight: '15px', marginTop: '5px' }}>{POI.name}</div>
                <div style={{ fontSize: '1.5vh', lineHeight: '20px' }}>
                  {POI.rating} stars &nbsp; &nbsp; {POI.durationHigh} hr
                </div>
                <div style={{ fontSize: '1.5vh', lineHeight: '15px', marginBottom: '5px' }}>
                  {POI.tags.split(',').slice(0, 3).join(', ')}
                </div>
              </Col>
            </Row>
          </Radio.Button>
        )
      }
    }

    const renderBigPOI = () => {
      if (this.state.bigPOI.category === 'restaurants') {
        return (
          <Card style={{ fontSize: '1.5vh', border: 'none' }}>

            <Row>
              <div style={{ fontFamily: 'Work Sans', fontSize: '2.5vh' }}>{this.state.bigPOI.name}</div>
              <div style={{ fontSize: '1.5vh' }}>
                <Rate disabled defaultValue={this.state.bigPOI.rating} style={{ color: '#006400', transform: 'scale(0.81)' }} />  {this.state.bigPOI.numReviews} reviews
              </div>
              <div style={{ fontSize: '1.5vh', lineHeight: '15px', marginBottom: '5px' }}>
                {this.state.bigPOI.tags.split(',').join(', ')}
              </div>

              <div style={{ fontSize: '1.25vh', lineHeight: '30px', fontWeight: 'bold' }}>Suggested duration: {this.state.bigPOI.durationLow}-{this.state.bigPOI.durationHigh} hours</div>
            </Row>
            <Row >
              <Col>
                <div style={{ fontFamily: 'Work Sans', fontSize: '2.5vh' }}>
                  <Button type='primary' htmlType="submit" shape='round' size='medium' style={{ marginLeft: '30px', marginTop: '30px', wordWrap: 'break-word', border: 'none', background: 'black', color: 'white' }}>Add to Favorites</Button>
                  <Button type='primary' htmlType="submit" shape='round' size='medium' style={{ marginLeft: '30px', border: 'none', background: 'black', color: 'white', maxWidth: '15vh' }}>Schedule</Button>
                </div>
              </Col>
            </Row>
          </Card>
        )
      } else {
        return (
          <Card style={{ fontSize: '1.5vh', border: 'none' }}>
            <Row >
              <Col flex=".5">
                <img src={(this.state.bigPOI.photo)} alt="POI photo" style={{
                  maxWidth: '25vh'
                }} />
              </Col>
              <Col flex=".5">
                <div style={{ fontFamily: 'Work Sans', fontSize: '2.5vh' }}>
                  <Button type='primary' htmlType="submit" shape='round' size='medium' style={{ marginLeft: '5px', marginTop: '30px', wordWrap: 'break-word', border: 'none', background: 'black', color: 'white' }}>Add to Favorites</Button>
                  <br /> <br />
                  <Button type='primary' htmlType="submit" shape='round' size='medium' style={{ marginLeft: '30px', border: 'none', background: 'black', color: 'white', maxWidth: '15vh' }}>Schedule</Button>
                </div>
              </Col>
            </Row>
            <Row>
              <div style={{ fontFamily: 'Work Sans', fontSize: '2.5vh' }}>{this.state.bigPOI.name}</div>
              <div style={{ fontSize: '1.5vh' }}>
                <Rate disabled defaultValue={this.state.bigPOI.rating} style={{ color: '#006400', transform: 'scale(0.81)' }} />  {this.state.bigPOI.numReviews} reviews
              </div>
              <div style={{ fontSize: '1.5vh' }}>{this.state.bigPOI.description}</div>

              <div style={{ fontSize: '1.25vh', lineHeight: '30px', fontWeight: 'bold' }}>Suggested duration: {this.state.bigPOI.durationLow}-{this.state.bigPOI.durationHigh} hours</div>
            </Row>
          </Card>

        )
      }
    }

    const renderResults = (key) => {

      let keyArr = this.state.POIS.filter(obj => {
        return obj.category === key;
      });

      return (

        <>
          <Row align='middle' justify='center' style={{ marginBottom: '10px' }}>
            <Pagination
              defaultCurrent={1}
              pageSize={8}
              showTotal={total => `Total ${total} items`}
              // simple
              // showSizeChanger='false'
              onChange={this.changePage}
              total={keyArr.length}
            />
          </Row>
          <Radio.Group
            buttonStyle="solid"
            onChange={this.onChangePOI}
            style={{}
            }>
            <Row gutter={[8, 8]} >
              {keyArr.slice(this.state.minValue, this.state.maxValue).map((POI) =>
                <Col span={12} style={{ width: '100%', height: '100%' }}>
                  {renderRadio(POI, POI.category)}
                </Col>
              )}
            </Row>

          </Radio.Group >
        </>
      );
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

    const contentListNoTitle = {
      trails: renderResults('trails'),
      attractions: renderResults('attractions'),
      restaurants: renderResults('restaurants'),
    };

    const TabsCard = () => {

      const [activeTabKey2, setActiveTabKey2] = useState('trails');

      const onTab2Change = key => {
        setActiveTabKey2(key);
      }
      return (
        <div style={{ fontFamily: 'Work Sans', textAlign: 'center' }}>
          <Card
            style={{ width: '100%' }}
            tabList={tabListNoTitle}
            activeTabKey={activeTabKey2}
            onTabChange={key => {
              onTab2Change(key);
            }}
          >
            {contentListNoTitle[activeTabKey2]}
          </Card>
        </div>
      )
    };

    return (
      <>
        < Card >
          <Row justify='center' align='middle' >
            <Col flex="1 1 200px">
              <TabsCard />
            </Col >

            <Col flex="400px" >
              {renderBigPOI()}
              {/* <Card style={{ fontSize: '1.5vh', border: 'none' }}>
                <Row >
                  <Col flex=".5">
                    <img src={(this.state.bigPOI.photo)} alt="POI photo" style={{
                      maxWidth: '25vh'
                    }} />
                  </Col>
                  <Col flex=".5">
                    <div style={{ fontFamily: 'Work Sans', fontSize: '2.5vh' }}>
                      <Button type='primary' htmlType="submit" shape='round' size='medium' style={{ marginLeft: '5px', marginTop: '30px', wordWrap: 'break-word', border: 'none', background: 'black', color: 'white' }}>Add to Favorites</Button>
                      <br /> <br />
                      <Button type='primary' htmlType="submit" shape='round' size='medium' style={{ marginLeft: '30px', border: 'none', background: 'black', color: 'white', maxWidth: '15vh' }}>Schedule</Button>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <div style={{ fontFamily: 'Work Sans', fontSize: '2.5vh' }}>{this.state.bigPOI.name}</div>
                  <div style={{ fontSize: '1.5vh' }}>
                    <Rate disabled defaultValue={this.state.bigPOI.rating} style={{ color: '#006400', transform: 'scale(0.81)' }} />  {this.state.bigPOI.numReviews} reviews
                  </div>
                  <div style={{ fontSize: '1.5vh' }}>{this.state.bigPOI.description}</div>

                  <div style={{ fontSize: '1.25vh', lineHeight: '30px', fontWeight: 'bold' }}>Suggested duration: {this.state.bigPOI.durationLow}-{this.state.bigPOI.durationHigh} hours</div>
                </Row>
              </Card> */}

            </Col >
          </Row>
        </Card >

      </>
    );
  }
}

export default TabsCard




