import React from 'react';
import { PageHeader, Avatar, Input, Space, Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getLoggedInUser } from '../fetcher'

const { Search } = Input;

class Header extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			user: [],
			menu: [
				{
					key: 'Login'
				}
			]
		}

		this.onSearch = this.onSearch.bind(this)
		this.onLogin = this.onLogin.bind(this)
		this.onLogout = this.onLogout.bind(this)
		// this.renderDropdown = this.renderDropdown.bind(this)
	}


	onSearch(searchString) {
		if (searchString) {
			window.location = `/search?string=${searchString}`
		}
	}

	// TODO:
	onLogin() {
	}

	// TODO:
	onLogout() {

	}


	//TODO:
	componentDidMount() {
		getLoggedInUser().then(res => {
			console.log(res.results)
			this.setState({
				user: res.results,
				menu: [
					{
						key: 'Account'
					}, {
						key: 'Logout'
					}]
			})
		})
	}



	render() {

		const menu = () => {
			return (
				<Menu>
					{this.state.menu.map((item) =>
						<Menu.Item key={item.key}>{item.key}</Menu.Item>
					)}
				</Menu>)
		}

		return (
			<PageHeader style={{
				paddingTop: '10px',
				background: 'white',
				textAlign: 'right',
				borderBottom: '1px solid #000',
			}}>
				<Space>
					<Search
						placeholder="Search SeeQoolPlaces"
						allowClear
						onSearch={(value, e) => this.onSearch(value, e)}
						style={{ width: '250px' }}
					/>
					<Avatar size='small' icon={<UserOutlined />} />
					<Dropdown overlay={(menu)} trigger={['click']} placement='bottomCenter'>
						<a>
							{this.state.user.username}
						</a>
					</Dropdown>
				</Space>
			</PageHeader >
		);
	}
}

export default Header

