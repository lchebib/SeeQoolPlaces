import React from 'react'
import { Row, Col } from 'antd'

class AuthenticationFailed extends React.Component {
  constructor (props) {
    super(props)
    setTimeout(function () {
      window.location = `/`
    }, 3000)
  }

  render () {
    return (
      <Row
        type='flex'
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <Col style={{ background: 'white' }}>
          <div
            style={{
              height: '30vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <h1 style={{ fontFamily: 'Work Sans', fontSize: '30px' }}>
              Authentication Failed. Redirecting...
            </h1>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a href='/home'>
              <img
                src={process.env.PUBLIC_URL + '/htoad.gif'}
                alt='All glory to the hypnotoad'
                style={{ width: '400px', padding: '20px' }}
              />
            </a>
          </div>
        </Col>
      </Row>
    )
  }
}
export default AuthenticationFailed