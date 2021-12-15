import React from 'react';
import { Row } from 'antd';
import Login from '../components/Login';
import { authenticateUser } from '../fetcher';



class LandingPage extends React.Component {

  componentDidMount() {
    var username = localStorage.getItem("username")
    if (username) {
      authenticateUser(username).then(res => {
        if (res.results == true) {
          window.location = '/home';
        }
      })
    }
  }

  render() {

    return (
      <div style={{ minWidth: '800px' }}>
        <Row align='middle' justify='center' style={{ marginTop: '18vh', marginBottom: '40px' }}>
          <img src={(process.env.PUBLIC_URL + "/login_logo.svg")} alt="See Qool Places Logo" style={{ width: '90vmin', minWidth: '600px' }} />
        </Row >
        <Row align='middle' justify='center' >
          <Login />
        </Row>
      </div>
    );
  }
}
export default LandingPage



