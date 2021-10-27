import React from 'react';

import { Layout, Menu, Breadcrumb } from 'antd';
import {
	DesktopOutlined,
	PieChartOutlined,
	FileOutlined,
	TeamOutlined,
	UserOutlined,
} from '@ant-design/icons';

import { myTrips } from '../tempData.js'
import './Layout.less';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class PageLayout extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			myTrips: []
		}

		this.handleMenuClick = this.handleMenuClick.bind(this)
	}


	handleMenuClick(menuItem) {
		console.log(menuItem.key)

		if (isNaN(menuItem.key)) {
			window.location = `/${menuItem.key}`
		} else {
			window.location = `/trip?id=${menuItem.key}`
		}
	}

	// FIXME: Uncomment when data ready
	componentDidMount() {
		// getAllTrips().then(res => {
		//   console.log(res.results)
		//   this.setState({ myTrips: res.results })
		this.setState({ myTrips: myTrips })
		// })

	}


	render() {
		return (
			<Layout>
				<Sider className="sider">
					<div className="logo" />
					<Menu
						theme="light"
						onClick={(menuItem, e) => this.handleMenuClick(menuItem, e)}
						defaultOpenKeys={['NewTrip', 'MyTrips']}
						mode="inline"
					>
						<SubMenu key="NewTrip" title="New Trip">
							<Menu.Item key="CreateTrip">Create Trip</Menu.Item>
							<Menu.Item key="PickActivities">Pick Activities</Menu.Item>
							<Menu.Item key="MakeSchedule">Make Schedule</Menu.Item>
						</SubMenu>

						<SubMenu key="MyTrips" title="My Trips">
							{this.state.myTrips.map((trip) =>
								<Menu.Item key={trip.tid}>{trip.name}</Menu.Item>
							)}
						</SubMenu>
					</Menu>
				</Sider>
				<Layout className="site-layout">
					<Header className="header">
					</Header>
					<Content className="content">
					<div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
						Content
					</div>
					</Content>
					<Footer className="footer">
						<div>SeeQoolPlaces © 2021</div>
						<div>Created by Emily Connor, Joel Lim, Xulei Qin, and Lana Chebib</div>
					</Footer>
				</Layout>
			</Layout>
		);
	}
}

export default PageLayout

