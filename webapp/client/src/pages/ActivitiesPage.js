import React, { useState } from 'react';
import { Layout, Row, Col, Card, Button, Divider, CardBody } from 'antd';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllPOIs } from '../fetcher';


const { Content } = Layout;

const tabList = [
  {
    key: 'tab1',
    tab: 'tab1',
  },
  {
    key: 'tab2',
    tab: 'tab2',
  },
];

const contentList = {
  tab1: <p>content1</p>,
  tab2: <p>content2</p>,
};

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
  article: <p>article content</p>,
  app: <p>app content</p>,
  project: <p>project content</p>,
};

const TabsCard = () => {
  const [activeTabKey1, setActiveTabKey1] = useState('tab1');
  const [activeTabKey2, setActiveTabKey2] = useState('app');

  const onTab1Change = key => {
    setActiveTabKey1(key);
  };
  const onTab2Change = key => {
    setActiveTabKey2(key);
  }
};


const photo = ['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/95/48/3d/coit-tower-from-financial.jpg?w=1100&h=-1&s=1', '']



function getPOIsFromFetcher() {
  var POIs = getAllPOIs().then(res => {
    return res;
  })

  console.log(POIs)
  return POIs
}


class ActivitiesPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      // POIS: []
      POIS: getPOIsFromFetcher()
    }
  }


  // componentDidMount() {
  //   getAllPOIs().then(res => {
  //     console.log(res[0].photo);
  //     this.state.POIS = res;
  //     // this.setState({ POIS: res });
  //     // console.log(this.state.POIS[0].photo);
  //     console.log(this.state.POIS);
  //   })
  //   // console.log(this.state.POIS[0].photo);
  //   console.log(this.state.POIS);
  //   // console.log(this.state.POIS);
  //   // console.log(this.state.POIS);

  //   // getRandomCity().then(res => {
  //   //   this.setState({ randomCity: res.results })
  //   // })
  // }


  render() {
    return (
      <Layout>
        <SideBar />
        <Layout className='layout' style={{ background: 'white', marginLeft: 200 }}>
          <Header />
          <img src={(this.state.POIS[0].photo)} alt="" style={{ maxWidth: '30vw', padding: '20px' }} />

          <Content style={{ margin: '24px 24px 0', overflow: 'initial' }}>
            <Row justify='center'>
              <Col>
                <div style={{ fontFamily: 'Work Sans', textAlign: 'center' }}>
                  <div style={{ fontSize: '3vw' }}>Find activities.</div>
                  <br />
                </div>
              </Col >
            </Row>

            <Row justify='center'>
              <Col span={24} >
                <Card>
                  {/* <Card style={{ border: '1px solid #000' }}> */}
                  <Col span={12} >
                    <Card style={{
                      // border: '1px solid #000',
                      // backgroundImage: `url(${process.env.PUBLIC_URL + "/hiking_sf.jpeg"})`,
                      backgroundImage: `url(${this.state.POIS[0][photo]})`,
                      // backgroundImage: `url(${photo[0]})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      height: '25vh',
                      position: 'relative',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      {/* <img src={(process.env.PUBLIC_URL + "/hiking_sf.jpeg")} alt="" style={{ maxWidth: '30vw', padding: '20px' }} /> */}
                      {/* <img src={this.state.POIS[0].photo)} alt="" style={{ maxWidth: '30vw', padding: '20px' }} /> */}


                    </Card>
                  </Col>
                  <Col span={12} >
                    {/* About POI */}
                  </Col>

                </Card>
              </Col>
            </Row>


            {/* <Row justify='center'>
							<Col span={24} >
								<Card style={{
									border: '1px solid #000',
									height: '50vh',
									position: 'relative',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								</Card>
							</Col>
						</Row> */}

            <br />
            <br />
            <Card
              style={{ width: '100%' }}
              tabList={tabListNoTitle}
              // activeTabKey={activeTabKey2}
              // tabBarExtraContent={<a href="#">More</a>}
              onTabChange={key => {
                // onTab2Change(key);
              }}
            >
              {/* {contentListNoTitle[activeTabKey2]} */}
            </Card>


          </Content>

          <Footer />
        </Layout>
      </Layout >
    );
  }
}

export default ActivitiesPage

