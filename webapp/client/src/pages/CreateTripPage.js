import React from 'react';
import { Layout, Row, Col, Card, Button, Divider } from 'antd';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Content } = Layout;

class CreateTripPage extends React.Component {



	render() {
		return (
			<Layout>
				<SideBar />
				<Layout className='layout' style={{ background: 'white', marginLeft: 200 }}>
					<Header />

					<Content style={{ margin: '24px 24px 0', overflow: 'initial' }}>
					</Content>

					<Footer />
				</Layout>
			</Layout >
		);
	}
}

export default CreateTripPage

