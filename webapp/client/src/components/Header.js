import React from 'react';
import { PageHeader, Avatar, Input, Space, Button, Row, Col } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import { logout } from '../fetcher'


class Header extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      username: {},
    }

    this.onSearch = this.onSearch.bind(this)
    this.onLogout = this.onLogout.bind(this)
  }

  onLogout() {

    logout()
    localStorage.removeItem("username")
    window.location = `/`
  }

  onSearch(searchString) {
    if (searchString) {
      window.location = `/search?string=${searchString}`
    }
  }

  componentWillMount() {
    var username = localStorage.getItem("username")
    this.setState({ username: username })
  }

  render() {

    return (
      <>
        <PageHeader style={{
          paddingTop: '10px',
          background: 'white',
          borderBottom: '1px solid #eee',
        }}>
          <Row align='middle' justify='space-between'>
            <Col span={8} offset={8} >
              <Input
                allowClear
                prefix={<SearchOutlined />}
                onSearch={(value) => this.onSearch(value)}
                style={{ borderRadius: '25px' }}
              />
            </Col>

            <Col>
              <Space>
                <Avatar size='medium' icon={<UserOutlined />} />
                <span style={{ fontSize: '90%' }}>	{this.state.username} </span>
                <Button onClick={this.onLogout} shape='round' style={{ background: 'black', color: 'white', border: 'none' }}>Logout</Button>
              </Space>
            </Col>

          </Row>
        </PageHeader >
      </>
    );
  }
}

export default Header

