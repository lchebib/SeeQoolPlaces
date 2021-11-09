import React, { useState } from 'react';
import { Layout, Row, Col, Card, Button, Radio, Rate, Tooltip, Pagination } from 'antd';
import { SmileTwoTone, HeartTwoTone, CheckCircleTwoTone, HeartOutlined, SearchOutlined, HeartFilled } from '@ant-design/icons';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllPOIs } from '../fetcher';



const { Content } = Layout;
// const [currentValue, setCurrentValue] = useState(2)

const likePOI = 0;

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

class ActivitiesPage extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			POIS: [],
			minValue: 0,
			maxValue: 16,
			poiIsFavorite: false
		}
		this.changePage = this.changePage.bind(this)

	}

	async componentDidMount() {
		getAllPOIs().then(res => {
			this.setState({ POIS: res })
			console.log(this.state.POIS[0].photo)
		})

	}


	changePage(page, pageSize) {
		// this.state.maxValue = pageSize

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


		const renderHeart = () => {
			if (this.state.poiIsFavorite) {
				return <Tooltip title="add to favorites">
					<Button shape="circle" icon={<HeartFilled />} style={{ border: 'none', color: 'red' }} />
				</Tooltip>
			}
			return <Tooltip title="add to favorites">
				<Button shape="circle" icon={<HeartOutlined />} style={{ border: 'none', }} />
			</Tooltip>
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
									<div style={{ fontSize: '3vw' }}>Find activities.</div>
									<br />
								</div>
							</Col >
						</Row>


						<Row justify='center' >
							{/* <Col span={24} style={{ border: '1px solid #000' }}> */}
							<Card>
								{/* <Card style={{ border: '1px solid #000' }}> */}
								<Row wrap={false} >
									<Col flex="350px" >
										<Card style={{
											// border: '1px solid #000',
											backgroundImage: `url(${this.state.POIS[0].photo})`,
											backgroundSize: 'cover',
											backgroundRepeat: 'no-repeat',
											backgroundPosition: 'center',
											height: '200px',
											position: 'relative',
											display: 'flex',
											// justifyContent: 'left',
											// alignItems: 'center',
										}}>
											{renderHeart()}
										</Card>
									</Col >
									<Col flex="auto">
										<Card style={{
											// border: '1px solid #000',
											marginLeft: 20,
											backgroundSize: 'cover',
											backgroundRepeat: 'no-repeat',
											backgroundPosition: 'center',
											height: '25vh',
											position: 'relative',
											display: 'flex',
											justifyContent: 'left',
											alignItems: 'center',
										}}>
											<div style={{ fontFamily: 'Work Sans', fontSize: '2.5vh' }}>{this.state.POIS[0].name}</div>
											<div style={{ fontSize: '1.5vh' }}>
												<Rate disabled defaultValue={this.state.POIS[0].rating} style={{ color: '#006400' }} /> &nbsp; {this.state.POIS[0].numReviews} ratings
											</div>
											<div style={{ fontSize: '1.5vh' }}>{this.state.POIS[0].description}</div>
											<br />
											<div style={{ fontSize: '1.25vh' }}>Suggested duration: {this.state.POIS[0].durationLow}-{this.state.POIS[0].durationHigh} hours</div>

										</Card>
									</Col>
								</Row>
							</Card>
							{/* </Col> */}
						</Row>

						<br />
						<br />
						<div style={{ fontFamily: 'Work Sans', textAlign: 'center' }}>
							<Card
								style={{ width: '100%' }}
								tabList={tabListNoTitle}
								// activeTabKey={activeTabKey2}
								// tabBarExtraContent={<a href="#">More</a>}
								onTabChange={key => {
									// onTab2Change(key);
								}}
							>
								<Row align='middle' justify='center' style={{ marginBottom: '10px' }}>
									<Pagination
										defaultCurrent={1}
										pageSize={16}
										showTotal={total => `Total ${total} items`}
										// simple
										// showSizeChanger='false'
										onChange={this.changePage}
										total={this.state.POIS.length}
									/>
								</Row>

								<Radio.Group
									buttonStyle="solid"
									// name={question.personality}
									// onChange={this.onAnswerSelect}
									style={{ border: '1px solid black' }}
								>
									<Row gutter={[26, 16]} >

										{this.state.POIS.slice(this.state.minValue, this.state.maxValue).map((POI) =>
											<Col span={6} style={{ width: '100%', height: '150px' }}>

												<Radio.Button
													value={POI.pid}
													style={{ borderRadius: '3px', width: '100%', height: '100%', padding: '0' }}>
													{/* <img src={(POI.photo)} alt="" style={{ maxWidth: '10vw', padding: '20px' }} align='left' />
													{POI.name} &nbsp;
													{POI.rating} out of 5 stars &nbsp;
													{POI.numReviews} ratings */}
													<Row justify='center' align='middle' gutter={[6]} >
														<Col flex="25px" span={12} style={{ border: '1px solid black' }}>
															<img src={(POI.photo)} alt="POI photo" style={{
																maxWidth: '10vh', padding: '5px', borderRadius: 20,
																overflow: 'hidden',
															}} />
														</Col >


														<Col flex="auto" span={12} style={{ border: '1px solid black' }}>
															<div style={{ fontSize: '1.5vh' }}>{POI.name}</div>
															<div style={{ fontSize: '1vh' }}>
																{/* <Rate disabled defaultValue={this.state.POIS[0].rating} style={{ color: '#006400' }} /> &nbsp; {this.state.POIS[0].numReviews} ratings */}
															</div>
															{POI.rating} out of 5 stars &nbsp;
															{/* <div style={{ fontSize: '1.5vh' }}>{this.state.POIS[0].description}</div> */}
															<br />
															{/* <div style={{ fontSize: '1.25vh' }}>Suggested duration: {this.state.POIS[0].durationLow}-{this.state.POIS[0].durationHigh} hours</div> */}
														</Col>
													</Row>
												</Radio.Button>
											</Col>

										)}

									</Row>

								</Radio.Group>

								{/* {contentListNoTitle[activeTabKey2]} */}
							</Card>
						</div>


					</Content>

					<Footer />
				</Layout>
			</Layout >
		);
	}
}

export default ActivitiesPage

