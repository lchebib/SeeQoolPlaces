import React, { useState } from 'react';
import { Layout, Row, Col, Card, Button, Radio, Rate, Tooltip, Pagination } from 'antd';
import { SmileTwoTone, HeartTwoTone, CheckCircleTwoTone, HeartOutlined, SearchOutlined, HeartFilled } from '@ant-design/icons';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TabsCard from '../components/TabsCard';
import Scheduler from '../components/Scheduler';
import { getAllPOIs } from '../fetcher';



const { Content } = Layout;

const likePOI = 0;

class TripPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      POIS: [],
      minValue: 0,
      maxValue: 16,
      poiIsFavorite: true,
      tripID: 0,
      tripName: ""
    }
    this.changePage = this.changePage.bind(this)

  }

  async componentDidMount() {
    getAllPOIs().then(res => {
      this.setState({ POIS: res })
      this.setState({ bigPOI: res[0] })
      console.log(this.state.POIS[0].photo)
    })

    var tripID = window.location.href.split('=')[1]
    console.log(tripID)
    this.state.tripID = tripID
    var trips = JSON.parse(localStorage.getItem("trips"))
    var trip = trips.tripID
    console.log(trip)
    // this.state.tripName = trip.name

  }


  changePage(page, pageSize) {

    if (page <= 1) {
      this.setState({ minValue: 0, maxValue: 16 });
    } else {
      this.setState({ minValue: (page - 1) * (pageSize), maxValue: (page) * (pageSize) });
    }
  }


  render() {
    if (this.state.POIS.length === 0) {
      return null
    }



    return (
      <Layout>
        <SideBar />
        <Layout className='layout' style={{ background: 'white', marginLeft: 200 }}>
          <Header />
          {/* <img src={(this.state.POIS[0].photo)} alt="" style={{ maxWidth: '30vw', padding: '20px' }} /> */}

          <Content style={{ margin: '24px 24px 0', overflow: 'initial' }}>

            <Row justify='center' >
              <Col >
                <div style={{ fontFamily: 'Work Sans', textAlign: 'center' }}>
                  <div style={{ fontSize: '3vw' }}>{this.state.tripName}</div>
                  <br />
                </div>
              </Col >
            </Row>

            <Row justify='center'>
              <Scheduler />
            </Row>


            <Row justify='center' >
              <TabsCard POIS={this.state.POIS} />
            </Row>

          </Content>

          <Footer />
        </Layout>
      </Layout >
    );
  }
}

export default TripPage




