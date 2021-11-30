import React from 'react';
import { Row, Col } from 'antd';
import Login from '../components/Login';


class LandingPage extends React.Component {

  render() {

    return (
      <>
        <Row align='middle' justify='center' style={{ marginTop: 200, marginBottom: 100 }}>
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



