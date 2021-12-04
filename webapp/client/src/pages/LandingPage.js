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
      <>
        <Row align='middle' justify='center' style={{ paddingTop: 200, paddingBottom: 100 }}>
          <img src={(process.env.PUBLIC_URL + "/login_logo.svg")} alt="See Qool Places Logo" style={{ width: '50vw' }} />
        </Row >
        <Row align='middle' justify='center'>
          <Login />
        </Row>
      </>
    );
  }
}
export default LandingPage



