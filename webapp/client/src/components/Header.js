import React from 'react';
import { PageHeader, Avatar, Input, Space, Dropdown, Menu, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Login from './Login';
import { getLoggedInUser, logout } from '../fetcher'

const { Search } = Input;

class Header extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			isLoggedIn: [],
			user: [],
			renderLogin: false
		}

		this.onSearch = this.onSearch.bind(this)
		this.onLogout = this.onLogout.bind(this)
		this.onMenuClick = this.onMenuClick.bind(this)
		this.onRenderLogin = this.onRenderLogin.bind(this)
	}

	onMenuClick(menuItem) {
		if (menuItem.key === "logout") {
			this.onLogout()
		} else {
			window.location = `/${menuItem.key}`
		}
	}

	onLogout() {
		this.setState({ isLoggedIn: false })
		this.setState({ user: [] })

		logout()
		window.location = `/`
	}

	onRenderLogin() {
		this.setState({ renderLogin: true })
	}

	onSearch(searchString) {
		if (searchString) {
			window.location = `/search?string=${searchString}`
		}
	}

	componentDidMount() {
		getLoggedInUser().then(res => {
			if (res.results) {
				this.setState({ isLoggedIn: true })
				this.setState({ user: res.results })
			}
		})
	}



	render() {


		const menu = () => {
			return (
				<Menu onClick={(menuItem, e) => this.onMenuClick(menuItem, e)}>
					<Menu.Item key='account'>Account</Menu.Item>
					<Menu.Item key='logout'>Logout</Menu.Item>
				</Menu>)
		}

		const user = () => {
			return (
				<>
					<Avatar size='small' icon={<UserOutlined />} />
					<Dropdown overlay={(menu)} trigger={['click']} placement='bottomCenter'>
						<a>
							{this.state.user.username}
						</a>
					</Dropdown>
				</>)
		}

		const isLoggedIn = () => {
			if (this.state.isLoggedIn === true) {
				return user();
			} else {
				<Button onClick={this.onRenderLogin} shape='round' style={{ background: 'black', color: 'white', border: 'none' }}>Login</Button>
			}
		}

		const login = () => {
			if (this.state.renderLogin === true) {
				return <Login />
			} else {
			}
		}

		return (
			<>
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
							onSearch={(value) => this.onSearch(value)}
							style={{ width: '250px' }}
						/>

						{isLoggedIn()}

					</Space>


				</PageHeader >

				{login()}


			</>

		);
	}
}

export default Header
