import React from 'react';
import { Row, Col } from 'antd';
import Login from '../components/Login';
import { authenticateUser } from '../fetcher';



class LandingPage extends React.Component {

  constructor(props) {
    super(props)

    this.authenticate = this.authenticate.bind(this)
  }

  authenticate() {
    var username = localStorage.getItem("username")
    if (username) {
      authenticateUser(username).then(res => {
        if (res.results == true) {
          window.location = '/home';
        }
      })
    }
  }

  componentDidMount() {
    this.authenticate()
  }

  render() {

    return (
      <div style={{ minWidth: '800px' }}>
        {/* <Row align='middle' justify='center' style={{ height: '100vh', border: '1px solid black' }}> */}
        <Row align='middle' justify='center' style={{ marginTop: '18vh', marginBottom: '40px' }}>
          <img src={(process.env.PUBLIC_URL + "/login_logo.svg")} alt="See Qool Places Logo" style={{ width: '90vmin', minWidth: '600px' }} />
        </Row >
        <Row align='middle' justify='center' >
          <Login />
        </Row>
        {/* </Row> */}
      </div>
    );
  }
}
export default LandingPage



