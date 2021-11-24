import React from 'react';
import { Row, Col } from 'antd';
// import ReactDOM from 'react-dom';
// import { GoogleLogin } from 'react-google-login';


// const responseGoogle = (response) => {
//   console.log(response);
// }

class LandingPage extends React.Component {
  render() {
    return (
      <Row type="flex" style={{ alignItems: "center", justifyContent: 'center' }}>
        <Col style={{ background: 'white' }}>
          <div style={{
            height: '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <img src={(process.env.PUBLIC_URL + "/login_logo.svg")} alt="See Qool Places Logo" style={{ maxWidth: '60vw', padding: '20px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a href="/home">
              <img src={(process.env.PUBLIC_URL + "/google_login.png")} alt="Google Login Button" style={{ width: '250px', padding: '20px' }} />
            </a>
          </div>
        </Col >
      </Row >
    );
  }
}
export default LandingPage