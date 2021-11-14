import React from 'react';
import { Layout, Row, Col, Card, Button, Divider, Space } from 'antd';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReactDOM from 'react-dom';
import { GoogleLogin } from 'react-google-login';

const { Content } = Layout;

const responseGoogle = (response) => {
  console.log(response);
}

class LandingPage extends React.Component {
  render() {
    return (

      <Row type="flex" style={{ alignItems: "center", justifyContent: 'center' }}>
        <Col style={{ background: 'white' }}>
          <div style={{
            // position: 'relative',
            // top: '0.5',
            // left: '0.5',
            // marginTop: '-50px',
            // marginLeft: '-50px',
            // width: '80vw',
            // margin: '0 auto',
            // backgroundSize: 'cover',
            // backgroundRepeat: 'no-repeat',
            // backgroundPosition: 'center',
            height: '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {/* <div style={{ fontFamily: 'Work Sans', fontSize: '4vh' }}>Plan the perfect trip.</div> */}
            <img src={(process.env.PUBLIC_URL + "/Login_Logo.svg")} alt="See Qool Places Logo" style={{ maxWidth: '60vw', padding: '20px' }} />

          </div>
          <div style={{
            // position: 'relative',
            // top: '0.5',
            // left: '0.5',
            // marginTop: '-50px',
            // marginLeft: '-50px',
            // width: '80vw',
            // margin: '0 auto',
            // backgroundSize: 'cover',
            // backgroundRepeat: 'no-repeat',
            // backgroundPosition: 'center',
            // height: '0vh',
            display: 'flex',
            justifyContent: 'center',
            // alignItems: 'center',
          }}>
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