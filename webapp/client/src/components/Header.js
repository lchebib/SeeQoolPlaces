import React from 'react';
import { PageHeader, Avatar, Space, Button, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { logout } from '../fetcher'
import '../style/style.css'

/**
 * @name Header
 * @description Website header, displays logged in user and logout button
 * 
 * APPEARS IN
 * All pages except landing page
 */
class Header extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      username: localStorage.getItem("username"),
    }

    // this.onSearch = this.onSearch.bind(this)
    this.onLogout = this.onLogout.bind(this)
  }

  /**
   * @description Callback function when user logs out.
   * Logs out user by updating database, clearing localStorage, and redirecting user to landing page
   */
  onLogout() {
    logout(this.state.username)
    localStorage.clear()
    window.location = `/`
  }

  /**
   * NOT IN USE
   * @description Takes input string and redirects user to search page
   * @param {String}
   */
  // onSearch(searchString) {
  //   if (searchString) {
  //     window.location = `/search?string=${searchString}`
  //   }
  // }

  render() {

    return (
      <>
        <PageHeader style={{
          paddingTop: '10px',
          background: 'white',
          borderBottom: '1px solid #eee',
        }}>
          {/* <PageHeader className='header'> */}
          <Row align='middle' justify='space-between'>
            <Col span={8} offset={8} >
              {/* <Input
                allowClear
                prefix={<SearchOutlined />}
                onSearch={(value) => this.onSearch(value)}
                style={{ borderRadius: '25px' }}
              /> */}
            </Col>
            <Col>
              <Space>
                <Avatar size='medium' icon={<UserOutlined />} />
                <span style={{ fontSize: '90%' }}>	{this.state.username} </span>
                <Button onClick={this.onLogout} shape='round'
                  style={{
                    background: 'black',
                    color: 'white',
                    border: 'none'
                  }}>
                  Logout
                </Button>
              </Space>
            </Col>

          </Row>
        </PageHeader >
      </>
    );
  }
}

export default Header

